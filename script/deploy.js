const hre = require("hardhat");

async function main() {
  const Partnership = await hre.ethers.deployContract("utils/Partnership");
  const MainChain = await hre.ethers.deployContract("Core/MainChain");

  await Partnership.waitForDeployment();
  await MainChain.waitForDeployment();
  console.log(`MainChain deployed to ${MainChain.target}`);
}

  main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
  });

