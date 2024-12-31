---
sidebar_position: 3
slug: wallet-api
title: walletAPI
---

[Hypercore.one](https://hypercore.one) offers a secure and efficient cross-platform wallet implementation (`znn_walletapi_csharp`) for the Zenon Network. This .NET-based Wallet API interfaces with the Zenon Alphanet and is built on Microsoft .NET 8.0. While primarily designed for Centralized Exchanges, it's suitable for any application requiring programmatic access to Zenon wallet functionality. The implementation provides a complete set of features for interacting with the Zenon blockchain through a clean, well-documented API interface, requiring only a Zenon Node for full functionality.

### Key Features:
- **Comprehensive API Coverage:** This library covers all essential wallet functionalities, including blockchain data access, wallet creation/management, and transaction submission.
- **Ease of Integration:** Designed with simplicity in mind, developers can quickly incorporate Zenon wallet capabilities into their applications.
- **Robust Security:** Built with security as a priority, featuring JWT bearer authentication for secure access.
- **Developer-Friendly:** Includes extensive documentation, Swagger UI for testing, and welcomes community contributions.

### Getting Started:
To get started with `znn_walletapi_csharp`, you can visit the [repository](https://github.com/hypercore-one/znn_walletapi_csharp) for detailed documentation, installation instructions, and example usage.

### Example Usage:
Here is a quick example to demonstrate how you can start using the Zenon Wallet API in your project:

#### To authenticate

1. Authenticate an user to create a token.

``` shell
curl --location --request POST 'https://localhost/api/users/authenticate' \ 
	--header 'Content-Type: application/json' \ 
	--header 'Accept: */*' \ 
	--data-raw '{"username": "admin","password": "admin" }'
```

2. Use the token from the response and place it in the `Authorization` header for future requests.


#### To check wallet status

1. Authenticate an user with an user role.
2. Check wallet status.

``` shell
curl --location --request GET 'https://localhost/api/wallet/status' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [enter token here]' \
--header 'Accept: */*' \
```


#### To create a new wallet

1. Authenticate an user with an admin role.
2. Create a new wallet.

``` shell
curl --location --request POST 'https://localhost/api/wallet/init' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [enter token here]' \
--header 'Accept: */*' \
--data-raw '{
    "password": "[enter valid wallet password]"
}'
```

3. Check wallet status (should be initialized and unlocked).


#### To restore an existing wallet

1. Authenticate an user with an admin role.
2. Restore an existing wallet.

``` shell
curl --location --request POST 'https://localhost/api/wallet/restore' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [enter token here]' \
--header 'Accept: */*' \
--data-raw '{
    "password": "[enter valid wallet password]",
    "mnemonic": "[enter valid wallet mnemonic]"
}'
```

3. Check wallet status (should be initialized and unlocked).


#### To unlock the wallet

1. Authenticate an user with an user role.
2. Unlock the wallet.

``` shell
curl --location --request POST 'https://localhost/api/wallet/unlock' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [enter token here]' \
--header 'Accept: */*' \
--data-raw '{
    "password": "[enter wallet password]"
}'
```

3. Check wallet status (should be initialized and unlocked).


For more detailed examples and advanced usage, please refer to the [documentation](https://github.com/hypercore-one/znn_walletapi_csharp).

### Contributing:
Contributions are welcome! If you have suggestions, find a bug, or want to add new features, please check out the [contribution guidelines](https://github.com/hypercore-one/znn_walletapi_csharp/blob/main/CONTRIBUTING.md).

### Support:
If you encounter any issues or have questions, feel free to open an [issue](https://github.com/hypercore-one/znn_walletapi_csharp/issues) on the GitHub repository.
