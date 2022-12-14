// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello!");

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();

  const ERCToken = await hre.ethers.getContractFactory("ERCToken");
  const ercToken = await ERCToken.deploy("ERC Imitated Token", "ERCT");

  await greeter.deployed();
  await token.deployed();
  await ercToken.deployed();

  console.log(
    `Greeter deployed to ${greeter.address}`,
    "\n",
    `Token deployed to ${token.address}`,
    "\n",
    `ERCToken deployed to ${ercToken.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
