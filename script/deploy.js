const hre = require("hardhat");

async function main() {

  const MainChain = await hre.ethers.deployContract(
    "Core/MainChain"
  );

  await MainChain.waitForDeployment();
  console.log(`MainChain deployed to ${MainChain.target}`);

}

  main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
  });

