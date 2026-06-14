// Resolve {@inject: examples/<file>#<anchor>} directives in the generated
// llms.txt / llms-full.txt. docusaurus-plugin-llms reads raw source, so the
// directives survive into its output; this runs after `docusaurus build`
// (chained in the npm build script) and pastes in the real snippet code, the
// same way the site pages get it. Throws (fails the build) on a bad anchor.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import injectSnippets from '../src/remark/inject-snippets.mjs';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'build');
let resolved = 0;

for (const f of ['llms.txt', 'llms-full.txt']) {
  const p = join(outDir, f);
  if (!existsSync(p)) continue;
  const before = readFileSync(p, 'utf8');
  const after = injectSnippets(before, p);
  if (after !== before) {
    writeFileSync(p, after);
    resolved++;
  }
}

console.log(`resolve-llms-injects: processed ${resolved} file(s) in ${outDir}`);
