import React, { useState, useRef, useEffect } from 'react';
import "../history.css";
import TickboxEmpty from '../../../../images/buttons/tick-box-empty.svg';
import TickboxTicked from '../../../../images/buttons/tick-box-ticked.svg';

type FilterProps = {
    hazardRating: string[];
    year: number[];
    onFilter: (key: 'hazard_rating' | 'year', value: string | number | null) => void;
};

export default function FilterHistory({ hazardRating, year, onFilter }: FilterProps) {
    const [showHazardRatingDropdown, setShowHazardRatingDropdown] = useState(false);
    const [selectedHazardRating, setSelectedHazardRating] = useState<string | null>(null);
    const hazardRatingDropdownRef = useRef<HTMLDivElement | null>(null);

    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const yearDropdownRef = useRef<HTMLDivElement | null>(null);

    const handleHazardRatingSelect = (value: string | null) => {
        setSelectedHazardRating(value);
        onFilter('hazard_rating', value);
        setShowHazardRatingDropdown(false);
    };

    const handleYearSelect = (value: number | null) => {
        setSelectedYear(value);
        onFilter('year', value);
        setShowYearDropdown(false);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                hazardRatingDropdownRef.current &&
                !hazardRatingDropdownRef.current.contains(event.target as Node)
            ) {
                setShowHazardRatingDropdown(false);
            }

            if (
                yearDropdownRef.current &&
                !yearDropdownRef.current.contains(event.target as Node)
            ) {
                setShowYearDropdown(false);
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
                {/* Hazard Rating Dropdown */}
                <div className="sort-directory-category-field"
                    onClick={() => {
                        setShowHazardRatingDropdown(!showHazardRatingDropdown);
                        setShowYearDropdown(false); 
                    }}>
                    <div
                        className="filter-field-wrapper"
                        
                        ref={hazardRatingDropdownRef}
                    >
                        <span className='filter-field'>
                            Hazard Rating: {selectedHazardRating || 'All'}
                        </span>
                        
                    </div>
                    {selectedHazardRating === null ?
                         <img src={TickboxEmpty} /> : <img src={TickboxTicked}/> 
                    }
                    {showHazardRatingDropdown && (
                        <div ref={hazardRatingDropdownRef} className="dropdown">
                            <div
                                onClick={() => handleHazardRatingSelect(null)}
                                style={{ fontWeight: selectedHazardRating === null ? 'bold' : 'normal' }}
                            >
                                All
                            </div>
                            {hazardRating.map(rating => (
                                <div
                                    key={rating}
                                    onClick={() => handleHazardRatingSelect(rating)}
                                    style={{ fontWeight: selectedHazardRating === rating ? 'bold' : 'normal' }}
                                >
                                    {rating}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Year Dropdown */}
                <div className="sort-directory-category-field"
                    onClick={() => {
                        setShowYearDropdown(!showYearDropdown);
                        setShowHazardRatingDropdown(false); // Hide other dropdown
                    }}>
                    <div
                        className="filter-field-wrapper"
                        
                    >
                        <span className='filter-field'>
                            Year: {selectedYear || 'All'}
                            
                        </span>
                        
                    </div>
                    {selectedYear === null ?
                         <img src={TickboxEmpty} /> : <img src={TickboxTicked}/> 
                    }
                    {showYearDropdown && (
                        <div ref={yearDropdownRef} className="dropdown">
                            <div
                                onClick={() => handleYearSelect(null)}
                                style={{ fontWeight: selectedYear === null ? 'bold' : 'normal' }}
                            >
                                All
                            </div>
                            {year.map(yearValue => (
                                <div
                                    key={yearValue}
                                    onClick={() => handleYearSelect(yearValue)}
                                    style={{ fontWeight: selectedYear === yearValue ? 'bold' : 'normal' }}
                                >
                                    {yearValue}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
