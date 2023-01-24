import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Welcome from "./components/Welcome.jsx";
import Accounts from "./components/Accounts.jsx";
import SendEther from "./components/SendEther.jsx";
import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Logs from "./components/Logs";
import Home from './components/Home'

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null); //child to parent transfer
  // const [account, setAccount] = useState(null);
  const [accountBalance, setaccountBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [receipt, setReceipt] = useState({});
  const [toggle, setToggle] = useState(false);

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
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/logs" element={<Logs/>}/>
      </Routes>
    </BrowserRouter>

    <div className="Flex">
      <div className="welMargin">
        <Welcome />
      </div>
      <div className="Account">
        {/* <Accounts web3={web3} accountAddress={saveAccountAddress} /> */}
        <form className="label1" id="myForm">
        <label htmlFor="">Select an account</label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option></option>
        </select>
      </form>
      <span className="conAc">Connected Account: {account}</span>
      <br></br>
      <span className="acBal">Account Balance:{accountBalance} ether</span>
      <br></br>
      <span className="provider">Provider : {provider}</span>
      </div>

      <div>
        {/* <SendEther web3={web3} account={account} /> */}
        <form className="box" onSubmit={sendEther}>
        <p className="label">
          <label htmlFor="">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to"></input>
        </p>

        <p className="label">
          <label htmlFor="">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value" ></input>
        </p>
        <button className="btn" type="submit">Send</button>
      </form>
      <div className="box">
        <pre className="json">
          <h3>(Json Response)</h3>
          <code >
            {toggle &&
              JSON.stringify(
                receipt,
                ["transactionHash", "blockHash", "blockNumber", "gasUsed"],
                2
              )}
          </code>
        </pre>
      </div>
      </div>
    </div>
    </>
  );
};
export default App;
