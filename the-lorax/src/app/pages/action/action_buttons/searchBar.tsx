import React from 'react';
import "../action_page.css";


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const SearchBar: React.FC<CustomButtonProps> = ({onClick}) => {
    return (
        <div className="search-bar-container">
            <div className="search-bar" onClick={onClick}>
                <span className="search-text">Looking for a tree?</span>
                <div className="search-icon-container">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="search-icon"
                    >
                        <circle cx="11" cy="11" r="8" stroke="#FFFFFF" strokeWidth="3" />
                        <line x1="16" y1="16" x2="21" y2="21" stroke="#FFFFFF" strokeWidth="3" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
  
export default SearchBar;