---
sidebar_position: 4
title: Sentinel
---

# Sentinel RPC API

## embedded.sentinel

* [embedded.sentinel.getByOwner](#embeddedsentinelgetbyowner)
* [embedded.sentinel.getAllActive](#embeddedsentinelgetallactive)
* [embedded.sentinel.getDepositedQsr](#embeddedsentinelgetdepositedqsr)
* [embedded.sentinel.getUncollectedReward](#embeddedsentinelgetuncollectedreward)
* [embedded.sentinel.getFrontierRewardByPage](#embeddedsentinelgetfrontierrewardbypage)

### embedded.sentinel.getByOwner

> This API call will return all the Sentinels registered by an address.

#### Request

One parameter of type `string` that represents the `ownerAddress` of the Sentinels.

```json
{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "embedded.sentinel.getByOwner",
    "params": ["z1qz5fskcw8q6zndyu2w5eps9cyk3ekn9ecvcngd"]
}
```

#### Response

JSON object representing the registered Sentinel:

Same information as [embedded.sentinel.getAllActive](#embeddedsentinelgetallactive)

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "owner": "z1qz5fskcw8q6zndyu2w5eps9cyk3ekn9ecvcngd",
        "registrationTimestamp": 1622025090,
        "isRevocable": true,
        "revokeCooldown": 12480,
        "active": true
    } 
}
```

### embedded.sentinel.getAllActive

> This API call will return a list of all registered Sentinels.

#### Request

2 parameters:

* first parameter of type `number` that represents the page
* second parameter of type `number` that represents the number of entries to be displayed on this page

```json
{
    "jsonrpc": "2.0",
    "id": 15,
    "method": "embedded.sentinel.getAllActive",
    "params": [0, 100]
}
```

#### Response

`JSON` object representing the registered Sentinels:

* `count` of type `number`: the total number of registered Sentinels
* an array of `entries` with the following fields:
  - `owner` of type `string`: the address that registered the Sentinel
  - `registrationTimestamp` of type `number`: Sentinel's registration UNIX timestamp
  - `isRevocable` of type `bool`: `true` if the Sentinel can be revoked, `false` otherwise
  - `revokeCooldown` of type `number`: seconds until the revoke window
  - `active` of type `bool`: `true` if Sentinel is active, `false` if revoked

```json
{
    "jsonrpc": "2.0",
    "id": 15,
    "result": {
        "count": 3,
        "list": [
            {   "owner": "z1qz5fskcw8q6zndyu2w5eps9cyk3ekn9ecvcngd",
                "registrationTimestamp": 1622627030,
                "isRevocable": false,
                "revokeCooldown": 63520,
                "active": true
            },
            {
                "owner": "z1qz5fskcw8q6zndyu2w5eps9cyk3ekn9ecvcngd",
                "registrationTimestamp": 1622025090,
                "isRevocable": false,
                "revokeCooldown": 66380,
                "active": true
            },
            {
                "owner": "z1qz5fskcw8q6zndyu2w5eps9cyk3ekn9ecvcngd",
                "registrationTimestamp": 1623135770,
                "isRevocable": false,
                "revokeCooldown": 53860,
                "active": true
            }
        ]
    }
}
```

### embedded.sentinel.getDepositedQsr

> This API call will return the amount of QSR the address has deposited in order to create a Sentinel.

#### Request

One parameter of type `string` that represents the Sentinel address.

```json
{
    "jsonrpc": "2.0",
    "id": 14,
    "method": "embedded.sentinel.getDepositedQsr",
    "params": ["z1qzpa55k8328ff0ys7jfakfvhw8k2cwm53f5d5u"]
}
```

#### Response

`number` that represents the amount of QSR deposited

```json
{
    "id": 14,
    "jsonrpc": "2.0",
    "result": 5000000000000
}
```

### embedded.sentinel.getUncollectedReward

> This API call will return the uncollected reward for the specified sentinel.

#### Request

One parameter of type string that represents the address of the Sentinel

```json
{
    "jsonrpc": "2.0",
    "id": 17,
    "method": "embedded.sentinel.getUncollectedReward",
    "params": ["z1qzpa55k8328ff0ys7jfakfvhw8k2cwm53f5d5u"]
}
```

#### Response

JSON object representing the uncollected reward:

* `address` of type `string`: address of the Sentinel
* `znnAmount` of type `number`: the ZNN amount that has to be collected
* `qsrAmount` of type `number`: the QSR amount that has to be collected

```json
{
    "id": 6,
    "jsonrpc": "2.0",
    "result": {
        "address": "z1qzpa55k8328ff0ys7jfakfvhw8k2cwm53f5d5u",
        "znnAmount": 100000000,
        "qsrAmount": 100000000
    }
}
```

### embedded.sentinel.getFrontierRewardByPage

> This API call will return reward information the specified sentinel for a specified range of pages.

#### Request

3 parameters:

* first parameter of type `string` that represents the sentinel address
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the number of entries to be displayed on this page

```json
{
    "jsonrpc": "2.0",
    "id": 7,
    "method": "embedded.sentinel.getFrontierRewardByPage",
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
    "id": 7,
    "jsonrpc": "2.0",
    "result": {
      "count": 2,
      "list": [
        {
            "epoch": 0,
            "znnAmount": 100000000,
            "qsrAmount":  1000000000
        },
        {
            "epoch": 1,
            "znnAmount": 100000000,
            "qsrAmount":  1000000000
        }
      ]
    }
}
```

---

<div style={{textAlign: 'center', marginTop: '2rem'}}>
  <a href="/developer/rpc-api/embedded/plasma" style={{marginRight: '1rem'}}>← Previous: Plasma</a>
  <a href="/developer/rpc-api/embedded/token">Next: Token →</a>
</div>