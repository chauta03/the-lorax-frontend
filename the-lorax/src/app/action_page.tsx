import React from 'react';
import "./action_page.css";
import DirectoryButton from './action_buttons/directory_button';
import AboutButton from './action_buttons/about_button';

const ActionButton: React.FC = () => {
    const Directory_Click = () => {
        alert("Directory");
    };

    const About_Click = () => {
        alert("About");
    };

    return (
        <div className="action-page-background">
            <DirectoryButton onClick={Directory_Click} /> 
            <AboutButton onClick={About_Click} />
        </div>
        
    );
};
  
export default ActionButton;