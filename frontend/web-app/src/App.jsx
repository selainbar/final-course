import './App.css';  // Assuming you have this file for custom styles
import LogInComp from './Components/LogInComp';
import React from 'react';
import { UserProvider } from './UserContext';

const user = {userName:'holder',status:'holder'}; 


function App() {
  return (
    <>
      <LogInComp />
      <Lobby/>
    </>
  );
}

export default App;
