import { useState, useEffect } from "react";
import "./Main.css";

function Accounts({ web3, accountAddress }) {
  const [account, setAccount] = useState(null);
  const [accountBalance, setaccountBalance] = useState(null);
  const [provider, setProvider] = useState(null);

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
      accountAddress(selectedAccountAddress);
      let accountBalance = await web3.eth.getBalance(selectedAccountAddress);
      const etherBalance = web3.utils.fromWei(accountBalance, "ether");
      setaccountBalance(etherBalance);
      setAccount(selectedAccountAddress);
    }
  };
  return (
    <>
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
    </>
  );
}

export default Accounts;
