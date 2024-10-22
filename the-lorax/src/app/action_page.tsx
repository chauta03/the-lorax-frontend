import React from 'react';
import { useEffect, useRef, useState } from "react";
import "./action_page.css";
import { WatchDirectoryFlags } from 'typescript';
  
// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
    label: string;       // Text to display on the button
};

const DirectoryButton: React.FC<CustomButtonProps> = ({ onClick, label }) => {
    return (
        <div className="action-page-background">
            <div className="directory-button" style={{ position: 'absolute', display: 'inline-block' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="223" height="344" viewBox="0 0 223 344" fill="none" style={{ cursor: 'pointer' }} onClick={onClick}> 
                    <path d="M67.53 3.78952L209.799 16.0014C215.535 16.4938 219.671 21.7153 218.838 27.4117L174.334 331.744C173.615 336.656 169.403 340.297 164.439 340.297H13.8086C7.62786 340.297 2.92707 334.746 3.94522 328.65L56.8114 12.1056C57.6702 6.96331 62.3356 3.34365 67.53 3.78952Z" fill="#83C082" stroke="#E0FFDF" stroke-width="7" stroke-dasharray="14 28 42 56"/>
                    <text 
                        x="50%" 
                        y="100%" 
                        dominantBaseline="middle" 
                        textAnchor="middle" 
                        className='directory-button-text' 
                        fill='#E0FFDF'
                        transform={`rotate(${-81.678}, 50, 50)`} >
                        {label}
                    </text>
                </svg>
            {/* Overlay text */}

            {/* <span className="directory-button-text">
                {label}
            </span> */}
            </div>
        </div>
    );
};
  
export default DirectoryButton;