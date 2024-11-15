import React, { useState } from 'react';
import "../history.css";
import ArrowDown from '../../../../images/icons/arrow-down.svg';
import { TreeHistory } from '../../../../types/tree';

type FilterProps = {
    onSort: (key: keyof TreeHistory | null) => void; 
};

export default function SortHistory({ onSort }: FilterProps) {
    const [selectedSortKey, setSelectedSortKey] = useState<keyof TreeHistory | null>(null);

    const handleSortHistory = (key: keyof TreeHistory) => {
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
                    onClick={() => handleSortHistory('histId')}
                    style={{ fontWeight: selectedSortKey === 'histId' ? 'bold' : 'normal' }}
                >
                    <span>History ID</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSortHistory('hazardRating')}
                    style={{ fontWeight: selectedSortKey === 'hazardRating' ? 'bold' : 'normal' }}
                >
                    <span>Hazard Rating</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSortHistory('DBH')}
                    style={{ fontWeight: selectedSortKey === 'DBH' ? 'bold' : 'normal' }}
                >
                    <span>DBH</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSortHistory('notes')}
                    style={{ fontWeight: selectedSortKey === 'notes' ? 'bold' : 'normal' }}
                >
                    <span>Notes</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
                <div
                    className="sort-directory-category-field"
                    onClick={() => handleSortHistory('year')}
                    style={{ fontWeight: selectedSortKey === 'year' ? 'bold' : 'normal' }}
                >
                    <span>Year</span>
                    <img src={ArrowDown} alt="Sort"/>
                </div>
            </div>
        </div>
    );
};
