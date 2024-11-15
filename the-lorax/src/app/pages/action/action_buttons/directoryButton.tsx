import React from 'react';
import "../action_page.css";
import { ReactComponent as DirectoryBackground } from '../../../../images/buttons/directoryButton.svg';
  

const DirectoryButton: React.FC = () => {
    return (
        <div className="button">
            <span className='button-text button-dir-text'>directory</span> 
            <DirectoryBackground className='button-dir-background'></DirectoryBackground>
        </div>
    );
};

export default DirectoryButton