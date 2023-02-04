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