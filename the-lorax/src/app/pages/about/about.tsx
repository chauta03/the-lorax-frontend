import { useState } from 'react';
import Header from '../../components/header'
import './about.css';
import logo from '../../../images/logo.svg';
import { ReactComponent as AboutBanner } from '../../../images/about_banner.svg';

export default function About() {
    
    return (
        <div className="about_background">
            <div className='logo-container' style={{top: '2%'}}>
                <img src={logo} className='logo-icon'/>
            </div>
            <div className="about-body">
                <AboutBanner className='about-banner-background'></AboutBanner>
                <div className='every-tree-text-container'>
                    <div className="every-tree-text">Every Tree is A Click Away!</div>
                </div>
                <text className="body-text">
                The Campus Tree Project is an attempt by K students to appreciate our campus's hidden heroes and companions. 
                In collaboration with Dr. Binney Girdler of the Biology Department, we digitized the locations of (almost) every tree on our main campus, which was collected in two previous Seniors Integrated Projects. With the Campus Tree Project, you can locate, search, and learn more about every tree you encounter. Our goal is to monitor the carbon sequestration of trees on campus, in the spirit of the Climate Action Plan of Kalamazoo College.
                </text>
            </div>
        </div>
    )
}