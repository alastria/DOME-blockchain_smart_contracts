const { ethers } = require("hardhat"); //optional (it is in global scope)
const { expect } = require("chai");
const hre = require("hardhat");


describe("Token contract", function () {

  it("1- Deployment should assign the deployer's address to the allowed address", async function () {
    const [deployer] = await ethers.getSigners();
    const deployerAddr = await deployer.getAddress();

    const eventManagerDOMEv1 = await ethers.deployContract("EventManagerDOMEv1");
    const ownerAddr = await eventManagerDOMEv1.owner();
    expect(ownerAddr).to.equal(deployerAddr);
  });


  it("2- Allowed address should be able to emit an event", async function () {

    const [deployer] = await ethers.getSigners();
    const signers = await ethers.getSigners();
    const randomAddr = await signers[1].getAddress();
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

    expect(receipt.transactionHash);
  });


  it("3- NOT Allowed address should NOT be able to emit an event", async function () {

    const [deployer] = await ethers.getSigners();

    const signers = await ethers.getSigners();
    const randomSigner = await signers[1];
    const randomSignerAddr = await signers[1].getAddress();
    const deployerAddr = await deployer.getAddress();

    const eventManagerDOMEv1 = await ethers.deployContract("EventManagerDOMEv1");

    const emitNewEvent_func = eventManagerDOMEv1
    .connect(randomSigner)
    .emitNewEvent(
        randomSignerAddr,
        "_eventType",
        "_dataLocation",
        ["_metadata1", "_metadata2", "_metadata3"]
      );

    await expect(emitNewEvent_func).to.be.revertedWith('Ownable: caller is not the owner');
  });

  it("4- Should emit EventDOMEv1", async function () {
   const EventManagerDOMEv1 = await ethers.getContractFactory("EventManagerDOMEv1");
   const eventManagerDOMEv1 = await EventManagerDOMEv1.deploy();
   await eventManagerDOMEv1.deployed();

   const signers = await ethers.getSigners();
   const randomAddr = await signers[1].getAddress();

   await expect(eventManagerDOMEv1
     .emitNewEvent(
       randomAddr,
       "_eventType",
       "_dataLocation",
       ["_metadata1", "_metadata2", "_metadata3"]
   )).to.emit(eventManagerDOMEv1, "EventDOMEv1")
     //.withArgs();
 });


});
