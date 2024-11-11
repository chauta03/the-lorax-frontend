import React from 'react';
import { useState } from 'react';
import "./header.css";
import treeSandwich from '../../images/icons/sandwichBar.svg';
import logo from '../../images/logo.svg';


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
                <text>directory</text>
                <text>about</text>
                <text>explore</text>
                <text>admin</text>
                <text>search</text>
                <text>map</text>
                <text>support</text>
            </div>
        </div>
    );
};
  