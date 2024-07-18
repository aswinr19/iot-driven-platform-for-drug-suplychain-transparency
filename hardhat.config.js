require('@nomicfoundation/hardhat-toolbox')
require('hardhat-contract-sizer')
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.24',
    networks: {
        hardhat: {
            gas: 12000000,
            blockGasLimit: 0x1fffffffffffff,
            allowUnlimitedContractSize: true,
            timeout: 1800000,
        },
        localhost: {
            url: 'http://127.0.0.1:8545',
            gas: 12000000,
            blockGasLimit: 0x1fffffffffffff,
            allowUnlimitedContractSize: true,
            timeout: 1800000,
        },
    },
    settings: {
        optimizer: {
            enabled: true,
            runs: 50,
        },
    },
}
