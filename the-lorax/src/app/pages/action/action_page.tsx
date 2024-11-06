import React from 'react';
import "./action_page.css";
import DirectoryButton from './action_buttons/directoryButton';
import AboutButton from './action_buttons/aboutButton';
import TreeButton from './action_buttons/treeButton';
import SearchBar from './action_buttons/searchBar';
import AdminButton from './action_buttons/adminButton';

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
        alert("SearchBar!!!!");
    };

    const SearchBar_Click = () => {
        alert("SearchBar!!!!");
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
        </div>

    );
};

export default ActionButton;