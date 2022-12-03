// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: './src/artifacts',
  },
  defaultNetwork: 'hardhat',
  network: {
    hardhat: {
      chainId: 1337
    }
  }
};
