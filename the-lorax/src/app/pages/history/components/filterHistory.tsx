import React, { useState, useRef, useEffect } from 'react';
import "../history.css";
import ArrowDown from '../../../../images/icons/arrow-down.svg';

type FilterProps = {
    hazardRating: string[];
    onFilter: (key: 'hazardRating', value: string | null) => void;
};

export default function FilterHistory({ hazardRating, onFilter }: FilterProps) {
    const [showHazardRatingDropdown, setShowHazardRatingDropdown] = useState(false);
    const [selectedHazardRating, setSelectedHazardRating] = useState<string | null>(null);
    const hazardRatingDropdownRef = useRef<HTMLDivElement | null>(null);

    const handleHazardRatingSelect = (value: string | null) => {
        setSelectedHazardRating(value);
        onFilter('hazardRating', value);
        setShowHazardRatingDropdown(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                hazardRatingDropdownRef.current &&
                !hazardRatingDropdownRef.current.contains(event.target as Node)
            ) {
                setShowHazardRatingDropdown(false);
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
                <div
                    className="sort-directory-category-field"
                    onClick={() => setShowHazardRatingDropdown(!showHazardRatingDropdown)}
                    ref={hazardRatingDropdownRef}
                >
                    <span className='filter-field'>
                        Hazard Rating: {selectedHazardRating || 'All'}
                    </span>
                    <img src={ArrowDown} alt="Sort" />
                    {showHazardRatingDropdown && (
                        <div className="dropdown">
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
            </div>
        </div>
    );
}
