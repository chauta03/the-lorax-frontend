import React from 'react';
import { useState, useEffect } from 'react';
import "./header.css";
import "./headerMobile.css";
import treeSandwich from '../../images/icons/sandwichBar.svg';
import logo from '../../images/logo.svg';
import sandwichArrow from '../../images/icons/sandwich-arrow-green.svg';
import { Link } from 'react-router-dom';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

export default function Header() {
    const [showNav, setShowNav] = useState(false)
    const [isMobile, setIsMobile] = useState(false);
    // Function to close the sidebar
    const closeSidebar = () => setShowNav(false);

    // Detect screen width on mount and resize
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };
    
        // Set initial value
        handleResize();
    
        // Attach resize event listener
        window.addEventListener('resize', handleResize);
    
        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
    return (
        <div>
            {isMobile ? (
                <div className="header-mobile">
                    <div className="header-tree-circle-mobile" onClick={() => setShowNav(!showNav)}>
                        <img src={treeSandwich} alt="Tree Icon" className="header-tree-icon-mobile" />
                    </div>
                    <div className='logo-container-mobile'>
                        <img src={logo} className={showNav ? 'logo-icon-mobile' : 'logo-icon-mobile active'}/>
                    </div>
                    {/* Sidebar overlay */}
                    <div className={`sidebar-overlay ${showNav ? 'active' : ''}`}>
                        <div className="sidebar-content">
                            <button className="close-btn" onClick={() => setShowNav(false)}>
                                ✕
                            </button>
                            <Link to="/" onClick={closeSidebar} className='sidebar-content-text'>home</Link>
                            <Link to="/directory" onClick={closeSidebar} className='sidebar-content-text'>directory</Link>
                            <Link to="/about" onClick={closeSidebar} className='sidebar-content-text'>about</Link>
                            {/* <Link to="/explore">explore</Link> */}
                            <Link to="/adminMobile" onClick={closeSidebar} className='sidebar-content-text'>admin</Link>
                            {/* <Link to="/search">search</Link> */}
                            <Link to="/map" onClick={closeSidebar} className='sidebar-content-text'>map</Link>
                            <Link to="/support" onClick={closeSidebar} className='sidebar-content-text'>support</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="header">
                    <div className="header-tree-circle" onClick={() => setShowNav(!showNav)}>
                        <img src={treeSandwich} alt="Tree Icon" className="header-tree-icon" />
                    </div>
                    <img src={sandwichArrow} alt="Sandwich Arrow" className={`sandwich-arrow-container ${showNav ? 'active' : ''}`} />
                    <div className={showNav ? 'header-expand-bar active' : "header-expand-bar"}>
                        <Link to="/">home</Link>
                        <Link to="/directory">directory</Link>
                        <Link to="/about">about</Link>
                        {/* <Link to="/explore">explore</Link> */}
                        <Link to="/admin">admin</Link>
                        {/* <Link to="/search">search</Link> */}
                        <Link to="/map">map</Link>
                        <Link to="/support">support</Link>
                    </div>
                </div>
            ) }
        </div>
    );
};
  