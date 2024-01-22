const express = require('express');
const app = express();
const fs = require('fs');

const { ethers } = require("ethers");
const port = 3000;
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_ENDPOINT);
console.log(provider);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const metadata = JSON.parse(fs.readFileSync('../artifacts/contracts/EventManagerDOMEv1.sol/EventManagerDOMEv1.json').toString());
//Alternative: //await fetch('../artifacts/contracts/EventManagerDOMEv1.sol/EventManagerDOMEv1.json');
let abi = metadata.abi;

const domeContractAddress = process.env.CONTRACT_ADDRESS;
const domeContract = new ethers.Contract(domeContractAddress, abi, provider);

let blocknum;
(async function prueba(){
  blocknum = await provider.getBlockNumber();
  console.log("block number is " + blocknum);
})()

let sha256_1 = "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b";
let sha256_2 = "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35";
let sha256_3 = "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce";
let sha256_4 = "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a";
let sha256_5 = "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d";
let sha256_6 = "e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683";

const domeContractWithSigner = domeContract.connect(signer);
domeContractWithSigner.emitNewEvent("0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5", "eventtype", "dataLocation", ["meta", "data"]);



// Receive an event when ANY transfer occurs
domeContract.on("EventDOMEv1", (index, timestamp, origin, eventType, dataLocation, metadata) => {
    console.log(`index: ${ index } - timestamp: ${ timestamp} - origin: ${ origin} - eventType: ${ eventType } - dataLocation: ${ dataLocation } - metadata: ${ metadata } `);

});


async function getAllEvents(){
  const events = await domeContract.queryFilter("*", 115041499, blocknum);
  console.log("Events received from block 115041499 to block " + blocknum);
  console.log(events);
}

getAllEvents();
