// Conformance test: replay every example request in the OpenRPC spec against a
// live node and validate the response against that method's result schema. This
// catches the spec drifting from the node's actual behaviour (renamed fields,
// changed types, removed methods) — something the build cannot see.
//
// Usage:   ZENON_NODE_URL=https://my.hc1node.com:35997 node scripts/conformance-test.mjs
//          (defaults to the spec's first server; set VERBOSE=1 to list skips)
//
// Exit codes: 0 all tested methods conform; 1 one or more failed; 2 the node
// was unreachable for every request (infrastructure, not a spec failure).
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const doc = JSON.parse(readFileSync(join(root, 'specs', 'openrpc.json'), 'utf8'));
const NODE_URL =
  process.env.ZENON_NODE_URL || doc.servers?.[0]?.url || 'https://my.hc1node.com:35997';

// Methods that cannot be conformance-tested by a single stateless HTTP request.
// Websocket subscriptions (x-transport: websocket) are skipped automatically.
const ALLOWLIST = new Set([
  'ledger.publishRawTransaction', // state-changing: would broadcast a transaction
  'embedded.htlc.getById',        // example is a not-found case; HTLCs are short-lived, none live
]);

const ajv = new Ajv({ strict: false, allErrors: true });
ajv.addSchema(doc, 'openrpc');

const pass = [];
const fail = [];
const skip = [];
let networkErrors = 0;
let attempted = 0;

const post = async (method, params) => {
  const res = await fetch(NODE_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  return res.json();
};

for (let i = 0; i < doc.methods.length; i++) {
  const m = doc.methods[i];

  if (m['x-transport'] === 'websocket' || ALLOWLIST.has(m.name)) {
    skip.push(`${m.name} (allowlisted)`);
    continue;
  }
  const example = m.examples?.[0];
  if (!example) {
    skip.push(`${m.name} (no example)`);
    continue;
  }
  if (!example.result || example.result.value === undefined) {
    skip.push(`${m.name} (request-only example)`);
    continue;
  }

  const params = (example.params || []).map((p) => p.value);
  attempted++;

  let body;
  try {
    body = await post(m.name, params);
  } catch (e) {
    networkErrors++;
    fail.push(`${m.name}: node request failed: ${e.message}`);
    continue;
  }

  if (body.error) {
    fail.push(`${m.name}: node returned error ${JSON.stringify(body.error)}`);
    continue;
  }

  const validate = ajv.compile({ $ref: `openrpc#/methods/${i}/result/schema` });
  if (validate(body.result)) {
    pass.push(m.name);
  } else {
    fail.push(`${m.name}: result does not match schema: ${ajv.errorsText(validate.errors)}`);
  }
}

console.log(
  `conformance @ ${NODE_URL}: ${pass.length} passed, ${fail.length} failed, ${skip.length} skipped`
);
for (const f of fail) console.error(`  FAIL ${f}`);
if (process.env.VERBOSE) for (const s of skip) console.log(`  skip ${s}`);

// Every attempted request failed at the network layer → treat as infrastructure
// (exit 2), not a spec conformance failure.
if (attempted > 0 && networkErrors === attempted) {
  console.error(`\nnode ${NODE_URL} was unreachable for all ${attempted} requests`);
  process.exit(2);
}
process.exit(fail.length ? 1 : 0);
