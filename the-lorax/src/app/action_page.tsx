import React from 'react';
import "./action_page.css";
import DirectoryButton from './action_buttons/directory_button';
import AboutButton from './action_buttons/about_button';
import TreeButton from './action_buttons/tree_button';
import AdminButton from './action_buttons/admin_button';

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

    const Admin_Click = () => {
        alert("Tree!!!!");
    };

    return (
        <div className="action-page-background">
            <DirectoryButton onClick={Directory_Click} /> 
            <AboutButton onClick={About_Click} />
            <TreeButton onClick={Tree_Click} />
            <AdminButton onClick={Admin_Click} />
        </div>
        
    );
};
  
export default ActionButton;