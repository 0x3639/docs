---
sidebar_position: 8
slug: consensus
title: Consensus
---

# Zenon Consensus Algorithm

## Introduction

Zenon (Alphanet) uses a delegated Proof-of-Stake (dPoS) approach as a placeholder consensus mechanism. In each cycle, a group of staked nodes called “Pillars” take turns producing blocks, using a strict production schedule to prevent conflicts. Pillars are weighted by the stake they receive from user delegations, enabling higher-staked Pillars to produce blocks more frequently while still allowing less frequent opportunities for lower-staked Pillars.

Looking further ahead, Zenon’s roadmap includes transitioning to a high-performance, leaderless consensus based on [Narwhal and Tusk (N&T)](https://arxiv.org/pdf/2105.11827). This next-generation system aims to significantly improve scalability, fault tolerance, and transaction throughput.

---

## Delegated Proof-of-Stake Consensus

### Why We Need Consensus

In any blockchain, the goal of consensus is to ensure that all honest participants agree on the order of transactions and that these transactions remain available and verifiable by everyone. Zenon currently uses a delegated Proof-of-Stake mechanism as a “placeholder” until it transitions to a more advanced, leaderless system in the future.

### Core Idea: Pillars as Block Producers

• Zenon’s network features special nodes called “Pillars.”  
• Pillars hold stake, either their own or delegated from other users and this stake influences how often they get to produce blocks.  
• By default, the scheduling algorithm selects producers from two pools each: the top 30 staked pillars, which get more frequent turns, and the remaining pillars, which are chosen less often.

### How Blocks Get Produced

1. Time is divided into intervals (ticks). Each tick has assigned Pillars, one Pillar at a time, to produce blocks.  
2. The chosen Pillar is responsible for creating a new block (called a “momentum”) to be added to the blockchain.  
3. The system ensures Pillars with the most stake produce blocks more often, but Pillars outside the top 30 also produce blocks at random, but less frequently.

### Scheduling and Order

• Before each tick, an “election manager” calculates which Pillars are scheduled to produce blocks.  
• When it’s a Pillar’s turn (for a short time slot), other nodes expect that Pillar to produce a valid block.  
• If the block is valid, it gets added to the chain, extending Zenon’s shared “ledger” of transactions.

### Earning Rewards

• Pillars who produce valid blocks receive rewards.  
• Users who delegate stake to these Pillars also share in those rewards proportionally.  
• The more frequently a Pillar produces blocks, the greater its reward potential.

### Reliability and Security

Zenon’s current setup provides a clear schedule that prevents most conflicts over who should produce the next block. Since everyone anticipates which Pillar is next, it’s straightforward to check whether a new block was created by the correct producer.

---

## Phase I Transition: Narwhal & Tusk Consensus 

While Zenon currently employs a dPoS like consensus algorithm, the Phase I roadmap envisions a transition to a leaderless consensus system influenced by [Narwhal and Tusk (N&T)](https://arxiv.org/pdf/2105.11827). This next-gen approach dissolves the typical notion of “leadership” or “block producers” at fixed intervals and instead relies on:

• A transaction layer (Narwhal "inspired") for efficient data propagation.  
• A fully-asynchronous, wait-free consensus algorithm (Tusk) that uses a "random coin" to provide asynchronous consensus. Tusk also helps Narwhal remain live under DDoS and asynchronous attacks.

By separating transaction dissemination from ordering, Zenon aims to achieve:

• Massive throughput (100,000 TPS or more).  
• Quick finality despite temporary byzantine or network failures.  
• Decentralized fairness, with no single leader for malicious actors to target.

Implementing a distributed random coin that is secure, efficient, and robust under real-world conditions is complex. It requires strong cryptographic foundations and careful protocol design to ensure that no single party can control or bias the randomness. As of this writing no network has implemented this feature in production.

Initial "out of the box" performance metrics reported from the Narwhal & Tusk whitepaper can be seen below.

![Narwhal and Tusk Performance Metrics](/img/narwhal-tusk-graph-1.png)

![Narwhal and Tusk Performance Metrics](/img/narwhal-tusk-graph-2.png)
