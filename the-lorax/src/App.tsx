import React from 'react';
import './App.css';
import BackgroundComponent from "./app/pages/landing/landing_page";
import ActionButton from './app/pages/action/action_page';
import GgMap from './app/pages/ggMap/page'
import Directory from './app/pages/directory/directory';
import Login from './app/pages/login/login';
import AdminDashboard from './app/pages/admin/adminDashboard';
import About from './app/pages/about/about';
import Header from './app/components/header';
import History from './app/pages/history/history';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './app/flow/home';
import ScrollToTop from './app/components/ScrollToTop';
import Support from './app/pages/support/support';
import AdminMobile from './app/pages/adminMobile/adminMobile';


function App() {
  // let Home = (props: RouteComponentProps) => <div>Home</div>

  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/search" element={<Directory />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminMobile" element={<AdminMobile />} />
        <Route path="/map" element={<GgMap />} />
        <Route path="/support" element={<Support />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
