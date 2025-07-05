---
sidebar_position: 1
title: "Dual Ledger API"
---

# Dual Ledger API

The Dual Ledger API provides methods to interact with Zenon's dual-ledger architecture. This API allows you to query account blocks, momentum blocks, and account information from both the account-chain and momentum-chain components of the network.

## Available Methods

* [ledger.getFrontierAccountBlock](#ledgergetfrontieraccountblock)
* [ledger.getUnconfirmedBlocksByAddress](#ledgergetunconfirmedblocksbyaddress)
* [ledger.getUnreceivedBlocksByAddress](#ledgergetunreceivedblocksbyaddress)
* [ledger.getAccountBlockByHash](#ledgergetaccountblockbyhash)
* [ledger.getAccountBlocksByHeight](#ledgergetaccountblocksbyheight)
* [ledger.getAccountBlocksByPage](#ledgergetaccountblocksbypage)
* [ledger.getFrontierMomentum](#ledgergetfrontiermomentum)
* [ledger.getMomentumBeforeTime](#ledgergetmomentumbeforetime)
* [ledger.getMomentumByHash](#ledgergetmomentumbyhash)
* [ledger.getMomentumsByHeight](#ledgergetmomentumsbyheight)
* [ledger.getMomentumsByPage](#ledgergetmomentumsbypage)
* [ledger.getDetailedMomentumsByHeight](#ledgergetdetailedmomentumsbyheight)
* [ledger.getAccountInfoByAddress](#ledgergetaccountinfobyaddress)

## ledger.getFrontierAccountBlock

> This API call will return the last account block of the specified address

### Request

One parameter of type `string` that represents the address

```json
{
    "jsonrpc": "2.0",
    "id": 25,
    "method": "ledger.getFrontierAccountBlock",
    "params": ["z1qzpa55k8328ff0ys7jfakfvhw8k2cwm53f5d5u"]
}
```

### Response

`JSON` object representing the Frontier Account Block with the following fields:

* `version` of type `number`: current account block version
* `chainIdentifier` of type `number`: network chain identifier
* `blockType` of type `number`: type of the block
* `hash` of type `string`: current account block hash
* `previousHash` of type `string`: hash of the block `height - 1` on this account-chain, `000 ... 00` if `height == 0`
* `height` of type `number`: height of this account-chain
* `momentumAcknowledged` of type `dictionary`: momentum that must exists in order for this transaction to be valid 
  - `hash` of type `string`: hash of the momentum
  - `height` of type `number`: height of the momentum
* `address` of type `string`: address that published this account block
* `toAddress` of type `string`: receiving address
* `amount` of type `number`: ZTS amount
* `tokenStandard` of type `string`: token standard of the coin / token send in the corresponding send block
* `fromBlockHash` of type `string`:
* `descendantBlocks` of type `array` of `dictionaries`: all the account blocks that this block generated for embedded smart contracts, `null` in this case
* `data` of type `string`: `null` in case of default regular transactions, not `null` otherwise
* `fusedPlasma` of type `number`: plasma used for this account block from fusion
* `difficulty` of type `number`: PoW difficulty used to generate PoWPlasma
* `nonce` of type `string`: nonce that satisfies difficulty
* `basePlasma` of type `number`: min plasma for current account block
* `usedPlasma` of type `number`: sum of fusedPlasma and PoWPlasma
* `changesHash` of type `string`: hash of the changes that were applied to the NoM after inserting this account-block
* `publicKey` of type `string`: public key of the account block owner
* `signature` of type `string`: signature of this account block
* `token` of type `dictionary`: contains all the information about the ZTS, as defined in [embedded.token](#embedded.token)
* `confirmationDetail` of type `dictionary`: contains details about the momentum which contains this account-block
  - `numConfirmations` of type `number`: height difference between frontier momentum and confirmation-momentum
  - `momentumHeight` of type `number`: confirmation-momentum height
  - `momentumHash` of type `string`: confirmation-momentum hash
  - `momentumTimestamp` of type `number`: confirmation-momentum timestamp
* `pairedAccountBlock` of type `dictionary`: prefetched account-block. For Receive blocks, points to the send block. For send blocks, points to the receive block if it exists. otherwise is null.

```json
{
    "jsonrpc": "2.0",
    "id": 25,
    "result": {
        "version": 1,
        "chainIdentifier": 3,
        "blockType": 2,
        "hash": "578ddd15e6ee8c08d31575392c6d9901823ac13f9d6a50ef2eeb89b101b2db1d",
        "previousHash": "f3036bb04c91ea67a2950dde2b097e35267ab616417a1e48095b298f45a661e3",
        "height": 150,
        "momentumAcknowledged": {
            "hash": "24f1339df42935a57356e00aa8bfa183ed5b86a6aa7da8ee646ebd03e7a72c40",
            "height": 33410
        },
        "address": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
        "toAddress": "z1qxemdeddedxlyquydytyxxxxxxxxxxxxflaaae",
        "amount": 0,
        "tokenStandard": "zts1qqqqqqqqqqqqqqqqtq587y",
        "fromBlockHash": "0000000000000000000000000000000000000000000000000000000000000000",
        "descendantBlocks": [],
        "data": "IAk+pg==",
        "fusedPlasma": 52500,
        "difficulty": 0,
        "nonce": "0000000000000000",
        "basePlasma": 52500,
        "usedPlasma": 52500,
        "changesHash": "b12a4749287b75a264e8e42be84c53d792c83fbf6d9a3f921d650ae78cd3785d",
        "publicKey": "6zoCw5uZaS4N2eJlqGh2SmgSJbh5mJNY8aOgKLWl+D4=",
        "signature": "To0tLosaVbRcXhjzImPusxn1YKuK6nmpzbDNZDvonyu5bErAFVq1/Mhy47xbq+QRzTmWNb5BanXPxIsrLjdUDg==",
        "token": null,
        "confirmationDetail": {
            "numConfirmations": 996,
            "momentumHeight": 33411,
            "momentumHash": "0de0a593358ab4860f4349c54f8e4f975edecd90e85b87c67f3f26dba7ff1ced",
            "momentumTimestamp": 1637588850
        },
        "pairedAccountBlock": {
            "version": 1,
            "chainIdentifier": 3,
            "blockType": 5,
            "hash": "a02d89c57b7571fb76159dcb3fb30c31aa9ae11f57d01da3fafc7808b0f1eec1",
            "previousHash": "81507dab31bb0bbe8e14aa886bd445037464e7e57f6feab531b8fcb91ad13d0f",
            "height": 123,
            "momentumAcknowledged": {
                "hash": "0de0a593358ab4860f4349c54f8e4f975edecd90e85b87c67f3f26dba7ff1ced",
                "height": 33411
            },
            "address": "z1qxemdeddedxlyquydytyxxxxxxxxxxxxflaaae",
            "toAddress": "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
            "amount": 0,
            "tokenStandard": "zts1qqqqqqqqqqqqqqqqtq587y",
            "fromBlockHash": "578ddd15e6ee8c08d31575392c6d9901823ac13f9d6a50ef2eeb89b101b2db1d",
            "descendantBlocks": [],
            "data": "AAAAAAAAAAE=",
            "fusedPlasma": 0,
            "difficulty": 0,
            "nonce": "0000000000000000",
            "basePlasma": 0,
            "usedPlasma": 0,
            "changesHash": "f24bb794df99f5a727ced81f2f78259ab1c8a0909e06af0eb69aa142afea605e",
            "publicKey": null,
            "signature": null,
            "token": null,
            "confirmationDetail": {
                "numConfirmations": 995,
                "momentumHeight": 33412,
                "momentumHash": "2e3c8e22911a19854cc727c598e9576b29aaf1da0441db3f22d1abab391adc26",
                "momentumTimestamp": 1637588860
            },
            "pairedAccountBlock": null
        }
    }
}
```

## ledger.getUnconfirmedBlocksByAddress

> This API call will return a list of all account blocks sent to this address that have not been included into a momentum so far

### Request

3 parameters:

* first parameter of type `string` that represents the address
* second parameter of type `number` that represents the page
* third parameter of type `number` that represents the number of entries to be displayed on this page

```json
{
    "jsonrpc": "2.0",
    "id": 26,
    "method": "ledger.getUnconfirmedBlocksByAddress",
    "params": ["z1qz3f6svf805tewktk5yf9tn8cdhe2236wdnugk", 0, 1]
}
```

### Response

An array of `entries`:

* `list` of type `array`: array containing same information as [embedded.ledger.getFrontierAccountBlock](#embeddedledgergetfrontieraccountblock)
* `count` of type `int`: number of unconfirmed account blocks in total
* `more` of type `bool`: whether there are more unconfirmed account blocks

```json
{
    "jsonrpc": "2.0",
    "id": 26,
    "result": {
        "list": [
            {
                "version": 1,
                "chainIdentifier": 3,
                "blockType": 4,
                "hash": "12514c8f80b6740455b6486aea6f1da2c05edb819ec780d39fd7827e3b904557",
                "previousHash": "ddd81c83b687f6d6c66897cf32c5f04e7428dec9bc296450887fdbf924aa92f0",
                "height": 25,
                "momentumAcknowledged": {
                    "hash": "3077eff5d46281f277d7a421446f74868f7bffaac36a718e24d971c0b43c3655",
                    "height": 32540
                },
                "address": "z1qxemdeddedxt0kenxxxxxxxxxxxxxxxxh9amk0",
                "toAddress": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
                "amount": 1234567890,
                "tokenStandard": "zts17ejv0drss06n5qz7ccad24",
                "fromBlockHash": "0000000000000000000000000000000000000000000000000000000000000000",
                "descendantBlocks": [],
                "data": "",
                "fusedPlasma": 0,
                "difficulty": 0,
                "nonce": "0000000000000000",
                "basePlasma": 0,
                "usedPlasma": 0,
                "changesHash": "0000000000000000000000000000000000000000000000000000000000000000",
                "publicKey": null,
                "signature": null,
                "token": {
                    "name": "ZenonWikiToken",
                    "symbol": "ZWT",
                    "domain": "zenon.wiki",
                    "totalSupply": 1234567890,
                    "decimals": 8,
                    "owner": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
                    "tokenStandard": "zts17ejv0drss06n5qz7ccad24",
                    "maxSupply": 1234567890,
                    "isBurnable": true,
                    "isMintable": false,
                    "isUtility": true
                },
                "confirmationDetail": {
                    "numConfirmations": 2044,
                    "momentumHeight": 32541,
                    "momentumHash": "ea104a85df9e6effc91ff7633ffc2950a4382554ed475cae362b0160b61f43ca",
                    "momentumTimestamp": 1637580150
                },
                "pairedAccountBlock": null
            }
        ],
        "count": 2,
        "more": false
    }
}
```

## ledger.getUnreceivedBlocksByAddress

> This API call will return a list of all account blocks sent to this address that currently don't have a corresponding receive account block

### Request

3 parameters:

* first parameter of type `string` that represents the address
* second parameter of type `number` that represents the page
* third parameter of type `number` that represents the number of entries to be displayed on this page

```json
{
    "jsonrpc": "2.0",
    "id": 27,
    "method": "ledger.getUnreceivedBlocksByAddress",
    "params": ["z1qqna5fwl9cfd4h7xyg54qdg3nlxgjhntekdlw4", 0, 5]
}
```

### Response

Same information as [embedded.ledger.getUnconfirmedBlocksByAddress](#embeddedledgergetunconfirmedblocksbyaddress)

```json
{
    "jsonrpc": "2.0",
    "id": 27,
    "result": {
        "list": [
            {
                "version": 1,
                "chainIdentifier": 3,
                "blockType": 4,
                "hash": "12514c8f80b6740455b6486aea6f1da2c05edb819ec780d39fd7827e3b904557",
                "previousHash": "ddd81c83b687f6d6c66897cf32c5f04e7428dec9bc296450887fdbf924aa92f0",
                "height": 25,
                "momentumAcknowledged": {
                    "hash": "3077eff5d46281f277d7a421446f74868f7bffaac36a718e24d971c0b43c3655",
                    "height": 32540
                },
                "address": "z1qxemdeddedxt0kenxxxxxxxxxxxxxxxxh9amk0",
                "toAddress": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
                "amount": 1234567890,
                "tokenStandard": "zts17ejv0drss06n5qz7ccad24",
                "fromBlockHash": "0000000000000000000000000000000000000000000000000000000000000000",
                "descendantBlocks": [],
                "data": "",
                "fusedPlasma": 0,
                "difficulty": 0,
                "nonce": "0000000000000000",
                "basePlasma": 0,
                "usedPlasma": 0,
                "changesHash": "0000000000000000000000000000000000000000000000000000000000000000",
                "publicKey": null,
                "signature": null,
                "token": {
                    "name": "ZenonWikiToken",
                    "symbol": "ZWT",
                    "domain": "zenon.wiki",
                    "totalSupply": 1234567890,
                    "decimals": 8,
                    "owner": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
                    "tokenStandard": "zts17ejv0drss06n5qz7ccad24",
                    "maxSupply": 1234567890,
                    "isBurnable": true,
                    "isMintable": false,
                    "isUtility": true
                },
                "confirmationDetail": {
                    "numConfirmations": 2092,
                    "momentumHeight": 32541,
                    "momentumHash": "ea104a85df9e6effc91ff7633ffc2950a4382554ed475cae362b0160b61f43ca",
                    "momentumTimestamp": 1637580150
                },
                "pairedAccountBlock": null
            }
        ],
        "count": 2,
        "more": false
    }
}
```

## ledger.getAccountBlockByHash

> This API call will return information about the account block with the specified hash

### Request

One parameter of type `string` that represents the hash

```json
{
    "jsonrpc": "2.0",
    "id": 28,
    "method": "ledger.getAccountBlockByHash",
    "params": ["e543ecc94dc51f68eda9de0ec8ee94ad00ca4608df7b4d3c34b31511811be965"]
}
```

### Response

Same information as [ledger.getFrontierAccountBlock](#ledgergetfrontieraccountblock)

```json
{
    "jsonrpc": "2.0",
    "id": 28,
    "result": {
        "version": 1,
        "chainIdentifier": 3,
        "blockType": 4,
        "hash": "12514c8f80b6740455b6486aea6f1da2c05edb819ec780d39fd7827e3b904557",
        "previousHash": "ddd81c83b687f6d6c66897cf32c5f04e7428dec9bc296450887fdbf924aa92f0",
        "height": 25,
        "momentumAcknowledged": {
            "hash": "3077eff5d46281f277d7a421446f74868f7bffaac36a718e24d971c0b43c3655",
            "height": 32540
        },
        "address": "z1qxemdeddedxt0kenxxxxxxxxxxxxxxxxh9amk0",
        "toAddress": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
        "amount": 1234567890,
        "tokenStandard": "zts17ejv0drss06n5qz7ccad24",
        "fromBlockHash": "0000000000000000000000000000000000000000000000000000000000000000",
        "descendantBlocks": [],
        "data": "",
        "fusedPlasma": 0,
        "difficulty": 0,
        "nonce": "0000000000000000",
        "basePlasma": 0,
        "usedPlasma": 0,
        "changesHash": "0000000000000000000000000000000000000000000000000000000000000000",
        "publicKey": null,
        "signature": null,
        "token": {
            "name": "ZenonWikiToken",
            "symbol": "ZWT",
            "domain": "zenon.wiki",
            "totalSupply": 1234567890,
            "decimals": 8,
            "owner": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
            "tokenStandard": "zts17ejv0drss06n5qz7ccad24",
            "maxSupply": 1234567890,
            "isBurnable": true,
            "isMintable": false,
            "isUtility": true
        },
        "confirmationDetail": {
            "numConfirmations": 2102,
            "momentumHeight": 32541,
            "momentumHash": "ea104a85df9e6effc91ff7633ffc2950a4382554ed475cae362b0160b61f43ca",
            "momentumTimestamp": 1637580150
        },
        "pairedAccountBlock": null
    }
}
```

## ledger.getAccountBlocksByHeight

> This API call will return a list of account blocks for the account-chain with the specified address

### Request

3 parameters:

* first parameter of type `string` that represents the address
* second parameter of type `number` that represents the starting height
* third parameter of type `number` that represents the count

```json
{
    "jsonrpc": "2.0",
    "id": 29,
    "method": "ledger.getAccountBlocksByHeight",
    "params": ["z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt", 25, 1]
}
```

### Response

Same information as [embedded.ledger.getUnconfirmedBlocksByAddress](#embeddedledgergetunconfirmedblocksbyaddress)

```json
{
    "jsonrpc": "2.0",
    "id": 29,
    "result": {
        "list": [
            {
                "version": 1,
                "chainIdentifier": 3,
                "blockType": 2,
                "hash": "e86390533149b969d3beb3887241caf4aa690175603cae13271befdcd368a7aa",
                "previousHash": "bf96b8fe86229e9866a660d9340b5088e8bf61818831c54785bbf6eb1beebe2e",
                "height": 25,
                "momentumAcknowledged": {
                    "hash": "7b97a15bf49f48cf8b13831117cfe3786044c3e5f7b5220d9698c587bc97cbd5",
                    "height": 5417
                },
                "address": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
                "toAddress": "z1qxemdeddedxstakexxxxxxxxxxxxxxxxjv8v62",
                "amount": 0,
                "tokenStandard": "zts1qqqqqqqqqqqqqqqqtq587y",
                "fromBlockHash": "0000000000000000000000000000000000000000000000000000000000000000",
                "descendantBlocks": [],
                "data": "IAk+pg==",
                "fusedPlasma": 52500,
                "difficulty": 0,
                "nonce": "0000000000000000",
                "basePlasma": 52500,
                "usedPlasma": 52500,
                "changesHash": "0aa24240f88d6081daaba6c579ac31b2f6af55602cd3faf71db250f462b7a02f",
                "publicKey": "6zoCw5uZaS4N2eJlqGh2SmgSJbh5mJNY8aOgKLWl+D4=",
                "signature": "nF2oI/UA+ukvgUUAj//bn5FiJRRkiwRXr94pRHOzvI6WQgEfd/7AcMIUKc5BgJ8GajaO9B2O1i5lIOeDIO/7AQ==",
                "token": null,
                "confirmationDetail": {
                    "numConfirmations": 29264,
                    "momentumHeight": 5418,
                    "momentumHash": "8443608ae19195a4e92924fde8d67c3371bc045ccfc23950e86c7b224c9cfb06",
                    "momentumTimestamp": 1637308410
                },
                "pairedAccountBlock": {
                    "version": 1,
                    "chainIdentifier": 3,
                    "blockType": 5,
                    "hash": "341d7f182b230e55762b1d018b2fe8492ce3de10a9e38fea2b15afd239ccc591",
                    "previousHash": "d98500d9bdf4c0f6bb93920aa9eae50ff688566bb0463d6dbf18bfc858882b94",
                    "height": 21,
                    "momentumAcknowledged": {
                        "hash": "8443608ae19195a4e92924fde8d67c3371bc045ccfc23950e86c7b224c9cfb06",
                        "height": 5418
                    },
                    "address": "z1qxemdeddedxstakexxxxxxxxxxxxxxxxjv8v62",
                    "toAddress": "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
                    "amount": 0,
                    "tokenStandard": "zts1qqqqqqqqqqqqqqqqtq587y",
                    "fromBlockHash": "e86390533149b969d3beb3887241caf4aa690175603cae13271befdcd368a7aa",
                    "descendantBlocks": [],
                    "data": "AAAAAAAAAAE=",
                    "fusedPlasma": 0,
                    "difficulty": 0,
                    "nonce": "0000000000000000",
                    "basePlasma": 0,
                    "usedPlasma": 0,
                    "changesHash": "eec1a5c050310df429a6f26b56b3dfd6d9d26d1192fcf17100c477302be9190b",
                    "publicKey": null,
                    "signature": null,
                    "token": null,
                    "confirmationDetail": {
                        "numConfirmations": 29263,
                        "momentumHeight": 5419,
                        "momentumHash": "43c8e4edd0e4ef0ebccea8186495e2ec6a76ad58e5490938930327788c3add38",
                        "momentumTimestamp": 1637308420
                    },
                    "pairedAccountBlock": null
                }
            }
        ],
        "count": 150,
        "more": false
    }
}
```

## ledger.getAccountBlocksByPage

> This API call will return a list of account blocks for the account-chain with the specified address for a specified range of pages.

### Request

3 parameters:

* first parameter of type `string` that represents the address
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the number of entries to be displayed on this page

```json
{
    "jsonrpc": "2.0",
    "id": 30,
    "method": "ledger.getAccountBlocksByPage",
    "params": ["z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt", 0, 1]
}
```

### Response

Same information as [embedded.ledger.getUnconfirmedBlocksByAddress](#embeddedledgergetunconfirmedblocksbyaddress)

```json
{
    "jsonrpc": "2.0",
    "id": 30,
    "result": {
        "list": [
            {
                "version": 1,
                "chainIdentifier": 3,
                "blockType": 2,
                "hash": "578ddd15e6ee8c08d31575392c6d9901823ac13f9d6a50ef2eeb89b101b2db1d",
                "previousHash": "f3036bb04c91ea67a2950dde2b097e35267ab616417a1e48095b298f45a661e3",
                "height": 150,
                "momentumAcknowledged": {
                    "hash": "24f1339df42935a57356e00aa8bfa183ed5b86a6aa7da8ee646ebd03e7a72c40",
                    "height": 33410
                },
                "address": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
                "toAddress": "z1qxemdeddedxlyquydytyxxxxxxxxxxxxflaaae",
                "amount": 0,
                "tokenStandard": "zts1qqqqqqqqqqqqqqqqtq587y",
                "fromBlockHash": "0000000000000000000000000000000000000000000000000000000000000000",
                "descendantBlocks": [],
                "data": "IAk+pg==",
                "fusedPlasma": 52500,
                "difficulty": 0,
                "nonce": "0000000000000000",
                "basePlasma": 52500,
                "usedPlasma": 52500,
                "changesHash": "b12a4749287b75a264e8e42be84c53d792c83fbf6d9a3f921d650ae78cd3785d",
                "publicKey": "6zoCw5uZaS4N2eJlqGh2SmgSJbh5mJNY8aOgKLWl+D4=",
                "signature": "To0tLosaVbRcXhjzImPusxn1YKuK6nmpzbDNZDvonyu5bErAFVq1/Mhy47xbq+QRzTmWNb5BanXPxIsrLjdUDg==",
                "token": null,
                "confirmationDetail": {
                    "numConfirmations": 1289,
                    "momentumHeight": 33411,
                    "momentumHash": "0de0a593358ab4860f4349c54f8e4f975edecd90e85b87c67f3f26dba7ff1ced",
                    "momentumTimestamp": 1637588850
                },
                "pairedAccountBlock": {
                    "version": 1,
                    "chainIdentifier": 3,
                    "blockType": 5,
                    "hash": "a02d89c57b7571fb76159dcb3fb30c31aa9ae11f57d01da3fafc7808b0f1eec1",
                    "previousHash": "81507dab31bb0bbe8e14aa886bd445037464e7e57f6feab531b8fcb91ad13d0f",
                    "height": 123,
                    "momentumAcknowledged": {
                        "hash": "0de0a593358ab4860f4349c54f8e4f975edecd90e85b87c67f3f26dba7ff1ced",
                        "height": 33411
                    },
                    "address": "z1qxemdeddedxlyquydytyxxxxxxxxxxxxflaaae",
                    "toAddress": "z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f",
                    "amount": 0,
                    "tokenStandard": "zts1qqqqqqqqqqqqqqqqtq587y",
                    "fromBlockHash": "578ddd15e6ee8c08d31575392c6d9901823ac13f9d6a50ef2eeb89b101b2db1d",
                    "descendantBlocks": [],
                    "data": "AAAAAAAAAAE=",
                    "fusedPlasma": 0,
                    "difficulty": 0,
                    "nonce": "0000000000000000",
                    "basePlasma": 0,
                    "usedPlasma": 0,
                    "changesHash": "f24bb794df99f5a727ced81f2f78259ab1c8a0909e06af0eb69aa142afea605e",
                    "publicKey": null,
                    "signature": null,
                    "token": null,
                    "confirmationDetail": {
                        "numConfirmations": 1288,
                        "momentumHeight": 33412,
                        "momentumHash": "2e3c8e22911a19854cc727c598e9576b29aaf1da0441db3f22d1abab391adc26",
                        "momentumTimestamp": 1637588860
                    },
                    "pairedAccountBlock": null
                }
            }
        ],
        "count": 150,
        "more": false
    }
}
```

## ledger.getFrontierMomentum

> This API call will return the latest momentum

### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 31,
    "method": "ledger.getFrontierMomentum",
    "params": []
}
```

### Response

`JSON` object representing the frontier momentum:

* `version` of type `number`: momentum version
* `chainIdentifier` of type `number`: network chain identifier
* `hash` of type `string`: hash of the momentum
* `previousHash` of type `string`: hash of the `height - 1` momentum
* `height` of type `number`: height of the momentum
* `timestamp` of type `number`: UNIX timestamp of accepted momentum
* `data` of type `string`: encoded smart contract data
* `content` of type `dictionary`: contains a list of account blocks that are included in this momentum
* `changesHash` of type `string`: hash of the changes that were applied to the NoM after inserting this momentum
* `publicKey` of type `string`: public key of the producer
* `signature` of type `string`: signature of the momentum
* `producer` of type `string`: `producerAddress` of the Pillar that produced this momentum

```json
{
    "jsonrpc": "2.0",
    "id": 31,
    "result": {
        "version": 1,
        "chainIdentifier": 3,
        "hash": "3e890162362a03dca5df079fc2d5991c128d8980d6d7d68e019565023c55ec1a",
        "previousHash": "001f3fab94417e5d4f1159428395785f4f0622b4d6f96d0cf7bcaa22d634e76c",
        "height": 34715,
        "timestamp": 1637601890,
        "data": "",
        "content": [],
        "changesHash": "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a",
        "publicKey": "aBOWZfktDI3QxgMh9df0HpX2wns4mZtKrDKUIYvgK+I=",
        "signature": "nfnOscPt+kfCJjYJVTGxDWPSwUrT9micsiecyOQ2eqoT5jUB9MnK1eUrJmk/Qq9yGNZD1pUZhijsctcDcymXDQ==",
        "producer": "z1qqmqp40duzvtxvg7dwxph7724mq63t3mru297p"
    }
}
```

## ledger.getMomentumBeforeTime

> This API call will return the momentum for the period before the specified time

### Request

One parameter of type `number` that represents the time

```json
{
    "jsonrpc": "2.0",
    "id": 32,
    "method": "ledger.getMomentumBeforeTime",
    "params": [1833524084]
}
```

### Response

Same information as [ledger.getFrontierMomentum](#ledgergetfrontiermomentum)

```json
{
    "jsonrpc": "2.0",
    "id": 32,
    "result": {
        "version": 1,
        "chainIdentifier": 3,
        "hash": "b11bc2190922f0c9bcc89a338f2127b53a7adb1d3f7d4b2a53d6a25881acc146",
        "previousHash": "f21fc76bb57acdbbc4041eeee901b4b62b2819c4dd7db35c5a0052f0429977ba",
        "height": 34745,
        "timestamp": 1637602190,
        "data": "",
        "content": [],
        "changesHash": "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a",
        "publicKey": "aBOWZfktDI3QxgMh9df0HpX2wns4mZtKrDKUIYvgK+I=",
        "signature": "64rGI8PqSlxd5x3fyCRRZx0PY233S6pvlA3vNG40IGwaP8qK5P++pV1DqNu6CmksMkS+NWFMFuiT4bwOmMwJAQ==",
        "producer": "z1qqmqp40duzvtxvg7dwxph7724mq63t3mru297p"
    }
}
```

## ledger.getMomentumsByPage

> This API call will return momentums by page

### Request

2 parameters:

* first parameter of type `number` that represents the page index
* second parameter of type `number` that represents the number of entries to be displayed on this page

```json
{
  "jsonrpc": "2.0",
  "id": 33,
  "method": "ledger.getMomentumsByPage",
  "params": [0, 2]
}
```

### Response

An array of `entries`:

* `list` of type `array`: array containing same information as [ledger.getFrontierMomentum](#ledgergetfrontiermomentum)
* `count` of type `int`: number of momentums in total

```json
{
    "jsonrpc": "2.0",
    "id": 33,
    "result": {
        "list": [
            {
                "version": 1,
                "chainIdentifier": 3,
                "hash": "cd91bd8c8cfbfb7e2b71eee2995d24a2cdec692d04f432951fe1245101d90e53",
                "previousHash": "250201abea9599da729a913491222d78604bf79f0e45f39a99b8fb9f5ada0865",
                "height": 34757,
                "timestamp": 1637602310,
                "data": "",
                "content": [],
                "changesHash": "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a",
                "publicKey": "aBOWZfktDI3QxgMh9df0HpX2wns4mZtKrDKUIYvgK+I=",
                "signature": "EgXaAhFEmBrEgjrxG8Bvl1SvlK/sD6kAINfR8hxsq4uqfQb5Kv3OdOao4S5v2u9J5L8lH0S+rMxWyCqPgilZCA==",
                "producer": "z1qqmqp40duzvtxvg7dwxph7724mq63t3mru297p"
            },
            {
                "version": 1,
                "chainIdentifier": 3,
                "hash": "250201abea9599da729a913491222d78604bf79f0e45f39a99b8fb9f5ada0865",
                "previousHash": "5e814b9d78978e27878f0b1605739bb95ea5a1b43711d1216ee1fe29004d8e2e",
                "height": 34756,
                "timestamp": 1637602300,
                "data": "",
                "content": [],
                "changesHash": "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a",
                "publicKey": "6zoCw5uZaS4N2eJlqGh2SmgSJbh5mJNY8aOgKLWl+D4=",
                "signature": "HJd+ZMr370tZv/hJJdCzSCKuRf6Bf7ijYPimZ6buBucBFfA4w4mQkDSZV5N1lqjFND+2KJ2+IuOdTBoiYRV1AQ==",
                "producer": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt"
            }
        ],
        "count": 34757
    }
}
```

## ledger.getMomentumByHash

> This API call will return the momentum with the specified hash

### Request

One parameter of type `string` that represents the hash of the momentum

```json
{
    "jsonrpc": "2.0",
    "id": 34,
    "method": "ledger.getMomentumByHash",
    "params": ["cd91bd8c8cfbfb7e2b71eee2995d24a2cdec692d04f432951fe1245101d90e53"]
}
```

### Response

Same information as [ledger.getFrontierMomentum](#ledgergetfrontiermomentum)

```json
{
    "jsonrpc": "2.0",
    "id": 34,
    "result": {
        "version": 1,
        "chainIdentifier": 3,
        "hash": "cd91bd8c8cfbfb7e2b71eee2995d24a2cdec692d04f432951fe1245101d90e53",
        "previousHash": "250201abea9599da729a913491222d78604bf79f0e45f39a99b8fb9f5ada0865",
        "height": 34757,
        "timestamp": 1637602310,
        "data": "",
        "content": [],
        "changesHash": "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a",
        "publicKey": "aBOWZfktDI3QxgMh9df0HpX2wns4mZtKrDKUIYvgK+I=",
        "signature": "EgXaAhFEmBrEgjrxG8Bvl1SvlK/sD6kAINfR8hxsq4uqfQb5Kv3OdOao4S5v2u9J5L8lH0S+rMxWyCqPgilZCA==",
        "producer": "z1qqmqp40duzvtxvg7dwxph7724mq63t3mru297p"
    }
}
```

## ledger.getMomentumsByHeight

> This API call will return a list of momentums from `height` to `height + count`

### Request

2 parameters:

* first parameter of type `number` that represents the height
* second parameter of type `number` that represents the count

```json
{
    "jsonrpc": "2.0",
    "id": 35,
    "method": "ledger.getMomentumsByHeight",
    "params": [34757, 1]
}
```

### Response

Same information as [ledger.getMomentumsByPage](#ledgergetmomentumsbypage)

```json
{
    "jsonrpc": "2.0",
    "id": 35,
    "result": {
        "list": [
            {
                "version": 1,
                "chainIdentifier": 3,
                "hash": "cd91bd8c8cfbfb7e2b71eee2995d24a2cdec692d04f432951fe1245101d90e53",
                "previousHash": "250201abea9599da729a913491222d78604bf79f0e45f39a99b8fb9f5ada0865",
                "height": 34757,
                "timestamp": 1637602310,
                "data": "",
                "content": [],
                "changesHash": "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a",
                "publicKey": "aBOWZfktDI3QxgMh9df0HpX2wns4mZtKrDKUIYvgK+I=",
                "signature": "EgXaAhFEmBrEgjrxG8Bvl1SvlK/sD6kAINfR8hxsq4uqfQb5Kv3OdOao4S5v2u9J5L8lH0S+rMxWyCqPgilZCA==",
                "producer": "z1qqmqp40duzvtxvg7dwxph7724mq63t3mru297p"
            }
        ],
        "count": 34803
    }
}
```

## ledger.getDetailedMomentumsByHeight

> This API call will return a list of momentums from `height` to `height + count` with information about the account blocks they contain

### Request

2 parameters:

* first parameter of type `number` that represents the height
* second parameter of type `number` that represents the count

```json
{
    "jsonrpc": "2.0",
    "id": 36,
    "method": "ledger.getDetailedMomentumsByHeight",
    "params": [2, 1]
}
```

### Response
`JSON` object representing the detailed momentums:

* `count` of type `number`: the total number of momentums
* an array of entries for the rewards with the following fields:
  - `blocks` of type `array` of dictionaries: contains all the blocks inserted in the momentum
  - `momentum` of type `dictionary`: same information as [ledger.getFrontierMomentum](#ledgergetfrontiermomentum)

```json
{
    "jsonrpc": "2.0",
    "id": 36,
    "result": {
        "list": [
            {
                "blocks": [],
                "momentum": {
                    "version": 1,
                    "chainIdentifier": 3,
                    "hash": "5efd0e49736f2a1ff7eeef3e3e73fbbb087471ff1097d2e41041942adccdec93",
                    "previousHash": "761f482683e6d0ed1f92af1140418b989b89c474d3491a2f4651bce99954bed6",
                    "height": 2,
                    "timestamp": 1637252770,
                    "data": "",
                    "content": [],
                    "changesHash": "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a",
                    "publicKey": "aBOWZfktDI3QxgMh9df0HpX2wns4mZtKrDKUIYvgK+I=",
                    "signature": "B+NBitwhrRlJ6rYVMwqcjfHkJ/sz0hjwcDiLDpPUP93DtEzRZ9UvL9JxFJr5ZGophGd/jgTZvf0W8CrIGORFBw==",
                    "producer": "z1qqmqp40duzvtxvg7dwxph7724mq63t3mru297p"
                }
            }
        ],
        "count": 34818
    }
}
```

## ledger.getAccountInfoByAddress

> This API call will return information about the account-chain of the specified address

### Request

One parameter of type `string` that represents the address

```json
{
    "jsonrpc": "2.0",
    "id": 37,
    "method": "ledger.getAccountInfoByAddress",
    "params": ["z1qz5p95pa8c6wq9pvfkg642gjv4nnaayx6vhm2w"]
}
```

### Response

* `address` of type `string`: account-chain address
* `accountHeight` of type `number`: height of the account-chain
* `balanceInfoMap` of type `dictionary`: information about ZTS

```json
{
    "jsonrpc": "2.0",
    "id": 37,
    "result": {
        "address": "z1qz5p95pa8c6wq9pvfkg642gjv4nnaayx6vhm2w",
        "accountHeight": 0,
        "balanceInfoMap": {}
    }
}
```