---
sidebar_position: 8
slug: first-transaction
title: Your First Transaction
---

# Your First Transaction

This guide walks through sending ZNN in Go: deriving a key pair, building and
signing a send block, and — the step that trips up newcomers — **receiving**
on the other side. It assumes you have read [The Dual Ledger](/developer/dual-ledger),
because a transfer here is two blocks on two account-chains, not one.

Every code block below is injected from the compile-tested
[`examples/`](https://github.com/0x3639/docs/tree/main/examples) module.

## 1. Derive a key pair

Your address is derived from your mnemonic's BIP-39 seed at Zenon's coin type
(`73404`). The key pair carries the public key and the derived address used to
sign and identify your account-chain:

{@inject: examples/snippets.go#derive-keypair}

:::caution
Treat the seed and private key as secrets. Never hard-code a real mnemonic into
source or commit it — load it from a secure store at runtime.
:::

## 2. Build and sign the send block

A transfer starts as a **send block** on *your own* account-chain. Set the
recipient, amount (in the token's smallest unit — 10^8 per ZNN), and token
standard, then compute the hash and sign it:

{@inject: examples/snippets.go#build-sign-send}

Before signing a real block you must fill the chain-state fields the example
leaves zero:

- `PreviousHash` and `Height` come from your account-chain's **frontier** block
  (height 0 and the zero hash if this is your very first block).
- `MomentumAcknowledged` is the identifier of a recent momentum, e.g. the
  frontier momentum from [`ledger.getFrontierMomentum`](/reference).

You also need **plasma** to publish: either fuse QSR to the address ahead of
time, or attach a proof-of-work nonce. Use
[`embedded.plasma.getRequiredPoWForAccountBlock`](/reference) to find out how
much work a given block needs. Once the block is complete and signed, publish
it with `ledger.publishRawTransaction`.

## 3. Receive on the other side

The recipient is **not** credited when your send block commits. The funds wait
as an *unreceived* transfer until the recipient publishes a **receive block**
on their own account-chain referencing your send block's hash. Check what is
waiting for an address with:

{@inject: examples/snippets.go#list-unreceived}

For each unreceived send, the recipient builds a receive block (`blockType`
user-receive) whose `fromBlockHash` is the send block's hash, then signs and
publishes it exactly as in step 2. Only after that receive block commits does
the balance update.

:::tip
Most wallets receive automatically, so you rarely build receive blocks by hand —
but if a transfer "didn't arrive," an unreceived send block waiting for its
receive is almost always why.
:::

## Try it without code

You can call every method named above against a public node — no signing
required for the read methods — in the [API Playground](/api-playground), and
browse their request/response schemas in the [JSON-RPC reference](/reference).
