import React from 'react';
import { useEffect, useRef, useState } from "react";
import "./landing_page.css";
import Header  from "../../components/header";
  
// Create the functional component

const BackgroundComponent: React.FC = () => {

return (
    <div>
        
        <div className="landing-page-background landing-page-trees">
            <Header />
            <div className="landing-page-text-container landing-page-text">
                Campus Tree Project
            </div>
        </div>
    </div>
    
);
};
  
export default BackgroundComponent;