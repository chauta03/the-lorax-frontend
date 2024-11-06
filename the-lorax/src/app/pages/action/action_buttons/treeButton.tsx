import React from 'react';
import "../action_page.css";
import { relative } from 'path';
import tree from '../../../../images/icons/rotated-tree-icon-3-1.svg';
import { ReactComponent as TreeBackground } from '../../../../images/buttons/treeButtonBackground.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const TreeButton: React.FC<CustomButtonProps> = ({onClick}) => {
    return (
        <div className="button-tree-only" onClick={onClick}>
            <img src={tree} alt="Tree Icon" className="button-tree-icon" />
            <TreeBackground className="button-tree-background" />
        </div>
    );
};
  
export default TreeButton;