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

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
