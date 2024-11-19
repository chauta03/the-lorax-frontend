import React, { useState, useRef, useEffect } from 'react';
import "../directory.css";
import ArrowDown from '../../../../images/icons/arrow-down.svg';
import TickboxTicked from '../../../../images/buttons/tick-box-ticked.svg';
import TickboxEmpty from '../../../../images/buttons/tick-box-empty.svg';

type FilterProps = {
    latinNames: string[];
    commonNames: string[];
    sun: string[];
    speciesCo: string[];
    onFilter: (key: 'latin_name' | 'common_name' | 'sun' | 'species_code', value: string | null) => void; 
};

export default function Filter({ latinNames, commonNames, sun, speciesCo, onFilter }: FilterProps) {

    const [showLatinDropdown, setShowLatinDropdown] = useState(false);
    const [showCommonDropdown, setShowCommonDropdown] = useState(false);
    const [showSunDropdown, setShowSunDropdown] = useState(false);
    const [showSpeciesCo, setShowSpeciesCo] = useState(false);

    const [latinDropdownIndex, setLatinDropdownIndex] = useState(-1);
    const [commonDropdownIndex, setCommonDropdownIndex] = useState(-1);
    const [sunDropdownIndex, setSunDropdownIndex] = useState(-1);
    const [speciesCoDropdownIndex, setSpeciesCoDropdownIndex] = useState(-1);
    
    const [selectedLatinName, setSelectedLatinName] = useState<string | null>(null);
    const [selectedCommonName, setSelectedCommonName] = useState<string | null>(null);
    const [selectedSun, setSelectedSun] = useState<string | null>(null);
    const [selectedSpeciesCo, setSelectedSpeciesCo] = useState<string | null>(null);
    
    const latinDropdownRef = useRef<HTMLDivElement | null>(null);
    const commonDropdownRef = useRef<HTMLDivElement | null>(null);
    const sunDropdownRef = useRef<HTMLDivElement | null>(null);
    const speciesCoDropdownRef = useRef<HTMLDivElement | null>(null);

    const handleLatinSelect = (value: string | null) => {
        setSelectedLatinName(value);
        onFilter('latin_name', value);
        setShowLatinDropdown(false);
    };

    const handleCommonSelect = (value: string | null) => {
        setSelectedCommonName(value);
        onFilter('common_name', value);
        setShowCommonDropdown(false);
    };

    const handleSunSelect = (value: string | null) => {
        setSelectedSun(value);
        onFilter('sun', value);
        setShowSunDropdown(false);
    };

    const handleSpeciesCoSelect = (value: string | null) => {
        setSelectedSpeciesCo(value);
        onFilter('species_code', value);
        setShowSpeciesCo(false);
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
            if (
                sunDropdownRef.current &&
                !sunDropdownRef.current.contains(event.target as Node)
            ) {
                setShowSunDropdown(false);
            }
            if (
                speciesCoDropdownRef.current &&
                !speciesCoDropdownRef.current.contains(event.target as Node)
            ) {
                setShowSpeciesCo(false);
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
                    
                    {selectedLatinName === null ?
                         <img src={TickboxEmpty} /> : <img src={TickboxTicked}/> 
                    }
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
                    {selectedCommonName === null ?
                         <img src={TickboxEmpty} /> : <img src={TickboxTicked}/> 
                    }
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

                {/* Sun Dropdown */}
                <div
                    className="sort-directory-category-field"
                    onClick={() => {
                        setShowSunDropdown(!showSunDropdown);
                        setShowLatinDropdown(false); // Hide other dropdown
                    }}
                    ref={sunDropdownRef}
                >
                    <span>
                        Sun: {selectedSun || 'All'}
                    </span>
                    {selectedSun === null ?
                         <img src={TickboxEmpty} /> : <img src={TickboxTicked}/> 
                    }
                    {showSunDropdown && (
                        <div className="dropdown">
                            <div 
                                onClick={() => handleSunSelect(null)}
                                style={{ fontWeight: selectedSun === null ? 'bold' : 'normal' }}
                            >
                                All
                            </div>
                            {sun.map(name => (
                                <div
                                    key={name}
                                    onClick={() => handleSunSelect(name)}
                                    style={{ fontWeight: selectedSun === name ? 'bold' : 'normal' }}
                                >
                                    {name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Species Co Dropdown */}
                <div
                    className="sort-directory-category-field"
                    onClick={() => {
                        setShowSpeciesCo(!showSpeciesCo);
                        setShowLatinDropdown(false); // Hide other dropdown
                    }}
                    ref={speciesCoDropdownRef}
                >
                    <span>
                        Species Code: {selectedSpeciesCo || 'All'}
                    </span>
                    {selectedSpeciesCo === null ?
                         <img src={TickboxEmpty} /> : <img src={TickboxTicked}/> 
                    }
                    {showSpeciesCo && (
                        <div className="dropdown">
                            <div 
                                onClick={() => handleSpeciesCoSelect(null)}
                                style={{ fontWeight: selectedSpeciesCo === null ? 'bold' : 'normal' }}
                            >
                                All
                            </div>
                            {speciesCo.map(name => (
                                <div
                                    key={name}
                                    onClick={() => handleSpeciesCoSelect(name)}
                                    style={{ fontWeight: selectedSpeciesCo === name ? 'bold' : 'normal' }}
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
