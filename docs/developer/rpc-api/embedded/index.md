---
sidebar_position: 1
title: Embedded Smart Contracts
---

# Embedded Smart Contracts

Zenon Network features built-in smart contracts that provide core functionality for the network. These embedded contracts are implemented at the protocol level and offer essential services for network operations.

## Available Contracts

### Core Infrastructure

#### [Pillar Contract](./pillar)
Manages the Pillar consensus nodes that secure the network.
- Register and manage Pillars
- Handle delegation and rewards
- Track Pillar performance metrics

#### [Plasma Contract](./plasma)
Handles Plasma generation for transaction processing.
- Generate Plasma through PoW or QSR fusion
- Query Plasma requirements
- Manage Plasma entries

#### [Sentinel Contract](./sentinel)
Manages Sentinel nodes that provide network services.
- Deploy and revoke Sentinels
- Handle QSR collateral
- Distribute rewards

#### [Token Contract](./token)
Enables creation and management of ZTS tokens.
- Issue new tokens (ZTS - Zenon Token Standard)
- Manage token properties
- Handle minting and burning

### DeFi Operations

#### [Stake Contract](./stake)
Provides ZNN staking functionality.
- Stake ZNN for rewards
- Cancel stakes
- Collect staking rewards

#### [Swap Contract](./swap)
Handles legacy token swap operations.
- Swap legacy tokens
- Manage swap assets
- Query swap status

#### [Liquidity Contract](./liquidity)
Manages liquidity provision and rewards.
- Provide liquidity
- Stake liquidity tokens
- Collect liquidity rewards

### Advanced Features

#### [Accelerator Contract](./accelerator)
Funds community projects through decentralized voting.
- Submit project proposals
- Vote on projects
- Manage project phases

#### [Bridge Contract](./bridge)
Enables cross-chain asset transfers.
- Wrap tokens for bridging
- Unwrap bridged tokens
- Manage bridge security

#### [HTLC Contract](./htlc)
Implements Hash Time-Locked Contracts for atomic swaps.
- Create HTLC agreements
- Unlock with hash preimage
- Handle timelock expiry

#### [Spork Contract](./spork)
Manages network upgrades and feature activation.
- Query active sporks
- Check spork status
- Monitor network upgrades

## Common Patterns

### Pagination
Many methods support pagination with standard parameters:
- `pageIndex` (number): Zero-based page index
- `pageSize` (number): Number of items per page

### Address Format
All addresses use the Zenon address format:
- Format: `z1[40 characters]`
- Example: `z1qzal6c5s9rjnnxd2z7dvdhjxpmmj4fmw56a0mz`

### Token Standards
Token identifiers follow the ZTS (Zenon Token Standard):
- Format: `zts1[15 characters]`
- ZNN: `zts1znnxxxxxxxxxxxxx9z4ulx`
- QSR: `zts1qsrxxxxxxxxxxxxxmrhjll`

### Response Format
All embedded contract calls follow the standard JSON-RPC response format:
```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        // Contract-specific response data
    }
}
```

## Error Handling

Common error responses from embedded contracts:
- Invalid parameters
- Insufficient funds/plasma
- Permission denied
- Contract-specific validation errors

## Next Steps

Select a specific embedded contract from the menu to explore its methods and functionality in detail.