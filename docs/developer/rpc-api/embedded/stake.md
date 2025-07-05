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
    "params": ["z1qzpa55k8328ff0ys7jfakfvhw8k2cwm53f5d5u", 0, 5]
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
        "totalAmount": 65000000000,
        "totalWeightedAmount": 73000000000,
        "count": 3,
        "list": [
            {
                "amount": 15000000000,
                "weightedAmount": 15000000000,
                "startTimestamp": 1607956630,
                "expirationTimestamp": 1610548630,
                "address": "z1qzpa55k8328ff0ys7jfakfvhw8k2cwm53f5d5u",
                "id": "172fbda8a0b97fab5b79d4e7790c477e618dac416c9c0dc356267078f9afc549"
            },
            {
              "amount": 25000000000,
              "weightedAmount": 25000000000,
              "startTimestamp": 1607956635,
              "expirationTimestamp": 1610548645,
              "address": "z1qzpa55k8328ff0ys7jfakfvhw8k2cwm53f5d5u",
              "id": "272fbda8a0b97fab5b79d4e7790c477e618dac416c9c0dc356267078f9afc549"
            },
            {
              "amount": 35000000000,
              "weightedAmount": 35000000000,
              "startTimestamp": 1607956640,
              "expirationTimestamp": 1610548660,
              "address": "z1qzpa55k8328ff0ys7jfakfvhw8k2cwm53f5d5u",
              "id": "372fbda8a0b97fab5b79d4e7790c477e618dac416c9c0dc356267078f9afc549"
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
    "params": ["z1qzpa55k8328ff0ys7jfakfvhw8k2cwm53f5d5u"]
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
        "address": "z1qzpa55k8328ff0ys7jfakfvhw8k2cwm53f5d5u",
        "znnAmount": 0,
        "qsrAmount": 100000000
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