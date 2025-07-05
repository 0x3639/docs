---
sidebar_position: 5
title: Token
---

# Token RPC API

## embedded.token

* [embedded.token.getAll](#embeddedtokengetall)
* [embedded.token.getByOwner](#embeddedtokengetbyowner)
* [embedded.token.getByZts](#embeddedtokengetbyzts)

### embedded.token.getAll

> This API call will return a list of all ZTS tokens

#### Request

2 parameters:

* first parameter of type `number` that represents the page
* second parameter of type `number` that represents the number of entries

```json
{
    "jsonrpc": "2.0",
    "id": 22,
    "method": "embedded.token.getAll",
    "params": [0, 2]
}
```

#### Response

An array of `entries`:

* `count` of type `number`: total number of ZTS tokens
* `list` of type `array`: array containing information about each token ordered by creation time. Each entry is defined by the following fields:
    - `name` of type `string`: name of the ZTS token
    - `symbol` of type `string`: symbol of the ZTS token
    - `domain` of type `string`: that represent a valid web domain
    - `totalSupply` of type `number`: circulating supply
    - `decimals` of type `number`: number of decimals
    - `owner` of type `string`: address that issued this token
    - `tokenStandard` of type `string`: unique identifier of this ZTS
    - `maxSupply` of type `number`: maximum supply
    - `isBurnable` of type `bool`: `true` if it can be burned by any holder, `false` if it can be burned only by its owner
    - `isMintable` of type `bool`: `true` if the owner can increase the supply by minting, `false` otherwise
    - `isUtility` of type `bool`: `true` if the token is utilty, `false` otherwise

```json
{
    "jsonrpc": "2.0",
    "id": 22,
    "result": {
        "count": 200,
        "list": [
            {
                "name": "testToken1",
                "symbol": "test1",
                "domain": "zenon.network",
                "totalSupply": 3000305500000000000,
                "decimals": 8,
                "owner": "z1qz5p95pa8c6wq9pvfkg642gjv4nnaayx6vhm2w",
                "tokenStandard": "zts10mxtv874tre00stfd6uelu",
                "maxSupply": 4611686018427387903,
                "isBurnable": true,
                "isMintable": true,
                "isUtility": true
            },
            {
                "name": "testToken2",
                "symbol": "test2",
                "domain": "zenon.network",
                "totalSupply": 3000038061600000000,
                "decimals": 8,
                "owner": "z1qz5p95pa8c6wq9pvfkg642gjv4nnaayx6vhm2w",
                "tokenStandard": "zts1nl8h22r2ynw9jyeg5q5ssq",
                "maxSupply": 4611686018427387903,
                "isBurnable": false,
                "isMintable": true,
                "isUtility": true
            }
        ]
    }
}
```

### embedded.token.getByOwner

> This API call will return the list of ZTS issued by an address

#### Request

3 parameters:

* first parameter of type `string` that represents the address
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the number of entries to be displayed on this page

```json
{
    "jsonrpc": "2.0",
    "id": 24,
    "method": "embedded.token.getByOwner",
    "params": ["z1qz5p95pa8c6wq9pvfkg642gjv4nnaayx6vhm2w", 0, 5]
}
```

#### Response

Same information as [embedded.token.getAll](#embeddedtokengetall)

```json
{
    "jsonrpc": "2.0",
    "id": 24,
    "result": {
        "count": 1,
        "list": [
            {
                "name": "testToken2",
                "symbol": "test2",
                "domain": "zenon.network",
                "totalSupply": 3000038061600000000,
                "decimals": 8,
                "owner": "z1qz5p95pa8c6wq9pvfkg642gjv4nnaayx6vhm2w",
                "tokenStandard": "zts1nl8h22r2ynw9jyeg5q5ssq",
                "maxSupply": 4611686018427387903,
                "isBurnable": true,
                "isMintable": true,
                "isUtility": true
            }
        ]
    }
}
```

### embedded.token.getByZts

> This API call will return the ZTS with the specified unique indentifier

#### Request

One parameter of type `string` that represents the ZTS

```json
{
    "jsonrpc": "2.0",
    "id": 23,
    "method": "embedded.token.getByZts",
    "params": ["zts1nl8h22r2ynw9jyeg5q5ssq"]
}
```

#### Response

Same information as [embedded.token.getAll](#embeddedtokengetall)

```json
{
    "id": 23,
    "jsonrpc": "2.0",
    "result": {
        "name": "testToken1",
        "symbol": "test1",
        "domain": "zenon.network",
        "totalSupply": 500,
        "decimals": 8,
        "owner": "z1qz3f6svf805tewktk5yf9tn8cdhe2236wdnugk",
        "tokenStandard": "zts1nl8h22r2ynw9jyeg5q5ssq",
        "maxSupply": 1000,
        "isBurnable": true,
        "isMintable": true,
        "isUtility": true
    }
}
```

---

<div style={{textAlign: 'center', marginTop: '2rem'}}>
  <a href="/developer/rpc-api/embedded/sentinel" style={{marginRight: '1rem'}}>← Previous: Sentinel</a>
  <a href="/developer/rpc-api/embedded/swap">Next: Swap →</a>
</div>