---
sidebar_position: 14
slug: embedded-contracts
title: Embedded Contracts
---

# Embedded Contracts

Zenon has no general-purpose smart-contract VM. Instead a fixed set of
**embedded contracts** is built into the protocol, each living at a well-known
address and implementing one piece of network functionality: Pillar, Plasma,
Token, Stake, Sentinel, Swap, Accelerator, Spork, HTLC, Bridge and Liquidity.

## Reading contract state

Every embedded contract exposes read methods under its
`embedded.<contract>.*` JSON-RPC namespace. They behave like any other read
call — pass the method name and its positional parameters:

{@inject: examples/snippets.go#query-plasma}

The full set of namespaces and methods is in the
[JSON-RPC reference](/reference) and the [API Playground](/api-playground).

## Calling a contract

You interact with an embedded contract by sending it an account block whose
`Data` is an **ABI-encoded method call** (and, where the method moves value, a
non-zero `Amount` and token standard). go-zenon compiles each contract's ABI
into the binary, so you encode a call with the contract's `PackMethod`. For
example, the plasma contract's `Fuse` method, which locks QSR to grant plasma to
a beneficiary:

{@inject: examples/snippets.go#encode-fuse}

That `data` becomes the `Data` field of a send block addressed to the contract
(here `types.PlasmaContract`), built and signed exactly as in
[Your First Transaction](/developer/first-transaction). Concrete walkthroughs:
[Fusing Plasma](/developer/fuse-plasma).

## Where the contracts live

Each contract has a fixed address (for example the plasma contract is
`z1qxemdeddedxplasmaxxxxxxxxxxxxxxxxsctrp`). The deterministic, recognizable
`...emdedded...` addresses are part of the genesis configuration and never
change.
