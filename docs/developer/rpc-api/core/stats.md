---
sidebar_position: 3
title: "Stats API"
---

# Stats API

The Stats API provides methods to retrieve statistical information about the Zenon node and network. This API is useful for monitoring node performance, system resources, and network connectivity. It includes information about the operating system, runtime environment, process details, synchronization status, and network peers.

## Available Methods

* [stats.osInfo](#statsosinfo)
* [stats.runtimeInfo](#statsruntimeinfo)
* [stats.processInfo](#statsprocessinfo)
* [stats.syncInfo](#statssyncinfo)
* [stats.networkInfo](#statsnetworkinfo)

## stats.osInfo

> This API call will return information about the operating system.

### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 40,
    "method": "stats.osInfo",
    "params": []
}
```

### Response

Returns system information including:
* `os` - Operating system name
* `platform` - Platform distribution
* `platformFamily` - Platform family
* `platformVersion` - Platform version
* `kernelVersion` - Kernel version
* `memoryTotal` - Total system memory in bytes
* `memoryFree` - Free system memory in bytes
* `numCPU` - Number of CPU cores
* `numGoroutine` - Number of active goroutines

```json
{
    "os": "linux", 
    "platform": "ubuntu", 
    "platformFamily": "debian", 
    "platformVersion": "20.10", 
    "kernelVersion": "5.8.0-41-generic", 
    "memoryTotal": "33123618816", 
    "memoryFree": "22736371712", 
    "numCPU": "16", 
    "numGoroutine": "71"   
}
```

## stats.processInfo

> This API call will return information about the Zenon process.

### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 40,
    "method": "stats.processInfo",
    "params": []
}
```

### Response

Returns process information including:
* `version` - Zenon node version
* `commit` - Git commit hash of the build

```json
{
    "version": "v2.0.2",
    "commit": "53305d2977364c04f334c0e2838061326e119c0a"
}
```

## stats.networkInfo

> This API call will return information about the network connections.

### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 40,
    "method": "stats.networkInfo",
    "params": []
}
```

### Response

Returns network information including:
* `numPeers` - Number of connected peers
* `peers` - Array of connected peer information
  - `publicKey` - Public key of the peer
  - `ip` - IP address of the peer
* `self` - Information about the local node
  - `publicKey` - Public key of the local node
  - `ip` - IP address of the local node

```json
{
  "jsonrpc": "2.0",
  "id": 40,
  "result": {
    "numPeers": 3,
    "peers": [
      {
        "publicKey": "af636fff6e73fb56b7bbd9462e2f80ddd39d1ffa5ae08e186b1227730945aa5fec9a41120d1ab5476b41b8b8cb6d47d1c096060b2f75bc2472796279cb077025",
        "ip": "192.168.0.52"
      },
      {
        "id": "bf636fff6dafb56b7bbd9462e2f80dabc9d91ffa5ae08e186b1227730945aa5fec9a41120d1ab5476b41b8b8cb6d47d1c096060b2f75bc2472796279cb077025",
        "ip": "192.168.0.51"
      },
      {
        "id": "cf636fff6dafb56b7bbd9462e2f80ddd39d91ffa5ae08e186b1227730945cdefec9a41120d1ab5476b41b8b8cb6d47d1c096060b2f75bc2472796279cb077025",
        "ip": "192.168.0.50"
      }
    ],
    "self": {
      "publicKey": "f079ae86096ded5ee9d9a9e5c5ca26683182ba4ab34560ce44fee4c3369e88a209b2aea4ccc0b0073519ff88c08286c312f072cb0e8ec25a6ba1cd6cbfd72084",
      "ip": ""
    }
  }
}
```

## stats.runtimeInfo

> This API call will return information about the runtime environment.

### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 40,
    "method": "stats.runtimeInfo",
    "params": []
}
```

### Response

Returns runtime information (specific fields may vary based on implementation).

## stats.syncInfo

> This API call will return information about the synchronization status.

### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 40,
    "method": "stats.syncInfo",
    "params": []
}
```

### Response

Returns synchronization information including current sync status and progress (specific fields may vary based on implementation).