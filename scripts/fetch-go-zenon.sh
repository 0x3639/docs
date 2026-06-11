#!/usr/bin/env bash
# Clones the pinned go-zenon ref into .build/go-zenon. Idempotent.
set -euo pipefail
cd "$(dirname "$0")/.."
grep -qE '^repo=[A-Za-z0-9:/._-]+$' PINNED_GO_ZENON && grep -qE '^ref=[0-9a-f]{40}$' PINNED_GO_ZENON || { echo "FATAL: malformed PINNED_GO_ZENON" >&2; exit 2; }
eval "$(sed 's/^/PIN_/' PINNED_GO_ZENON)"   # PIN_repo, PIN_ref (eval: `source <(...)` is broken on macOS bash 3.2)
DEST=.build/go-zenon

if [[ -d "$DEST/.git" ]] && [[ "$(git -C "$DEST" rev-parse HEAD 2>/dev/null)" == "$PIN_ref" ]]; then
	echo "fetch-go-zenon: already at $PIN_ref"
	exit 0
fi
rm -rf "$DEST" && mkdir -p "$DEST"
git -C "$DEST" init -q
git -C "$DEST" fetch -q --depth 1 "$PIN_repo" "$PIN_ref"
git -C "$DEST" checkout -q FETCH_HEAD
[[ "$(git -C "$DEST" rev-parse HEAD)" == "$PIN_ref" ]] || { echo "fetch-go-zenon: HEAD != pinned ref" >&2; exit 1; }
echo "fetch-go-zenon: checked out $PIN_ref"
