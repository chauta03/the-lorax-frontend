import React from 'react';
import { useState, useEffect } from 'react';
import "../action_page.css";
import { relative } from 'path';
import sprout from '../../../../images/buttons/sprout.svg';
import youngTree from '../../../../images/buttons/youngTree.svg';
import tree from '../../../../images/icons/rotated-tree-icon-3-1.svg';
import { ReactComponent as TreeBackground } from '../../../../images/buttons/treeButtonBackground.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

const TreeButton: React.FC = () => {
    const images = [sprout, youngTree, tree]; // Add as many images as you want
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1000); // Change every second

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [images.length]);

    return (
        <div className="button-tree-only">
            <img src={images[currentImageIndex]} alt="Tree Icon" className="button-tree-icon" />
            <TreeBackground className="button-tree-background" />
        </div>
    );
};
  
export default TreeButton;