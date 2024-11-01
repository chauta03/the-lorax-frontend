import React from 'react';
import "../action_page.css";
import { relative } from 'path';

// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const TreeButton: React.FC<CustomButtonProps> = ({onClick}) => {
    return (
        <div className="button-tree-only" onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="183" height="274" viewBox="0 0 183 274" fill="none" onClick={onClick} style={{position: 'absolute'}}>
                <path d="M3.58824 258.27L38.7277 12.933C39.5329 7.31153 44.8521 3.48798 50.4371 4.51607L170.848 26.6813C176.002 27.6299 179.549 32.3958 178.978 37.6046L154.539 260.777C153.983 265.848 149.7 269.688 144.598 269.688H13.4872C7.40026 269.688 2.72522 264.296 3.58824 258.27Z" fill="#BCE8BB" stroke="#E0FFDF" stroke-width="7" stroke-dasharray="14 28 42 56"/>
            </svg>
            <div className='tree-icon'></div>
        </div>
    );
};
  
export default TreeButton;