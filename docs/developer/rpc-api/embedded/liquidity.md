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
        "administrator": "z1qr9vtwsfr2n0nsxl2nfh6l5esqjh2wfj85cfq9",
        "isHalted": false,
        "znnReward": "0",
        "qsrReward": "0",
        "tokenTuples": [
            {
                "tokenStandard": "zts17d6yr02kh0r9qr566p7tg6",
                "znnPercentage": 10000,
                "qsrPercentage": 10000,
                "minAmount": "1"
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
            "z1qphnq6jfaf82kmpyuuc88983ar66dmh7e59f67",
            "z1qppk2p26xwwzu5w4zyzwknrx28whvjgy9ukc6h",
            "z1qprccs7kjvx9q78m5v5ghwwfvxr6py8rtwcfrd",
            "z1qpxswrfnlll355wrx868xh58j7e2gu2n2u5czv",
            "z1qqcz0rmkz7f5442hjjr0thh2v6txu4875eyrkd",
            "z1qqeyp02thdets4k245fnnjpk764ls65gwsy0cg",
            "z1qr6k9c0z73c2zx22grhcw702slyz0gelt2uwvd",
            "z1qr7urykpjth3w9lcl66atgvu5fc0ywawzha220",
            "z1qrawthjzd95hcz73r3e5wd0xxzjmrt4vfqla0z",
            "z1qrgh8w9q3xj5a2t2atnt3reqhh0akm4qae8ezk",
            "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9",
            "z1qzjnnpmnqp6uqz2m9uet8l5e42ewwaty2mqcpy",
            "z1qzup2zm6c9g68t085zjn5ycvdnr0u4pt0k4c80",
            "z1qzymmtmfr3gxz3fr80cq94rgaefzkvst4e90lz"
        ],
        "guardiansVotes": [
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f"
        ],
        "administratorDelay": 17280,
        "softDelay": 8640
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
    "params": ["z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9", 0, 10]
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
        "totalAmount": "0",
        "totalWeightedAmount": "0",
        "count": 0,
        "list": []
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
    "params": ["z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9"]
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
        "address": "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9",
        "znnAmount": "0",
        "qsrAmount": "0"
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