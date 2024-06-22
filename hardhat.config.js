require("@nomicfoundation/hardhat-toolbox");
require('hardhat-contract-sizer');
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      
    }
  },
 
  settings: {
    optimizer: {
      enabled: true,
      runs: 50
    }
  }
};
