import React, { useState } from 'react';
import "./searchBar.css";

type CustomButtonProps = {
    onSearch: (query: string) => void;
    initialQuery?: string;
};

const SearchBar: React.FC<CustomButtonProps> = ({ onSearch, initialQuery = '' }) => {
    const [searchTerm, setSearchTerm] = useState(initialQuery);

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Looking for a tree?"
                    className="search-input search-text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter
                />
                <div className="search-icon-container" onClick={handleSearch}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="search-icon"
                    >
                        <circle cx="11" cy="11" r="8" stroke="#FFFFFF" strokeWidth="3" />
                        <line x1="16" y1="16" x2="21" y2="21" stroke="#FFFFFF" strokeWidth="3" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
