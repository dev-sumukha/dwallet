import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Welcome from "./components/Welcome.jsx";
import Accounts from "./components/Accounts.jsx";
import SendEther from "./components/SendEther.jsx";
import "./App.css";
import './components/css/Home.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Logs from "./components/Logs";
import Home from './components/Home'
import Main from './components/Main'
import Header from "./components/Header";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null); //child to parent transfer
  // const [account, setAccount] = useState(null);
  const [accountBalance, setaccountBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [receipt, setReceipt] = useState({});
  const [toggle, setToggle] = useState(false);
  const [list,setList] = useState([]);

  const saveAccountAddress = (accountAddress) => {
    setAccount(accountAddress);
  };

  useEffect(() => {
    const init = async () => {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
      const web3 = new Web3(provider);
      setWeb3(web3);
    };
    init();
  }, []);

  useEffect(() => {
    const allAccounts = async () => {
      let select = document.getElementById("selectNumber");
      try {
        const options = await web3.eth.getAccounts();
        setProvider("Ganache");
        // setReload(reload);
        for (var i = 0; i < options.length; i++) {
          var opt = options[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          select.appendChild(el);
        }
      } catch (erorr) {
        setProvider("Not connected");
      }
    };
    web3 && allAccounts();
  }, [web3]);

  const selectAccount = async () => {
    let selectedAccountAddress = document.getElementById("selectNumber").value;
    console.log(typeof selectedAccountAddress);
    if (selectedAccountAddress) {
      saveAccountAddress(selectedAccountAddress);
      let accountBalance = await web3.eth.getBalance(selectedAccountAddress);
      const etherBalance = web3.utils.fromWei(accountBalance, "ether");
      setaccountBalance(etherBalance);
      setAccount(selectedAccountAddress);
    }
  };

  const sendEther = async (event) => {
    event.preventDefault();
    // const _from = document.querySelector("#from");
    const _to = document.querySelector("#to");
    const _value = document.querySelector("#value");
    const weiValue = web3.utils.toWei(_value.value, "ether");
    web3.eth
      .sendTransaction({
        from: account, //_from.value,
        to: _to.value,
        value: weiValue,
      })
      .then(function (receipt) {
        setReceipt(receipt);
        setToggle(true);
      });
  };

  const addTransaction = (element)=>{
    let res = [...list,element];
    setList(res);
    console.log(JSON.stringify(element,["transactionHash","blockHash","blockNumber","gasUsed"],2));
  }
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/logs" element={<Logs list={list}/>}/>
        <Route path="/wallet" element={<Main addTransaction={addTransaction}/>}/>
      </Routes>
    </BrowserRouter>

    </>
  );
};
export default App;
