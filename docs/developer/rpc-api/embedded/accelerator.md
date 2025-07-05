---
sidebar_position: 8
title: Accelerator
---

# Accelerator RPC API

## embedded.accelerator

* [embedded.accelerator.getAll](#embeddedacceleratorgetall)
* [embedded.accelerator.getProjectById](#embeddedacceleratorgetprojectbyid)
* [embedded.accelerator.getPhaseById](#embeddedacceleratorgetphasebyid)
* [embedded.accelerator.getVoteBreakdown](#embeddedacceleratorgetvotebreakdown)
* [embedded.accelerator.getPillarVotes](#embeddedacceleratorgetpillarvotes)

### embedded.accelerator.getAll

> This API call will return a paginated list of all Accelerator-Z projects, sorted by last update timestamp.

#### Request

2 parameters:
* first parameter of type `number` that represents the page index
* second parameter of type `number` that represents the page size

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "embedded.accelerator.getAll",
    "params": [0, 10]
}
```

#### Response

* `count` - total number of projects
* `list` - array of project objects containing:
  * `id` - project hash identifier
  * `owner` - address of project owner
  * `name` - project name
  * `description` - project description
  * `url` - project URL
  * `znnFundsNeeded` - ZNN funds requested
  * `qsrFundsNeeded` - QSR funds requested
  * `creationTimestamp` - creation timestamp
  * `lastUpdateTimestamp` - last update timestamp
  * `status` - project status
  * `phaseIds` - array of phase hash identifiers
  * `votes` - voting information
  * `phases` - array of phase objects

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "count": 1,
        "list": [
            {
                "id": "c24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
                "owner": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
                "name": "Example Project",
                "description": "This is an example accelerator project",
                "url": "https://example.com",
                "znnFundsNeeded": 10000000000,
                "qsrFundsNeeded": 100000000000,
                "creationTimestamp": 1640000000,
                "lastUpdateTimestamp": 1640100000,
                "status": 0,
                "phaseIds": [],
                "votes": {
                    "id": "c24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
                    "total": 10,
                    "yes": 8,
                    "no": 2
                },
                "phases": []
            }
        ]
    }
}
```

### embedded.accelerator.getProjectById

> This API call will return details about a specific Accelerator-Z project by its hash identifier.

#### Request

One parameter of type `string` that represents the project hash.

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "embedded.accelerator.getProjectById",
    "params": ["c24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5"]
}
```

#### Response

Same project object structure as in `getAll` response.

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
        "id": "c24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
        "owner": "z1qph8dkja68pg3g6j4spwk9re0kjdkul0amwqnt",
        "name": "Example Project",
        "description": "This is an example accelerator project",
        "url": "https://example.com",
        "znnFundsNeeded": 10000000000,
        "qsrFundsNeeded": 100000000000,
        "creationTimestamp": 1640000000,
        "lastUpdateTimestamp": 1640100000,
        "status": 0,
        "phaseIds": [],
        "votes": {
            "id": "c24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
            "total": 10,
            "yes": 8,
            "no": 2
        },
        "phases": []
    }
}
```

### embedded.accelerator.getPhaseById

> This API call will return details about a specific project phase by its hash identifier.

#### Request

One parameter of type `string` that represents the phase hash.

```json
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "embedded.accelerator.getPhaseById",
    "params": ["d24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5"]
}
```

#### Response

* Phase object containing:
  * `id` - phase hash identifier
  * `projectId` - parent project hash
  * `name` - phase name
  * `description` - phase description
  * `url` - phase URL
  * `znnFundsNeeded` - ZNN funds requested for phase
  * `qsrFundsNeeded` - QSR funds requested for phase
  * `creationTimestamp` - creation timestamp
  * `acceptedTimestamp` - acceptance timestamp
  * `status` - phase status

```json
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "id": "d24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
        "projectId": "c24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
        "name": "Phase 1",
        "description": "First phase of the project",
        "url": "https://example.com/phase1",
        "znnFundsNeeded": 5000000000,
        "qsrFundsNeeded": 50000000000,
        "creationTimestamp": 1640200000,
        "acceptedTimestamp": 0,
        "status": 0
    }
}
```

### embedded.accelerator.getVoteBreakdown

> This API call will return the voting breakdown for a given project or phase.

#### Request

One parameter of type `string` that represents the project or phase hash.

```json
{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "embedded.accelerator.getVoteBreakdown",
    "params": ["c24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5"]
}
```

#### Response

* `id` - hash identifier
* `total` - total number of votes
* `yes` - number of yes votes
* `no` - number of no votes
* `voteDetails` - array of individual pillar votes

```json
{
    "jsonrpc": "2.0",
    "id": 4,
    "result": {
        "id": "c24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
        "total": 10,
        "yes": 8,
        "no": 2,
        "voteDetails": [
            {
                "pillarName": "Pillar1",
                "vote": 0
            },
            {
                "pillarName": "Pillar2", 
                "vote": 1
            }
        ]
    }
}
```

### embedded.accelerator.getPillarVotes

> This API call will return the votes of a specific pillar for given project/phase hashes.

#### Request

2 parameters:
* first parameter of type `string` that represents the pillar name
* second parameter of type `array` that contains hash identifiers

```json
{
    "jsonrpc": "2.0",
    "id": 5,
    "method": "embedded.accelerator.getPillarVotes",
    "params": ["Pillar1", ["c24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5"]]
}
```

#### Response

Array of pillar vote objects:
* `id` - hash identifier
* `pillarName` - name of the pillar
* `vote` - vote value (0 = yes, 1 = no, 2 = abstain)

```json
{
    "jsonrpc": "2.0",
    "id": 5,
    "result": [
        {
            "id": "c24a5a6166c8948aba3e8a573e7173faf3d88e48c9798b1b67b7e61ae8552ed5",
            "pillarName": "Pillar1",
            "vote": 0
        }
    ]
}
```

---

<div style={{textAlign: 'center', marginTop: '2rem'}}>
  <a href="/developer/rpc-api/embedded/stake" style={{marginRight: '1rem'}}>← Previous: Stake</a>
  <a href="/developer/rpc-api/embedded/spork">Next: Spork →</a>
</div>