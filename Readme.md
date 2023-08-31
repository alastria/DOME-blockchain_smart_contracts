# DOME-blockchain_smart_contracts

# Usage

The main function is: 
```sh
emitNewEvent
```

Which accepts 4 input parameters:

```sh
  address origin,           
  string eventType,            
  string dataLocation,
  string[] metadata   
```

This function ```sh emitNewEvent ``` wil emit an event with the following properties:

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

