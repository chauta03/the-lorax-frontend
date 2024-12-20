import React, { useState, useEffect } from 'react';
import './header.css';
import './headerMobile.css';
import treeSandwich from '../../images/icons/sandwichBar.svg';
import logo from '../../images/logo.svg';
import sandwichArrow from '../../images/icons/sandwich-arrow-green.svg';
import { Link } from 'react-router-dom';

type HeaderProps = {
    token: string | null;
    handleLogout: () => void;
    isMobile: boolean;
};

export default function Header({ token, handleLogout, isMobile }: HeaderProps) {
    const [showNav, setShowNav] = useState(false);

    // Function to close the sidebar
    const closeSidebar = () => setShowNav(false);

    return (
        <div>
            {isMobile ? (
                <div className="header-mobile">
                    <div className="header-tree-circle-mobile" onClick={() => setShowNav(!showNav)}>
                        <img src={treeSandwich} alt="Tree Icon" className="header-tree-icon-mobile" />
                    </div>
                    <div className="logo-container-mobile">
                        <Link to="/">
                            <img src={logo} className={showNav ? 'logo-icon-mobile' : 'logo-icon-mobile active'} />
                        </Link>
                    </div>
                    {/* Sidebar overlay */}
                    <div className={`sidebar-overlay ${showNav ? 'active' : ''}`}>
                        <div className="sidebar-content">
                            <button className="close-btn" onClick={closeSidebar}>
                                ✕
                            </button>
                            <Link to="/" onClick={closeSidebar} className='sidebar-content-text'>home</Link>
                            <Link to="/directory" onClick={closeSidebar} className='sidebar-content-text'>directory</Link>
                            <Link to="/history" onClick={closeSidebar} className='sidebar-content-text'>history</Link>
                            <Link to="/about" onClick={closeSidebar} className='sidebar-content-text'>about</Link>
                            <Link to="/adminMobile" onClick={closeSidebar} className='sidebar-content-text'>admin</Link>
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
                    {!showNav && 
                    <div className='logo-container'> 
                            <Link to="/">
                                <img src={logo} className="logo-icon"/>
                            </Link>
                    </div>
                    }
                    <div className={showNav ? 'header-expand-bar active' : "header-expand-bar"}>
                        <Link to="/" className='header-content-text'>home</Link>
                        <Link to="/directory" className='header-content-text'>directory</Link>
                        <Link to="/history" className='header-content-text'>history</Link>
                        <Link to="/about" className='header-content-text'>about</Link>
                        <Link to="/admin" className='header-content-text'>admin</Link>
                        <Link to="/map" className='header-content-text'>map</Link>
                        <Link to="/support" className='header-content-text'>support</Link>
                    </div>
                    {/* Show login/logout button based on the token */}
                    {token ? (
                        <button className="logOut-button" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <Link to="/admin">
                            <button className="logIn-button">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
