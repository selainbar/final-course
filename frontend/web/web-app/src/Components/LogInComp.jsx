import { useState,useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Closer from './Closer';
import Header from './Header';

axios.defaults.withCredentials=true;
function LogInComp() {
  const [userName, setUserName] = useState('');
  const navigate=useNavigate();
  const [password, setPassword] = useState('');


const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post('http://localhost:5555/access_token', {
      userName,
      password,
    });
if(response.status===200){
console.log("connected")
  }
   } catch (error) {
    console.error('There was an error!', error);
    
  }
};
 const handleClickToVerify=async (e)=>{
    try{
      console.log('click');
      const response= await axios.get('http://localhost:5555/JWTvalid',{withCredentials:true})
       console.log(response.data);
       if (response.status === 200) {
        navigate('/Lobby');
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
        <button type="submit">LOG-IN</button>
      </form>
        <button onClick={handleClickToVerify}>to verify</button>
    </div>
        <Closer/>
        </>
  );
}

export default LogInComp;

