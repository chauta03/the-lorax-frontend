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
            <SearchBar onSearch={handleSearchInput}  initialQuery={searchTerm}/>
            <div className="directory-lower">
                <div className="directory-sort-and-filter">
                    <Filter
                        latinNames={Array.from(new Set(treeData.map(tree => tree.latinName).filter(Boolean))) as string[]}
                        commonNames={Array.from(new Set(treeData.map(tree => tree.commonName).filter(Boolean))) as string[]}
                        sun={Array.from(new Set(treeData.map(tree => tree.sun).filter(Boolean))) as string[]}
                        speciesCo={Array.from(new Set(treeData.map(tree => tree.speciesCo).filter(Boolean))) as string[]}
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
