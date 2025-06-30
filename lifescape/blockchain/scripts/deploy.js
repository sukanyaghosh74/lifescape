const hre = require("hardhat");

async function main() {
  const LifeScapeGoals = await hre.ethers.getContractFactory("LifeScapeGoals");
  const contract = await LifeScapeGoals.deploy();
  await contract.deployed();
  console.log("LifeScapeGoals deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 