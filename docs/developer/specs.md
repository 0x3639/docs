---
sidebar_position: 1
slug: specs
title: Specs
---

# Zenon Alphanet Specs

The Zenon Alphanet is now live. It was announced on Nov 19, 2021 - [Alphanet Phase 0](https://x.com/Zenon_Network/status/1461763875234324490). During Alphanet the specifications and parameters are summarized below.  

## Alphanet Specs
- **`EpochDurationInSeconds`**: 24 * 60 * 60 (1 day)
- **`MomentumTime`**: 10 seconds

### Pillar Node parameters
- **`PillarStakeAmount`**: 15000 ZNN
- **`PillarQsrStakeBaseAmount`**: 150000 QSR
- **`PillarQsrStakeIncreaseAmount`**: 10000 QSR
- **`PillarEpochLockTime`**: 83 epochs
- **`PillarEpochRevokeTime`**: 7 epochs
- **`PillarNameLengthMax`**: 40 characters

### Sentinel Node parameters
- **`SentinelZnnRegisterAmount`**: 5000 ZNN
- **`SentinelQsrDepositAmount`**: 50000 QSR
- **`SentinelEpochLockTime`**: 27 epochs
- **`SentinelEpochRevokeTime`**: 3 epochs

### Staking parameters
- **`StakeTimeUnit`**: 30 epochs
- **`StakeTimeMin`**: 30 epochs
- **`StakeTimeMax`**: 360 epochs
- **`StakeMinAmount`**: 1 ZNN

### Plasma parameters
- **`FuseMinAmount`**: 10 QSR
- **`FuseExpiration`**: 10 hours

### ZTS token parameters
- **`TokenIssueAmount`**: 1 ZNN (burned)
- **`TokenNameLengthMax`**: 40 characters
- **`TokenSymbolLengthMax`**: 10 characters
- **`TokenDomainLengthMax`**: 128 characters
- **`TokenMaxSupplyBig`**: 2^255 - 1
- **`TokenMaxDecimals`**: 18

### Swap parameters
- **`SwapAssetDecayEpochsOffset`**: 90
- **`SwapAssetDecayTickEpochs`**: 30
- **`SwapAssetDecayTickValuePercentage`**: 10
