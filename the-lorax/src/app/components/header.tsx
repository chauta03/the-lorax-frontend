import React from 'react';
import "./header.css";
import tree from '../../images/icons/tree-icon-3-1.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

export default function Header() {
    return (
        <div className="header">
            <img src={tree} alt="Tree Icon" className="header-tree-icon" />
            <div className="header-expand-bar">
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
  