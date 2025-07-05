---
sidebar_position: 2
title: Pillar Contract
---

# Pillar RPC API

The Pillar contract manages the Pillar consensus nodes that secure the Zenon Network. Pillars are responsible for producing momentums and distributing rewards to delegators.

## Methods

* [embedded.pillar.getQsrRegistrationCost](#embeddedpillargetqsrregistrationcost)
* [embedded.pillar.checkNameAvailability](#embeddedpillarchecknameavailability)
* [embedded.pillar.getAll](#embeddedpillargetall)
* [embedded.pillar.getByOwner](#embeddedpillargetbyowner)
* [embedded.pillar.getByName](#embeddedpillargetbyname)
* [embedded.pillar.getDelegatedPillar](#embeddedpillargetdelegatedpillar)
* [embedded.pillar.getDepositedQsr](#embeddedpillargetdepositedqsr)
* [embedded.pillar.getUncollectedReward](#embeddedpillargetuncollectedreward)
* [embedded.pillar.getFrontierRewardByPage](#embeddedpillargetfrontierrewardbypage)
* [embedded.pillar.getPillarEpochHistory](#embeddedpillargetpillarepochhistory)
* [embedded.pillar.getPillarsHistoryByEpoch](#embeddedpillargetpillarshistorybyepoch)

### embedded.pillar.getQsrRegistrationCost

> This API call will return the current QSR cost for registering a new Pillar.

#### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "embedded.pillar.getQsrRegistrationCost",
    "params": []
}
```

#### Response

`number` - QSR cost (without decimals)

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": 15000000000000
}
```

### embedded.pillar.checkNameAvailability

> This API call will return information about the availability of a name for a Pillar.

#### Request

One parameter of type `string` that represents the `name`.

```json
{
    "jsonrpc": "2.0",
    "id": 9,
    "method": "embedded.pillar.checkNameAvailability",
    "params": ["Pillar_123"]
}
```

#### Response

* a parameter of type `bool`, which is true if the name is available and false otherwise

```json
{
    "jsonrpc": "2.0",
    "id": 9,
    "result": true
}
```

### embedded.pillar.getAll

> This API call will return the list of Pillars in the network with additional information.

#### Request

* first parameter of type `number` that represents the page index
* second parameter of type `number` that represents the number of entries to be displayed on this page

```json
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "embedded.pillar.getAll",
    "params": [0, 5]
}
```

#### Response

An `array` of `entries` and each item in the list contains the following fields:

* `name` of type `string`: name of the registered Pillar

* `rank` of type `int`: index of pillar sorted by weight

* `type` of type `int`: type of the registered pillar

* `isRevocable` of type `bool`: `true` if the Pillar can be revoked, `false` otherwise

* `ownerAddress` of type `string`: owner address the registered Pillar

* `producerAddress` of type `string`: address used by the Pillar to produce momentums

* `withdrawAddress` of type `string`: address used to collect the rewards

* `giveMomentumRewardPercentage` of type `int` : percentage of momentum rewards distributed to delegators

* `giveDelegateRewardPercentage` of type `int` : percentage of delegation rewards distributed to delegators

* `isRevocable` of type `bool` : specifies if the pillar is revocable

* `revokeCooldown` of type `number`: seconds remaining until revoke window opens

* `revokeTimestamp` of type `number`: UNIX timestamp that indicates when the Pillar was revoked

* `currentStats` - of type `dictionary` : block producing information
  * `producedMomentums` of type `number`: number of momentums produced during current epoch
  * `expectedMomentums` of type `number`: expected number of momentums to be produced during current epoch

* `weight` of type `number`: total amount of ZNN delegated to this Pillar

```json
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": [
        {
            "name": "testname1",
            "rank": 0,
            "type": 1,
            "ownerAddress": "z1qz5p95pa8c6wq9pvfkg642gjv4nnaayx6vhm2w",
            "producerAddress": "z1qz5p95pa8c6wq9pvfkg642gjv4nnaayx6vhm2w",
            "withdrawAddress": "z1qz5p95pa8c6wq9pvfkg642gjv4nnaayx6vhm2w",
            "giveMomentumRewardPercentage": 0,
            "giveDelegateRewardPercentage": 100,
            "isRevocable": false,
            "revokeCooldown": 135840,
            "revokeTimestamp": 0,
            "currentStats": {
                "producedMomentums": 0,
                "expectedMomentums": 62
            },
            "weight": 350364710594425
        },
        {
            "name": "testname2",
            "rank": 1,
            "type": 1,
            "ownerAddress": "z1qz3f6svf805tewktk5yf9tn8cdhe2236wdnugk",
            "producerAddress": "z1qqna5fwl9cfd4h7xyg54qdg3nlxgjhntekdlw4",
            "withdrawAddress": "z1qz3f6svf805tewktk5yf9tn8cdhe2236wdnugk",
            "giveMomentumRewardPercentage": 0,
            "giveDelegateRewardPercentage": 100,
            "isRevocable": false,
            "revokeCooldown": 94740,
            "revokeTimestamp": 0,
            "currentStats": {
                "producedMomentums": 0,
                "expectedMomentums": 73
            },
            "weight": 237213658559729
        }
    ]
}
```

### embedded.pillar.getByOwner

> This API call will return all the Pillars registered by an address.

#### Request

One parameter of type `string` that represents the `ownerAddress` of the Pillars.

```json
{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "embedded.pillar.getByOwner",
    "params": ["z1qqna5fwl9cfd4h7xyg54qdg3nlxgjhntekdlw4"]
}
```

#### Response

An `array` of `entries`

Same information as [embedded.pillar.getAll](#embeddedpillargetall)

```json
{
    "jsonrpc": "2.0",
    "id": 4,
    "result": [
        {
            "name": "testName",
            "rank": 14,
            "type": 1,
            "ownerAddress": "z1qqna5fwl9cfd4h7xyg54qdg3nlxgjhntekdlw4",
            "producerAddress": "z1qz3f6svf805tewktk5yf9tn8cdhe2236wdnugk",
            "withdrawAddress": "z1qqna5fwl9cfd4h7xyg54qdg3nlxgjhntekdlw4",
            "giveMomentumRewardPercentage": 5,
            "giveDelegateRewardPercentage": 80,
            "isRevocable": false,
            "revokeCooldown": 85320,
            "revokeTimestamp": 0,
            "currentStats": {
                "producedMomentums": 0,
                "expectedMomentums": 57
            },
            "weight": 25585096075852
        }
    ]
}
```

### embedded.pillar.getByName

> This API call will return information about the Pillar with the specified name.

#### Request

One parameter of type `string` that represents the name of the Pillar.

```json
{
    "jsonrpc": "2.0",
    "id": 5,
    "method": "embedded.pillar.getByName",
    "params": ["VPS_1"]
}
```

#### Response

`JSON` object representing the Pillar:

Same information as [embedded.pillar.getAll](#embeddedpillargetall)

```json
{
    "jsonrpc": "2.0",
    "id": 5,
    "result": {
        "name": "VPS_1",
        "rank": 31,
        "type": 1,
        "ownerAddress": "z1qqdtl63rkhap72nlaymtkemlchwv0ns9ksfjyn",
        "producerAddress": "z1qqdtl63rkhap72nlaymtkemlchwv0ns9ksfjyn",
        "withdrawAddress": "z1qqdtl63rkhap72nlaymtkemlchwv0ns9ksfjyn",
        "giveMomentumRewardPercentage": 10,
        "giveDelegateRewardPercentage": 90,
        "isRevocable": true,
        "revokeCooldown": 8720,
        "revokeTimestamp": 0,
        "currentStats": {
            "producedMomentums": 15,
            "expectedMomentums": 67
        },
        "weight": 32125334226305
    }
}
```

### embedded.pillar.getDelegatedPillar

> This API call will return the total number of delegations for a particular Pillar.

#### Request

One parameter of type `string` that represents the `ownerAddress` of the Pillar.

```json
{
    "jsonrpc": "2.0",
    "id": 8,
    "method": "embedded.pillar.getDelegatedPillar",
    "params": ["z1qqdtl63rkhap72nlaymtkemlchwv0ns9ksfjyn"]
}
```

#### Response

`JSON` object representing the delegation amount:

* `name` of  type `string`: name of the Pillar
* `status` of type `number`: status of the epoch
* `weight` of type `number`: total amount of ZNN delegated to this Pillar

```json
{
    "jsonrpc": "2.0",
    "id": 8,
    "result": {
        "name": "VPS_1",
        "status": 1,
        "weight": 9914999999998
    }
}
```

### embedded.pillar.getDepositedQsr

> This API call will return the amount of QSR deposited that can be used to create a Pillar.

#### Request

`1` parameter of type `string` that represents the address for querying the deposit.

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "embedded.pillar.getDepositedQsr",
    "params": ["z1qqdtl63rkhap72nlaymtkemlchwv0ns9ksfjyn"]
}
```

#### Response

`number` - QSR amount deposited

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": 100000000000
}
```

### embedded.pillar.getUncollectedReward

> This API call will return the uncollected reward for the specified pillar.

#### Request

One parameter of type `string` that represents the `ownerAddress` of the Pillar

```json
{
    "jsonrpc": "2.0",
    "id": 6,
    "method": "embedded.pillar.getUncollectedReward",
    "params": ["z1qqdtl63rkhap72nlaymtkemlchwv0ns9ksfjyn"]
}
```

#### Response

`JSON` object representing the uncollected reward:

* `address` of type `string`: address of the Pillar
* `znnAmount` of type `number`: the ZNN amount that has to be collected
* `qsrAmount` of type `number`: the QSR amount that has to be collected

```json
{
    "jsonrpc": "2.0",
    "id": 6,
    "result": {
        "address": "z1qqdtl63rkhap72nlaymtkemlchwv0ns9ksfjyn",
        "znnAmount": 100000000,
        "qsrAmount": 100000000
    }
}
```

### embedded.pillar.getFrontierRewardByPage

> This API call will return reward information about the specified pillar for a specified range of pages.

#### Request

3 parameters:

* first parameter of type `string` that represents the pillar address
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the number of entries to be displayed on this page

```json
{
    "jsonrpc": "2.0",
    "id": 7,
    "method": "embedded.pillar.getFrontierRewardByPage",
    "params": ["z1qqdtl63rkhap72nlaymtkemlchwv0ns9ksfjyn", 0, 5]
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
        "count": 117,
        "list": [
            {
                "epoch": 116,
                "znnAmount": 1000,
                "qsrAmount": 0
            },
            {
                "epoch": 115,
                "znnAmount": 2000,
                "qsrAmount": 0
            },
            {
                "epoch": 114,
                "znnAmount": 3000,
                "qsrAmount": 0
            },
            {
                "epoch": 113,
                "znnAmount": 4000,
                "qsrAmount": 0
            },
            {
                "epoch": 112,
                "znnAmount": 5000,
                "qsrAmount": 0
            }
        ]
    }
}
```

### embedded.pillar.getPillarEpochHistory

> This API call will return the epoch history for a specific pillar, showing its performance across epochs.

#### Request

3 parameters:
* first parameter of type `string` that represents the pillar name
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 30,
    "method": "embedded.pillar.getPillarEpochHistory",
    "params": ["Pillar1", 0, 10]
}
```

#### Response

* `count` - total number of epoch entries
* `list` - array of pillar epoch history objects containing:
  * `name` - pillar name
  * `epoch` - epoch number
  * `giveBlockRewardPercentage` - percentage of block rewards given to delegators
  * `giveDelegateRewardPercentage` - percentage of delegate rewards given to delegators
  * `producedBlockNum` - number of blocks produced in the epoch
  * `expectedBlockNum` - number of blocks expected to produce
  * `weight` - pillar weight in the epoch

```json
{
    "jsonrpc": "2.0",
    "id": 30,
    "result": {
        "count": 50,
        "list": [
            {
                "name": "Pillar1",
                "epoch": 125,
                "giveBlockRewardPercentage": 0,
                "giveDelegateRewardPercentage": 100,
                "producedBlockNum": 95,
                "expectedBlockNum": 100,
                "weight": 1500000000000
            },
            {
                "name": "Pillar1",
                "epoch": 124,
                "giveBlockRewardPercentage": 0,
                "giveDelegateRewardPercentage": 100,
                "producedBlockNum": 98,
                "expectedBlockNum": 100,
                "weight": 1500000000000
            }
        ]
    }
}
```

### embedded.pillar.getPillarsHistoryByEpoch

> This API call will return the history of all pillars for a specific epoch.

#### Request

3 parameters:
* first parameter of type `number` that represents the epoch number
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 31,
    "method": "embedded.pillar.getPillarsHistoryByEpoch",
    "params": [125, 0, 10]
}
```

#### Response

* `count` - total number of pillars in the epoch
* `list` - array of pillar epoch history objects (same structure as getPillarEpochHistory)

```json
{
    "jsonrpc": "2.0",
    "id": 31,
    "result": {
        "count": 30,
        "list": [
            {
                "name": "Pillar1",
                "epoch": 125,
                "giveBlockRewardPercentage": 0,
                "giveDelegateRewardPercentage": 100,
                "producedBlockNum": 95,
                "expectedBlockNum": 100,
                "weight": 1500000000000
            },
            {
                "name": "Pillar2",
                "epoch": 125,
                "giveBlockRewardPercentage": 10,
                "giveDelegateRewardPercentage": 90,
                "producedBlockNum": 100,
                "expectedBlockNum": 100,
                "weight": 1600000000000
            }
        ]
    }
}
```

---

**Next**: [Plasma Contract →](./plasma)