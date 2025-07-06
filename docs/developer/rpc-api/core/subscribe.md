---
sidebar_position: 2
title: "Subscribe API"
---

# Subscribe API

The Subscribe API provides methods to subscribe to real-time events from the Zenon network. You can subscribe to different types of events including new momentums, account blocks, and address-specific transactions. This API is essential for building applications that need to react to network events in real-time.

## Available Methods

* [subscribe.toMomentums](#subscribetomomentums)
* [subscribe.toAllAccountBlocks](#subscribetoallaccountblocks)
* [subscribe.toAccountBlocksByAddress](#subscribetoaccountblocksbyaddress)
* [subscribe.toUnreceivedAccountBlocksByAddress](#subscribetounreceivedaccountblocksbyaddress)

## subscribe.toMomentums

Subscribe to receive notifications whenever new momentums are produced on the network.

### Request

* `event` of type `string`: event to subscribe to

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "ledger.subscribe",
    "params": ["momentums"]
}
```

### Response

* `id` of type `string` that represents the subscription id

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x78800d79ce53ef3189b0d305684d0736"
}
```

## subscribe.toAllAccountBlocks

Subscribe to receive notifications for all account blocks across the entire network.

### Request

* `event` of type `string`: event to subscribe to

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger.subscribe",
    "params": ["allAccountBlocks"]
}
```

### Response

* `id` of type `string` that represents the subscription id

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": "0x919156fe49dec82e0fff4ac98252f513"
}
```

## subscribe.toAccountBlocksByAddress

Subscribe to receive notifications for account blocks related to a specific address.

### Request

* `event` of type `string`: event to subscribe to
* `address` of type `string`: address of the account block

```json
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ledger.subscribe",
    "params": ["accountBlocksByAddress", "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9"]
}
```

### Response

* `id` of type `string` that represents the subscription id

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": "0xa19156fe49dec82e0fff4ac98252f513"
}
```

## subscribe.toUnreceivedAccountBlocksByAddress

Subscribe to receive notifications for unreceived account blocks sent to a specific address.

### Request

* `event` of type `string`: event to subscribe to
* `address` of type `string`: address of the account block

```json
{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "ledger.subscribe",
    "params": ["unreceivedAccountBlocksByAddress", "z1qrztagl9rukq3ltdflnvg4zrvpfp84mydfejk9"]
}
```

### Response

* `id` of type `string` that represents the subscription id

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "result": "0xb19156fe49dec82e0fff4ac98252f513"
}
```