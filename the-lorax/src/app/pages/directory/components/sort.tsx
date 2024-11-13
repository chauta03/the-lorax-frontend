import React, { useState } from 'react';
import "../directory.css";
import ArrowDown from '../../../../images/icons/arrow-down.svg';
import { Point } from "../../../../types/tree";

type FilterProps = {
    onSort: (key: keyof Point | null) => void; 
};

export default function SortDirectory({ onSort }: FilterProps) {
    const [selectedSortKey, setSelectedSortKey] = useState<keyof Point | null>(null);

    const handleSort = (key: keyof Point) => {
        if (key === selectedSortKey) {
            setSelectedSortKey(null);
            onSort(null);
            return;
        }

        setSelectedSortKey(key); // Update the selected sort key
        onSort(key); // Trigger the sorting function
    };

    return (
        <div className="sort-directory">
            <span className="sort-directory-text">Sort</span>
            <div className="sort-directory-category">
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSort('tagNum')}
                    style={{ fontWeight: selectedSortKey === 'tagNum' ? 'bold' : 'normal' }}
                >
                    <span>Tag Number</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSort('speciesCo')}
                    style={{ fontWeight: selectedSortKey === 'speciesCo' ? 'bold' : 'normal' }}
                >
                    <span>Species Code</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSort('latinName')}
                    style={{ fontWeight: selectedSortKey === 'latinName' ? 'bold' : 'normal' }}
                >
                    <span>Latin Name</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSort('commonName')}
                    style={{ fontWeight: selectedSortKey === 'commonName' ? 'bold' : 'normal' }}
                >
                    <span>Common Name</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSort('lat')}
                    style={{ fontWeight: selectedSortKey === 'lat' ? 'bold' : 'normal' }}
                >
                    <span>Lat</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSort('lng')}
                    style={{ fontWeight: selectedSortKey === 'lng' ? 'bold' : 'normal' }}
                >
                    <span>Long</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
            </div>
        </div>
    );
};
