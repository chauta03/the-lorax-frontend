import React, { useState, useRef, useEffect } from 'react';
import "../directory.css";
import ArrowDown from '../../../../images/icons/arrow-down.svg';

type FilterProps = {
    latinNames: string[];
    commonNames: string[];
    onFilter: (key: 'latinName' | 'commonName', value: string | null) => void; 
};

export default function Filter({ latinNames, commonNames, onFilter }: FilterProps) {
    const [showLatinDropdown, setShowLatinDropdown] = useState(false);
    const [showCommonDropdown, setShowCommonDropdown] = useState(false);
    const [selectedLatinName, setSelectedLatinName] = useState<string | null>(null);
    const [selectedCommonName, setSelectedCommonName] = useState<string | null>(null);
    const latinDropdownRef = useRef<HTMLDivElement | null>(null);
    const commonDropdownRef = useRef<HTMLDivElement | null>(null);

    const handleLatinSelect = (value: string | null) => {
        setSelectedLatinName(value);
        onFilter('latinName', value);
        setShowLatinDropdown(false);
    };

    const handleCommonSelect = (value: string | null) => {
        setSelectedCommonName(value);
        onFilter('commonName', value);
        setShowCommonDropdown(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                latinDropdownRef.current &&
                !latinDropdownRef.current.contains(event.target as Node)
            ) {
                setShowLatinDropdown(false);
            }
            if (
                commonDropdownRef.current &&
                !commonDropdownRef.current.contains(event.target as Node)
            ) {
                setShowCommonDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="sort-directory">
            <span className="sort-directory-text">Filter</span>
            <div className="sort-directory-category">
                {/* Latin Name Dropdown */}
                <div
                    className="sort-directory-category-field"
                    onClick={() => {
                        setShowLatinDropdown(!showLatinDropdown);
                        setShowCommonDropdown(false); // Hide other dropdown
                    }}
                    ref={latinDropdownRef}
                >
                    <span className='filter-field'>
                        Latin Name: {selectedLatinName || 'All'}
                    </span>
                    
                    <img src={ArrowDown} alt="Sort" />
                    {showLatinDropdown && (
                        <div className="dropdown">
                            <div 
                                onClick={() => handleLatinSelect(null)}
                                style={{ fontWeight: selectedLatinName === null ? 'bold' : 'normal' }}
                            >
                                All
                            </div>
                            {latinNames.map(name => (
                                <div
                                    key={name}
                                    onClick={() => handleLatinSelect(name)}
                                    style={{ fontWeight: selectedLatinName === name ? 'bold' : 'normal' }}
                                >
                                    {name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Common Name Dropdown */}
                <div
                    className="sort-directory-category-field"
                    onClick={() => {
                        setShowCommonDropdown(!showCommonDropdown);
                        setShowLatinDropdown(false); // Hide other dropdown
                    }}
                    ref={commonDropdownRef}
                >
                    <span>
                        Common Name:  {selectedCommonName || 'All'}
                    </span>
                    <img src={ArrowDown} alt="Sort" />
                    {showCommonDropdown && (
                        <div className="dropdown">
                            <div 
                                onClick={() => handleCommonSelect(null)}
                                style={{ fontWeight: selectedCommonName === null ? 'bold' : 'normal' }}
                            >
                                All
                            </div>
                            {commonNames.map(name => (
                                <div
                                    key={name}
                                    onClick={() => handleCommonSelect(name)}
                                    style={{ fontWeight: selectedCommonName === name ? 'bold' : 'normal' }}
                                >
                                    {name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
