import React from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import Closer from '../Closer'
axios.defaults.withCredentials=true;

function Lobby() {
  const navigate = useNavigate();
  const user = Cookies.get('user');
  

  const [Players, setPlayers] = useState([]);
  const [Messeges, setMesseges] = useState([]);
  
  const onlineSocket = io('http://localhost:8989',{withCredentials:true});
  const chatSocket = io('http://localhost:3000',{withCredentials:true});
  

  const checkTokens = async () => {
    try {
      const response = await axios.get('http://localhost:5555/checkTokens', { withCredentials: true });
      if (response.status !== 200) {
        Cookies.remove('user');
      }
      return response.status;
    } catch (error) {
      console.error('Error checking tokens:', error);
      Cookies.remove('user');
      return 401; // Return 401 on error for consistency
    }
  };

  const connectingToChat=async()=>{
    try{
      checkTokens()
      .then(validUser => {
        if (validUser !== 200) {
          navigate('/');
        } else {
const response=axios.get('http://localhost:3000/Players',{withCredentials:true});      
console.log(response);
const Players=response.data;
if(Players.some((player)=>player.userName===user)){
  return true;
}
  else{
    return false;
  }

}
});

    }


    catch(error){
      console.error('There was an error!', error);
    } 
  }

  useEffect(() => {
   
    checkTokens()
      .then(validUser => {
        if (validUser !== 200) {
          navigate('/');
        } else {
    //online connection
    onlineSocket.emit('connected', ( user ));
    //chat connection

    
    onlineSocket.on('statusChange', (updatedList) => {
      setPlayers(updatedList);
      console.log(updatedList);
    });
    
  }
});
if(connectingToChat()){
  console.log('connected to chat')
  chatSocket.emit('connected', (user));
}

chatSocket.on('message', (message) => {
  console.log('message received:', message);
  setMesseges((prevMessages) => [...prevMessages, message]);
});
  }, []);
  
  
  const handleLogoutClick = async () => {
    const response = await axios.get('http://localhost:5555/logout', {
      withCredentials: true,
    })
    if(response.status===200){
      console.log('loged out')
      onlineSocket.disconnect()
      chatSocket.disconnect(user)
     navigate('/');
      alert('You have been logged out');
    };
  
  };

  // Define the Message 
  const Message = ({ sender, content, time }) => (
    <div style={{ marginBottom: '10px', color: sender === Cookies.get('user') ? 'red' : 'black' }}>
      <strong>{sender}:</strong> {content } <span style={{ fontSize: '0.8em', color: 'gray' }}>{time}</span>
    </div>
  );

  // Define the Player
  const Player = ({ userName, status }) => (
    <div style={{ marginBottom: '10px', color: 'black' }}>
      <strong>{userName}</strong> 
      {userName === user ? (
        <span style={{ marginLeft: '10px', color: 'blue' }}>You</span>
      ) : status === 'online' ? (
        <button style={{ marginLeft: '10px' }}>Play</button>
      ) : (
        <span style={{ marginLeft: '10px', color: 'gray' }}>In Game</span>
      )}
    </div>
  );
  // Define the formatMessage function
  const formatMessage = (content) => {
    const maxLength = 20;
    if (content.length <= maxLength) return content;
    
    const words = content.split(' ');
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
    if (!messageInput) return;
    chatSocket.emit('messageSent', { sender: user, content: messageInput, time: new Date().toLocaleTimeString() });
    setMessageInput('');
  
    };

  // Define the handleStartGame function
  const handleStartGame = () => {
    alert('Game started!');
    window.open('http://localhost:9000', '_blank');
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
                sender={msg.sender} 
                content={msg.content} 
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
      <button onClick={handleStartGame}>
        game
      </button>
      <Closer/>
    </>
  );

}

export default Lobby;