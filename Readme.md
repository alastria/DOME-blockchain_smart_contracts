# DOME-blockchain_smart_contracts

Contract deployed in Alastria T Network, in the following address:

```sh
0x313d5008857cc4D29d383A3F5D5Cf8fBc0E91979
```

# Contract usage
## Event emit

The main function is: ``` emitNewEvent ```

Which accepts 4 input parameters:

```sh
  address origin,           
  string eventType,            
  string dataLocation,
  string[] metadata   
```

The function ``` emitNewEvent ``` wil emit an event with the following properties:

```sh
event EventDOMEv1(
  uint256 indexed index,  
  uint256 indexed timestamp,  
  address indexed origin,           
  string eventType,            
  string dataLocation,
  string[] metadata    
);
```

Events could be filtered by index, timestamp and origin.

## Ownership transfer

The function ```transferOwnership ``` allow to the owner, to transfer the ownership of the contract, in order to be able to execute the function ``` emitNewEvent ```.
```transferOwnership ``` only accepts one input parameter: A valid Ethereum address.


# Deployment
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

