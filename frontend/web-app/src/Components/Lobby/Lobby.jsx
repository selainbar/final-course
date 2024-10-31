import React from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
// import socketclient from 'socket.io-client' (remove this line)
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import Cookies from 'js-cookie';

axios.defaults.withCredentials=true;

function Lobby() {
  const navigate = useNavigate();
  const user = Cookies.get('user');

  const [Players, setPlayers] = useState([{ userName: 'selainbar', status: 'online' }, { userName: 'selainbar2', status: 'online' }]);
  const [Messeges, setMesseges] = useState([{ userName: 'selainbar', time: '10/04/2000 00:00', message: 'welcome to my lobby' }]);
  
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    //online connection
    const onlineSocket = io('http://localhost:8989',{withCredentials:true});
    onlineSocket.emit('connected', { userName:user });
    console.log(user,"emited")
    //chat connection

   /* const chatSocket = io('http://localhost:3000');
    chatSocket.emit('connected', { userName:user  });

    chatSocket.on('message', (message) => {
      setMesseges((prevMessages) => [...prevMessages, message]);
    });

    */
    onlineSocket.on('statusChange', (updatedList) => {
      setPlayers(updatedList);
    });
    
    
  }, []);
  
  
  const handleLogoutClick = async () => {
    const response = await axios.get('http://localhost:5555/logout', {
      withCredentials: true,
    })
    if(response.status===200){
      console.log('loged out')
    };
    
    navigate('/');
  };

  // Define the Message 
  const Message = ({ userName, message, time }) => (
    <div style={{ marginBottom: '10px', color: userName === Cookies.get('userName') ? 'red' : 'black' }}>
      <strong>{userName}:</strong> {message } <span style={{ fontSize: '0.8em', color: 'gray' }}>{time}</span>
    </div>
  );

  // Define the Player
  const Player = ({ userName, status }) => (
    <div style={{ marginBottom: '10px', color: 'black' }}>
      <strong>{userName}</strong> 
      {userName === userName.userName ? (
        <span style={{ marginLeft: '10px', color: 'blue' }}>You</span>
      ) : status === 'online' ? (
        <button style={{ marginLeft: '10px' }}>Play</button>
      ) : (
        <span style={{ marginLeft: '10px', color: 'gray' }}>In Game</span>
      )}
    </div>
  );
  // Define the formatMessage function
  const formatMessage = (message) => {
    const maxLength = 20;
    if (message.length <= maxLength) return message;
    
    const words = message.split(' ');
    let formattedMessage = '';
    let currentLine = '';
    
    words.forEach((word) => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += `${word} `;
      } else {
        formattedMessage += `${currentLine.trim()}\n`;
        currentLine = `${word} `;
      }
    });
    
    formattedMessage += currentLine.trim();
    return formattedMessage;
  };

  

  // Define the OnlinePlayers component
  const OnlinePlayers = ({ players }) => (
    <div 
      style={{ 
        backgroundColor: 'white', 
        width: '20vw', 
        height: '60vh', 
        overflowY: 'scroll', 
        border: '1px solid black', 
        padding: '10px',
        marginLeft: '10px'
      }}
    >
      {players
        .filter(player => player.userName !== Cookies.get('userName'))
        .map((player, index) => (
          <Player 
          key={index} 
            userName={player.userName} 
            status={player.status} 
            />
          ))
        }
    </div>
  );

  const [messageInput, setMessageInput] = useState('');

  // Define the handleSendClick function
  const handleSendClick = () => {
   /* if (!messageInput) return;
    const chatSocket = io('http://localhost:3000');
    chatSocket.emit('sendMessage', { userName: user, message: messageInput, time: new Date().toLocaleTimeString() });
    setMessageInput('');
  */
    };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className="container" style={{ flex: 1 }}>
          <div 
            style={{ 
              backgroundColor: 'white', 
              width: '60vw', 
              height: '60vh', 
              overflowY: 'scroll', 
              border: '1px solid black', 
              padding: '10px' 
            }}
            id="chat-container"
          >
            {Messeges.map((msg, index) => (
              <Message 
                key={index} 
                userName={msg.userName} 
                message={msg.message} 
                time={msg.time} 
              />
            ))}
          </div>
        </div>
        <OnlinePlayers players={Players} />
        <button 
          onClick={handleLogoutClick} 
          style={{ position: 'absolute', top: '10px', left: '10px' }}
        >
          Logout
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <input 
          type="text" 
          placeholder="Type a message..." 
          style={{ flex: 1, marginRight: '10px' }} 
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={handleSendClick}>Send</button>
      </div>
    </>
  );

}

export default Lobby;