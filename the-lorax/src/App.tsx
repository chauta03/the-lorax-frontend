import React, { useState, useEffect } from 'react';
import './App.css';
import BackgroundComponent from "./app/pages/landing/landing_page";
import ActionButton from './app/pages/action/action_page';
import GgMap from './app/pages/ggMap/map'
import Directory from './app/pages/directory/directory';
import DirectoryMobile from './app/pages/directory/directoryMobile';
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
import Footer from './app/components/footer';


function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isMobile, setIsMobile] = useState(false);

  const handleLogin = () => {
    setToken(localStorage.getItem("token")); // Retrieve token from localStorage after login
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Detect screen width on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 768;

      setIsMobile(isNowMobile);

      // Logout user if mobile view is detected
      if (isNowMobile && token) {
        handleLogout();
        alert("Logged out due to accessing on a mobile device.");
      }
    };

    // Set initial value
    handleResize();

    // Attach resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [token]);

  return (
    <BrowserRouter>
      <Header token={token} handleLogout={handleLogout} isMobile={isMobile} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/directory" element={isMobile ? <DirectoryMobile /> : <Directory token={token} />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={token ? <Users token={token} /> : <Login onLogin={handleLogin} />} />
        <Route path="/search" element={isMobile ? <DirectoryMobile /> : <Directory token={token} />} />
        <Route path="/adminMobile" element={<AdminMobile />} />
        <Route path="/map" element={<GgMap />} />
        <Route path="/support" element={<Support />} />
        <Route path="/history" element={<History token={token} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
