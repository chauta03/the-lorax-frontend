import React from 'react';
import { useEffect, useState } from 'react';
import "./action_page.css";
import { Link } from 'react-router-dom';
import { Point } from "../../../types/tree";
import { useNavigate } from 'react-router-dom';
import HeaderMobile from '../../components/headerMobile';
import DirectoryButton from './action_buttons/directoryButton';
import AboutButton from './action_buttons/aboutButton';
import TreeButton from './action_buttons/treeButton';
import SearchBar from '../../components/searchBar';
import AdminButton from './action_buttons/adminButton';
import MapButton from './action_buttons/mapButton';
import SupportButton from './action_buttons/supportButton';
import AdminButtonMobile from './mobile_action_buttons/adminButtonMobile';
import TreeButtonMobile from './mobile_action_buttons/treeButtonMobile';
import AboutButtonMobile from './mobile_action_buttons/aboutButtonMobile';
import DirectoryButtonMobile from './mobile_action_buttons/directoryButtonMobile';
import MapButtonMobile from './mobile_action_buttons/mapButtonMobile';
import SupportButtonMobile from './mobile_action_buttons/mapButtonMobile copy';
import AdminMobile from '../adminMobile/adminMobile';
import Footer from '../../components/footer';

// Search
import handleSearch from '../../../data/handleSearch';

const ActionButton: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate(); 

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


    const MapButton_Click = () => {
        alert("Google Maps!!");
    };

    const SupportButton_Click = () => {
        alert("I will always help you!!");
    };

    const handleSearchInput = (query: string) => {
        if (query.trim() !== "") {
            // Navigate to the directory route with query as a URL parameter
            navigate(`/directory?query=${encodeURIComponent(query)}`);
        } else {
            console.log("Search query is empty");
        }
    };

    const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
        setIsPortrait(window.innerHeight > window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);



    // Detect screen width on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768 || window.innerHeight <= 500);
        };

        // Set initial value
        handleResize();

        // Attach resize event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div>
            {isMobile ? (
                isPortrait ? (
                    <div className='action-page-phone'>
                        <span className='header-text'>Kampus Tree Project</span>
                        <SearchBar onSearch={handleSearchInput} />
                        <div className='action-page-background-phone'>
                            <div className='action-page-left-buttons'>
                                <Link to="/adminMobile"><AdminButtonMobile/></Link>
                                <Link to="/"><TreeButtonMobile/></Link>
                                <Link to="/about"><AboutButtonMobile/></Link>
                                <Link to="/directory"><DirectoryButtonMobile/></Link>
                            </div>
                            <div className='action-page-right-buttons'>
                                <Link to="/support"><SupportButtonMobile/></Link>
                                <Link to="/map"><MapButtonMobile/></Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="action-page-background">
                        <div className="action-page-upper-buttons">
                            <Link to="/directory"><DirectoryButton/></Link>
                            <Link to="/about"><AboutButton/></Link>
                            <Link to="/history"><TreeButton/></Link>
                            <Link to="/adminMobile"><AdminButton/></Link>
                        </div>
                        <SearchBar onSearch={handleSearchInput} />
                        <div className="action-page-lower-buttons">
                            <Link to="/map"><MapButton/></Link>
                            <Link to="/support"><SupportButton/></Link>
                        </div>
                    </div>
                )
                
            ) : (
                <div className="action-page-background">
                    <div className="action-page-upper-buttons">
                        <Link to="/directory"><DirectoryButton/></Link>
                        <Link to="/about"><AboutButton/></Link>
                        <Link to="/history"><TreeButton/></Link>
                        <Link to="/admin"><AdminButton/></Link>
                    </div>
                    <SearchBar onSearch={handleSearchInput} />
                    <div className="action-page-lower-buttons">
                        <Link to="/map"><MapButton/></Link>
                        <Link to="/support"><SupportButton/></Link>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ActionButton;