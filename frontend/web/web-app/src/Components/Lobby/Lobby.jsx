import React from 'react'
import { useNavigate } from 'react-router-dom'
import {io} from 'socket.io-client'
import { useEffect } from 'react'


function Lobby() {
  const navigate=useNavigate();
  useEffect(() => {
    const socket =io('http://localhost:8989')
}, [])

  const clickhandler=(e)=>{
    navigate('/')
  }
  return <>
    <div className="container"> Lobby</div>
    <button onClick={clickhandler}> back to log in</button>
  
  </>
}

export default Lobby