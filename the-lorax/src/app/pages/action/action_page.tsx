import React from 'react';
import {useEffect, useState} from 'react';
import "./action_page.css";
import DirectoryButton from './action_buttons/directoryButton';
import AboutButton from './action_buttons/aboutButton';
import TreeButton from './action_buttons/treeButton';
import SearchBar from './action_buttons/searchBar';
import AdminButton from './action_buttons/adminButton';
import MapButton from './action_buttons/mapButton';
import SupportButton from './action_buttons/supportButton';
import AdminButtonMobile from './mobile_action_buttons/adminButtonMobile';
import TreeButtonMobile from './mobile_action_buttons/treeButtonMobile';

const ActionButton: React.FC = () => {
    const Directory_Click = () => {
        alert("Directory");
    };

    const About_Click = () => {
        alert("About");
    };

    const Tree_Click = () => {
        alert("Tree!!!!");
    };

    const AdminButton_Click = () => {
        alert("Admin!!");
    };

    const SearchBar_Click = () => {
        alert("SearchBar!!!!");
    };

    const MapButton_Click = () => {
        alert("Google Maps!!");
    };

    const SupportButton_Click = () => {
        alert("I will always help you!!");
    };

    const [isMobile, setIsMobile] = useState(false);

    // Detect screen width on mount and resize
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      // Set initial value
      handleResize();
  
      // Attach resize event listener
      window.addEventListener('resize', handleResize);
  
      // Cleanup event listener on unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className="background-for-all">
            {isMobile ? (
                <div className='action-page-background-phone'>
                    <div className='action-page-left-buttons'>
                        <AdminButtonMobile onClick={AdminButton_Click} />
                        <TreeButtonMobile onClick={Tree_Click} />
                    </div>
                </div>
            ) : (
                <div className="action-page-background">
                    <div className="action-page-upper-buttons">
                        <DirectoryButton onClick={Directory_Click} />
                        <AboutButton onClick={About_Click} />
                        <TreeButton onClick={Tree_Click} />
                        <AdminButton onClick={AdminButton_Click} />
                    </div>
                    <SearchBar onClick={SearchBar_Click} />
                    <div className="action-page-lower-buttons">
                        <MapButton onClick={MapButton_Click} />
                        <SupportButton onClick={SupportButton_Click} />
                    </div>
                </div>
            )}
        </div>

    );
};

export default ActionButton;