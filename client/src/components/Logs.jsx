import React from 'react'
import Log from './Log'

function Logs({list}) {
  return (
    <>
      {list.map((e)=><Log e={e}/>)}
    </>
  )
}

export default Logs