// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

const greeterAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"

function App() {
  const [greeting, setGreetingValue] = useState();

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

  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }

  return (
    <div className="App">
      <header className='App-header'>
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input value={greeting} onChange={e => setGreetingValue(e.target.value)}
          placeholder="Set greeting" />
      </header>
    </div>
  )

}

export default App;
