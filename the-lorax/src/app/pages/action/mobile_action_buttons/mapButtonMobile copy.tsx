import React from 'react';
import "../action_page.css";
import { relative } from 'path';
import { ReactComponent as SupportBackgroundMobile } from '../../../../images/buttons/supportButtonMobile.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const supportButtonMobile: React.FC<CustomButtonProps> = ({onClick}) => {
    return (
        <div className="button" onClick={onClick}>
            <SupportBackgroundMobile className="button-support-background"></SupportBackgroundMobile>
        </div>
    );
};
  
export default supportButtonMobile;