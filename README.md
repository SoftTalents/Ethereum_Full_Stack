# Full Stack Ethereum Development Example using Hardhat + Ethers.js

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Start point

To start hardhat project, run the following command:
```bash
npx hardhat
```

## Compile

To compile, run the following command:
```bash
npx hardhat compile
```

## Deploy

To deply to the local network, you first need to start local test node.
```bash
npx hardhat node
```
Now we can run deploy script on other terminal.
```bash
npx hardhat run scripts/deploy.js --network localhost
```
**_Note: Before deploy, you have to include below require commands at the heading of hardhat.config.js_**
```js
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
```

To deploy to the live test network - Goerli, run the following script:
```bash
npx hardhat run scripts/deploy.js --network goerli
```

Runs the app in the development mode.
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Writing Hardhat Tasks

To run hardhat task, first define task into hardhat.config.js
```sol
task("cocoa", "Printes the list of accounts", async (taskArg, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
```

Then run task as below.
```bash
npx hardhat cocoa
```
