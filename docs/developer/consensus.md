---
sidebar_position: 8
slug: consensus
title: Consensus
---

# Zenon Consensus Algorithm

## Introduction

Zenon (Alphanet) employs a “placeholder” consensus mechanism that closely resembles a delegated Proof-of-Stake (dPoS) model, where a group of staked nodes called “pillars” take turns producing blocks. By defining a strict producer schedule, the network generally ensures that only one pillar is responsible for block production at any given time, thereby enhancing both security and efficiency. This systematic approach reduces conflicts over block generation and streamlines the validation process.

1. The network consists of multiple nodes called “pillars.”  
2. Time is divided into intervals (“ticks”), with each interval determining which pillar is responsible for producing the next block (or “momentum”).  
3. An “election” process schedules pillars in advance, ensuring that the producer order is both fair and transparent.  
4. Users delegate stake to pillars, boosting a pillar’s “weight.” Pillars with higher weight are more likely to be chosen to produce blocks.  
5. A portion of pillars are selected randomly, allowing lower-ranked pillars to participate occasionally.

Under this model, most block-production duties go to the best-staked pillars, but lower-staked pillars still have a chance to produce blocks in every election period. By delegating stake to a pillar, users help increase its ranking. Those pillars that make it into the active set (defined by the `NodeCount` parameter, currently 30) gain a direct share of the block-production schedule and can earn additional rewards.

Looking farther ahead, Zenon’s roadmap anticipates a transition from dPoS to a high-performance, leaderless consensus system inspired by [Narwhal and Tusk (N&T)](https://arxiv.org/pdf/2105.11827). This evolution will improve scalability, fault tolerance, and transaction throughput (discussed below).

---

## Technical Explanation

Below is a more in-depth look at how Zenon’s current consensus mechanism operates:

### Core Structures

1. The “consensus” object  
   - Holds references to critical components:  
     • The blockchain state (`chain.Chain`)  
     • The election manager (`electionManager`), which decides pillar scheduling  
     • Points (`Points`), which track producer statistics and historical data  
     • A logger, a synchronization wait group, and a “closed” channel to handle shutdown signals  

2. The “electionManager”  
   - Uses chain data, pillar weights, and delegation info to produce a schedule of blocks.  
   - Exposes methods such as `ElectionByTime` and `ElectionByTick` to retrieve the next set of producers.

3. The “work” goroutine in consensus (the `cs.work` function)  
   - Starts after the chain’s genesis time has elapsed.  
   - Periodically checks the current scheduling “tick,” pulls the election data for that tick, and broadcasts the upcoming block producers.

### How Scheduling and Production Work

1. At the start of each new “tick,” the `electionManager` compiles a list of the top pillars plus some additional pillars at random (if `RandCount` > 0).  
2. The consensus module calculates exact time slots (`startTime` and `endTime`) for each selected pillar.  
3. As time progresses, code waits for each pillar’s scheduled `startTime`, then broadcasts a “producer event,” indicating which pillar should create a momentum.  
4. Once a pillar produces its block, consensus checks whether the producer is correct by comparing the block’s recorded address against the one scheduled in the election manager.

### Rewards for Pillars (Including Non-Top 30)

• In this placeholder dPoS model, block rewards and delegation rewards are calculated at the end of each block (and more comprehensively per epoch).  
• The logic in ‹vm/embedded/implementation/pillars.go› shows how the system calculates:  
  - `DelegationReward`: Proportional to how many blocks that pillar produced, how many blocks it was expected to produce, and how much stake is delegated.  
  - `BlockReward`: Tied to the actual number of blocks produced.  
• Because `RandCount` may allow “non-top” pillars to appear in the schedule, these pillars can sometimes produce blocks and thus earn rewards, even if they do not rank in the top `NodeCount`.

In short, only pillars that produce blocks receive direct block-production rewards. However, the higher your stake (and hence ranking), the more often you are selected—meaning more opportunities to produce and earn. If you are outside the top tier, the random subset might still provide an occasional opportunity to produce blocks and collect rewards.

### Important Configurations

• `constants.ConsensusConfig.BlockTime` – Interval in seconds between consecutive blocks  
• `constants.ConsensusConfig.NodeCount` – Number of pillars deterministically chosen per tick (currently 30)  
• `constants.ConsensusConfig.RandCount` – Number of randomly chosen pillars that get to produce blocks in that same tick  
• `EpochDuration` – 24 hours, used to define the length of an “epoch” for larger reward tracking  

### Lifecycle of Consensus

1. Initialization  
   - The consensus struct is created, pointing to chain state, an election manager, etc.  
   - The chain “registers” the `points` and `electionManager` modules to receive block notifications.  

2. Operation  
   - Once time has passed beyond the genesis block’s timestamp, the consensus loop enters a repeating cycle:  
     • Determine the current scheduling tick.  
     • Fetch the producers from the `electionManager`.  
     • Broadcast events for each pillar’s assigned time slice.  

3. Verification  
   - When a newly produced block arrives, the consensus engine verifies that the block’s “producer” field matches the scheduled producing pillar.  

4. Shutdown  
   - The code calls `Stop()`, closes the consensus “closed” channel, and unregisters the modules.

---

## Phase I Transition: Leaderless, DAG-Based Consensus (N&T)

While Zenon currently employs a dPoS-like algorithm with `NodeCount` and `RandCount` pillars, the Phase I roadmap envisions a transition to a leaderless consensus system influenced by [Narwhal and Tusk (N&T)](https://arxiv.org/pdf/2105.11827). This next-gen approach dissolves the typical notion of “leadership” or “block producers” at fixed intervals and instead relies on:

• A DAG-based transaction layer (Narwhal) for extremely efficient data propagation.  
• A succinct, partially synchronous ordering layer (Tusk) that finalizes transactions quickly and robustly.

By separating transaction dissemination from ordering, Zenon aims to achieve:

• Massive throughput (100,000 TPS or more).  
• Quick finality despite temporary byzantine or network failures.  
• Decentralized fairness, with no single leader for malicious actors to target.
