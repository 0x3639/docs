---
sidebar_position: 9
title: Spork
---

# Spork RPC API

## embedded.spork

* [embedded.spork.getAll](#embeddedsporkgetall)

### embedded.spork.getAll

> This API call will return a paginated list of all network sporks. Sporks are used to activate or deactivate specific network features and upgrades.

#### Request

2 parameters:
* first parameter of type `number` that represents the page index
* second parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "embedded.spork.getAll",
    "params": [0, 10]
}
```

#### Response

* `count` - total number of sporks
* `list` - array of spork objects containing:
  * `id` - spork hash identifier
  * `name` - spork name
  * `description` - spork description
  * `activated` - bool indicating if spork is active
  * `enforcementHeight` - momentum height when spork becomes active

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "count": 2,
        "list": [
            {
                "id": "34d8bef1b8a4de759450e3636d9f70ed5fae1b1e5f86e0fa1a4633de1323b315",
                "name": "htlc-spork",
                "description": "Activates HTLC (Hash Time-Locked Contract) functionality",
                "activated": true,
                "enforcementHeight": 1000000
            },
            {
                "id": "45d8bef1b8a4de759450e3636d9f70ed5fae1b1e5f86e0fa1a4633de1323b316",
                "name": "bridge-spork",
                "description": "Activates cross-chain bridge functionality",
                "activated": false,
                "enforcementHeight": 0
            }
        ]
    }
}
```

---

<div style={{textAlign: 'center', marginTop: '2rem'}}>
  <a href="/developer/rpc-api/embedded/accelerator" style={{marginRight: '1rem'}}>← Previous: Accelerator</a>
  <a href="/developer/rpc-api/embedded/htlc">Next: HTLC →</a>
</div>