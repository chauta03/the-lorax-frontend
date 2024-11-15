import React from 'react';
import "../action_page.css";
import { relative } from 'path';
import { ReactComponent as TreeBackgroundMobile } from '../../../../images/buttons/treeButtonMobile.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const treeButtonMobile: React.FC = () => {
    return (
        <div className="button">
            <TreeBackgroundMobile className="button-tree-background-mobile"></TreeBackgroundMobile>
        </div>
    );
};
  
export default treeButtonMobile;