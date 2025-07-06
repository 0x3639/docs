---
sidebar_position: 3
title: Plasma Contract
---

# Plasma RPC API

The Plasma contract manages Plasma generation for transaction processing in the Zenon Network. Plasma is required for sending transactions and can be generated through Proof of Work (PoW) or by fusing QSR.

## Methods

* [embedded.plasma.get](#embeddedplasmaget)
* [embedded.plasma.getEntriesByAddress](#embeddedplasmagetentriesbyaddress)
* [embedded.plasma.getRequiredPoWForAccountBlock](#embeddedplasmagetrequiredpowforaccountblock)

### embedded.plasma.get

> This API call will return plasma information about an address.

#### Request

One parameter of type `string` that represents the address.

```json
{
    "jsonrpc": "2.0",
    "id": 11,
    "method": "embedded.plasma.get",
    "params": ["z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9"]
}
```

#### Response

* `currentPlasma` of type `number`: available plasma that can be consumed by the address
* `maxPlasma` of type `number`: the maximum plasma that can be accumulated
* `qsrAmount` of type `number`: the amount of QSR fused to the address to generate plasma

```json
{
    "jsonrpc": "2.0",
    "id": 11,
    "result": {
        "currentPlasma": 1701000,
        "maxPlasma": 1701000,
        "qsrAmount": "81000000000"
    }
}
```

### embedded.plasma.getEntriesByAddress

> This API call will return a list of plasma fusion entries for a given address.

#### Request

* first parameter of type `string` that represents the address
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the number of entries to be displayed on this page

```json
{
    "jsonrpc": "2.0",
    "id": 10,
    "method": "embedded.plasma.getEntriesByAddress",
    "params": ["z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9", 0, 5]
}
```

#### Response

* `count` of type `number`: the total number of the entries
* `list` - an array of `QSR fusion` entries
* `qsrAmount` of type `number`: the amount of QSR used for the fusion
* `beneficiary` of type `string`: the address that can use the plasma
* `expirationHeight` of type `number`: the momentum height when the fusion expires
* `id` of type `string`: the hash of the fusion entry

```json
{
    "jsonrpc": "2.0",
    "id": 10,
    "result": {
        "qsrAmount": "324000000000",
        "count": 15,
        "list": [
            {
                "qsrAmount": "15000000000",
                "beneficiary": "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9",
                "expirationHeight": 3265557,
                "id": "ec8913ffb3aac7eb08aea693b724e19f961ea42be87fd86840a159926a88b8db"
            },
            {
                "qsrAmount": "30000000000",
                "beneficiary": "z1qqrzv35d4wk6n7fkfygay5g2zpgxyaamk84rla",
                "expirationHeight": 4504195,
                "id": "4d9a97679424613c15de8bf8ba3efae31b7cbb77cbbd28e3ec2fbfc416a363bf"
            }
        ]
    }
}
```

### embedded.plasma.getRequiredPoWForAccountBlock

> This API call will return the required proof-of-work to be computed in order to send a block from an address.

#### Request

* `address` of type `string`: address used to send the transaction
* `blockType` of type `number`: the account-block type: `1` for normal send blocks, `2` for receive
* `toAddress` of type `string`: receiver address
* `data` of type `string`: call data for smart contracts

```json
{
    "jsonrpc": "2.0",
    "id": 22,
    "method": "embedded.plasma.getRequiredPoWForAccountBlock",
    "params": {
        "address": "z1qph8dkzgq53e7jz5pgyp3njzm9rw0x3n5mxmgj",
        "blockType": 2,
        "toAddress": "z1qxemdeddedxlyquydytyxxxxxxxxxxxxflaaae",
        "data": ""
    }
}
```

#### Response

* `availablePlasma` of type `number`: total plasma available to the account
* `basePlasma` of type `number`: base plasma cost for the transaction
* `requiredDifficulty` of type `number`: proof-of-work difficulty required to send the transaction

```json
{
    "jsonrpc": "2.0",
    "id": 22,
    "result": {
        "availablePlasma": 0,
        "basePlasma": 21000,
        "requiredDifficulty": 32
    }
}
```

---

**Previous**: [← Pillar Contract](./pillar) | **Next**: [Sentinel Contract →](./sentinel)