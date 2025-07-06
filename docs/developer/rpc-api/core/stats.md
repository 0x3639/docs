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
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "os": "linux",
        "platform": "ubuntu",
        "platformFamily": "debian",
        "platformVersion": "24.04",
        "kernelVersion": "6.8.0-57-generic",
        "memoryTotal": 33654915072,
        "memoryFree": 31957716992,
        "numCPU": 8,
        "numGoroutine": 216
    }
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
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "version": "v0.0.8",
        "commit": "9cde165877a1e4ff47d0df6cf8b8a65b121d550c"
    }
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
    "id": 1,
    "result": {
        "numPeers": 12,
        "peers": [
            {
                "publicKey": "09e88c8a802970007d19dd227478004159f432d726fe6d1362c34711d69d66873f3bdd32b606d920e74831d9186c722b5a5f8ad9b8f077cb2e8036c42301742a",
                "ip": "49.13.147.31",
                "name": "v0.0.8 znn-node"
            },
            {
                "publicKey": "ae4ccdb042ba8c57eeebd71cad08e45cd0dda3882649ca10478d158ff60661ba74979d66895dce96028337705a924afb9c769340fe929233cc5cd30e78a3f250",
                "ip": "10.10.169.22",
                "name": "v0.0.7 znn-node"
            },
            {
                "publicKey": "95d3021a97114be5b25209750ad3a2e75b1151482320c43047d95a0750292483d3e9c0ffcbd72a3e19e56267451cd2b3309741e45e97f7f105d1763256dd1b65",
                "ip": "62.146.180.192",
                "name": "v0.0.8 znn-node"
            },
            {
                "publicKey": "0c5213f89c748aab5c39e63bdc65bd97bf446a5229e640086e2784217d24731d78ab53ee5316619dc4299ab759304c5859272d35cfab74fd9106753e0db3d14e",
                "ip": "135.148.32.194",
                "name": "v0.0.8 znn-node"
            },
            {
                "publicKey": "e2311173bb2d03ddcb87dc25491bc8953fc1a1e50ee6094346466458e06b478bce5e3ef2b4f7468b10bc85781f8e1e57cec56d460eee7bebf89a11f64e3b1c60",
                "ip": "10.10.169.21",
                "name": "v0.0.7 znn-node"
            },
            {
                "publicKey": "db3de09472c37eb7ce6a73e161705534719cc59e589873950d187b301ed66232a47508167a97e2ea938c64a36b15ff6465ac912f84a8f817e69da975dd927100",
                "ip": "167.99.45.34",
                "name": "v0.0.8 znn-node"
            },
            {
                "publicKey": "40d7bb789e8bcce3ff6f5b5f6501d7dc1448c0586db1b1292d3fb6dc5cad41509f3048398662d30316f322b77362bf89eba540ad6483ac51e711cea11f569da6",
                "ip": "185.237.252.167",
                "name": "v0.0.8 znn-node"
            },
            {
                "publicKey": "b2ea87231e9c58ba2bd89c53091c1d069c49c5965d9775f615d378ccbaf2489576f83cdb1b99cdecf874548976932e7de6ec4b50b386ee0c92c4fcfa998cd301",
                "ip": "192.168.69.133",
                "name": "v0.0.7 znn-node"
            },
            {
                "publicKey": "835028e01c7c7396097421a2402fb3da74776e0b50fb9a2a4027ced7a70ac004ddd5958e8668767796cde6984cb4071ee3f27777a704816febe00c68ec41a3ad",
                "ip": "72.44.106.90",
                "name": "v0.0.8 znn-node"
            },
            {
                "publicKey": "c5516934046984c4c9da51c92868699017613749999b3aa99c331503fdc8f9ed23f6b00bd22a2e4b830979a103a58fcebd0a95f92ee451df4a4b0f35a423d0d8",
                "ip": "10.10.169.23",
                "name": "v0.0.7 znn-node"
            },
            {
                "publicKey": "9e95458b76d677093fd989e64df2d014871bcbcb2b2307ad162e1426ebc9e7bbcc81eab62d10a7e468aebbde88c34c4ce2aba69e5fca2606bd06ca83fb8dbc67",
                "ip": "23.95.72.54",
                "name": "v0.0.8 znn-node"
            },
            {
                "publicKey": "efcde86a29483716e93becd50391adc6e72936dac6f5a9165f5eb0740fece8317df02ba6286c1c0f8468cf8e40218c40388911d9332b6332ab9e6acf04cbefcc",
                "ip": "70.34.223.27",
                "name": "v0.0.8 znn-node"
            }
        ],
        "self": {
            "publicKey": "ba443247d6271a3b1c6de656f8a248a2ffda749239ecdbd4aa7c1d95b318c4e67876714694d23b3298433083d5b3885669df4624e1c1aabdae29c4ab47e42602",
            "ip": "127.0.0.1",
            "name": "*self*"
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

```json
{
    "jsonrpc": "2.0",
    "id": 40,
    "result": {
        "Error": "the method stats.runtimeInfo does not exist/is not available"
    }
}
```

## stats.syncInfo

> This API call will return information about the synchronization status.

### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "stats.syncInfo",
    "params": []
}
```

### Response

Returns synchronization information:
* `state` - Sync state (0 = unknown, 1 = syncing, 2 = synced)
* `currentHeight` - Current blockchain height
* `targetHeight` - Target height to sync to

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "state": 2,
        "currentHeight": 10737945,
        "targetHeight": 10737945
    }
}
```