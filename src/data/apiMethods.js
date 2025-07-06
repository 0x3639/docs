export const API_METHODS = {
  ledger: {
    name: 'Ledger',
    description: 'Dual ledger API methods',
    methods: {
      'ledger.getFrontierAccountBlock': {
        description: 'Returns the latest account block for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Account address' }
        ]
      },
      'ledger.getUnconfirmedBlocksByAddress': {
        description: 'Returns all unconfirmed account blocks for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Account address' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'ledger.getUnreceivedBlocksByAddress': {
        description: 'Returns all unreceived blocks for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Account address' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'ledger.getAccountBlockByHash': {
        description: 'Returns an account block by its hash',
        params: [
          { name: 'hash', type: 'hash', required: true, description: 'Block hash' }
        ]
      },
      'ledger.getAccountBlocksByHeight': {
        description: 'Returns account blocks by height range',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Account address' },
          { name: 'height', type: 'number', required: true, description: 'Starting height' },
          { name: 'count', type: 'number', required: false, default: 10, description: 'Number of blocks' }
        ]
      },
      'ledger.getAccountBlocksByPage': {
        description: 'Returns paginated account blocks',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Account address' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'ledger.getFrontierMomentum': {
        description: 'Returns the latest momentum',
        params: []
      },
      'ledger.getMomentumBeforeTime': {
        description: 'Returns the momentum before a specific timestamp',
        params: [
          { name: 'timestamp', type: 'number', required: true, description: 'Unix timestamp' }
        ]
      },
      'ledger.getMomentumByHash': {
        description: 'Returns a momentum by its hash',
        params: [
          { name: 'hash', type: 'hash', required: true, description: 'Momentum hash' }
        ]
      },
      'ledger.getMomentumsByHeight': {
        description: 'Returns momentums by height range',
        params: [
          { name: 'height', type: 'number', required: true, description: 'Starting height' },
          { name: 'count', type: 'number', required: false, default: 10, description: 'Number of momentums' }
        ]
      },
      'ledger.getMomentumsByPage': {
        description: 'Returns paginated momentums',
        params: [
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'ledger.getDetailedMomentumsByHeight': {
        description: 'Returns detailed momentums by height range',
        params: [
          { name: 'height', type: 'number', required: true, description: 'Starting height' },
          { name: 'count', type: 'number', required: false, default: 10, description: 'Number of momentums' }
        ]
      },
      'ledger.getAccountInfoByAddress': {
        description: 'Returns account information for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Account address' }
        ]
      }
    }
  },
  stats: {
    name: 'Stats',
    description: 'Node statistics API',
    methods: {
      'stats.osInfo': {
        description: 'Returns operating system information',
        params: []
      },
      'stats.processInfo': {
        description: 'Returns process information',
        params: []
      },
      'stats.networkInfo': {
        description: 'Returns network information',
        params: []
      },
      'stats.runtimeInfo': {
        description: 'Returns runtime information',
        params: []
      },
      'stats.syncInfo': {
        description: 'Returns synchronization information',
        params: []
      }
    }
  },
  subscribe: {
    name: 'Subscribe',
    description: 'Subscription API for real-time updates',
    methods: {
      'subscribe.toMomentums': {
        description: 'Subscribe to new momentums',
        params: [],
        isSubscription: true
      },
      'subscribe.toAllAccountBlocks': {
        description: 'Subscribe to all account blocks',
        params: [],
        isSubscription: true
      },
      'subscribe.toAccountBlocksByAddress': {
        description: 'Subscribe to account blocks for a specific address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Account address' }
        ],
        isSubscription: true
      },
      'subscribe.toUnreceivedAccountBlocksByAddress': {
        description: 'Subscribe to unreceived blocks for a specific address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Account address' }
        ],
        isSubscription: true
      }
    }
  },
  'embedded.pillar': {
    name: 'Pillar',
    description: 'Pillar embedded contract methods',
    methods: {
      'embedded.pillar.getQsrRegistrationCost': {
        description: 'Returns the QSR registration cost for a pillar',
        params: []
      },
      'embedded.pillar.checkNameAvailability': {
        description: 'Checks if a pillar name is available',
        params: [
          { name: 'name', type: 'string', required: true, description: 'Pillar name to check' }
        ]
      },
      'embedded.pillar.getAll': {
        description: 'Returns all pillars',
        params: [
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.pillar.getByOwner': {
        description: 'Returns pillars owned by an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Owner address' }
        ]
      },
      'embedded.pillar.getByName': {
        description: 'Returns a pillar by name',
        params: [
          { name: 'name', type: 'string', required: true, description: 'Pillar name' }
        ]
      },
      'embedded.pillar.getDelegatedPillar': {
        description: 'Returns the pillar an address is delegating to',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Delegator address' }
        ]
      },
      'embedded.pillar.getDepositedQsr': {
        description: 'Returns deposited QSR for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Address to check' }
        ]
      },
      'embedded.pillar.getUncollectedReward': {
        description: 'Returns uncollected rewards for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Address to check' }
        ]
      },
      'embedded.pillar.getFrontierRewardByPage': {
        description: 'Returns frontier rewards by page',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Address to check' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.pillar.getPillarEpochHistory': {
        description: 'Returns epoch history for a pillar',
        params: [
          { name: 'name', type: 'string', required: true, description: 'Pillar name' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.pillar.getPillarsHistoryByEpoch': {
        description: 'Returns pillars history for a specific epoch',
        params: [
          { name: 'epoch', type: 'number', required: true, description: 'Epoch number' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      }
    }
  },
  'embedded.plasma': {
    name: 'Plasma',
    description: 'Plasma embedded contract methods',
    methods: {
      'embedded.plasma.get': {
        description: 'Returns plasma information for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Account address' }
        ]
      },
      'embedded.plasma.getEntriesByAddress': {
        description: 'Returns plasma entries for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Account address' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.plasma.getRequiredPoWForAccountBlock': {
        description: 'Returns required PoW for an account block',
        params: [
          { name: 'accountBlockTemplate', type: 'object', required: true, description: 'Account block template' }
        ]
      }
    }
  },
  'embedded.sentinel': {
    name: 'Sentinel',
    description: 'Sentinel embedded contract methods',
    methods: {
      'embedded.sentinel.getByOwner': {
        description: 'Returns sentinels owned by an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Owner address' }
        ]
      },
      'embedded.sentinel.getAllActive': {
        description: 'Returns all active sentinels',
        params: [
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.sentinel.getDepositedQsr': {
        description: 'Returns deposited QSR for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Address to check' }
        ]
      },
      'embedded.sentinel.getUncollectedReward': {
        description: 'Returns uncollected rewards for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Address to check' }
        ]
      },
      'embedded.sentinel.getFrontierRewardByPage': {
        description: 'Returns frontier rewards by page',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Address to check' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      }
    }
  },
  'embedded.token': {
    name: 'Token',
    description: 'Token embedded contract methods',
    methods: {
      'embedded.token.getAll': {
        description: 'Returns all tokens',
        params: [
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.token.getByOwner': {
        description: 'Returns tokens owned by an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Owner address' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.token.getByZts': {
        description: 'Returns token information by ZTS',
        params: [
          { name: 'tokenStandard', type: 'tokenStandard', required: true, description: 'Token standard (ZTS)' }
        ]
      }
    }
  },
  'embedded.stake': {
    name: 'Stake',
    description: 'Stake embedded contract methods',
    methods: {
      'embedded.stake.getEntriesByAddress': {
        description: 'Returns stake entries for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Account address' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.stake.getUncollectedReward': {
        description: 'Returns uncollected rewards for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Address to check' }
        ]
      },
      'embedded.stake.getFrontierRewardByPage': {
        description: 'Returns frontier rewards by page',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Address to check' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      }
    }
  },
  'embedded.swap': {
    name: 'Swap',
    description: 'Swap embedded contract methods',
    methods: {
      'embedded.swap.getAssetsByKeyIdHash': {
        description: 'Returns swap assets by key ID hash',
        params: [
          { name: 'keyIdHash', type: 'hash', required: true, description: 'Key ID hash' }
        ]
      },
      'embedded.swap.getAssets': {
        description: 'Returns swap assets',
        params: []
      },
      'embedded.swap.getLegacyPillars': {
        description: 'Returns legacy pillars',
        params: []
      }
    }
  },
  'embedded.accelerator': {
    name: 'Accelerator-Z',
    description: 'Accelerator embedded contract methods',
    methods: {
      'embedded.accelerator.getAll': {
        description: 'Returns all accelerator projects',
        params: [
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.accelerator.getProjectById': {
        description: 'Returns a project by ID',
        params: [
          { name: 'id', type: 'hash', required: true, description: 'Project ID' }
        ]
      },
      'embedded.accelerator.getPhaseById': {
        description: 'Returns a phase by ID',
        params: [
          { name: 'id', type: 'hash', required: true, description: 'Phase ID' }
        ]
      },
      'embedded.accelerator.getVoteBreakdown': {
        description: 'Returns vote breakdown for a phase',
        params: [
          { name: 'id', type: 'hash', required: true, description: 'Phase ID' }
        ]
      },
      'embedded.accelerator.getPillarVotes': {
        description: 'Returns pillar votes for a phase',
        params: [
          { name: 'name', type: 'string', required: true, description: 'Pillar name' },
          { name: 'hashes', type: 'array', required: true, description: 'Array of phase hashes' }
        ]
      }
    }
  },
  'embedded.spork': {
    name: 'Spork',
    description: 'Spork embedded contract methods',
    methods: {
      'embedded.spork.getAll': {
        description: 'Returns all sporks',
        params: [
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      }
    }
  },
  'embedded.htlc': {
    name: 'HTLC',
    description: 'Hash Time Locked Contract methods',
    methods: {
      'embedded.htlc.getById': {
        description: 'Returns HTLC by ID',
        params: [
          { name: 'id', type: 'hash', required: true, description: 'HTLC ID' }
        ]
      },
      'embedded.htlc.getProxyUnlockStatus': {
        description: 'Returns proxy unlock status',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Proxy address' }
        ]
      }
    }
  },
  'embedded.bridge': {
    name: 'Bridge',
    description: 'Bridge embedded contract methods',
    methods: {
      'embedded.bridge.getAllNetworks': {
        description: 'Returns all bridge networks',
        params: [
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.bridge.getNetworkInfo': {
        description: 'Returns network information',
        params: [
          { name: 'networkClass', type: 'number', required: true, description: 'Network class (1=EVM, 2=non-EVM)' },
          { name: 'chainId', type: 'number', required: true, description: 'Chain ID' }
        ]
      },
      'embedded.bridge.getOrchestratorInfo': {
        description: 'Returns orchestrator information',
        params: []
      },
      'embedded.bridge.getTimeChallengesInfo': {
        description: 'Returns time challenges information',
        params: []
      },
      'embedded.bridge.getSecurityInfo': {
        description: 'Returns security information',
        params: []
      },
      'embedded.bridge.getBridgeInfo': {
        description: 'Returns bridge information',
        params: []
      },
      'embedded.bridge.getWrapTokenRequestById': {
        description: 'Returns wrap token request by ID',
        params: [
          { name: 'id', type: 'hash', required: true, description: 'Request ID' }
        ]
      },
      'embedded.bridge.getAllWrapTokenRequests': {
        description: 'Returns all wrap token requests',
        params: [
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.bridge.getAllWrapTokenRequestsByToAddress': {
        description: 'Returns wrap token requests by destination address',
        params: [
          { name: 'toAddress', type: 'string', required: true, description: 'Destination address' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.bridge.getAllWrapTokenRequestsByToAddressNetworkClassAndChainId': {
        description: 'Returns wrap token requests by destination, network, and chain',
        params: [
          { name: 'toAddress', type: 'string', required: true, description: 'Destination address' },
          { name: 'networkClass', type: 'number', required: true, description: 'Network class (1=EVM, 2=non-EVM)' },
          { name: 'chainId', type: 'number', required: true, description: 'Chain ID' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.bridge.getAllUnsignedWrapTokenRequests': {
        description: 'Returns all unsigned wrap token requests',
        params: [
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.bridge.getUnwrapTokenRequestByHashAndLog': {
        description: 'Returns unwrap token request by hash and log',
        params: [
          { name: 'transactionHash', type: 'hash', required: true, description: 'Transaction hash' },
          { name: 'logIndex', type: 'number', required: true, description: 'Log index' }
        ]
      },
      'embedded.bridge.getAllUnwrapTokenRequests': {
        description: 'Returns all unwrap token requests',
        params: [
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.bridge.getAllUnwrapTokenRequestsByToAddress': {
        description: 'Returns unwrap token requests by destination address',
        params: [
          { name: 'toAddress', type: 'address', required: true, description: 'Destination address' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.bridge.getFeeTokenPair': {
        description: 'Returns fee token pair information',
        params: [
          { name: 'zts', type: 'tokenStandard', required: true, description: 'Token standard' }
        ]
      }
    }
  },
  'embedded.liquidity': {
    name: 'Liquidity',
    description: 'Liquidity embedded contract methods',
    methods: {
      'embedded.liquidity.getLiquidityInfo': {
        description: 'Returns liquidity information',
        params: []
      },
      'embedded.liquidity.getSecurityInfo': {
        description: 'Returns security information',
        params: []
      },
      'embedded.liquidity.getTimeChallengesInfo': {
        description: 'Returns time challenges information',
        params: []
      },
      'embedded.liquidity.getLiquidityStakeEntriesByAddress': {
        description: 'Returns liquidity stake entries for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Account address' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      },
      'embedded.liquidity.getUncollectedReward': {
        description: 'Returns uncollected rewards for an address',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Address to check' }
        ]
      },
      'embedded.liquidity.getFrontierRewardByPage': {
        description: 'Returns frontier rewards by page',
        params: [
          { name: 'address', type: 'address', required: true, description: 'Address to check' },
          { name: 'pageIndex', type: 'number', required: false, default: 0, description: 'Page index (0-based)' },
          { name: 'pageSize', type: 'number', required: false, default: 10, description: 'Items per page' }
        ]
      }
    }
  }
};

// Helper function to get all methods in a flat array
export const getAllMethods = () => {
  const methods = [];
  Object.entries(API_METHODS).forEach(([namespace, category]) => {
    Object.entries(category.methods).forEach(([methodName, methodInfo]) => {
      methods.push({
        name: methodName,
        category: category.name,
        ...methodInfo
      });
    });
  });
  return methods;
};

// Helper function to get method by name
export const getMethodByName = (methodName) => {
  for (const [namespace, category] of Object.entries(API_METHODS)) {
    if (category.methods[methodName]) {
      return {
        name: methodName,
        category: category.name,
        ...category.methods[methodName]
      };
    }
  }
  return null;
};

// Parameter type definitions for validation
export const PARAM_TYPES = {
  address: {
    validate: (value) => /^z1[a-z0-9]{39}$/.test(value),
    placeholder: 'z1qzal6c5s9rjnnxd2z7dvdhjxpmmj4fmw56a0mz',
    description: 'Zenon address (z1...)'
  },
  hash: {
    validate: (value) => /^[a-f0-9]{64}$/.test(value),
    placeholder: '0000000000000000000000000000000000000000000000000000000000000000',
    description: '64 character hex string'
  },
  number: {
    validate: (value) => !isNaN(value) && value >= 0,
    placeholder: '0',
    description: 'Positive integer'
  },
  string: {
    validate: (value) => value.length > 0,
    placeholder: '',
    description: 'Text string'
  },
  tokenStandard: {
    validate: (value) => /^zts1[a-z0-9]{15}$/.test(value),
    placeholder: 'zts1znnxxxxxxxxxxxxx9z4ulx',
    description: 'Token standard (zts1...)'
  },
  array: {
    validate: (value) => Array.isArray(value),
    placeholder: '[]',
    description: 'JSON array'
  },
  object: {
    validate: (value) => typeof value === 'object' && value !== null,
    placeholder: '{}',
    description: 'JSON object'
  }
};