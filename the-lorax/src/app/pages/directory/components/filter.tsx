import React from 'react';
import "./filter.css";
import ArrowDown from '../../../../images/icons/arrow-down.svg';


// Create the functional component
type CustomButtonProps = {
    onClick: () => void; // Function to handle button click
};

export default function Filter() {
    return (
        <div className="filter">
            <text className="filter-text">filter</text>
            <div className="filter-category">   
                <div className="filter-category-field"> 
                    <text>name</text>
                    <img src={ArrowDown}/>
                </div>
                <div className="filter-category-field"> 
                    <text>family</text>
                    <img src={ArrowDown}/>
                </div>
                <div className="filter-category-field"> 
                    <text>status</text>
                    <img src={ArrowDown}/>
                </div>
                <div className="filter-category-field"> 
                    <text>location</text>
                    <img src={ArrowDown}/>
                </div>
                <div className="filter-category-field"> 
                    <text>CO2</text>
                    <img src={ArrowDown}/>
                </div>
            </div>
        </div>
    );
};
  