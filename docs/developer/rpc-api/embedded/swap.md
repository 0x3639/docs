---
sidebar_position: 6
title: Swap
---

# Swap RPC API

## embedded.swap

* [embedded.swap.getAssetsByKeyIdHash](#embeddedswapgetassetsbykeyidhash)
* [embedded.swap.getAssets](#embeddedswapgetassets)
* [embedded.swap.getLegacyPillars](#embeddedswapgetlegacypillars)

### embedded.swap.getAssetsByKeyIdHash

> This API call will return the amount of ZNN and QSR that have not been swapped yet

#### Request

One parameter of type `string` that represents the `sha256` sum of the legacy keyId which is `HASH160` sum of a legacy public key

```json
{
    "jsonrpc": "2.0",
    "id": 20,
    "method": "embedded.swap.getAssetsByKeyIdHash",
    "params": ["3835082b4afb76971d58d6ad510e7e91f3bb0d41912fac4ec4cfef7bd7bbea73"]
}
```

#### Response

An array of `entries`:

* `sha256` sum of the legacy keyId which is `HASH160` sum of a legacy public key
* `qsr` of type `number`: QSR amount left
* `znn` of type `number`: ZNN amount left

```json
{
    "jsonrpc": "2.0",
    "id": 20,
    "result": [
        {
            "keyIdHash": "3835082b4afb76971d58d6ad510e7e91f3bb0d41912fac4ec4cfef7bd7bbea73",
            "qsr": 25000000000000,
            "znn": 2500000000000
        }
    ]
}
```

### embedded.swap.getAssets

> This API call will return for every keyId hash the amount of znn or qsr that can be swapped

#### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 20,
    "method": "embedded.swap.getAssets",
    "params": []
}
```

#### Response

An array of `entries`:

* `keyIdHash` of type string: `sha256` sum of the legacy keyId which is `HASH160` sum of a legacy public key
* `qsr` of type `number`: QSR amount left
* `znn` of type `number`: ZNN amount left

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
        "abdefg0123456789d7fdea4cc00ca15ba9f703e3f611b70c0bd022e94d6eabcd": {
            "znn": 14507500000000,
            "qsr": 0
        },
        "bbdefg0123456789d7fdea4cc00ca15ba9f703e3f611b70c0bd022e94d6eabcd": {
            "znn": 503780000000,
            "qsr": 0
        }
    }
}
```

### embedded.swap.getLegacyPillars

> This API call will return the number of legacy Pillars not swapped yet

#### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 21,
    "method": "embedded.swap.getLegacyPillars",
    "params": []
}
```

#### Response

An array of `entries`:

* `KeyIdHash` of type `string`:  `sha256` sum of the legacy keyId which is `HASH160` sum of a legacy public key
* `numPillars` of type `number`: number of legacy Pillars left

```json
{
    "id": 21,
    "jsonrpc": "2.0",
    "result": [
        {
          "KeyIdHash": "abdefg0123456789d7fdea4cc00ca15ba9f703e3f611b70c0bd022e94d6eabcd",
          "numPillars": 1
        },
        {
          "KeyIdHash": "bbdefg0123456789d7fdea4cc00ca15ba9f703e3f611b70c0bd022e94d6eabcd",
          "numPillars": 1
        }
    ]
}
```

---

<div style={{textAlign: 'center', marginTop: '2rem'}}>
  <a href="/developer/rpc-api/embedded/token" style={{marginRight: '1rem'}}>← Previous: Token</a>
  <a href="/developer/rpc-api/embedded/stake">Next: Stake →</a>
</div>