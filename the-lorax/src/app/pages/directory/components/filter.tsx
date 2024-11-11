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
    const latinDropdownRef = useRef<HTMLDivElement | null>(null);
    const commonDropdownRef = useRef<HTMLDivElement | null>(null);

    const handleLatinSelect = (value: string | null) => {
        onFilter('latinName', value);
        setShowLatinDropdown(false);
    };

    const handleCommonSelect = (value: string | null) => {
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
                    <span>Latin Name</span>
                    <img src={ArrowDown} alt="Sort" />
                    {showLatinDropdown && (
                        <div className="dropdown">
                            <div onClick={() => handleLatinSelect(null)}>All</div>
                            {latinNames.map(name => (
                                <div key={name} onClick={() => handleLatinSelect(name)}>
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
                    <span>Common Name</span>
                    <img src={ArrowDown} alt="Sort" />
                    {showCommonDropdown && (
                        <div className="dropdown">
                            <div onClick={() => handleCommonSelect(null)}>All</div>
                            {commonNames.map(name => (
                                <div key={name} onClick={() => handleCommonSelect(name)}>
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
