---
sidebar_position: 18
slug: run-a-pillar
title: Running a Pillar
---

# Running a Pillar

Pillars are the producers that create [momentums](/developer/momentums) and run
Zenon's consensus. Running one means operating a producing node and registering
it on the [Pillar embedded contract](/developer/embedded-contracts) with
collateral.

## What you need

- A fully-synced [node](/developer/run-a-node) you control.
- **Collateral**: a fixed **15,000 ZNN** deposit plus a QSR cost that rises as
  more pillars register (base 150,000 QSR, increasing in 10,000-QSR steps).
- A unique pillar **name**, and three addresses: the **owner** (holds the
  collateral), the **producer** (signs momentums), and the **withdraw** address
  (collects rewards).

The ZNN deposit is fixed but the QSR cost is dynamic — read the current value
rather than assuming:

{@inject: examples/snippets.go#pillar-registration-cost}

You can check name availability first with
[`embedded.pillar.checkNameAvailability`](/reference).

## Configure the node to produce

A producing node signs momentums with the pillar's **producer** key. In
`config.json`, set the `Producer` section to the producer address, the key file
and its password, and the key's derivation index, then restart the node. Keep
the producer key online and the node healthy — missed momentums reduce a
pillar's rewards.

## Register

Registration is a wallet action, not a `znnd` command: using a wallet such as
Syrius or `znn-cli`, call the Pillar contract's `Register` method with the
pillar name, the producer and withdraw addresses, and the reward-sharing
percentages. The call must carry the 15,000 ZNN collateral, and the owner must
also hold the required QSR. Once it commits, the pillar appears in
[`embedded.pillar.getAll`](/reference) and begins entering the producer
rotation.

## Rewards and revocation

Pillars earn ZNN and QSR each epoch; track and collect them with
[`embedded.pillar.getUncollectedReward`](/reference). A pillar's lifetime cycles
through an ~83-day locked window followed by a ~7-day window in which it can be
revoked — `isRevocable` and `revokeCooldown` on
[`embedded.pillar.getByOwner`](/reference) tell you where it stands. Revoking
returns the ZNN collateral.

Browse the full pillar method set in the [JSON-RPC reference](/reference) or the
[API Playground](/api-playground).
