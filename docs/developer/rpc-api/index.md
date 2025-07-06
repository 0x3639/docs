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
    "params": ["z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9"]
}
```

## Example Response

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "address": "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9",
        "accountHeight": 1312,
        "balanceInfoMap": {
            "zts1znnxxxxxxxxxxxxx9z4ulx": {
                "token": {
                    "name": "EGGz",
                    "symbol": "EGGZ",
                    "domain": "EGGY.XYZ",
                    "totalSupply": "69",
                    "decimals": 0,
                    "owner": "z1qpqxqke0lqmv7fsszt3qdrkqxctt209eskya6s",
                    "tokenStandard": "zts12hvg7gxywz7df756type6h",
                    "maxSupply": "3665",
                    "isBurnable": false,
                    "isMintable": true,
                    "isUtility": true
                },
                "balance": "1"
            },
            "zts13e7pf9k9fv8zgsv93rr86s": {
                "token": {
                    "name": "Titcoin",
                    "symbol": "TIDDIEZ",
                    "domain": "titcoin.biz",
                    "totalSupply": "21000000",
                    "decimals": 0,
                    "owner": "z1qp4k2lgvhy3rlwa9ypunngz0zvd2ltucn7eyez",
                    "tokenStandard": "zts13e7pf9k9fv8zgsv93rr86s",
                    "maxSupply": "21000000",
                    "isBurnable": true,
                    "isMintable": false,
                    "isUtility": true
                },
                "balance": "420"
            },
            "zts13sl7jccgrflw7u9rfsvzp7": {
                "token": {
                    "name": "ZENONBITCOINTOKEN",
                    "symbol": "ZBTOKEN",
                    "domain": "zbtoken.org",
                    "totalSupply": "2100000000000000",
                    "decimals": 8,
                    "owner": "z1qz9t44t52g7fgt3whcm02kf66u05789myjxg6e",
                    "tokenStandard": "zts13sl7jccgrflw7u9rfsvzp7",
                    "maxSupply": "2100000000000000",
                    "isBurnable": true,
                    "isMintable": true,
                    "isUtility": true
                },
                "balance": "224700000000"
            },
            "zts14pmddt35kawqweg3re08zj": {
                "token": {
                    "name": "WrappedBTC",
                    "symbol": "WBTC",
                    "domain": "wbtc.network",
                    "totalSupply": "160001",
                    "decimals": 8,
                    "owner": "z1qxemdeddedxdrydgexxxxxxxxxxxxxxxmqgr0d",
                    "tokenStandard": "zts14pmddt35kawqweg3re08zj",
                    "maxSupply": "2100000000000000",
                    "isBurnable": true,
                    "isMintable": true,
                    "isUtility": true
                },
                "balance": "1"
            },
            "zts15v2czq54cmneln6cgz477t": {
                "token": {
                    "name": "GAY",
                    "symbol": "GAY",
                    "domain": "unizen.io",
                    "totalSupply": "9261169",
                    "decimals": 0,
                    "owner": "z1qzxr3hwu3tq2qz84s4uyvawcm4gs8803yx3489",
                    "tokenStandard": "zts15v2czq54cmneln6cgz477t",
                    "maxSupply": "9261169",
                    "isBurnable": true,
                    "isMintable": false,
                    "isUtility": true
                },
                "balance": "75831"
            },
            "zts17d6yr02kh0r9qr566p7tg6": {
                "token": {
                    "name": "wZNN-wETH-LP-ETH",
                    "symbol": "ZNNETHLP",
                    "domain": "zenon.network",
                    "totalSupply": "34808072639991227",
                    "decimals": 18,
                    "owner": "z1qxemdeddedxdrydgexxxxxxxxxxxxxxxmqgr0d",
                    "tokenStandard": "zts17d6yr02kh0r9qr566p7tg6",
                    "maxSupply": "57896044618658097711785492504343953926634992332820282019728792003956564819967",
                    "isBurnable": true,
                    "isMintable": true,
                    "isUtility": true
                },
                "balance": "0"
            },
            "zts17hnx4y7cn4r8tqy56xljma": {
                "token": {
                    "name": "never_go_full",
                    "symbol": "RETARD",
                    "domain": "retard.xyz",
                    "totalSupply": "1000000000000000",
                    "decimals": 4,
                    "owner": "z1qr2qpnknmehvz59xenjd8gd92dv5c4y5svhkzn",
                    "tokenStandard": "zts17hnx4y7cn4r8tqy56xljma",
                    "maxSupply": "1000000000000000",
                    "isBurnable": false,
                    "isMintable": false,
                    "isUtility": false
                },
                "balance": "10000000000000"
            },
            "zts17xwkaql7s50lr5ehfn8wuz": {
                "token": {
                    "name": "321",
                    "symbol": "321",
                    "domain": "321.XYZ",
                    "totalSupply": "321",
                    "decimals": 0,
                    "owner": "z1qqdy2pkm653hhh8vs0c27s6h4fxykgz2dn75ql",
                    "tokenStandard": "zts17xwkaql7s50lr5ehfn8wuz",
                    "maxSupply": "321",
                    "isBurnable": false,
                    "isMintable": false,
                    "isUtility": true
                },
                "balance": "10"
            },
            "zts183cs3vh0txu6sqc2m03rec": {
                "token": {
                    "name": "HeiZNNcoin",
                    "symbol": "HZNN",
                    "domain": "hznn.space",
                    "totalSupply": "1900000000",
                    "decimals": 2,
                    "owner": "z1qqt0vslj97pzd0y4ustzfer27xymj6y2pjtp9y",
                    "tokenStandard": "zts183cs3vh0txu6sqc2m03rec",
                    "maxSupply": "1900000000",
                    "isBurnable": true,
                    "isMintable": true,
                    "isUtility": true
                },
                "balance": "250000"
            },
            "zts1aev2xmx4q4z6d7840w464c": {
                "token": {
                    "name": "TOXOPLASMA",
                    "symbol": "TOXOPLASMA",
                    "domain": "www.toxoplasma.xyz",
                    "totalSupply": "10000000000",
                    "decimals": 0,
                    "owner": "z1qz4jhns636t8cuhhzxts5fmhunh3ev04yppzyv",
                    "tokenStandard": "zts1aev2xmx4q4z6d7840w464c",
                    "maxSupply": "10000000000",
                    "isBurnable": false,
                    "isMintable": false,
                    "isUtility": true
                },
                "balance": "1"
            },
            "zts1aexa04wgd7nkw28zpgt8fs": {
                "token": {
                    "name": "DVRKBVG",
                    "symbol": "DVRKBVG",
                    "domain": "dvrkbvg.xyz",
                    "totalSupply": "69000000",
                    "decimals": 0,
                    "owner": "z1qrhus2ahneh0zx3v4pdqfw746dsvqmtxykej5p",
                    "tokenStandard": "zts1aexa04wgd7nkw28zpgt8fs",
                    "maxSupply": "69000000",
                    "isBurnable": false,
                    "isMintable": false,
                    "isUtility": true
                },
                "balance": "269618"
            },
            "zts1c8k4reepe0al335lxs6ux2": {
                "token": {
                    "name": "DORSY",
                    "symbol": "DORSY",
                    "domain": "dorsy.neocities.org",
                    "totalSupply": "19111976",
                    "decimals": 0,
                    "owner": "z1qrmg0s3clp9unmj0krnraa4mplyq5s92426gaq",
                    "tokenStandard": "zts1c8k4reepe0al335lxs6ux2",
                    "maxSupply": "19111976",
                    "isBurnable": true,
                    "isMintable": false,
                    "isUtility": true
                },
                "balance": "6751076"
            },
            "zts1ewk25sx34g9sp09chvnldy": {
                "token": {
                    "name": "UnikernalSanders",
                    "symbol": "ZFC",
                    "domain": "www.unikernalsanders.com",
                    "totalSupply": "100000000000000000",
                    "decimals": 8,
                    "owner": "z1qz4cnf6rdjfsza0s8pmfmxtxrgt6zx5xq9lmtm",
                    "tokenStandard": "zts1ewk25sx34g9sp09chvnldy",
                    "maxSupply": "100000000000000000",
                    "isBurnable": false,
                    "isMintable": false,
                    "isUtility": true
                },
                "balance": "1000000000000000"
            },
            "zts1gs8cvx7z8dsglk8srtu0nm": {
                "token": {
                    "name": "BAG",
                    "symbol": "BAG",
                    "domain": "BAG.NETWORK",
                    "totalSupply": "69",
                    "decimals": 0,
                    "owner": "z1qpdhzpx4gh4hxy7qtkj47x0g746rwpthz88z2h",
                    "tokenStandard": "zts1gs8cvx7z8dsglk8srtu0nm",
                    "maxSupply": "69",
                    "isBurnable": false,
                    "isMintable": false,
                    "isUtility": false
                },
                "balance": "2"
            },
            "zts1h6wfeqf857sc63a8aq5nqw": {
                "token": {
                    "name": "Cobra",
                    "symbol": "CZNN",
                    "domain": "maoa.world",
                    "totalSupply": "2100000000000000",
                    "decimals": 8,
                    "owner": "z1qpkgnx3v3cdr3w5xnefj9wnv0y9t46rmegd4xa",
                    "tokenStandard": "zts1h6wfeqf857sc63a8aq5nqw",
                    "maxSupply": "2100000000000000",
                    "isBurnable": false,
                    "isMintable": false,
                    "isUtility": true
                },
                "balance": "10000000000000"
            },
            "zts1hz3ys62vnc8tdajnwrz6pp": {
                "token": {
                    "name": "PlasmaPoints",
                    "symbol": "PP",
                    "domain": "zenon.network",
                    "totalSupply": "13321356",
                    "decimals": 0,
                    "owner": "z1qrfs5fygp0r24vjz4p8z5axzwp7mwf2eftnak0",
                    "tokenStandard": "zts1hz3ys62vnc8tdajnwrz6pp",
                    "maxSupply": "57896044618658097711785492504343953926634992332820282019728792003956564819967",
                    "isBurnable": true,
                    "isMintable": true,
                    "isUtility": true
                },
                "balance": "700477"
            },
            "zts1k68xkj50pqvzphtlrr7wq5": {
                "token": {
                    "name": "based",
                    "symbol": "BASED",
                    "domain": "based.me",
                    "totalSupply": "6900000",
                    "decimals": 0,
                    "owner": "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9",
                    "tokenStandard": "zts1k68xkj50pqvzphtlrr7wq5",
                    "maxSupply": "69000000",
                    "isBurnable": false,
                    "isMintable": true,
                    "isUtility": true
                },
                "balance": "6900000"
            },
            "zts1n75y42aqfpperaxscnspmy": {
                "token": {
                    "name": "retarded",
                    "symbol": "RERE",
                    "domain": "retarded.me",
                    "totalSupply": "6900000",
                    "decimals": 0,
                    "owner": "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9",
                    "tokenStandard": "zts1n75y42aqfpperaxscnspmy",
                    "maxSupply": "69000000",
                    "isBurnable": false,
                    "isMintable": true,
                    "isUtility": true
                },
                "balance": "6900000"
            },
            "zts1q5u994j2hq3lxt9tr6t3z2": {
                "token": {
                    "name": "ZenonDoge",
                    "symbol": "ZOGE",
                    "domain": "ZOGE.NETWORK",
                    "totalSupply": "100000000000",
                    "decimals": 2,
                    "owner": "z1qzgpx83vzkh0y2dx33ualukpyvquk59hkkusf5",
                    "tokenStandard": "zts1q5u994j2hq3lxt9tr6t3z2",
                    "maxSupply": "100000000000",
                    "isBurnable": true,
                    "isMintable": false,
                    "isUtility": false
                },
                "balance": "69696900"
            },
            "zts1q803c0nd5cfj2sm4fv0yga": {
                "token": {
                    "name": "INCHES",
                    "symbol": "INCHES",
                    "domain": "biginches.club",
                    "totalSupply": "4206900000000",
                    "decimals": 8,
                    "owner": "z1qraay709q07a28jn6arj085sfx8pqmzfmchlwl",
                    "tokenStandard": "zts1q803c0nd5cfj2sm4fv0yga",
                    "maxSupply": "4206900000000",
                    "isBurnable": false,
                    "isMintable": false,
                    "isUtility": true
                },
                "balance": "25000000000"
            },
            "zts1qqp9ng6eqy7gzgpak0wya9": {
                "token": {
                    "name": "Jenkem",
                    "symbol": "JENKM",
                    "domain": "jenkem.neocities.org",
                    "totalSupply": "100000010000000",
                    "decimals": 7,
                    "owner": "z1qqfmq2kyk2ns4ua9czzrg4z4spcj3q2nx6slth",
                    "tokenStandard": "zts1qqp9ng6eqy7gzgpak0wya9",
                    "maxSupply": "9223372036854775807",
                    "isBurnable": false,
                    "isMintable": true,
                    "isUtility": false
                },
                "balance": "1234560000000"
            },
            "zts1qsrxxxxxxxxxxxxxmrhjll": {
                "token": {
                    "name": "QSR",
                    "symbol": "QSR",
                    "domain": "zenon.network",
                    "totalSupply": "3015596752761586",
                    "decimals": 8,
                    "owner": "z1qxemdeddedxt0kenxxxxxxxxxxxxxxxxh9amk0",
                    "tokenStandard": "zts1qsrxxxxxxxxxxxxxmrhjll",
                    "maxSupply": "9007199254740991",
                    "isBurnable": true,
                    "isMintable": true,
                    "isUtility": true
                },
                "balance": "4610095974898"
            },
            "zts1s69da8505vjrzjh8w2770v": {
                "token": {
                    "name": "reply",
                    "symbol": "REPLY",
                    "domain": "replyguyz.me",
                    "totalSupply": "1272312723",
                    "decimals": 0,
                    "owner": "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9",
                    "tokenStandard": "zts1s69da8505vjrzjh8w2770v",
                    "maxSupply": "1272312723",
                    "isBurnable": false,
                    "isMintable": false,
                    "isUtility": true
                },
                "balance": "1272312723"
            },
            "zts1shuly32sk6xlqlqhme78mq": {
                "token": {
                    "name": "Zenonwiftophat",
                    "symbol": "TOPHAT",
                    "domain": "tophatz.xyz",
                    "totalSupply": "420",
                    "decimals": 0,
                    "owner": "z1qzlujrgqueztq787d6mwmc8se4dysu955uy9z4",
                    "tokenStandard": "zts1shuly32sk6xlqlqhme78mq",
                    "maxSupply": "420",
                    "isBurnable": false,
                    "isMintable": false,
                    "isUtility": true
                },
                "balance": "1"
            },
            "zts1uvclc8e9enwxyk8adrap3h": {
                "token": {
                    "name": "MEDZ",
                    "symbol": "MEDZ",
                    "domain": "zenon.network",
                    "totalSupply": "1100",
                    "decimals": 1,
                    "owner": "z1qz4jhns636t8cuhhzxts5fmhunh3ev04yppzyv",
                    "tokenStandard": "zts1uvclc8e9enwxyk8adrap3h",
                    "maxSupply": "197846266900",
                    "isBurnable": true,
                    "isMintable": true,
                    "isUtility": true
                },
                "balance": "60"
            },
            "zts1znnxxxxxxxxxxxxx9z4ulx": {
                "token": {
                    "name": "ZNN",
                    "symbol": "ZNN",
                    "domain": "zenon.network",
                    "totalSupply": "1246168066624547",
                    "decimals": 8,
                    "owner": "z1qxemdeddedxt0kenxxxxxxxxxxxxxxxxh9amk0",
                    "tokenStandard": "zts1znnxxxxxxxxxxxxx9z4ulx",
                    "maxSupply": "9007199254740991",
                    "isBurnable": true,
                    "isMintable": true,
                    "isUtility": true
                },
                "balance": "1003650023651"
            }
        }
    }
}
```

## Next Steps

- Explore the [Embedded Smart Contracts](./embedded/) documentation
- Learn about [Dual Ledger](./core/dual-ledger) operations
- Set up [Event Subscriptions](./core/subscribe) for real-time updates