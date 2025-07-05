---
sidebar_position: 11
title: Bridge
---

# Bridge RPC API

## embedded.bridge

* [embedded.bridge.getAllNetworks](#embeddedbridgegetallnetworks)
* [embedded.bridge.getNetworkInfo](#embeddedbridgegetnetworkinfo)
* [embedded.bridge.getOrchestratorInfo](#embeddedbridgegetorchestratorinfo)
* [embedded.bridge.getTimeChallengesInfo](#embeddedbridgegettimechallengesinfo)
* [embedded.bridge.getSecurityInfo](#embeddedbridgegetsecurityinfo)
* [embedded.bridge.getBridgeInfo](#embeddedbridgegetbridgeinfo)
* [embedded.bridge.getWrapTokenRequestById](#embeddedbridgegetwraptokenrequestbyid)
* [embedded.bridge.getAllWrapTokenRequests](#embeddedbridgegetallwraptokenrequests)
* [embedded.bridge.getAllWrapTokenRequestsByToAddress](#embeddedbridgegetallwraptokenrequestsbytoaddress)
* [embedded.bridge.getAllWrapTokenRequestsByToAddressNetworkClassAndChainId](#embeddedbridgegetallwraptokenrequestsbytoaddressnetworkclassandchainid)
* [embedded.bridge.getAllUnsignedWrapTokenRequests](#embeddedbridgegetallunsignedwraptokenrequests)
* [embedded.bridge.getUnwrapTokenRequestByHashAndLog](#embeddedbridgegetunwraptokenrequestbyhashandlog)
* [embedded.bridge.getAllUnwrapTokenRequests](#embeddedbridgegetallunwraptokenrequests)
* [embedded.bridge.getAllUnwrapTokenRequestsByToAddress](#embeddedbridgegetallunwraptokenrequestsbytoaddress)
* [embedded.bridge.getFeeTokenPair](#embeddedbridgegetfeetokenpair)

### embedded.bridge.getAllNetworks

> This API call will return a paginated list of all registered bridge networks.

#### Request

2 parameters:
* first parameter of type `number` that represents the page index
* second parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "embedded.bridge.getAllNetworks",
    "params": [0, 10]
}
```

#### Response

* `count` - total number of networks
* `list` - array of network objects containing:
  * `networkClass` - class of network (1 = EVM, 2 = non-EVM)
  * `chainId` - unique chain identifier
  * `name` - network name
  * `contractAddress` - bridge contract address on target network
  * `metadata` - additional network metadata
  * `tokenPairs` - array of supported token pairs

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "count": 2,
        "list": [
            {
                "networkClass": 1,
                "chainId": 1,
                "name": "Ethereum Mainnet",
                "contractAddress": "0x1234567890abcdef1234567890abcdef12345678",
                "metadata": "{}",
                "tokenPairs": []
            },
            {
                "networkClass": 1,
                "chainId": 56,
                "name": "BSC Mainnet",
                "contractAddress": "0xabcdef1234567890abcdef1234567890abcdef12",
                "metadata": "{}",
                "tokenPairs": []
            }
        ]
    }
}
```

### embedded.bridge.getNetworkInfo

> This API call will return information about a specific bridge network.

#### Request

2 parameters:
* first parameter of type `number` that represents the network class (1 = EVM, 2 = non-EVM)
* second parameter of type `number` that represents the chain ID

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "embedded.bridge.getNetworkInfo",
    "params": [1, 1]
}
```

#### Response

Network information object containing:
* `networkClass` - class of network (1 = EVM, 2 = non-EVM)
* `chainId` - unique chain identifier
* `name` - network name
* `contractAddress` - bridge contract address on target network
* `metadata` - additional network metadata
* `tokenPairs` - array of supported token pairs

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
        "networkClass": 1,
        "chainId": 1,
        "name": "Ethereum Mainnet",
        "contractAddress": "0x1234567890abcdef1234567890abcdef12345678",
        "metadata": "{}",
        "tokenPairs": [
            {
                "tokenStandard": "zts1qsrxxxxxxxxxxxxxmrhjll",
                "tokenAddress": "0x5fbdb2315678afecb367f032d93f642f64180aa3",
                "bridgeable": true,
                "redeemable": true,
                "owned": true,
                "minAmount": 1000000000
            }
        ]
    }
}
```

### embedded.bridge.getOrchestratorInfo

> This API call will return information about the bridge orchestrator.

#### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "embedded.bridge.getOrchestratorInfo",
    "params": []
}
```

#### Response

* `windowSize` - orchestrator window size
* `keyGenThreshold` - key generation threshold
* `confirmationsToFinality` - confirmations required for finality
* `estimatedMomentumTime` - estimated momentum time in seconds
* `allowKeyGenHeight` - height at which key generation is allowed

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
        "windowSize": 50,
        "keyGenThreshold": 67,
        "confirmationsToFinality": 2,
        "estimatedMomentumTime": 10,
        "allowKeyGenHeight": 500000
    }
}
```

### embedded.bridge.getTimeChallengesInfo

> This API call will return time challenge information for bridge methods.

#### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "embedded.bridge.getTimeChallengesInfo",
    "params": []
}
```

#### Response

Array of time challenge objects containing:
* `methodName` - name of the bridge method
* `challengeStartHeight` - momentum height when challenge starts

```json
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": [
        {
            "methodName": "ChangeTssECDSAPubKey",
            "challengeStartHeight": 450000
        },
        {
            "methodName": "HaltBridge",
            "challengeStartHeight": 460000
        }
    ]
}
```

### embedded.bridge.getSecurityInfo

> This API call will return security information for the bridge.

#### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "embedded.bridge.getSecurityInfo",
    "params": []
}
```

#### Response

Security information object containing:
* `guardians` - array of guardian addresses
* `guardiansVotes` - array of guardian votes
* `administratorDelay` - delay for administrator actions
* `softDelay` - soft delay period

```json
{
    "jsonrpc": "2.0",
    "id": 4,
    "result": {
        "guardians": [
            "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
            "z1qz3f6svf805tewktk5yf9tn8cdhe2236wdnugk"
        ],
        "guardiansVotes": [
            "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt"
        ],
        "administratorDelay": 172800,
        "softDelay": 86400
    }
}
```

### embedded.bridge.getBridgeInfo

> This API call will return general information about the bridge status.

#### Request

No parameters

```json
{
    "jsonrpc": "2.0",
    "id": 5,
    "method": "embedded.bridge.getBridgeInfo",
    "params": []
}
```

#### Response

Bridge information object containing:
* `administrator` - administrator address
* `compressedTssECDSAPubKey` - compressed TSS ECDSA public key
* `decompressedTssECDSAPubKey` - decompressed TSS ECDSA public key
* `allowKeyGen` - whether key generation is allowed
* `halted` - whether the bridge is halted
* `unhaltedAt` - momentum height when bridge was unhalted
* `unhaltDurationInMomentums` - duration of halt in momentums

```json
{
    "jsonrpc": "2.0",
    "id": 5,
    "result": {
        "administrator": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
        "compressedTssECDSAPubKey": "AsAQx1M3LVXCuozDOqO5b9adj/PqBTVGm8cf07PZnog5",
        "decompressedTssECDSAPubKey": "BMAQx1M3LVXCuozDOqO5b9adj/PqBTVGm8cf07PZnog5Eu8bMay1GZFEwMJOXJqSLXxDV7cCeEHLkcLXFAm5NANE",
        "allowKeyGen": true,
        "halted": false,
        "unhaltedAt": 0,
        "unhaltDurationInMomentums": 5
    }
}
```

### embedded.bridge.getWrapTokenRequestById

> This API call will return details about a specific wrap token request by its identifier.

#### Request

One parameter of type `string` that represents the wrap token request hash.

```json
{
    "jsonrpc": "2.0",
    "id": 6,
    "method": "embedded.bridge.getWrapTokenRequestById",
    "params": ["d24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5"]
}
```

#### Response

Wrap token request object containing:
* `id` - request hash identifier
* `networkClass` - network class of destination
* `chainId` - chain ID of destination
* `toAddress` - destination address on target chain
* `tokenStandard` - ZTS token being wrapped
* `tokenAddress` - token address on destination chain
* `amount` - amount to wrap
* `fee` - bridge fee
* `signature` - request signature
* `creationMomentumHeight` - creation momentum height

```json
{
    "jsonrpc": "2.0",
    "id": 6,
    "result": {
        "id": "d24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
        "networkClass": 1,
        "chainId": 1,
        "toAddress": "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        "tokenStandard": "zts1qsrxxxxxxxxxxxxxmrhjll",
        "tokenAddress": "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        "amount": 10000000000,
        "fee": 100000000,
        "signature": "vU8QaF1VoWGFK2UVvQPf6pwKNJ5IfZ9fPruCpmQPmKkEqU5YoWJAY5xE4h+FSQRSfhFWLQEMMzqRDPqrFkLZWAE=",
        "creationMomentumHeight": 1000000
    }
}
```

### embedded.bridge.getAllWrapTokenRequests

> This API call will return a paginated list of all wrap token requests.

#### Request

2 parameters:
* first parameter of type `number` that represents the page index
* second parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 7,
    "method": "embedded.bridge.getAllWrapTokenRequests",
    "params": [0, 10]
}
```

#### Response

* `count` - total number of wrap requests
* `list` - array of wrap token request objects (same structure as getWrapTokenRequestById)

```json
{
    "jsonrpc": "2.0",
    "id": 7,
    "result": {
        "count": 1,
        "list": [
            {
                "id": "d24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
                "networkClass": 1,
                "chainId": 1,
                "toAddress": "0x5fbdb2315678afecb367f032d93f642f64180aa3",
                "tokenStandard": "zts1qsrxxxxxxxxxxxxxmrhjll",
                "tokenAddress": "0x5fbdb2315678afecb367f032d93f642f64180aa3",
                "amount": 10000000000,
                "fee": 100000000,
                "signature": "vU8QaF1VoWGFK2UVvQPf6pwKNJ5IfZ9fPruCpmQPmKkEqU5YoWJAY5xE4h+FSQRSfhFWLQEMMzqRDPqrFkLZWAE=",
                "creationMomentumHeight": 1000000
            }
        ]
    }
}
```

### embedded.bridge.getAllWrapTokenRequestsByToAddress

> This API call will return wrap token requests filtered by destination address.

#### Request

3 parameters:
* first parameter of type `string` that represents the destination address
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 8,
    "method": "embedded.bridge.getAllWrapTokenRequestsByToAddress",
    "params": ["0x5fbdb2315678afecb367f032d93f642f64180aa3", 0, 10]
}
```

#### Response

Same structure as getAllWrapTokenRequests response.

### embedded.bridge.getAllWrapTokenRequestsByToAddressNetworkClassAndChainId

> This API call will return wrap token requests filtered by destination address, network class, and chain ID.

#### Request

5 parameters:
* first parameter of type `string` that represents the destination address
* second parameter of type `number` that represents the network class
* third parameter of type `number` that represents the chain ID
* fourth parameter of type `number` that represents the page index
* fifth parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 9,
    "method": "embedded.bridge.getAllWrapTokenRequestsByToAddressNetworkClassAndChainId",
    "params": ["0x5fbdb2315678afecb367f032d93f642f64180aa3", 1, 1, 0, 10]
}
```

#### Response

Same structure as getAllWrapTokenRequests response.

### embedded.bridge.getAllUnsignedWrapTokenRequests

> This API call will return all wrap token requests that haven't been signed yet.

#### Request

2 parameters:
* first parameter of type `number` that represents the page index
* second parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 10,
    "method": "embedded.bridge.getAllUnsignedWrapTokenRequests",
    "params": [0, 10]
}
```

#### Response

Same structure as getAllWrapTokenRequests response, but only includes unsigned requests.

### embedded.bridge.getUnwrapTokenRequestByHashAndLog

> This API call will return an unwrap token request by transaction hash and log index.

#### Request

2 parameters:
* first parameter of type `string` that represents the transaction hash
* second parameter of type `number` that represents the log index

```json
{
    "jsonrpc": "2.0",
    "id": 11,
    "method": "embedded.bridge.getUnwrapTokenRequestByHashAndLog",
    "params": ["e24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5", 0]
}
```

#### Response

Unwrap token request object containing:
* `registrationMomentumHeight` - registration momentum height
* `networkClass` - source network class
* `chainId` - source chain ID
* `transactionHash` - transaction hash on source chain
* `logIndex` - log index in transaction
* `toAddress` - destination Zenon address
* `tokenStandard` - ZTS token standard
* `tokenAddress` - token address on source chain
* `amount` - amount to unwrap
* `signature` - request signature
* `redeemed` - whether request has been redeemed
* `revoked` - whether request has been revoked

```json
{
    "jsonrpc": "2.0",
    "id": 11,
    "result": {
        "registrationMomentumHeight": 1000100,
        "networkClass": 1,
        "chainId": 1,
        "transactionHash": "e24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
        "logIndex": 0,
        "toAddress": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
        "tokenStandard": "zts1qsrxxxxxxxxxxxxxmrhjll",
        "tokenAddress": "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        "amount": 10000000000,
        "signature": "vU8QaF1VoWGFK2UVvQPf6pwKNJ5IfZ9fPruCpmQPmKkEqU5YoWJAY5xE4h+FSQRSfhFWLQEMMzqRDPqrFkLZWAE=",
        "redeemed": 0,
        "revoked": 0
    }
}
```

### embedded.bridge.getAllUnwrapTokenRequests

> This API call will return a paginated list of all unwrap token requests.

#### Request

2 parameters:
* first parameter of type `number` that represents the page index
* second parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 12,
    "method": "embedded.bridge.getAllUnwrapTokenRequests",
    "params": [0, 10]
}
```

#### Response

* `count` - total number of unwrap requests
* `list` - array of unwrap token request objects (same structure as getUnwrapTokenRequestByHashAndLog)

```json
{
    "jsonrpc": "2.0",
    "id": 12,
    "result": {
        "count": 1,
        "list": [
            {
                "registrationMomentumHeight": 1000100,
                "networkClass": 1,
                "chainId": 1,
                "transactionHash": "e24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
                "logIndex": 0,
                "toAddress": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
                "tokenStandard": "zts1qsrxxxxxxxxxxxxxmrhjll",
                "tokenAddress": "0x5fbdb2315678afecb367f032d93f642f64180aa3",
                "amount": 10000000000,
                "signature": "vU8QaF1VoWGFK2UVvQPf6pwKNJ5IfZ9fPruCpmQPmKkEqU5YoWJAY5xE4h+FSQRSfhFWLQEMMzqRDPqrFkLZWAE=",
                "redeemed": 0,
                "revoked": 0
            }
        ]
    }
}
```

### embedded.bridge.getAllUnwrapTokenRequestsByToAddress

> This API call will return unwrap token requests filtered by destination Zenon address.

#### Request

3 parameters:
* first parameter of type `string` that represents the destination Zenon address
* second parameter of type `number` that represents the page index
* third parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 13,
    "method": "embedded.bridge.getAllUnwrapTokenRequestsByToAddress",
    "params": ["z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt", 0, 10]
}
```

#### Response

Same structure as getAllUnwrapTokenRequests response.

### embedded.bridge.getFeeTokenPair

> This API call will return the fee configuration for a specific token.

#### Request

One parameter of type `string` that represents the ZTS token standard.

```json
{
    "jsonrpc": "2.0",
    "id": 14,
    "method": "embedded.bridge.getFeeTokenPair",
    "params": ["zts1qsrxxxxxxxxxxxxxmrhjll"]
}
```

#### Response

Fee token pair object containing:
* `tokenStandard` - ZTS token standard
* `accumulatedFee` - accumulated fees for this token
* `feePercentage` - fee percentage (basis points, e.g., 100 = 1%)

```json
{
    "jsonrpc": "2.0",
    "id": 14,
    "result": {
        "tokenStandard": "zts1qsrxxxxxxxxxxxxxmrhjll",
        "accumulatedFee": 5000000000,
        "feePercentage": 100
    }
}
```

---

<div style={{textAlign: 'center', marginTop: '2rem'}}>
  <a href="/developer/rpc-api/embedded/htlc" style={{marginRight: '1rem'}}>← Previous: HTLC</a>
  <a href="/developer/rpc-api/embedded/liquidity">Next: Liquidity →</a>
</div>