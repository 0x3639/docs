---
sidebar_position: 7
title: Stake
---

# Stake RPC API

## embedded.stake

* [embedded.stake.getEntriesByAddress](#embeddedstakegetentriesbyaddress)
* [embedded.stake.getUncollectedReward](#embeddedstakegetuncollectedreward)
* [embedded.stake.getFrontierRewardByPage](#embeddedstakegetfrontierrewardbypage)

### embedded.stake.getEntriesByAddress

> This API call will return staking information for a particular address

#### Request

3 parameters:

* first parameter of type `string` that represents the address
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the number of entries to be displayed on this page

```json
{
    "jsonrpc": "2.0",
    "id": 19,
    "method": "embedded.stake.getEntriesByAddress",
    "params": ["z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9", 0, 5]
}
```

#### Response

JSON object representing the staking entries:

* `totalAmount` of type `int`: total amount of ZNN staked
* `totalWeightedAmount` of type `int`: total weighted amount of ZNN staked
* `count` of type `number`: number of entries
* `list` of type `array`: list of entries. Each entry is defined by the following fields:
    - `amount` of type `number`: staking amount
    - `weightedAmount` of type `number`: ZNN amount that is actually staked calculated based on the number of months
    - `startTimestamp` of type `number`: UNIX timestamp of stake registration
    - `expirationTimestamp` of type `number`: UNIX timestamp of stake expiration
    - `address` of type `string`: staking address
    - `id` of type `string`: id of stake, used to cancel the stake

```json
{
    "jsonrpc": "2.0",
    "id": 19,
    "result": {
        "totalAmount": "11209634848359",
        "totalWeightedAmount": "23540233181553",
        "count": 8,
        "list": [
            {
                "amount": "5000000000000",
                "weightedAmount": "10500000000000",
                "startTimestamp": 1712527460,
                "expirationTimestamp": 1743631460,
                "address": "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9",
                "id": "b281166fc58402d36beeed739964bde3b4d33c1d51b542adff55d66202c1a73d"
            },
            {
                "amount": "1200000000000",
                "weightedAmount": "2520000000000",
                "startTimestamp": 1731441270,
                "expirationTimestamp": 1762545270,
                "address": "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9",
                "id": "bb07b4ba819060ec9282b0d3517262ef016e1982b4605bae3bcdd5b95e1fb9f5"
            },
            {
                "amount": "1000000000000",
                "weightedAmount": "2100000000000",
                "startTimestamp": 1737932890,
                "expirationTimestamp": 1769036890,
                "address": "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9",
                "id": "81dc20b47380a3baaa4e783ac9b38c654051a04c758f5f12526498449c7c922a"
            }
        ]
    }
}
```

### embedded.stake.getUncollectedReward

> This API call will return the uncollected reward(s) for the specified stake.

#### Request

One parameter of type string that represents the address of the Stake

```json
{
    "jsonrpc": "2.0",
    "id": 17,
    "method": "embedded.stake.getUncollectedReward",
    "params": ["z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9"]
}
```

#### Response

JSON object representing the uncollected reward:

* `address` of type `string`: address of the Stake
* `znnAmount` of type `number`: the ZNN amount that has to be collected
* `qsrAmount` of type `number`: the QSR amount that has to be collected

```json
{
    "jsonrpc": "2.0",
    "id": 6,
    "result": {
        "address": "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9",
        "znnAmount": "0",
        "qsrAmount": "37716448266"
    }
}
```

### embedded.stake.getFrontierRewardByPage

> This API call will return reward information the specified stake for a specified range of pages.

#### Request

3 parameters:

* first parameter of type `string` that represents the stake address
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the number of entries to be displayed on this page

```json
{
    "jsonrpc": "2.0",
    "id": 7,
    "method": "embedded.stake.getFrontierRewardByPage",
    "params": ["z1qzpa55k8328ff0ys7jfakfvhw8k2cwm53f5d5u", 0, 2]
}
```

#### Response

`JSON` object representing the rewards:

* `count` of type `number`: the total number of the epochs
* an array of entries for the rewards with the following fields:
    - `epoch` of type `number`: the specified epoch
    - `znnAmount` of type `number`: the ZNN amount that has to be collected
    - `qsrAmount` of type `number`: the QSR amount that has to be collected

```json
{
    "jsonrpc": "2.0",
    "id": 7,
    "result": {
        "count": 2,
        "list": [
                {
                    "epoch": 0,
                    "znnAmount": 0,
                    "qsrAmount":  1000000000
                },
                {
                    
                    "epoch": 1,
                    "znnAmount": 0,
                    "qsrAmount":  1000000000
                }
        ]
    }
}
```

---

<div style={{textAlign: 'center', marginTop: '2rem'}}>
  <a href="/developer/rpc-api/embedded/swap" style={{marginRight: '1rem'}}>← Previous: Swap</a>
  <a href="/developer/rpc-api/embedded/accelerator">Next: Accelerator →</a>
</div>