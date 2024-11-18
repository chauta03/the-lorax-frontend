import React, { useState } from 'react';
import "./searchBar.css";
import SearchIcon from '../../images/icons/search-icon.svg'

type CustomButtonProps = {
    onSearch: (query: string) => void;
    initialQuery?: string;
};

const SearchBar: React.FC<CustomButtonProps> = ({ onSearch, initialQuery = '' }) => {
    const [searchTerm, setSearchTerm] = useState(initialQuery);

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleClear = () => {
        setSearchTerm('');
        onSearch(''); 
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
                {searchTerm && (
                    <button className="clear-search-button" onClick={handleClear} aria-label="Clear search">
                        ✖
                    </button>
                )}
                <div className="search-icon-container" onClick={handleSearch}>
                    <img src={SearchIcon} alt="Search" className="search-icon" />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
