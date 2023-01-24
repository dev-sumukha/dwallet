import React from 'react'

function Log({e}) {
  const myStyle = {
    backgroundColor:"white"
  }
  return (
    <>
      <div style={myStyle}>{JSON.stringify(e,["transactionHash","blockHash","blockNumber","gasUsed"],2)}</div>
    </>
  )
}

export default Log