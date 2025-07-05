---
sidebar_position: 10
title: HTLC
---

# HTLC RPC API

## embedded.htlc

* [embedded.htlc.getById](#embeddedhtlcgetbyid)
* [embedded.htlc.getProxyUnlockStatus](#embeddedhtlcgetproxyunlockstatus)

### embedded.htlc.getById

> This API call will return information about a specific Hash Time-Locked Contract (HTLC) by its identifier.

#### Request

One parameter of type `string` that represents the HTLC hash identifier.

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "embedded.htlc.getById",
    "params": ["a24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5"]
}
```

#### Response

HTLC object containing:
* `id` - HTLC hash identifier
* `timeLocked` - address of the time lock participant
* `hashLocked` - address of the hash lock participant
* `tokenStandard` - token standard (ZTS) being locked
* `amount` - amount locked in the contract
* `expirationTime` - expiration timestamp
* `hashType` - type of hash function used (0 = SHA256, 1 = SHA3-256)
* `keyMaxSize` - maximum size of the preimage key
* `hashLock` - hash lock value

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "id": "a24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
        "timeLocked": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
        "hashLocked": "z1qz3f6svf805tewktk5yf9tn8cdhe2236wdnugk",
        "tokenStandard": "zts1qsrxxxxxxxxxxxxxmrhjll",
        "amount": 10000000000,
        "expirationTime": 1640200000,
        "hashType": 0,
        "keyMaxSize": 32,
        "hashLock": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
    }
}
```

### embedded.htlc.getProxyUnlockStatus

> This API call will check the proxy unlock status for a specific address in the HTLC contract.

#### Request

One parameter of type `string` that represents the address.

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "embedded.htlc.getProxyUnlockStatus",
    "params": ["z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt"]
}
```

#### Response

`bool` - true if proxy unlock is enabled for the address, false otherwise

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": true
}
```

---

<div style={{textAlign: 'center', marginTop: '2rem'}}>
  <a href="/developer/rpc-api/embedded/spork" style={{marginRight: '1rem'}}>← Previous: Spork</a>
  <a href="/developer/rpc-api/embedded/bridge">Next: Bridge →</a>
</div>