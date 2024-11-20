import { useState, useEffect, useMemo } from "react";
import './directory.css';
import '../../../App.css';
import { useSearchParams } from "react-router-dom";
import DisplayMobile from "./components/displayMobile";
import SearchBar from "../../components/searchBar";
import Sort from "./components/sort";
import Filter from "./components/filter";
import handleSearch from "../../../data/handleSearch";
import { Point } from "../../../types/tree"; 
import fetchTreeInfo from "../../../data/trees";
import logo from '../../../images/logo.svg';
import axios from "axios";
import Footer from "../../components/footer";
import filterIcon from '../../../images/icons/fitler-icon.svg';


export default function Directory() {
    const [treeData, setTreeData] = useState<Point[]>([]);
    const [searchResults, setSearchResults] = useState<Point[] | null>(null);
    const [sortKey, setSortKey] = useState<keyof Point | null>(null);
    const [selectedLatinName, setSelectedLatinName] = useState<string | null>(null);
    const [selectedCommonName, setSelectedCommonName] = useState<string | null>(null);
    const [selectedSun, setSelectedSun] = useState<string | null>(null);
    const [selectedSpeciesCo, setSelectedSpeciesCo] = useState<string | null>(null);

    // If have query, search for it
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const [searchTerm, setSearchTerm] = useState(query);

    const [commonNames, setCommonNames] = useState<string[]>([]);
    const [latinNames, setLatinNames] = useState<string[]>([]);
    const [suns, setSuns] = useState<string[]>([]);
    const [speciesCos, setSpeciesCos] = useState<string[]>([]);

    // Add tree, delete tree modal


    // Search when query changes
    useEffect(() => {
        if (searchTerm) {
            handleSearchInput(searchTerm);
        }
    }, [searchTerm]);

    // Fetch the initial tree data
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTreeInfo(); // Fetch all trees initially
            setTreeData(data);

            const commonNamesSet = new Set<string>();
            const latinNamesSet = new Set<string>();
            const sunsSet = new Set<string>();
            const speciesCosSet = new Set<string>();

            // Get all unique common names, latin names, suns, and speciesCos
            data.forEach(tree => {
                if (tree.common_name) {
                    commonNamesSet.add(tree.common_name);
                }

                if (tree.latin_name) {
                    latinNamesSet.add(tree.latin_name);
                }

                if (tree.sun) {
                    sunsSet.add(tree.sun);
                }

                if (tree.species_code) {
                    speciesCosSet.add(tree.species_code);
                }
            });

            setCommonNames(Array.from(commonNamesSet).sort());
            setLatinNames(Array.from(latinNamesSet).sort());
            setSuns(Array.from(sunsSet).sort());
            setSpeciesCos(Array.from(speciesCosSet).sort());

        };
        fetchData();
    }, []);

    // Function to handle search input and update search results
    const handleSearchInput = async (query: string) => {
        if (query.trim() === "") {
            setSearchResults(null); // Show all data if search query is empty
        } else {
            const results = await handleSearch(query);
            setSearchResults(results);
        }
    };

    // Handle filtering when clicking on the filter buttons
    const handleFilter = (key: keyof Point, value: string | null) => {
        if (key === 'latin_name') setSelectedLatinName(value);
        else if (key === 'common_name') setSelectedCommonName(value);
        else if (key === 'sun') setSelectedSun(value);
        else if (key === 'species_code') setSelectedSpeciesCo(value);
    };

    // Handle sorting when clicking on the filter buttons
    const handleSort = (key: keyof Point | null) => {
        setSortKey(prevSortKey => prevSortKey === key ? null : key);
        
    };

    // Apply sorting and filtering to data (either all trees or search results)
    const filteredAndSortedData = useMemo(() => {
        let data = searchResults ?? treeData;


        // Apply filtering
        if (selectedLatinName) {
            data = data.filter(tree => tree.latin_name === selectedLatinName);
        }
        if (selectedCommonName) {
            data = data.filter(tree => tree.common_name === selectedCommonName);
        }
        if (selectedSun) {
            data = data.filter(tree => tree.sun === selectedSun);
        }
        if (selectedSpeciesCo) {
            data = data.filter(tree => tree.species_code === selectedSpeciesCo);
        }

        // Apply sorting
        if (sortKey) {
            data = [...data].sort((a, b) => {
                const aValue = a[sortKey] ?? '';
                const bValue = b[sortKey] ?? '';
                if (aValue === '' && bValue !== '') return 1;
                if (aValue !== '' && bValue === '') return -1;
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            });
        }

        return data;
    }, [searchResults, treeData, sortKey, selectedLatinName, selectedCommonName, selectedSun, selectedSpeciesCo]);

    const [showNav, setShowNav] = useState(false);

    // Function to close the sidebar
    const closeSidebar = () => setShowNav(false);

    return (
        <div>
        <div className="directory">
            {/* <div className='logo-container'>
                <img src={logo} className='logo-icon'/>
            </div> */}
            <SearchBar onSearch={handleSearchInput}  initialQuery={searchTerm}/>
            {/* <div className="directory-lower">
                <div className="directory-sort-and-filter">                            
                    <Filter
                        latinNames={latinNames}
                        commonNames={commonNames}
                        sun={suns}
                        speciesCo={speciesCos}
                        onFilter={handleFilter}
                    />
                    <Sort onSort={handleSort} />
                </div> */}
                <div className="filter-mobile-container" onClick={() => setShowNav(!showNav)}>
                    <img src={filterIcon} alt="Filter Icon" className="filter-mobile-icon" />
                    Filter
                </div>

                <div className={`filter-sidebar-overlay ${showNav ? 'active' : ''}`}>
                    <div className="filter-sidebar-content">
                        <button className="filter-close-btn" onClick={closeSidebar}>
                            ✕
                        </button>
                        <div className="directory-lower">
                            <div className="directory-sort-and-filter">                            
                                <Filter
                                    latinNames={latinNames}
                                    commonNames={commonNames}
                                    sun={suns}
                                    speciesCo={speciesCos}
                                    onFilter={handleFilter}
                                />
                                <Sort onSort={handleSort} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="directory-display">
                    <DisplayMobile
                        data={filteredAndSortedData}
                    />
                </div>
                {/* </div> */}
        </div>
        <Footer />
        </div>
    );
}
