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
                    onClick={() => handleSort('tag_number')}
                    style={{ fontWeight: selectedSortKey === 'tag_number' ? 'bold' : 'normal' }}
                >
                    <span>Tag Number</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSort('species_code')}
                    style={{ fontWeight: selectedSortKey === 'species_code' ? 'bold' : 'normal' }}
                >
                    <span>Species Code</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSort('latin_name')}
                    style={{ fontWeight: selectedSortKey === 'latin_name' ? 'bold' : 'normal' }}
                >
                    <span>Latin Name</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSort('common_name')}
                    style={{ fontWeight: selectedSortKey === 'common_name' ? 'bold' : 'normal' }}
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
                    onClick={() => handleSort('long')}
                    style={{ fontWeight: selectedSortKey === 'long' ? 'bold' : 'normal' }}
                >
                    <span>Long</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
            </div>
        </div>
    );
};
