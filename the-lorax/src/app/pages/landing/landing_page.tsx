import React from 'react';
import { useEffect, useRef, useState } from "react";
import "./landing_page.css";
import Header  from "../../components/header";
import HeaderMobile from '../../components/headerMobile';
  
// Create the functional component

const BackgroundComponent: React.FC = () => {
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
            <div className='landing-page-background landing-page-trees'>
                <HeaderMobile />
                <div className="landing-page-text-container landing-page-text">
                    Kampus Tree Project
                </div>
            </div>
        ) : (
        <div className="landing-page-background landing-page-trees">
            <Header />
            <div className="landing-page-text-container landing-page-text">
                Kampus Tree Project
            </div>
        </div>
        )}
    </div>
);
};
  
export default BackgroundComponent;