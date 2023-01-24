import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    let myStyle = {
        backgroundColor:"white",
        textDecoration:"none"
    }
  return (
    <>
        <div style={myStyle}>
            <Link to="/">Home</Link>
            <Link to="/wallet">Wallet</Link>
            <Link to="/logs">Logs</Link>
        </div>
    </>
  )
}

export default Header