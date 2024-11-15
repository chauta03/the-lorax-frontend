import React from 'react';
import "../action_page.css";
import { relative } from 'path';
import { ReactComponent as AdminBackground } from '../../../../images/buttons/adminButton.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const adminButton: React.FC = () => {
    return (
        <div className="button">
            <span className="button-text button-admin-text">admin</span>
            <AdminBackground className="button-admin-background"></AdminBackground>
        </div>
    );
};
  
export default adminButton;