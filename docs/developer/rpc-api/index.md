---
sidebar_position: 9
slug: rpc-api
title: RPC API Overview
---

# Zenon JSON-RPC API

Clients interact with Zenon Alphanet through `JSON-RPC` API calls. In the examples provided below, API calls are performed to a Zenon full node listening for websocket traffic on `127.0.0.1:35998` (IPv4) or `[::1]:35998` (IPv6). Follow the links below or use the navigation on the right to learn more about the available options.

## Configuration

In order to be able to enable the communication method with the Zenon full node, the `config.json` needs to be configured accordingly:

* For inter-process communication: `"EnableIPC":true`, default IPC port is `35996`
* For HTTP: `"EnableHTTP":true`, default HTTP port is `35997`
* For Websocket: `"EnableWS":true`, default Websocket port is `35998`

## Endpoints

In order to be able to perform calls to the respective `Endpoints`, the `config.json` needs to be configured

* [Embedded Smart Contracts](./embedded/): allows clients to interact with the NoM embedded smart contracts
* [Dual Ledger](./core/dual-ledger): allows clients to interact with the NoM dual-ledger
* [Stats](./core/stats): allows clients to examine stats and other information about the Node
* [Subscribe](./core/subscribe): allows clients to subscribe to real-time updates

The bash command `znn-cli enableRPC` can be used with the [Dart CLI](/wallet/cli/); it will automatically populate the `config.json` with the necessary information.

## Quick Navigation

### Embedded Smart Contracts

<div className="rpc-nav-grid">

#### Core Contracts
- **[Pillar](./embedded/pillar)** - Pillar management and delegation
- **[Plasma](./embedded/plasma)** - Plasma generation and management
- **[Sentinel](./embedded/sentinel)** - Sentinel node operations
- **[Token](./embedded/token)** - Token creation and management

#### DeFi Contracts
- **[Stake](./embedded/stake)** - ZNN staking functionality
- **[Swap](./embedded/swap)** - Legacy token swap operations
- **[Liquidity](./embedded/liquidity)** - Liquidity provision and rewards

#### Infrastructure Contracts
- **[Accelerator](./embedded/accelerator)** - Project funding and voting
- **[Bridge](./embedded/bridge)** - Cross-chain bridge operations
- **[HTLC](./embedded/htlc)** - Hash Time-Locked Contracts
- **[Spork](./embedded/spork)** - Network upgrade management

</div>

### Core API

- **[Dual Ledger](./core/dual-ledger)** - Account chains and momentum operations
- **[Stats](./core/stats)** - Node statistics and network information
- **[Subscribe](./core/subscribe)** - Real-time event subscriptions

## API Standards

All RPC methods follow these conventions:
- Method names use camelCase (e.g., `getAccountInfoByAddress`)
- Parameters are passed as an array in the `params` field
- Responses include either a `result` field (success) or `error` field (failure)
- All amounts are in the smallest unit (e.g., 1 ZNN = 10^8 units)

## Example Request

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "ledger.getAccountInfoByAddress",
    "params": ["z1qzal6c5s9rjnnxd2z7dvdhjxpmmj4fmw56a0mz"]
}
```

## Example Response

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "address": "z1qzal6c5s9rjnnxd2z7dvdhjxpmmj4fmw56a0mz",
        "accountHeight": 100,
        "balanceInfoMap": {
            "zts1znnxxxxxxxxxxxxx9z4ulx": {
                "token": {
                    "name": "Zenon",
                    "symbol": "ZNN",
                    "domain": "zenon.network",
                    "totalSupply": 19500000000000,
                    "decimals": 8,
                    "owner": "z1qxemdeddedxpyllarxxxxxxxxxxxxxxxsy3fmg",
                    "tokenStandard": "zts1znnxxxxxxxxxxxxx9z4ulx",
                    "maxSupply": 4611686018427387903,
                    "isBurnable": true,
                    "isMintable": true,
                    "isUtility": true
                },
                "balance": 1000000000
            }
        }
    }
}
```

## Next Steps

- Explore the [Embedded Smart Contracts](./embedded/) documentation
- Learn about [Dual Ledger](./core/dual-ledger) operations
- Set up [Event Subscriptions](./core/subscribe) for real-time updates