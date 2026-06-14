---
sidebar_position: 17
slug: run-a-node
title: Running a Node
---

# Running a Node

`znnd` is the go-zenon full node. It syncs the momentum chain, serves the
JSON-RPC API, and — when configured as a producer — signs momentums for a
pillar. This guide covers running one and exposing its API.

## Build or install

Build from source against the Go toolchain:

```bash
git clone https://github.com/zenon-network/go-zenon
cd go-zenon
make znnd          # or: go build -o znnd ./cmd/znnd
./znnd --help
```

## Data directory and config

On first run `znnd` creates its data directory and a `config.json` inside it.
The default location is platform-specific:

| OS | Default data directory |
|---|---|
| Linux | `~/.znn` |
| macOS | `~/Library/znn` |
| Windows | `%APPDATA%\znn` |

`config.json` holds the node name, the data/wallet paths, the genesis file, and
the `Net`, `RPC` and (optional) `Producer` sections. The ports are:

| Service | Default port |
|---|---|
| P2P (peer networking) | 35995 |
| JSON-RPC over HTTP | 35997 |
| JSON-RPC over WebSocket | 35998 |

To serve the API, enable the HTTP and/or WebSocket RPC in `config.json`
(`RPC.EnableHTTP` / `RPC.EnableWS`) and list the `Endpoints` you want exposed
(for example `ledger`, `embedded`, `stats`). Subscriptions
([the `subscribe` methods](/developer/dual-ledger)) require the WebSocket
endpoint.

## Run and sync

```bash
./znnd
```

The node connects to peers and syncs from genesis to the frontier momentum. A
full sync takes a while; subsequent starts resume from local state.

## Verify it responds

Once syncing, point a client at the local WebSocket RPC and read the frontier
momentum:

{@inject: examples/snippets.go#connect-and-query}

If you get a momentum back, the node is serving the API. You can also use the
[API Playground](/api-playground) against `ws://127.0.0.1:35998`.

:::caution
The RPC hosts default to `0.0.0.0`, so an enabled RPC port is reachable from the
network. Put the node behind a firewall and only expose the RPC (and only the
endpoints you need) to trusted clients.
:::

## Next steps

A synced node is the prerequisite for producing momentums as a
[pillar](/developer/run-a-pillar) or earning as a
[sentinel](/developer/run-a-sentinel).
