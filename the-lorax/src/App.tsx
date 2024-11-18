import React from 'react';
import { useState } from 'react';
import './App.css';
import BackgroundComponent from "./app/pages/landing/landing_page";
import ActionButton from './app/pages/action/action_page';
import GgMap from './app/pages/ggMap/page'
import Directory from './app/pages/directory/directory';
import Login from './app/pages/admin/admin';
import About from './app/pages/about/about';
import Header from './app/components/header';
import History from './app/pages/history/history';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './app/flow/home';
import ScrollToTop from './app/components/ScrollToTop';
import Support from './app/pages/support/support';
import AdminMobile from './app/pages/adminMobile/adminMobile';
import Users from './app/pages/admin/users';


function App() {
  // let Home = (props: RouteComponentProps) => <div>Home</div>
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const handleLogin = () => {
      setToken(localStorage.getItem("token")); // Retrieve token from localStorage after login
  };

  const handleLogout = () => {
      localStorage.removeItem("token");
      setToken(null);
  };

  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/directory" element={
          <>
            <Directory token={token} />
            {token && (
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            )}
          </>
        }
        />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={
            token ? (
                 <>
                    <Users token={token} />
                    <button className='logout-button' onClick={handleLogout}>Logout</button>
                 </>
            ) : (
                 <Login onLogin={handleLogin} />
         )
        } />
        <Route path="/search" element={
          <>
          <Directory token={token} />
          {token && (
              <button className="logout-button" onClick={handleLogout}>
                  Logout
              </button>
          )}
        </>
      }
      />
        <Route path="/adminMobile" element={<AdminMobile />} />
        <Route path="/map" element={<GgMap />} />
        <Route path="/support" element={<Support />} />
        <Route path="/history" element={
          <>
          <History token={token} />
          {token && (
              <button className="logout-button" onClick={handleLogout}>
                  Logout
              </button>
          )}
        </>
      }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
