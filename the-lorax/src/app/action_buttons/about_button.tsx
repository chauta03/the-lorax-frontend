import React from 'react';
import "../action_page.css";

// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const AboutButton: React.FC<CustomButtonProps> = ({onClick}) => {
    return (
        <div className="directory-button" style={{ display: 'inline-block' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="310" height="330" viewBox="0 0 310 330" fill="none" onClick={onClick}>
                <path d="M3.73463 314.22L48.4764 12.7C49.3159 7.04246 54.7209 3.2403 60.3293 4.36198L297.99 51.8941C303.224 52.9409 306.713 57.9139 305.917 63.1919L267.591 317.18C266.853 322.072 262.65 325.688 257.703 325.688H13.6263C7.51901 325.688 2.8382 320.262 3.73463 314.22Z" fill="#458244" stroke="#E0FFDF" stroke-width="7" stroke-dasharray="14 28 42 56"/>
                <text 
                    x="50%" 
                    y="33%" 
                    dominantBaseline="middle" 
                    textAnchor="middle" 
                    className='button-text' 
                    fill='#E0FFDF'
                    transform={`rotate(${7.769}, 50, 50)`} >
                    <tspan x="55%" dy="0">about</tspan>
                    <tspan x="55%" dy="1.2em">the</tspan>
                    <tspan x="55%" dy="1.2em">project</tspan>
                </text>
            </svg>
        </div>
    );
};
  
export default AboutButton;