---
sidebar_position: 12
slug: momentums
title: Momentums
---

# Momentums

A **momentum** is Zenon's global block. While each account has its own chain
(see [The Dual Ledger](/developer/dual-ledger)), momentums are the single,
totally-ordered chain that ties the whole lattice together and gives it
finality.

## What a momentum does

Each momentum references the account blocks produced since the previous one and
is itself produced by a pillar in the consensus rotation. Together they provide:

- **Global ordering.** Account blocks are only loosely ordered on their own
  chains; the momentum that includes them fixes their place in global history.
- **Finality.** Once an account block is referenced by a committed momentum, and
  that momentum is followed by further momentums, it is settled.
- **A time and height reference.** Account blocks anchor themselves to a
  momentum they have seen (`momentumAcknowledged`), and many embedded-contract
  rules (epochs, reward windows, cooldowns) are measured in momentum height or
  the genesis-relative timestamp.

The head of the momentum chain is the **frontier momentum**. Read methods
resolve against the frontier at the time of the call.

## Reading momentums

Fetch a page of momentums from the chain:

{@inject: examples/snippets.go#get-momentums}

The related methods are listed under the `ledger` namespace — `getFrontierMomentum`,
`getMomentumsByHeight`, `getMomentumBeforeTime`, `getDetailedMomentumsByHeight`
(which also returns the account blocks inside each momentum). Browse them in the
[JSON-RPC reference](/reference) or try them in the
[API Playground](/api-playground).
