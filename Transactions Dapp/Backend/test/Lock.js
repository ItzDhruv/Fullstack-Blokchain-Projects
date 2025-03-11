const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transaction Contract", function () {
  let transaction, owner, addr1;

  beforeEach(async function () {
    const Transaction = await ethers.getContractFactory("Transaction");
    transaction = await Transaction.deploy(); // No need for .deployed()

    [owner, addr1] = await ethers.getSigners();
  });

  it("Should send Ether using sendEther function", async function () {
    const initialBalance = await ethers.provider.getBalance(addr1.address);
    const sendValue = ethers.parseEther("0.05"); // Sending 0.05 ETH

    await transaction.connect(owner).sendEther(addr1.address, { value: sendValue });

    const finalBalance = await ethers.provider.getBalance(addr1.address) ;
    expect(finalBalance).to.be.above(initialBalance); // Balance should increase
  });

  it("Should send Ether using sendEther2 function", async function () {
    const initialBalance = await ethers.provider.getBalance(addr1.address);
    const sendValue = ethers.parseEther("0.05");

    await transaction.connect(owner).sendEther2(addr1.address, { value: sendValue });

    const finalBalance = await ethers.provider.getBalance(addr1.address);
    expect(finalBalance).to.be.above(initialBalance);
  });

  it("Should revert if sending 0 Ether using sendEther", async function () {
    await expect(transaction.sendEther(addr1.address, { value: 0 }))
      .to.be.revertedWith("amount should be greater than zero");
  });

  it("Should revert if sending 0 Ether using sendEther2", async function () {
    await expect(transaction.sendEther2(addr1.address, { value: 0 }))
      .to.be.revertedWith("amount should be greater than zero"); // apdi require nu function b kaam kre aena mate 
  });
});
