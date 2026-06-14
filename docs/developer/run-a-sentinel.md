---
sidebar_position: 19
slug: run-a-sentinel
title: Running a Sentinel
---

# Running a Sentinel

Sentinels are the second tier of network infrastructure below
[pillars](/developer/run-a-pillar). They help relay data and, like pillars, earn
a share of each epoch's rewards in exchange for a collateral commitment.

## What you need

- A fully-synced [node](/developer/run-a-node) you control.
- **Collateral**: **5,000 ZNN** plus a **50,000 QSR** deposit, held by the
  owner address.

Unlike a pillar, a sentinel has no dynamic registration cost and does not
produce momentums — both amounts above are fixed.

## Register

Registration is a wallet action: using a wallet such as Syrius or `znn-cli`,
call the [Sentinel embedded contract](/developer/embedded-contracts)'s
`Register` method from the owner address, supplying the 5,000 ZNN and 50,000 QSR.
Once it commits, the sentinel becomes active and starts accruing rewards.

## Check status

Read a sentinel's registration by owner address:

{@inject: examples/snippets.go#query-sentinel}

`active` reflects whether the registration is live; `isRevocable` and
`revokeCooldown` indicate when it may be revoked. Active sentinels are also
listed by [`embedded.sentinel.getAllActive`](/reference).

## Rewards and revocation

Sentinels earn a fixed share of each epoch's network rewards (a percentage of
the per-epoch ZNN and QSR emission). Track and collect them with
[`embedded.sentinel.getUncollectedReward`](/reference). After its locked window,
a sentinel can be revoked to return the ZNN and QSR collateral.

See the full sentinel method set in the [JSON-RPC reference](/reference) or try
it in the [API Playground](/api-playground).
