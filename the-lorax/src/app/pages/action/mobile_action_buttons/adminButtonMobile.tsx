import React from 'react';
import "../action_page.css";
import { relative } from 'path';
import { ReactComponent as AdminBackgroundMobile } from '../../../../images/buttons/adminButtonMobile.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const adminButtonMobile: React.FC = () => {
    return (
        <div className="button">
            <AdminBackgroundMobile className="button-admin-background"></AdminBackgroundMobile>
        </div>
    );
};
  
export default adminButtonMobile;