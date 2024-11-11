import React from 'react';
import logo from './logo.svg';
import './App.css';
import BackgroundComponent from "./app/pages/landing/landing_page";
import ActionButton from './app/pages/action/action_page';
import Intro from './app/page'
import Directory from './app/pages/directory/directory';
import Login from './app/pages/login/login';
import AdminDashboard from './app/pages/admin/adminDashboard';
import About from './app/pages/about/about';

function App() {

  return (
    <div className="App">
      <BackgroundComponent />
      <ActionButton />
      <Intro />
      <Directory />
      <Login/>
      <AdminDashboard/>
      <About />
    </div>
  );
}

export default App;
