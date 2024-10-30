import React from 'react';
import "../action_page.css";

// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const AdminButton: React.FC<CustomButtonProps> = ({onClick}) => {
    return (
        <div className="button" style={{ display: 'inline-block' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="271" height="244" viewBox="0 0 271 244" fill="none" onClick={onClick}>
            <path d="M3.78605 229.197L28.7652 12.7023C29.4318 6.92485 34.869 2.93279 40.5808 4.02706L258.557 45.7868C263.626 46.7578 267.123 51.4265 266.63 56.5637L261.925 105.57C261.655 108.39 260.2 110.963 257.924 112.649L88.2073 238.378C86.4849 239.654 84.3981 240.343 82.2546 240.343H13.7201C7.74316 240.343 3.10097 235.134 3.78605 229.197Z" fill="#345D33" stroke="#E0FFDF" stroke-width="7" stroke-dasharray="14 28 42 56"/>
                <text 
                    x="50%" 
                    y="33%" 
                    dominantBaseline="middle" 
                    textAnchor="middle" 
                    className='button-text' 
                    fill='#E0FFDF'
                    transform={`rotate(${7.769}, 50, 50)`} >
                    admin
                </text>
            </svg>
        </div>
    );
};
  
export default AdminButton;