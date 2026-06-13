---
sidebar_position: 13
slug: plasma
title: Plasma
---

# Plasma

Zenon is feeless: appending a block to your account-chain does not cost a
transaction fee. Instead it costs **plasma**, a renewable resource you obtain by
fusing QSR or by doing a small proof of work. Plasma is what replaces the fee
market that single-chain networks rely on.

## How you get plasma

There are two ways to cover a block's plasma requirement:

1. **Fuse QSR.** Locking QSR to an address grants that address plasma
   proportional to the fused amount. The QSR is not spent — it stays locked and
   can be reclaimed later by cancelling the fusion. This is the steady-state
   option for active accounts. See [Fusing Plasma](/developer/fuse-plasma).
2. **Proof of work.** For one-off transactions you can attach a proof-of-work
   nonce to a block instead, trading a little CPU time for the missing plasma.
   See [Generating Proof of Work](/developer/generate-pow).

Most blocks use fused plasma; proof of work is the fallback when an address has
none.

## Reading an address's plasma

The plasma contract reports an address's current and maximum plasma and the QSR
fused to it:

{@inject: examples/snippets.go#query-plasma}

Before sending a block you can ask exactly how much a given block will need —
and how much proof-of-work difficulty would cover any shortfall — with
[`embedded.plasma.getRequiredPoWForAccountBlock`](/reference). `currentPlasma`
is what is available right now (after subtracting the plasma already held by
your unconfirmed blocks); `maxPlasma` is what your fused QSR converts to in
total.

See the [plasma contract methods](/reference) for the full surface, or try them
in the [API Playground](/api-playground).
