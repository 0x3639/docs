---
sidebar_position: 2
slug: hyperqube-z
title: HyperQube_Z
---

## Background

HyperQube_z is the first and flagship extension chain of the Hyperqube ecosystem. The Hyperqube ecosystem is maintained by HyperCore.one and is a set of Layer 2 extension chains for Zenon that add functionality and scalability to the ecosystem. HyperQube_z uses the same Zenon architecture as mainnet and will be used for builder collaboration and rapid development of experimental features in a production betanet. Successful features and upgrades may eventually be ported to mainnet.

## Prerequisites
- Instructions assume a local computer running Linux (see [VirtualBox](https://virtualbox.org) for Mac/Windows users)
- VPS with minimum specs:
  - 2 vCPU
  - 4GB RAM
  - 50GB Storage
- Basic command line knowledge

## Register a HyperQube_z Pillar

To sign up you will need a low spec Pillar vps (2vCPU & 4G Ram) and a local computer that will create a wallet that will be used by Syrius to manage the Pillar.

### Step 1 - Create a Wallet
On a local linux computer, create a wallet that will be used for the Pillar and rewards address. This step will generate your **Pillar Address** which can also serve as your **rewards address**.

1. Install Go (version 1.21 or higher):
```bash
sudo apt update
sudo apt install -y wget
wget https://go.dev/dl/go1.21.7.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.21.7.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
```

2. Install necessary packages for building Go-based projects:
```bash
sudo apt-get install -y build-essential pkg-config
```

3. Clone and build nomctl from the hyperqube_z branch:
```bash
git clone -b hyperqube_z https://github.com/hypercore-one/nomctl.git
cd nomctl
make nomctl
```

4. Create a new wallet for the Pillar (we'll use "hqz" as the keystore name):
```bash
./build/nomctl znn-cli wallet.createNew <YOUR_PASSWORD> hqz
```

5. Retrieve your address:
```bash
./build/nomctl znn-cli -u https://my.hc1node.com:35997 -k hqz balance
```
This address is BOTH the **Pillar address** and **Pillar rewards address**. _Take note of the Pillar Address as you'll need it later_.

### Step 2 - Setup the Pillar
You will need a validator node hosted on a VPS. We do NOT recommend you run the Pillar locally at home. Hyperqube_z is designed to consume less resources than mainnet. Its block speed was reduced from 10 seconds to a minute. We hope to keep the node requirements small. We recommend a minimum of 2cpu and 4gb ram.

1. Install Go (version 1.21 or higher):
```bash
sudo apt update
sudo apt install -y wget
wget https://go.dev/dl/go1.21.7.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.21.7.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
```

2. Install necessary packages for building Go-based projects:
```bash
sudo apt-get install -y build-essential pkg-config
```

3. Clone and build nomctl, then generate the devnet configuration:
```bash
git clone -b hyperqube_z https://github.com/hypercore-one/nomctl.git
cd nomctl
make nomctl
./build/nomctl -hq generate-devnet
```

4. Retrieve your wallet address:
```bash
ls ~/.hqzd/wallet
```
This address is the **Pillar Producer address**. _Take note of this address as you'll need it for registration:_
- Pillar/Rewards Address (from Step 1)
- Producer Address (from Step 2)

### Step 3 - Register the Pillar

Steps to Register:

1. Visit [HyperQube_Z Launch Portal](https://launch.hyperqube.network)
2. Search for your desired pillar name and click Register
3. Fill in the required fields:
   - Pillar Name
   - Pillar Address (from Step 1)
   - Producer Address (from Step 2)
   - Rewards Address (same as Pillar Address)
4. Generate and sign the registration message using Syrius
5. Submit your registration

Follow this instructional video on [how to register the Pillar](https://youtu.be/jxbKJmvtBrI) if any of the steps in this section are not clear.

## FAQ

### What is hyperqube_z?
hyperqube_z is the first and flagship extension chain of the Hyperqube ecosystem. It shares the same architecture as mainnet, allowing experimental features to be introduced and tested in a production betanet setting before potentially making their way to mainnet.

### Is hyperqube_z a replacement for Zenon?
No. Zenon remains the "mothership," while hyperqube_z is an exploratory probe where new ideas can be deployed. Innovations proven on hyperqube_z could then be considered for mainnet adoption.

### Why should I sign up?
Pillars who sign up can participate in voting that influences the direction of development on hyperqube_z. Signing up also allows users to test out experimental features.

### Are there rewards?
Yes. Pillars running a hyperqube_z validator and participating in voting will earn rewards from HyperCore One work packages.



