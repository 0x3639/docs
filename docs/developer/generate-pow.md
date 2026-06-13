---
sidebar_position: 15
slug: generate-pow
title: Generating Proof of Work
---

# Generating Proof of Work

When an address has no fused plasma (or not enough for a particular block), you
can cover the shortfall with **proof of work** instead — a short CPU search that
buys the block its plasma. This is the one-off alternative to
[fusing QSR](/developer/fuse-plasma); see [Plasma](/developer/plasma) for the
trade-off.

## How much work is needed

Ask the plasma contract how much a specific block requires with
[`embedded.plasma.getRequiredPoWForAccountBlock`](/reference). It returns the
block's `basePlasma`, the `availablePlasma` the address already has, and the
`requiredDifficulty` — the proof-of-work difficulty that covers the gap (`0` if
fused plasma already suffices).

## Mining and attaching the nonce

Given that difficulty, mine the nonce and attach it to the block before signing:

{@inject: examples/snippets.go#generate-pow}

`GetPoWNonce` blocks while it searches, and the time grows with difficulty, so
do it on a background goroutine in interactive applications. Once the nonce and
difficulty are set, compute the hash, sign, and publish the block as in
[Your First Transaction](/developer/first-transaction). The node re-checks the
nonce against the difficulty when it verifies the block.
