const { ethers } = require("hardhat"); //optional (it is in global scope)
const { expect } = require("chai");
const hre = require("hardhat");


describe("Token contract", function () {



  it("1- Deployment should assign the deployer's address to the allowed address", async function () {
    const [deployer] = await ethers.getSigners();
    const deployerAddr = await deployer.getAddress();

    const eventManagerDOMEv1 = await ethers.deployContract("EventManagerDOMEv1");
    const ownerAddr = await eventManagerDOMEv1.owner();
    //const signer = new ethers.Wallet("0xe2afef2c880b138d741995ba56936e389b0b5dd2943e21e4363cc70d81c89346", hre.network.provider);
    expect(ownerAddr).to.equal(deployerAddr);
  });


  it("2- Allowed address should be able to emit an event", async function () {

    const [deployer] = await ethers.getSigners();

    const signers = await ethers.getSigners();
    let randomAddr = await signers[1].getAddress();
    console.log(randomAddr);

    const deployerAddr = await deployer.getAddress();

    const eventManagerDOMEv1 = await ethers.deployContract("EventManagerDOMEv1");
    const ownerAddr = await eventManagerDOMEv1.owner();

    const transaction = await eventManagerDOMEv1.connect(deployer).emitNewEvent(
        randomAddr,
        "_eventType",
        "_dataLocation",
        ["_metadata1", "_metadata2", "_metadata3"]
    );

    const receipt = await transaction.wait();
    console.log("------ receipt ------");
    console.log(receipt.transactionHash);

    expect(receipt.transactionHash);
  });

  it("3- NOT Allowed address should NOT be able to emit an event", async function () {

    const [deployer] = await ethers.getSigners();

    const signers = await ethers.getSigners();
    let randomSigner = await signers[1];
    let randomSignerAddr = await signers[1].getAddress();
    console.log(randomSignerAddr);

    const deployerAddr = await deployer.getAddress();

    const eventManagerDOMEv1 = await ethers.deployContract("EventManagerDOMEv1");

    let emitNewEvent_func = eventManagerDOMEv1
    .connect(randomSigner)
    .emitNewEvent(
        randomSignerAddr,
        "_eventType",
        "_dataLocation",
        ["_metadata1", "_metadata2", "_metadata3"]
      );

    await expect(emitNewEvent_func).to.be.revertedWith('Ownable: caller is not the owner');


  });




});
