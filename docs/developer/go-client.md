---
sidebar_position: 11
slug: go-client
title: Querying a Node from Go
---

# Querying a Node from Go

This guide shows how to talk to a Zenon node from Go using the JSON-RPC
client that ships with `go-zenon`. Every code block below is injected from
the [`examples/`](https://github.com/0x3639/docs/tree/main/examples) Go
module, which is compiled in CI against the pinned `go-zenon` revision — so
the snippets here always reflect code that actually builds.

## Parsing an address

Zenon addresses are bech32 strings beginning with `z1`. `types.ParseAddress`
decodes and validates one, returning an error if the checksum or prefix is
wrong:

{@inject: examples/snippets.go#parse-address}

## Connecting and querying

Open a websocket connection to a node and call a read method. Here we fetch
the frontier (latest) momentum — the head of the momentum chain:

{@inject: examples/snippets.go#connect-and-query}

The `Call` / `CallContext` methods take a pointer to unmarshal the result
into, the method name, and any positional parameters.

## Calling an embedded contract

Embedded-contract methods work the same way — pass the method name and its
positional parameters. Here we read an address's available plasma from the
plasma contract:

{@inject: examples/snippets.go#query-plasma}

See the [API Playground](/api-playground) for the full set of methods and the
[JSON-RPC reference](/reference) for their schemas. To build, sign, and send a
transaction, continue to [Your First Transaction](/developer/first-transaction).
