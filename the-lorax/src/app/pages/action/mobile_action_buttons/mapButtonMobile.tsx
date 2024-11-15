import React from 'react';
import "../action_page.css";
import { relative } from 'path';
import { ReactComponent as MapBackgroundMobile } from '../../../../images/buttons/mapButtonMobile.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const mapButtonMobile: React.FC = () => {
    return (
        <div className="button">
            <MapBackgroundMobile className="button-map-background"></MapBackgroundMobile>
        </div>
    );
};
  
export default mapButtonMobile;