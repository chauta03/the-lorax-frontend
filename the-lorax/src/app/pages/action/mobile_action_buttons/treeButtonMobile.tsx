import React from 'react';
import "../action_page.css";
import { relative } from 'path';
import { ReactComponent as TreeBackgroundMobile } from '../../../../images/buttons/treeButtonMobile.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const treeButtonMobile: React.FC<CustomButtonProps> = ({onClick}) => {
    return (
        <div className="button" onClick={onClick}>
            <TreeBackgroundMobile className="button-admin-background"></TreeBackgroundMobile>
        </div>
    );
};
  
export default treeButtonMobile;