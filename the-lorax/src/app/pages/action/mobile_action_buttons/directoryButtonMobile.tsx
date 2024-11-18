import React from 'react';
import "../action_page.css";
import { relative } from 'path';
import { ReactComponent as DirectoryBackgroundMobile } from '../../../../images/buttons/directoryButtonMobile.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const directoryButtonMobile: React.FC = () => {
    return (
        <div className="button">
            <DirectoryBackgroundMobile className="button-dir-background"></DirectoryBackgroundMobile>
        </div>
    );
};
  
export default directoryButtonMobile;