import React from 'react';
import logo from './logo.svg';
import './App.css';
import BackgroundComponent from "./app/pages/landing/landing_page";
import ActionButton from './app/pages/action/action_page';
import Intro from './app/page'
import Directory from './app/pages/directory/directory';
import Login from './app/pages/login/login'

function App() {

  return (
    <div className="App">
      <BackgroundComponent />
      <ActionButton />
      <Intro />
      <Directory />
      <Login/>
    </div>
  );
}

export default App;
