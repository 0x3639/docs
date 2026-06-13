// Build-time snippet injection.
//
// Resolves {@inject: examples/<file>#<anchor>} directives in Markdown/MDX by
// pasting the code between the matching `// docs::start:<anchor>` and
// `// docs::end:<anchor>` lines of the referenced file, rendered as a fenced
// code block. The referenced files live in the compile-tested examples/ Go
// module, so a snippet can never drift from code that builds in CI.
//
// Wired into docusaurus.config.js as `markdown.preprocessor`, so the
// directive is replaced in the raw source before MDX parses it (a literal
// {@inject ...} would otherwise be read as an MDX expression). A missing
// file or anchor THROWS, which fails the build hard — stale references can
// never ship silently.
import { readFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const GITHUB_BLOB = 'https://github.com/0x3639/docs/blob/main';

// {@inject: examples/snippets.go#parse-address}
const DIRECTIVE = /\{@inject:\s*([^#\s}]+)#([A-Za-z0-9_-]+)\s*\}/g;

const LANG_BY_EXT = { '.go': 'go', '.js': 'js', '.ts': 'ts', '.sh': 'bash', '.json': 'json' };

// Extract the lines between `// docs::start:<anchor>` and
// `// docs::end:<anchor>`, then strip the common leading indentation.
function extractAnchor(fileContent, anchor, relPath, mdxPath) {
  const lines = fileContent.split('\n');
  const startRe = new RegExp(`docs::start:${anchor}\\s*$`);
  const endRe = new RegExp(`docs::end:${anchor}\\s*$`);
  const start = lines.findIndex((l) => startRe.test(l));
  const end = lines.findIndex((l) => endRe.test(l));

  if (start === -1 || end === -1 || end < start) {
    throw new Error(
      `inject-snippets: anchor "${anchor}" not found in ${relPath} ` +
        `(referenced from ${mdxPath}). Expected matching ` +
        `"// docs::start:${anchor}" and "// docs::end:${anchor}" lines.`
    );
  }

  const body = lines.slice(start + 1, end);
  const indents = body
    .filter((l) => l.trim().length > 0)
    .map((l) => (l.match(/^\s*/)?.[0].length ?? 0));
  const dedent = indents.length ? Math.min(...indents) : 0;
  return body.map((l) => l.slice(dedent)).join('\n').replace(/\s+$/, '');
}

export default function injectSnippets(fileContent, mdxPath = '<unknown>') {
  if (!fileContent.includes('{@inject:')) return fileContent;

  return fileContent.replace(DIRECTIVE, (_match, relPath, anchor) => {
    let source;
    try {
      source = readFileSync(join(repoRoot, relPath), 'utf8');
    } catch {
      throw new Error(
        `inject-snippets: cannot read "${relPath}" (referenced from ${mdxPath}). ` +
          `Paths are relative to the repo root, e.g. examples/snippets.go.`
      );
    }

    const code = extractAnchor(source, anchor, relPath, mdxPath);
    const lang = LANG_BY_EXT[extname(relPath)] ?? '';
    const title = `${relPath} · ${anchor}`;
    const sourceUrl = `${GITHUB_BLOB}/${relPath}`;

    // Reference link under the block; the code itself comes verbatim from the
    // compile-tested source.
    return (
      '```' + lang + ` title="${title}"\n` +
      code +
      '\n```\n' +
      `<small>Source: [${relPath}](${sourceUrl}) — compiled in CI.</small>`
    );
  });
}
