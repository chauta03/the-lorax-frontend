import React from 'react';
import { useState } from 'react';
import "./header.css";
import treeSandwich from '../../images/icons/sandwichBar.svg';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

export default function Header() {
    const [showNav, setShowNav] = useState(true)
    return (
        <div className="header">
            <div className="header-tree-circle" onClick={() => setShowNav(!showNav)}>
                <img src={treeSandwich} alt="Tree Icon" className="header-tree-icon" />
            </div>
            <div className='logo-container'>
                <img src={logo} className={showNav ? 'logo-icon active' : 'logo-icon'}/>
            </div>       
            <div className={showNav ? 'header-expand-bar' : "header-expand-bar active"}>
                <Link to="/">home</Link>
                <Link to="/directory">directory</Link>
                <Link to="/about">about</Link>
                {/* <Link to="/explore">explore</Link> */}
                <Link to="/admin">admin</Link>
                {/* <Link to="/search">search</Link> */}
                <Link to="/map">map</Link>
                {/* <Link to="/support">support</Link> */}

            </div>
        </div>
    );
};
  