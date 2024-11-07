import React from 'react';
import "../action_page.css";
import { relative } from 'path';
import { ReactComponent as SupportBackground } from '../../../../images/buttons/supportButton.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const supportButton: React.FC<CustomButtonProps> = ({onClick}) => {
    return (
        <div className="button" onClick={onClick}>
            <span className="button-text button-support-text">support</span>
            <SupportBackground className="button-support-background"></SupportBackground>
        </div>
    );
};
  
export default supportButton;