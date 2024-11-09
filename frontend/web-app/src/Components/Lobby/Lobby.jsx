import React from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useEffect,useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import Closer from '../Closer'
axios.defaults.withCredentials=true;

function Lobby() {
  const navigate = useNavigate();
  

  const [Players, setPlayers] = useState([]);
  const [Messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [user, setUser] = useState({ user:'',status:'', id: '' });
const savedUserName = Cookies.get('user');
  
const onlineSocket = useRef(null);
const chatSocket = useRef(null);
const gameSocket = useRef(null);

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

  useEffect(() => { // Function to initialize sockets and events 
    const initializeSockets = async () => {
      onlineSocket.current = io('http://localhost:8989', { withCredentials: true });
      chatSocket.current = io('http://localhost:3000', { withCredentials: true });
      gameSocket.current = io('http://localhost:4000', { withCredentials: true, query: { userName: savedUserName } });

      const validUser = await checkTokens();
      if (validUser !== 200) {
        navigate('/');
        window.location.reload();
      } else {
        await getMessages();


       // Set up event listeners for gameSocket 
             gameSocket.current.on('Receive', (sender, receiver) => {
               console.log('Invite received from', sender, 'to', receiver);
                const answer = window.confirm(`You have received an invite from ${sender}. Do you want to play?`);
                 gameSocket.current.emit('answer', receiver, sender, answer); });
                  gameSocket.current.on('start game', (receiver, answer) => {
                     console.log('Invite answer from', receiver, 'is', answer);
                      if (answer) { handleStartGame();
                       } }); 



                      // Ensure onlineSocket is connected before emitting events
                        onlineSocket.current.emit('connected', { userName: savedUserName, gameSocketId: gameSocket.id }); 
                        // Set up event listeners for onlineSocket 
                        onlineSocket.current.on('statusChange', (updatedList) => {
                           setPlayers(updatedList); console.log(updatedList); });
                           
                           // Set up event listeners for chatSocket 
                           chatSocket.current.emit('connected', savedUserName);
                           chatSocket.current.on('message', (message) => {
                             console.log('Message received:', message); 
                             setMessages((prevMessages) => [...prevMessages, message]);
                             }); } };
                             
                               initializeSockets();
                           
                                  }, []);



  
  const handleLogoutClick = async () => {
    const response = await axios.get('http://localhost:5555/logout', {
      withCredentials: true,
    })
    if(response.status===200){
      console.log('loged out')
      gameSocket.current.disconnect()
      onlineSocket.current.disconnect()
      chatSocket.current.disconnect(user)
     navigate('/');
      window.location.reload();
      alert('You have been logged out');
    };
  
  };

  // Define the Message 
  const Message = ({ sender, content, time }) => (
    <div style={{ marginBottom: '10px', color: sender === Cookies.get('user') ? 'red' : 'black' }}>
      <strong>{sender}:</strong> {content } <span style={{ fontSize: '0.8em', color: 'gray' }}>{time}</span>
    </div>
  );

 // Define the handleSendClick function
 const handleSendClick = () => {
  if (!messageInput) return;
  chatSocket.current.emit('messageSent', { sender: savedUserName, content: formatMessage(messageInput), time: new Date().toLocaleTimeString() });
  setMessageInput('');

  };

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

  const getMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/messages', { withCredentials: true });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

   // Define the Player
   const Player = (player) => (
    <div style={{ marginBottom: '10px', color: 'black' }}>
      <strong>{player.userName}</strong> 
      {player.userName === savedUserName ? (
        <span style={{ marginLeft: '10px', color: 'blue' }}>You</span>
      ) : player.status === 'online' ? (
        <button style={{ marginLeft: '10px' }}
        onClick={()=>handlePlayClick(savedUserName,player.userName)}>Play</button>
      ) : (
        <span style={{ marginLeft: '10px', color: 'gray' }}>In Game</span>
      )}
    </div>
  );

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
            gameSocketId={player.gameSocketId}
            />
          ))
        }
    </div>
  );

 const handlePlayClick = (senderUserName,recieverUserName) => {
  if (gameSocket) {
    gameSocket.current.emit('invite', senderUserName,recieverUserName);
    console.log('Invite sent from', senderUserName, 'to', recieverUserName);
  } else {
    console.error('gameSocket is not defined');
  }
}

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
            {Messages.map((msg, index) => (
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
          onChange={(e) => {
            if (e.target.value.length <= 40) {
              setMessageInput(e.target.value);
            }
          }}
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