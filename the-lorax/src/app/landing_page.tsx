import React from 'react';
import { useEffect, useRef, useState } from "react";
import "./landing_page.css";
  
// Create the functional component

const BackgroundComponent: React.FC = () => {

return (
    <div className="landing-page-background landing-page-trees">
        <div className="landing-page-text-container landing-page-text">
            Campus Tree Project
        </div>
    </div>
);
};
  
export default BackgroundComponent;