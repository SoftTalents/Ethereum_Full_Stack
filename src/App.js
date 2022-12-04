// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
// import Token from './artifacts/contracts/Token.sol/Token.json';
import ERCToken from './artifacts/contracts/ERCToken.sol/ERCToken.json';

const greeterAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
// const tokenAddress = "0xc2185EDb108D4042C429b0Bb72A346591C4F0b97"
const ercTokenAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"

function App() {
  const [greeting, setGreetingValue] = useState();
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();

  async function requestAccount() {
    await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      try {
        const data = await contract.greet()
        setGreetingValue(data);
        console.log('data: ', data)
      } catch(err) {
        console.log('Error: ', err)
      }
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(ercTokenAddress, ERCToken.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log(`Balance: ${balance.toString()}`);
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ercTokenAddress, ERCToken.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} coins successfully sent to ${userAccount}`);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await setGreeting(event.target.greetingInput.value)
    setGreetingValue(event.target.greetingInput.value)
    event.target.greetingInput.value = ""
  }

  async function setGreeting(value) {
    if (!value) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(value)
      await transaction.wait()
      fetchGreeting()
    }
  }

  // return (
  //   <div className="App">
  //     <header className='App-header'>
  //       <button onClick={fetchGreeting}>Fetch Greeting</button>
  //       <button onClick={setGreeting}>Set Greeting</button>
  //       <input value={greeting} onChange={e => setGreetingValue(e.target.value)}
  //         placeholder="Set greeting" />

  //       <br />
  //       <button onClick={getBalance}>Get Balance</button>
  //       <button onClick={sendCoins}>Send Coins</button>
  //       <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
  //       <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
  //     </header>
  //   </div>
  // )

  return (
    <div className='w-full max-w-lg container'>
      <div className='shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4'>
        <div className='text-gray-600 font-bold text-lg mb-2'>
          Full Stack React Ethereum Dapp
        </div>
        <div className='w-full border-4 p-2 mb-4 rounded border-gray-400'>
          <div className='text-gray-600 font-bold text-md mb-2'>
            Fetch Greeting Message From Smart Contract
          </div>
          <div className='flex'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={fetchGreeting}>Fetch Greeting</button>
          </div>
        </div>
        <div className='w-full border-4 p-2 mb-4 rounded border-gray-400'>
          <div className='text-gray-600 font-bold text-md mb-2'>
            Set Greeting Message on Smart Contract
          </div>
          <form className='flex items-center justify-between'
            onSubmit={e => handleSubmit(e)}>
            <input className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus outline-none focus:shadow-outline' name='greetingInput' />
            <button className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Set Greeting</button>
          </form>
        </div>
        <div className='w-full border-4 p-2 mb-4 rounded border-gray-400 bg-gray-100'>
          <div className='text-gray-600 font-bold text-md mb-2'>
            Greeting Message
          </div>
          <p>
            {greeting}
          </p>
        </div>
      </div>
    </div>
  )

}

export default App;
