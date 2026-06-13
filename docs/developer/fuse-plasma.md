---
sidebar_position: 16
slug: fuse-plasma
title: Fusing Plasma
---

# Fusing Plasma

Fusing locks QSR to an address so that address has standing
[plasma](/developer/plasma) to publish blocks without proof of work. The QSR is
not spent — it stays locked and can be reclaimed later by cancelling the fusion.
This is the steady-state way to keep an active account funded with plasma.

## Encoding the Fuse call

Fusing is a call to the plasma [embedded contract](/developer/embedded-contracts):
you send QSR to the contract with `Data` set to an ABI-encoded `Fuse(address)`
call, where the address is the **beneficiary** whose plasma the fused QSR backs
(often your own address, but it can be any address):

{@inject: examples/snippets.go#encode-fuse}

## Sending the fusion

Put that `data` into a send block addressed to the plasma contract
(`types.PlasmaContract`), with:

- `Amount` = the QSR to fuse (in its smallest unit, 10^8 per QSR),
- `TokenStandard` = `types.QsrTokenStandard`,
- `Data` = the encoded `Fuse` call above.

Then build, sign and publish it like any other send block (see
[Your First Transaction](/developer/first-transaction)). After it is processed,
the beneficiary's plasma reflects the fused amount — verify with
[`embedded.plasma.get`](/reference) or in the
[API Playground](/api-playground).

## Reclaiming

A fusion can be cancelled once its `expirationHeight` is reached, returning the
locked QSR. The fusion entries an address owns — with their ids and expiration
heights — are listed by
[`embedded.plasma.getEntriesByAddress`](/reference); cancelling uses the
contract's `CancelFuse(id)` method, encoded the same ABI way as `Fuse` above.
