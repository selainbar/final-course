import './App.css';  // Assuming you have this file for custom styles
import LogInComp from './Components/LogInComp';
import React from 'react';

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
