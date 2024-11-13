import React from 'react';
import "../action_page.css";
import { ReactComponent as AboutBackground } from '../../../../images/buttons/aboutButton.svg';

// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const AboutButton: React.FC<CustomButtonProps> = ({onClick}) => {
    return (
        <div className="button" onClick={onClick}>
            <span className='button-text button-about-text'>about</span>
            <span className='button-text button-about-text'>the</span>
            <span className='button-text button-about-text'>project</span>
            <AboutBackground className='button-about-background'></AboutBackground>
        </div>
    );
};
  
export default AboutButton;