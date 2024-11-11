import { useState,useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Closer from './Closer';
import Header from './Header';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import cookies from 'js-cookie';

axios.defaults.withCredentials=true;
function LogInComp() {
  const { user, setUser } = useContext(UserContext);
  
  const [userName, setUserName] = useState('');
  const navigate=useNavigate();
  const [password, setPassword] = useState('');
const [isFormValid, setIsFormValid] = useState(false);
useEffect(() => {
 
  setIsFormValid(userName && password);
}, [userName, password]);

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post('http://localhost:5555/userRefresh_token', {
      userName,
      password,
    });
if(response.status===200){
console.log("connected")
setUser({userName:userName,status:'online'});

handleClickToVerify(event)
  }
   } catch (error) {
    console.error('There was an error!', error);
    
  }
};
 const handleClickToVerify=async (e)=>{
    try{
      console.log('click');
      const response= await axios.get('http://localhost:5555/JWTvalid',{withCredentials:true})
       if (response.status === 200) {
        const playersOnline=axios.get('http://localhost:8989/Players',{withCredentials:true});
        cookies.set('user',userName);
        const isOnline=(await playersOnline).data.find((player)=>player.userName===userName);
        if(isOnline){ 
          alert('User is already online');
          console.log(isOnline);
          console.log()
        }
        else{
          navigate('/Lobby');
        }
    }}
    catch (error){
      console.error('there was an error!', error)
    }
  };
  return (
    <>
    <div className="container">
      <Header/> 
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label htmlFor="UN">USERNAME:</label>
          <input
            type="text"
            name="userNameInput"
            id="UN"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="PW">PASSWORD:</label>
          <input
            type="password"
            name="passwordInput"
            id="PW"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={!isFormValid} style={{ backgroundColor: isFormValid ? '' : 'grey' }}>LOG-IN</button>
      </form>
    </div>
        <Closer/>

        </>
  );
}

export default LogInComp;

