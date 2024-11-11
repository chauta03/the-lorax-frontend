import React from 'react';
import "../action_page.css";
import { ReactComponent as DirectoryBackground } from '../../../../images/buttons/directoryButton.svg';
  
// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const DirectoryButton: React.FC<CustomButtonProps> = ({ onClick }) => {
    return (
        <div className="button" onClick={onClick}>
            <span className='button-text button-dir-text'>directory</span> 
            <DirectoryBackground className='button-dir-background'></DirectoryBackground>
        </div>
    );
};

export default DirectoryButton