import React from 'react';
import "./action_page.css";
import DirectoryButton from './action_buttons/directoryButton';
import AboutButton from './action_buttons/aboutButton';
import TreeButton from './action_buttons/treeButton';
import SearchBar from './action_buttons/searchBar';
import AdminButton from './action_buttons/adminButton';
import MapButton from './action_buttons/mapButton';
import SupportButton from './action_buttons/supportButton';

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


    return (
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

    );
};

export default ActionButton;