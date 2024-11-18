import { useState } from 'react';
import "./headerMobile.css";
import treeSandwich from '../../images/icons/sandwichBar.svg';
import logo from '../../images/logo.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

export default function HeaderMobile() {
    const [showNav, setShowNav] = useState(true)
    return (
        <div className="header-mobile">
            <div className="header-tree-circle-mobile" onClick={() => setShowNav(!showNav)}>
                <img src={treeSandwich} alt="Tree Icon" className="header-tree-icon-mobile" />
            </div>
            <div className='logo-container-mobile'>
                <img src={logo} className={showNav ? 'logo-icon-mobile active' : 'logo-icon-mobile'}/>
            </div>
        </div>
    );
};