# Maintaining the generated reference

The Go package reference (`docs/reference/packages/`, gitignored) and the
OpenRPC spec (`specs/openrpc.json` + `static/openrpc.json`, committed) are
built by `npm run gen` from a pinned checkout of go-zenon.

## Bumping the go-zenon pin

1. Edit `PINNED_GO_ZENON` — set `ref=` to the new 40-hex sha (usually the
   head of `docs/godoc-rpc-api`, or `docs/godoc` once layers merge there).
2. `npm run gen` — refetches, regenerates the reference pages, reassembles
   and validates the OpenRPC document.
3. Commit the pin file together with the regenerated `specs/openrpc.json`
   and `static/openrpc.json`. CI (`validate.yml`) fails PRs whose committed
   artifacts are stale.

## Adding a package to the reference

Append the import path to the `PACKAGES` array in `scripts/gen-godoc.sh`.
Only add packages whose godoc layer has landed in the pinned ref —
undocumented packages render as empty shells.

## Adding an RPC namespace to the OpenRPC spec

1. Author `specs/openrpc/<namespace>.yaml` with `methods:` (and optional
   namespace-specific `schemas:`). Source every claim from the pinned,
   godoc-verified code; capture example responses from a live node — never
   invent them.
2. Shared schemas live in `specs/openrpc/components/common.yaml`.
3. `npm run gen` merges and validates; duplicate method or schema names
   fail loudly.

Generated pages under `docs/reference/packages/` must never be hand-edited.
