---
sidebar_position: 7
slug: dual-ledger
title: The Dual Ledger
---

# The Dual Ledger

Zenon's ledger is not a single chain of blocks. It is a **block lattice**: every
account owns its own chain, and a single **momentum chain** periodically
notarizes them all. Understanding this split is the key to everything else —
especially why a transfer is a *two-step* operation.

## Account-chains and the momentum chain

- **Account-chain.** Each address has its own chain of account blocks. Only the
  account's owner can append to it, and each block links to the previous one by
  hash (`previousHash`) and to a momentum it has observed
  (`momentumAcknowledged`). Because chains are per-account, unrelated accounts
  transact in parallel without contending for a global block.
- **Momentum chain.** Momentums are the global backbone. Each momentum
  references the account blocks produced since the last one, giving the whole
  lattice a single, totally-ordered history and a notion of finality. A
  momentum is the closest thing Zenon has to a "block" in the single-chain
  sense — see the [`ledger.getFrontierMomentum`](/reference) method.

The **frontier** of an account-chain is its most recent block; the frontier
momentum is the head of the momentum chain. Read methods in the API operate
against the frontier state at the moment of the call.

## A transfer is send, then receive

This is the part that surprises everyone arriving from account-balance chains.
On Zenon, moving value takes **two blocks on two different account-chains**:

1. **Send.** The sender appends a *send block* to **their own** account-chain
   (`blockType` user-send). This debits the sender immediately and records the
   recipient and amount.
2. **Receive.** The funds are **not** credited to the recipient until the
   recipient appends a *receive block* to **their own** account-chain,
   referencing the send block's hash (`fromBlockHash`). Until then the transfer
   is *unreceived*.

A consequence: an address can have value sent to it while it is completely
offline, and that value simply waits as an unreceived transfer until the owner
comes online and receives it. You can list what is waiting:

{@inject: examples/snippets.go#list-unreceived}

Wallets usually automate the receive step so it is invisible, but at the
protocol level it is always there. Any tool that "sends" ZNN and expects the
balance to appear on the other side without a receive block is wrong about how
the ledger works.

## Why it is built this way

Per-account chains are what let Zenon be feeless and parallel: there is no
global block to bid for, so there is no fee market. Instead, appending a block
costs **plasma**, which you obtain by fusing QSR or by doing a small proof of
work — not by paying a transaction fee.

To actually build, sign, and send a transfer, see
[Your First Transaction](/developer/first-transaction).
