import { useState, useEffect, useMemo } from "react";
import './directory.css';
import { useSearchParams } from "react-router-dom";
import Display from "./components/display";
import SearchBar from "../../components/searchBar";
import Sort from "./components/sort";
import Filter from "./components/filter";
import handleSearch from "../../../data/handleSearch";
import { Point } from "../../../types/tree"; // Ensure this path is correct
import fetchTreeInfo from "../../../data/trees";
import logo from '../../../images/logo.svg';


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
                if (tree.commonName) {
                    commonNamesSet.add(tree.commonName);
                }

                if (tree.latinName) {
                    latinNamesSet.add(tree.latinName);
                }

                if (tree.sun) {
                    sunsSet.add(tree.sun);
                }

                if (tree.speciesCo) {
                    speciesCosSet.add(tree.speciesCo);
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
        if (key === 'latinName') setSelectedLatinName(value);
        else if (key === 'commonName') setSelectedCommonName(value);
        else if (key === 'sun') setSelectedSun(value);
        else if (key === 'speciesCo') setSelectedSpeciesCo(value);
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
            data = data.filter(tree => tree.latinName === selectedLatinName);
        }
        if (selectedCommonName) {
            data = data.filter(tree => tree.commonName === selectedCommonName);
        }
        if (selectedSun) {
            data = data.filter(tree => tree.sun === selectedSun);
        }
        if (selectedSpeciesCo) {
            data = data.filter(tree => tree.speciesCo === selectedSpeciesCo);
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

    return (
        <div className="directory">
            <div className='logo-container'>
                <img src={logo} className='logo-icon'/>
            </div>
            <SearchBar onSearch={handleSearchInput}  initialQuery={searchTerm}/>
            <div className="directory-lower">
                {/* Clear sort and filter button */}
                {/* <button
                    className="clear-button"
                    onClick={() => {
                        setSelectedLatinName(null);
                        setSelectedCommonName(null);
                        setSelectedSun(null);
                        setSelectedSpeciesCo(null);
                        setSortKey(null);
                    }}
                >
                    Clear Sort and Filter
                </button> */}
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
                <div className="directory-display">
                    {/* Pass filtered and sorted data to Display */}
                    <Display data={filteredAndSortedData} />
                </div>
            </div>
        </div>
    );
}
