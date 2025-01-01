---
sidebar_position: 2
slug: community
title: Community
---

# Community Links

## Websites

- ZenonHub https://zenonhub.io/ 
- Zenon Tools https://zenon.tools/overview 
- Zenon Org https://www.zenon.org/
- Zenon Info https://zenon.info
- Zenon Wiki https://zenon.wiki
- Ask Zenon Wiki https://ask.zenon.wiki/
- ZenonZenon https://zenonzenon.com/
- Alien Trap Society https://www.atsocy.com/
- Green Pill https://greenpill.pro

## GitHubs
- https://github.com/HyperCore-Team
- https://github.com/HyperCore-One
- https://github.com/alienc0der
- 


## Community Nodes

- https://my.hc1node.com:35997
- wss://my.hc1node.com:35998
- https://node.zenonhub.io:35997
- wss://node.zenonhub.io:35998
- https://node.atsocy.com:35997
- wss://node.atsocy.com:35998

Is a node working?  `curl` the endpoint and check the node.

```bash
curl -X POST https://my.hc1node.com:35997 -H 'Content-Type: application/json' -d '{"jsonrpc": "2.0", "id": 40, "method": "stats.syncInfo", "params": []}'
```

If the node is up and running and fully synced you will see `"state":2` in the results.  

```bash
{"jsonrpc":"2.0","id":40,"result":{"state":2,"currentHeight":9177763,"targetHeight":9177763}}
```

## Socials
- (Zenon.chat)[https://www.zenon.chat/]

## Exchanges
- wZNN on Uniswap https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xb2e96a63479c2edd2fd62b382c89d5ca79f572d3
- wZNN on 1inch https://app.1inch.io/#/1/simple/swap/ETH/0xb2e96a63479c2edd2fd62b382c89d5ca79f572d3/import-token
- wQSR on https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x96546afe4a21515a3a30cd3fd64a70eb478dc174
- wQSR on https://app.1inch.io/#/1/simple/swap/ETH/0x96546afe4a21515a3a30cd3fd64a70eb478dc174/import-token

## Audits
- https://chainsafe.io/audits
