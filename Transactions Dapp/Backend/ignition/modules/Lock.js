
// const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// const JAN_1ST_2030 = 1893456000;
// const ONE_GWEI = 1_000_000_000n;

// module.exports = buildModule("LockModule", (m) => {
//   const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
//   const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

//   const lock = m.contract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   return { lock };
// });

const { ethers } = require("hardhat");

async function main() {
  // Get the Contract Factory
  const Transaction = await ethers.getContractFactory("Transaction");

  console.log("Deploying Transaction contract...");
  
  // Deploy the contract
  const transaction = await Transaction.deploy();
  await transaction.waitForDeployment();

  // Get contract address
  const contractAddress = await transaction.getAddress();
  
  console.log(`Transaction contract deployed at: ${contractAddress}`);
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

