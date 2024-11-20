import { useState, useEffect } from 'react';
import Header from '../../components/header'
import './about.css';
import logo from '../../../images/logo.svg';
import { ReactComponent as AboutBanner } from '../../../images/about_banner.svg';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';

export default function About() {
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
        <div>
            {isMobile ? (
                <div className="about_background">
                    <div className="about-body">
                        <AboutBanner className='about-banner-background'></AboutBanner>
                        <div className='every-tree-text-container'>
                            <div className="every-tree-text">Every Tree is A Click Away!</div>
                        </div>
                        <text className="body-text">
                        The Campus Tree Project is an attempt by K students to appreciate our campus's hidden heroes and companions. 
                        In collaboration with Dr. Binney Girdler of the Biology Department, we digitized the locations of (almost) every tree on our main campus, which was collected in two previous Seniors Integrated Projects. With the Campus Tree Project, you can locate, search, and learn more about every tree you encounter. Our goal is to monitor the carbon sequestration of trees on campus, in the spirit of the Climate Action Plan of Kalamazoo College.
                        </text>
                        <text className="body-text">
                        We are the Lorax who speaks for the tree... This website is created by Alex Kish 25', Cole Koryto 25', Jenny Nguyen 25', and Chau Ta 25'.
                        </text>
                    </div>
                </div>
            ) : (
                <div className="about_background">
                    {/* <Link to="/">
                        <div className='logo-container' style={{top: '2%'}}>
                            <img src={logo} className='logo-icon'/>
                        </div>
                    </Link> */}
                    <div className="about-body">
                        <AboutBanner className='about-banner-background'></AboutBanner>
                        <div className='every-tree-text-container'>
                            <div className="every-tree-text">Every Tree is A Click Away!</div>
                        </div>
                        <text className="body-text">
                        The Campus Tree Project is an attempt by K students to appreciate our campus's hidden heroes and companions. 
                        In collaboration with Dr. Binney Girdler of the Biology Department, we digitized the locations of (almost) every tree on our main campus, which was collected in two previous Seniors Integrated Projects. With the Campus Tree Project, you can locate, search, and learn more about every tree you encounter. Our goal is to monitor the carbon sequestration of trees on campus, in the spirit of the Climate Action Plan of Kalamazoo College.
                        </text>
                        <text className="body-text">
                        We are the Lorax who speaks for the tree... This website is created by Alex Kish 25', Cole Koryto 25', Jenny Nguyen 25', and Chau Ta 25'.
                        </text>
                    </div>
                </div>
            )}
        </div>
    )
}