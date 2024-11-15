import React from 'react';
import "../action_page.css";
import { relative } from 'path';
import { ReactComponent as MapBackground } from '../../../../images/buttons/mapButton.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const mapButton: React.FC = () => {
    return (
        <div className="button">
            <span className="button-text button-map-text">map</span>
            <MapBackground className="button-map-background"></MapBackground>
        </div>
    );
};
  
export default mapButton;