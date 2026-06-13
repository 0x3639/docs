# Workstream B — docs-site spec (OpenRPC, playground, guides, AI)

This spec is for work done **in this repo** (`0x3639/docs`, the Docusaurus
site behind docs.0x3639.com). Workstream A — godoc-commenting all of
go-zenon — is **complete**: every exported symbol is documented and
`golangci-lint run ./...` is clean across the go-zenon repo. This document
covers everything that remains, none of which is go-zenon commenting.

Written 2026-06-13. Branch for this work: `feat/go-zenon-reference`
(already has the generation pipeline). Keep it separate; do not assume a
merge schedule.

---

## 0. The one invariant you must not break

`PINNED_GO_ZENON` pins **`github.com/0x3639/go-zenon` at a SHA on the
`docs/godoc` branch** — currently `6bed245…`. That branch carries all the
godoc comments. **go-zenon `master` deliberately has NO godoc comments**
(it tracks upstream zenon-network cleanly, by the maintainer's decision).

→ Never "correct" the pin to point at master or upstream: the generated
package reference would come back empty. To advance the reference, bump
`ref=` to a newer `docs/godoc` head, then `npm run gen` and commit the
regenerated `specs/openrpc.json` + `static/openrpc.json`. See MAINTAINERS.md.

---

## 1. Current state (what already exists here)

**Generation pipeline (done, working):**
- `PINNED_GO_ZENON` + `scripts/fetch-go-zenon.sh` → shallow-clones the pinned
  go-zenon into `.build/go-zenon`.
- `scripts/gen-godoc.sh` → gomarkdoc over the `PACKAGES` list → 39 Markdown
  package pages under `docs/reference/packages/` (gitignored, regenerated).
- `scripts/assemble-openrpc.mjs` → merges `specs/openrpc/*.yaml` →
  validated `specs/openrpc.json` (+ copy to `static/openrpc.json`).
- `npm run gen` runs all three; `validate.yml` and `deploy.yml` run it in CI.
- 39 reference pages render; the whole go-zenon API + internals are browsable.

**The RPC API is described in TWO places that disagree — this is the core
problem to solve:**

| Artifact | Coverage | Quality | Role |
|---|---|---|---|
| `specs/openrpc.json` (from `specs/openrpc/*.yaml`) | 2 namespaces, **25 methods** (`ledger`, `embedded.pillar`) | **code-verified** against go-zenon, real captured examples | machine-readable; served at `/openrpc.json` |
| `src/data/apiMethods.js` (`API_METHODS`) | 14 namespaces, **79 methods** (all of them) | hand-maintained, **accuracy unverified** | drives the live playground at `/api-playground` |

**The playground** (`src/components/APIPlayground/` + `src/pages/api-playground.js`
+ `src/contexts/WebSocketContext.js`) is hand-rolled and reads
`apiMethods.js`, NOT `openrpc.json`. `APIMethodSelector` lists namespaces,
`ParameterBuilder` builds the param form, `RequestResponseViewer` shows the
JSON-RPC call/response over a websocket connection.

**Example node:** `https://my.hc1node.com:35997` (public, read-only;
JSON-RPC 2.0 over HTTPS). Used to capture real `examples` in the YAML
fragments. Verified working as of the spec date.

---

## 2. Carryover principles (from Workstream A — keep these)

These made the godoc work trustworthy; apply them to the spec/guide work:

1. **Verify every claim against go-zenon source** in `.build/go-zenon`
   (the pinned, fully-commented checkout). Method params, result fields,
   sort orders, caps, nil-vs-error behavior — read the handler in
   `.build/go-zenon/rpc/api/...` and its godoc, don't guess.
2. **Never invent example responses.** Capture them live from the node
   (`curl -X POST https://my.hc1node.com:35997 -H 'content-type: application/json'
   -d '{"jsonrpc":"2.0","id":1,"method":"…","params":[…]}'`). State-changing
   methods (e.g. `ledger.publishRawTransaction`) ship request-only.
3. **Adversarial review.** After authoring a namespace or a guide, have a
   second pass verify it against code/the live node before committing.
4. **There is a bug catalogue** at go-zenon `docs/superpowers/bugs-found-2026-06-11.md`
   (on `docs/godoc`, 59 entries). If a method's documented behavior looks
   wrong, check the catalogue before assuming the docs are wrong.

---

## 3. Phases, in priority order

### Phase B1 — Expand OpenRPC to all 14 namespaces (highest value)

Author the remaining ~12 namespace fragments as code-verified OpenRPC, so
`openrpc.json` becomes the complete, rigorous source of truth.

**Namespaces still missing** (present in `apiMethods.js`, absent from the
spec): `stats`, `subscribe`, and `embedded.{plasma, sentinel, token, stake,
swap, accelerator, spork, htlc, bridge, liquidity}`.

**For each namespace:** create `specs/openrpc/<namespace>.yaml` following the
exact shape of the existing `ledger.yaml` / `embedded.pillar.yaml`:
- one `methods:` entry per RPC method (read the handler set in
  `.build/go-zenon/rpc/api/embedded/<contract>.go`; the godoc on each
  method carries its `JSON-RPC: …` name, params, caps, sort order).
- `params` + `result` schemas; `$ref` shared types from
  `specs/openrpc/components/common.yaml` (extend it with new shared schemas
  as needed — e.g. StakeEntry, FusionEntry, HtlcInfo, bridge wrap/unwrap
  types — defining them once).
- at least one `examples` pair captured live from the node.
- `apiMethods.js` is a useful **cross-reference** for the method list, but
  is NOT the source of truth — verify each method against go-zenon code.
- subscribe is websocket-only: document the methods but mark them
  `x-transport: websocket` (the `subscribe.*` methods register under the
  `ledger` namespace as `ledger.subscribe` — see the go-zenon
  rpc/api/subscribe godoc).
- `embedded.governance` is **pending** — it exists only on a go-zenon
  governance branch, not in any pinned release. Leave it out; note it.

**Acceptance:** `npm run gen` → `assemble-openrpc: <N> methods … valid
OpenRPC 1.2.6`; all 14 namespaces present; `npm run build` green; spot-check
3 namespaces' examples against the live node.

Priority sub-order (do the high-traffic ones first): `embedded.plasma` →
`embedded.token` → `embedded.stake` → `embedded.sentinel` → `stats` →
remaining embedded → `subscribe`.

### Phase B2 — Unify the playground onto openrpc.json

Once B1 covers everything, make `openrpc.json` the single source and retire
the hand-maintained duplicate.

- Refactor `APIMethodSelector` / `ParameterBuilder` to read `openrpc.json`
  (fetch `/openrpc.json` or import the committed file) instead of
  `API_METHODS`: namespaces from method-name prefixes, param forms from each
  method's `params` JSON schema, descriptions from `summary`/`description`.
- Pre-fill the param form from each method's `examples` request.
- Delete `src/data/apiMethods.js` once nothing imports it.
- Keep the existing websocket transport, the node selector (public /
  custom / localhost:35997), and the curl-envelope display.

**Acceptance:** the playground lists all 14 namespaces sourced from
`openrpc.json`; editing params and firing a read-only call against the
public node returns a live response; `apiMethods.js` is gone; build green.

### Phase B3 — Guides with compile-tested snippets

Per the original execution plan (`docs/zenon-docs-execution-plan.md` on
go-zenon `docs/godoc`, Phase 2):
- `examples/` Go module depending on go-zenon at the pinned ref, with
  `// docs::start:<anchor>` / `// docs::end:<anchor>` markers.
- a small remark plugin resolving `{@inject: examples/path.go#anchor}` in
  MDX at build time; **build fails hard** on a missing file/anchor.
- CI step: `cd examples && go build ./... && go vet ./...` so stale snippets
  break the build.
- First guides (use the existing `docs/developer/` and `docs/intro/`
  structure): run-a-node, first-transaction (explain the receive step),
  fuse-plasma, run-a-pillar; concept pages: dual-ledger, momentums, plasma,
  embedded-contracts.

### Phase B4 — Conformance CI

`scripts/conformance-test.mjs`: for every method in `openrpc.json` with an
example, POST the example request to `$ZENON_NODE_URL` and validate the
response against the `result` schema (ajv). Allowlist methods that can't run
statelessly. Run in `validate.yml` on spec changes + weekly against the
public node.

### Phase B5 — AI consumability

- `docusaurus-plugin-llms` (or equivalent) → `/llms.txt` + `/llms-full.txt`
  linking the OpenRPC spec, the package-reference index, and each guide.
- copy-page-as-markdown button; raw `.md` reachable per page.
- `AGENTS.md` at the docs repo root: build commands, the generation
  pipeline, the pin-points-at-docs/godoc invariant, "reference packages are
  generated, never hand-edit."
- Stretch / design-only: an MCP server generated from `openrpc.json` (one
  tool per method, pointed at the read-only node). Write the design doc;
  implementation is a separate repo.

### Phase B6 — Versioning, search, deploy polish

- Algolia DocSearch (apply) or `@easyops-cn/docusaurus-search-local`.
- `onBrokenLinks: 'throw'` once generated pages are stable.
- Optional Docusaurus versioning keyed to `PINNED_GO_ZENON` when go-zenon
  cuts a release.

---

## 4. Quick start (for a session opening this repo)

```bash
npm ci
npm run gen      # fetch pinned go-zenon, gomarkdoc, assemble+validate openrpc
npm run build    # full Docusaurus build; must stay green
npm start        # local dev server to see the playground / reference
# capture a real example:
curl -s -X POST https://my.hc1node.com:35997 -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"ledger.getFrontierMomentum","params":[]}'
```

Tool versions are pinned (Docusaurus 3.9.2, gomarkdoc v1.1.0,
@open-rpc/schema-utils-js 2.2.1). Don't float them. `gen-godoc.sh` exports
`GOWORK=off` internally.

---

## 5. Open decisions for the maintainer

1. **B1 vs B2 ordering** — recommended: finish B1 (full OpenRPC) before B2
   (unify playground), so the playground gains nothing but rigor and you
   delete `apiMethods.js` in one clean step. Alternative: refactor the
   playground to read whatever `openrpc.json` has now (25 methods) and grow
   it — but that temporarily *shrinks* the live playground from 79 methods,
   which users would notice. Prefer finishing B1 first.
2. **Hosting/deploy** unchanged (GitHub Pages via `deploy.yml`); decide if
   conformance + a public node URL repo-variable are wanted before B4.
3. **Scope of first guide set** — pick which guides matter most for your
   audience before investing in the snippet-injection plumbing (B3).
