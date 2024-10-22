import React from 'react';
import logo from './logo.svg';
import './App.css';
import BackgroundComponent from "./app/landing_page";
import DirectoryButton from "./app/action_page"

function App() {
  const handleButtonClick = () => {
    alert("Custom Button Clicked!");
  };
  return (
    <div className="App">
      {/* <p>alskdjf</p> */}
      <BackgroundComponent/>
      <DirectoryButton onClick={handleButtonClick} label="directory"/>
    </div>
  );
}

export default App;
