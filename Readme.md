## Hardhat Guide 

.env file must be filled with the private key, and the IP of the network's node.

#### Installation
```sh
cd Hardhat
npm install
```

#### Deployment in T Network
```sh
npx hardhat clean
npx hardhat compile
npx hardhat run ./scripts/deploy.ts --network t_alastria
```

#### Deployment in B Network
```sh
npx hardhat clean
npx hardhat compile
npx hardhat run ./scripts/deploy.ts --network b_alastria
```

# DOME-blockchain_smart_contracts
