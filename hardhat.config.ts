import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
/* import "@openzeppelin/hardhat-upgrades"; */

dotenv.config();

const { //This variables must be in the .env file, in order to work (like .env.example)
  T_NET_CHAIN_ID,
  B_NET_CHAIN_ID,
  PRIVATE_KEY,
  T_NODE_IP,
  B_NODE_IP,
  NODE_ENDPOINT
} = process.env;


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "byzantium"
    }
  },
  networks: {
    hardhat: {
      //We fork Alastria blockchain in localhost, for development purposes.
      chainId: Number(T_NET_CHAIN_ID),
      forking: {
        url: `http://${T_NODE_IP}:22000`
        //blockNumber: 31616435
      }
    },
    t_alastria: {
      url: `${NODE_ENDPOINT}`, //Single URL endpoint
      //url: String(NODE_ENDPOINT), //Alternative way
      //url: `http://${T_NODE_IP}:22000`, //Node IP
      chainId: Number(T_NET_CHAIN_ID),
      gasPrice: 0,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : []
    },
    b_alastria: {
      url: `http://${B_NODE_IP}:8545`,  //Node IP
      chainId: Number(B_NET_CHAIN_ID),
      gasPrice: 0,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : []
    }
  },
  mocha: {
    timeout: 0
  }
};

export default config;
