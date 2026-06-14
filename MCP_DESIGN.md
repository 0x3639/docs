# MCP server — design note

Design-only (per Workstream B, Phase B5). Implementation lives in a separate
repo; this note records the intended shape so it can be built later.

## Goal

Expose the Zenon JSON-RPC API to AI agents as a Model Context Protocol (MCP)
server, generated from `specs/openrpc.json` so it never drifts from the spec.

## Shape

- **One MCP tool per OpenRPC method.** Tool name = the method name
  (`embedded.plasma.get`), description = the method `summary`/`description`,
  input schema = the method's `params` as a JSON Schema object (positional
  params mapped to named properties), output described by the `result` schema.
- **Transport to the node.** Each tool POSTs a JSON-RPC request to a configured
  read-only node URL (default the public node in the spec's `servers`). Reuse
  the conformance test's request-building logic.
- **Read-only by default.** Exclude state-changing methods
  (`ledger.publishRawTransaction`) and websocket subscriptions from the tool set
  (the same allowlist the conformance test uses), or gate them behind an
  explicit opt-in flag.
- **Examples as few-shot.** Surface each method's captured `examples` request as
  the tool's example input, so agents get a working call shape.

## Generation

A build step reads `specs/openrpc.json` and emits the tool definitions; the
server is regenerated whenever the spec is regenerated. No tool is hand-written,
mirroring how the playground (`src/data/openrpcMethods.js`) and the conformance
test already consume the spec.

## Open questions

- Whether to ship one tool per method (~73 tools) or a single `call` tool that
  takes a method name + params (smaller surface, less discoverable).
- Auth / rate-limiting when pointed at a shared public node.
- Packaging (standalone binary vs npm) and where the separate repo lives.
