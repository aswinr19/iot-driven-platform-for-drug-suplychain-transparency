const hre = require("hardhat");

async function main() {
   const Partnerships = await hre.ethers.deployContract("Partnerships");
   await Partnerships.waitForDeployment();
   console.log(`Partnerships deployed to ${Partnerships.target}`);
  
  const MainChain = await hre.ethers.deployContract("Mainchain", {
    libraries: { 
      Partnership: Partnerships.target
    }
  });
  await MainChain.waitForDeployment();
  console.log(`MainChain deployed to ${MainChain.target}`);
}

  main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
  });

