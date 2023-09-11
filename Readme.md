# DOME-blockchain_smart_contracts

Contract deployed in Alastria T Network, in the following address:

```sh
0x8F21Cf828d0e69152b80a02B50aC42Bb62A167Eb
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

## Project installation

Prerequisites: NodeJS (tested with v18.17.0)

```sh
npm install
```

## Localhost with Alastria network's state fork 

You can interact with Smart Contracts in localhost network which contains all the Alastria T Network state.
With this project, you can get a complete fork of the original network in localhost, thanks to hardhat network configuration in ```hardhat.config.ts``` file.

```sh
npx hardhat clean
npx hardhat compile
npx hardhat run ./scripts/deploy.ts --network hardhat
```

## Alastria Mainnet

.env file must be filled with the private key, and the IP of the network's node.


### Deployment in T Network
```sh
npx hardhat clean
npx hardhat compile
npx hardhat run ./scripts/deploy.ts --network t_alastria
```

### Deployment in B Network
```sh
npx hardhat clean
npx hardhat compile
npx hardhat run ./scripts/deploy.ts --network b_alastria
```


# Automated testing

You can run the automated tests with the following command:
```sh
npx hardhat test
```

## Coverage

 - ✓ 1- Deployment should assign the deployer's address to the allowed address
 - ✓ 2- Allowed address should be able to emit an event
 - ✓ 3- NOT Allowed address should NOT be able to emit an event
   
