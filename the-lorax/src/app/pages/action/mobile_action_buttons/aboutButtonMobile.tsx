import React from 'react';
import "../action_page.css";
import { relative } from 'path';
import { ReactComponent as AboutBackgroundMobile } from '../../../../images/buttons/aboutButtonMobile.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const aboutButtonMobile: React.FC = () => {
    return (
        <div className="button">
            <AboutBackgroundMobile className="button-about-background"></AboutBackgroundMobile>
        </div>
    );
};
  
export default aboutButtonMobile;