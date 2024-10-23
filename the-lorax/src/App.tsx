import React from 'react';
import logo from './logo.svg';
import './App.css';
import BackgroundComponent from "./app/landing_page";
import ActionButton from './app/action_page';

function App() {
  
  return (
    <div className="App">
      <BackgroundComponent/>
      <ActionButton/>
    </div>
  );
}

export default App;
