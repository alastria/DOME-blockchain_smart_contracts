const express = require('express');
const app = express();
const fs = require('fs');

const {
  ethers
} = require("ethers");
const port = 3000;
require('dotenv').config();


let provider;
let domeContract;
let domeContractWithSigner;


//Sample data
let sha256_1 = "0x6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b";
let sha256_2 = "0xd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35";
let sha256_3 = "0x4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce";
let sha256_4 = "0x4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a";
let sha256_5 = "0xef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d";
let sha256_6 = "0xe7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683";
/////////


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
  initApp();
  //await TEST_emitSomeEvent();

  console.log("---> getAllEvents()")
  await getAllEvents();
  console.log("");

  console.log("---> getEventsByOrigin( 0x4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce )")
  await getEventsByOrigin(sha256_3);
  console.log("");

  console.log("---> getEventsByEntityID( 0xe7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683 )")
  await getEventsByEntityID(sha256_6);
  console.log("");

  console.log("---> getEventsByActiveState( true )")
  await getEventsByActiveState(true);
  console.log("");

  console.log("---> getEventsByActiveState( false )")
  await getEventsByActiveState(false);
})


async function initApp() {

  provider = new ethers.providers.JsonRpcProvider(process.env.NODE_ENDPOINT);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const metadata = JSON.parse(fs.readFileSync('../artifacts/contracts/EventManagerDOMEv1.sol/EventManagerDOMEv1.json').toString());
  let abi = metadata.abi;

  const domeContractAddress = process.env.CONTRACT_ADDRESS;
  domeContract = new ethers.Contract(domeContractAddress, abi, provider);
  domeContractWithSigner = domeContract.connect(signer);

  //await domeContractWithSigner.emitNewEvent(sha256_1, sha256_2, "EventDOMEv1", "data_location1", ["meta1", "data1"]);

  // Listen to EventDOMEv1 events
  domeContract.on("EventDOMEv1", (index, timestamp, origin, entityIDHash, eventType, dataLocation, metadata) => {
    console.log(` --> index: ----- ${ index } ------- timestamp: ${ timestamp} `);
    console.log(`   + origin: ---- ${ origin} ------- entityIDHash: ${ entityIDHash} `);
    console.log(`   + eventType: - ${ eventType } --- dataLocation: ${ dataLocation } `);
    console.log(`   + metadata: -- ${ metadata } `);
  });


}

async function TEST_emitSomeEvent(j) {

  for (i=1; i<=j; i++){
      await domeContractWithSigner.emitNewEvent("1", ["sha256_"+i], "EventDOMEv1", "data_location1", ["meta1", "data1"]);
  }

}



async function getAllEvents() {

  let blocknum = await provider.getBlockNumber();
  console.log("block number is " + blocknum);

  let filterFrom = "*";

  const events = await domeContract.queryFilter(filterFrom, 118196100, blocknum);
  console.log(">>>>>>>-------------------------------------------------------------");
  console.log(">>>>>---------------------------------------------------------------");
  console.log("Events received from block 115041499 to block " + blocknum);
  console.log("--------------------------------------------------------------------");
  console.log("Number of Events: " + events.length);
  console.log(" --> Events");
  console.log(events);

  console.log("---------------------------------------------------------------<<<<<");
  console.log("------------------------------------------------------------<<<<<<<<");
}


//Filter functions

async function getEventsByOrigin(origin) {

  let blocknum = await provider.getBlockNumber();
  console.log("block number is " + blocknum);

  let filterFrom = domeContract.filters.EventDOMEv1(null, null, origin, null, null, null, null, null);

  const events = await domeContract.queryFilter(filterFrom, 118196100, blocknum);
  console.log(">>>>>>>-------------------------------------------------------------");
  console.log(">>>>>---------------------------------------------------------------");
  console.log("Events received from block 115041499 to block " + blocknum);
  console.log("--------------------------------------------------------------------");
  console.log("Number of Events: " + events.length);
  console.log(" --> Events");
  console.log(events);
  //console.log(events.args["entityIDHash"]);

  console.log("---------------------------------------------------------------<<<<<");
  console.log("------------------------------------------------------------<<<<<<<<");
}

async function getEventsByEntityID(entityID) {

  let blocknum = await provider.getBlockNumber();
  console.log("block number is " + blocknum);

  let filterFrom = domeContract.filters.EventDOMEv1(null, null, null, entityID, null, null, null, null);

  const events = await domeContract.queryFilter(filterFrom, 118196100, blocknum);
  console.log(">>>>>>>-------------------------------------------------------------");
  console.log("Events received from block 115041499 to block " + blocknum);
  console.log("--------------------------------------------------------------------");
  console.log("Number of Events: " + events.length);

  console.log(" --> Events");
  console.log(events);

  console.log("------------------------------------------------------------<<<<<<<<");
}


async function getEventsByActiveState(state) { //state = true || false

  let blocknum = await provider.getBlockNumber();
  console.log("block number is " + blocknum);

  let filterFrom = domeContract.filters.EventDOMEv1(null, null, null, null, null, null, null, state);

  const events = await domeContract.queryFilter(filterFrom, 118196100, blocknum);
  console.log(">>>>>>>-------------------------------------------------------------");
  console.log("Events received from block 115041499 to block " + blocknum);
  console.log("--------------------------------------------------------------------");
  console.log("Number of Events: " + events.length);

  console.log(" --> Events");
  console.log(events);

  console.log("------------------------------------------------------------<<<<<<<<");
}
