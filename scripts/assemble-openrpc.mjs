// Merges specs/openrpc/*.yaml into specs/openrpc.json, validates it,
// and copies it to static/openrpc.json for publishing.
import { readFileSync, writeFileSync, readdirSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { validateOpenRPCDocument } from '@open-rpc/schema-utils-js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const specDir = join(root, 'specs', 'openrpc');
const pinLines = readFileSync(join(root, 'PINNED_GO_ZENON'), 'utf8').trim().split('\n');
const pin = Object.fromEntries(pinLines.map(l => l.split('=')));

const doc = {
  openrpc: '1.2.6',
  info: {
    title: 'Zenon Network JSON-RPC API',
    version: pin.ref.slice(0, 12),
    description: 'JSON-RPC 2.0 API of go-zenon. Hand-authored from the pinned source (godoc-verified); examples captured from a live public node. Namespaces covered so far: ledger, embedded.pillar.',
  },
  servers: [{ name: 'public', url: 'https://my.hc1node.com:35997' }],
  methods: [],
  components: { schemas: {} },
};

const addSchemas = (schemas, from) => {
  for (const [name, schema] of Object.entries(schemas || {})) {
    if (doc.components.schemas[name]) throw new Error(`duplicate schema ${name} (from ${from})`);
    doc.components.schemas[name] = schema;
  }
};

for (const f of readdirSync(specDir).filter(f => f.endsWith('.yaml')).sort()) {
  const frag = parse(readFileSync(join(specDir, f), 'utf8'));
  if (frag.methods) doc.methods.push(...frag.methods);
  addSchemas(frag.schemas, f);
}
for (const f of readdirSync(join(specDir, 'components')).filter(f => f.endsWith('.yaml'))) {
  addSchemas(parse(readFileSync(join(specDir, 'components', f), 'utf8')).schemas, `components/${f}`);
}

const names = new Set();
for (const m of doc.methods) {
  if (names.has(m.name)) throw new Error(`duplicate method: ${m.name}`);
  names.add(m.name);
}

// validateOpenRPCDocument is synchronous in @open-rpc/schema-utils-js 2.2.1:
// it returns true or an OpenRPCDocumentValidationError object.
const result = validateOpenRPCDocument(doc);
if (result !== true) { console.error(result); process.exit(1); }

writeFileSync(join(root, 'specs', 'openrpc.json'), JSON.stringify(doc, null, 2) + '\n');
copyFileSync(join(root, 'specs', 'openrpc.json'), join(root, 'static', 'openrpc.json'));
console.log(`assemble-openrpc: ${doc.methods.length} methods, ${Object.keys(doc.components.schemas).length} schemas, valid OpenRPC ${doc.openrpc}`);
