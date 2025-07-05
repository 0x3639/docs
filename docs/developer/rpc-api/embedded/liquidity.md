---
sidebar_position: 12
title: Liquidity
---

# Liquidity RPC API

## embedded.liquidity

* [embedded.liquidity.getLiquidityInfo](#embeddedliquiditygetliquidityinfo)
* [embedded.liquidity.getSecurityInfo](#embeddedliquiditygetsecurityinfo)
* [embedded.liquidity.getTimeChallengesInfo](#embeddedliquiditygettimechallengesinfo)
* [embedded.liquidity.getLiquidityStakeEntriesByAddress](#embeddedliquiditygetliquiditystakeentriesbyaddress)
* [embedded.liquidity.getUncollectedReward](#embeddedliquiditygetuncollectedreward)
* [embedded.liquidity.getFrontierRewardByPage](#embeddedliquiditygetfrontierrewardbypage)

### embedded.liquidity.getLiquidityInfo

> This API call will return general liquidity information.

#### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "embedded.liquidity.getLiquidityInfo",
    "params": []
}
```

#### Response

Liquidity information object containing:
* `administrator` - administrator address
* `isHalted` - whether liquidity operations are halted
* `znnReward` - ZNN reward amount
* `qsrReward` - QSR reward amount
* `tokenTuples` - array of supported token pairs for liquidity

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "administrator": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
        "isHalted": false,
        "znnReward": 187200000000,
        "qsrReward": 500000000000,
        "tokenTuples": [
            {
                "tokenStandard": "zts1qsrxxxxxxxxxxxxxmrhjll",
                "znnPercentage": 50,
                "qsrPercentage": 50,
                "minAmount": 1000000000
            }
        ]
    }
}
```

### embedded.liquidity.getSecurityInfo

> This API call will return security information for the liquidity contract.

#### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "embedded.liquidity.getSecurityInfo",
    "params": []
}
```

#### Response

Security information object containing:
* `guardians` - array of guardian addresses
* `guardiansVotes` - array of guardian votes
* `administratorDelay` - delay for administrator actions
* `softDelay` - soft delay period

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
        "guardians": [
            "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
            "z1qz3f6svf805tewktk5yf9tn8cdhe2236wdnugk"
        ],
        "guardiansVotes": [
            "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt"
        ],
        "administratorDelay": 172800,
        "softDelay": 86400
    }
}
```

### embedded.liquidity.getTimeChallengesInfo

> This API call will return time challenge information for liquidity methods.

#### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "embedded.liquidity.getTimeChallengesInfo",
    "params": []
}
```

#### Response

Array of time challenge objects containing:
* `methodName` - name of the liquidity method
* `challengeStartHeight` - momentum height when challenge starts

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": [
        {
            "methodName": "NominateGuardians",
            "challengeStartHeight": 450000
        },
        {
            "methodName": "UnlockLiquidityEntries",
            "challengeStartHeight": 460000
        }
    ]
}
```

### embedded.liquidity.getLiquidityStakeEntriesByAddress

> This API call will return liquidity stake entries for a specific address.

#### Request

3 parameters:
* first parameter of type `string` that represents the address
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "embedded.liquidity.getLiquidityStakeEntriesByAddress",
    "params": ["z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt", 0, 10]
}
```

#### Response

* `totalAmount` - total staked amount
* `totalWeightedAmount` - total weighted amount considering duration
* `count` - total number of entries
* `list` - array of stake entry objects containing:
  * `amount` - staked amount
  * `tokenStandard` - token standard (ZTS)
  * `weightedAmount` - weighted amount based on duration
  * `startTime` - stake start timestamp
  * `revokeTime` - revoke timestamp
  * `expirationTime` - expiration timestamp
  * `stakeAddress` - staking address
  * `id` - stake entry hash identifier

```json
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "totalAmount": 100000000000,
        "totalWeightedAmount": 150000000000,
        "count": 1,
        "list": [
            {
                "amount": 100000000000,
                "tokenStandard": "zts1qsrxxxxxxxxxxxxxmrhjll",
                "weightedAmount": 150000000000,
                "startTime": 1640000000,
                "revokeTime": 0,
                "expirationTime": 1671536000,
                "stakeAddress": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
                "id": "b24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5"
            }
        ]
    }
}
```

### embedded.liquidity.getUncollectedReward

> This API call will return uncollected liquidity rewards for an address.

#### Request

One parameter of type `string` that represents the address.

```json
{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "embedded.liquidity.getUncollectedReward",
    "params": ["z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt"]
}
```

#### Response

Reward deposit object containing:
* `address` - address eligible for rewards
* `znnAmount` - uncollected ZNN amount
* `qsrAmount` - uncollected QSR amount

```json
{
    "jsonrpc": "2.0",
    "id": 4,
    "result": {
        "address": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
        "znnAmount": 10000000000,
        "qsrAmount": 50000000000
    }
}
```

### embedded.liquidity.getFrontierRewardByPage

> This API call will return paginated reward history for liquidity providers.

#### Request

3 parameters:
* first parameter of type `string` that represents the address
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 5,
    "method": "embedded.liquidity.getFrontierRewardByPage",
    "params": ["z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt", 0, 10]
}
```

#### Response

* `count` - total number of reward entries
* `list` - array of reward history entries containing:
  * `epoch` - reward epoch number
  * `znnAmount` - ZNN reward amount
  * `qsrAmount` - QSR reward amount

```json
{
    "jsonrpc": "2.0",
    "id": 5,
    "result": {
        "count": 2,
        "list": [
            {
                "epoch": 10,
                "znnAmount": 5000000000,
                "qsrAmount": 25000000000
            },
            {
                "epoch": 9,
                "znnAmount": 5000000000,
                "qsrAmount": 25000000000
            }
        ]
    }
}
```

---

<div style={{textAlign: 'center', marginTop: '2rem'}}>
  <a href="/developer/rpc-api/embedded/bridge" style={{marginRight: '1rem'}}>← Previous: Bridge</a>
  <a href="/developer/rpc-api/core">Next: Core API →</a>
</div>