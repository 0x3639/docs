---
sidebar_position: 8
slug: consensus
title: Consensus
---

### Consensus Algorithm in `go-zenon`

During Alphanet, NoM uses a delegated Proof of Stake
The `go-zenon` project implements a consensus algorithm to ensure the integrity and consistency of the blockchain. Here is a detailed explanation of the consensus algorithm and its key components.

#### Overview
The consensus mechanism in `go-zenon` is designed to coordinate the agreement among different nodes in the network on the state of the blockchain. This is crucial for maintaining a single, consistent ledger and for preventing double-spending.

#### Key Components
1. **Consensus Object**
   - The `consensus` object manages the consensus process, including the initialization, starting, and stopping of the consensus mechanism.
   - It includes components such as `chain`, `eventManager`, `electionManager`, and `points`.

2. **Election Algorithm**
   - The election algorithm determines which nodes (referred to as pillars) are selected to produce blocks (momentums) for a given epoch.
   - The algorithm considers factors such as pillar weights, randomness, and predefined configurations like `NodeCount` and `RandCount`.

3. **Pillar Management**
   - Pillars are responsible for producing blocks and are selected based on the consensus algorithm.
   - The `pillar.Manager` handles the registration and unregistration of pillars within the consensus system, ensuring that they produce blocks at the correct times.

4. **Epoch Management**
   - The consensus mechanism operates in epochs, with each epoch having a fixed duration (`EpochDuration`).
   - During each epoch, the selected pillars produce blocks according to a predefined schedule.

5. **Verification**
   - The consensus mechanism includes verification processes to ensure that the blocks produced by the pillars are valid.
   - This includes checking the producer of a block against the expected producer for a given timestamp.

#### Detailed Implementation
- **Initialization and Start**
  - The consensus mechanism is initialized by setting up necessary components like the `electionManager`, `points`, and event handlers.
  - The `Start` function enables the consensus mechanism, registering it with the blockchain and starting the block production process.

- **Election Process**
  - The `electionAlgorithm` selects producers by splitting pillars into groups based on their weights and applying randomness to ensure fairness.
  - This ensures that the block production responsibility is distributed among different nodes.

- **Verification and Validation**
  - The `VerifyMomentumProducer` function checks if the block producer is the expected one for the given timestamp.
  - This helps in detecting and preventing fraudulent block production.

#### Example Code Snippets
Here are some key code snippets from the `go-zenon` repository that illustrate the consensus mechanism:

- **Consensus Initialization**
  ```go
  func NewConsensus(db db.DB, chain chain.Chain, testing bool) Consensus {
      genesisTimestamp := chain.GetGenesisMomentum().Timestamp
      epochTicker := common.NewTicker(*genesisTimestamp, EpochDuration)
      cacheSize := 7 * 24 * 60 * 60 / (constants.ConsensusConfig.BlockTime * int64(constants.ConsensusConfig.NodeCount))

      dbCache := storage.NewConsensusDB(db, int(cacheSize), int(cacheSize))
      electionManager := newElectionManager(chain, dbCache)

      return &consensus{
          log:             common.ConsensusLogger,
          genesis:         *genesisTimestamp,
          chain:           chain,
          testing:         testing,
          eventManager:    newEventManager(),
          electionManager: electionManager,
          points:          newPoints(electionManager, epochTicker, chain, dbCache),
          closed:          make(chan struct{}),
      }
  }
  ```

- **Election Algorithm**
  ```go
  func (ea *electionAlgorithm) SelectProducers(context *AlgorithmConfig) []*types.PillarDelegation {
      groupA, groupB := ea.filterByWeight(context)
      producers := ea.filterRandom(groupA, groupB, context)
      producers = ea.shuffleOrder(producers, context)
      return producers
  }
  ```

- **Verification**
  ```go
  func (cs *consensus) VerifyMomentumProducer(momentum *nom.Momentum) (bool, error) {
      expected, err := cs.GetMomentumProducer(*momentum.Timestamp)
      if err != nil {
          return false, err
      }
      if momentum.Producer() == *expected {
          return true, nil
      }
      return false, nil
  }
  ```

By understanding these components and their interactions, developers can gain insight into the consensus mechanism in `go-zenon` and how it ensures the integrity and security of the blockchain. For more detailed information, you can explore the [repository's code](https://github.com/zenon-network/go-zenon).