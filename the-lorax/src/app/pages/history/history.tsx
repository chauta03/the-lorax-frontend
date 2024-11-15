import { useState, useEffect, useMemo } from "react";
import './history.css';
import Header from '../../components/header';
import Display from "./components/displayHistory";
import SearchBar from "../../components/searchBar";
import SortHistory from "./components/sortHistory";
import FilterHistory from "./components/filterHistory";
import handleSearchHistory from "../../../data/handleSearchHistory";
import { TreeHistory } from "../../../types/tree";
import fetchTreeHistoryInfo from "../../../data/treeHistory";

export default function History() {
    const [treeData, setTreeData] = useState<TreeHistory[]>([]);
    const [searchResults, setSearchResults] = useState<TreeHistory[] | null>(null);
    const [sortKey, setSortKey] = useState<keyof TreeHistory | null>(null);
    const [selectedHazardRating, setSelectedHazardRating] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    
    const [hazardRatingArr, setHazardRatingArr] = useState<string[]>([]);
    const [yearArr, setYearArr] = useState<number[]>([]);
    

    // Fetch the initial tree data
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTreeHistoryInfo(); // Fetch all trees initially
            setTreeData(data);

             // Use a Set to ensure uniqueness
            const hazardRatings = new Set<string>();
            const years = new Set<number>();

            // Get all unique hazard ratings and years
            data.forEach(tree => {
                if (tree.hazardRating) {
                    hazardRatings.add(tree.hazardRating);
                }

                if (tree.year) {
                    years.add(tree.year);
                }
            });

            setHazardRatingArr(Array.from(hazardRatings).sort());
            setYearArr(Array.from(years).sort());
        }
        fetchData();
    }, []);

    // Function to handle search input and update search results
    const handleSearchInput = async (query: string) => {
        if (query.trim() === "") {
            setSearchResults(null); // Show all data if search query is empty
        } else {
            const results = await handleSearchHistory(query);
            setSearchResults(results);
        }
    };

    const handleFilter = (key: keyof TreeHistory, value: string | number | null) => {
        if (key === 'hazardRating') {
            setSelectedHazardRating(value as string);
        }

        if (key === 'year') {
            setSelectedYear(value as number);
        }
    };
    

    // Handle sorting when clicking on the filter buttons
    const handleSort = (key: keyof TreeHistory | null) => {
        setSortKey(prevSortKey => prevSortKey === key ? null : key);
    };

    // Apply sorting and filtering to data (either all trees or search results)
    const filteredAndSortedDataHistory = useMemo(() => {
        let data = searchResults ?? treeData;

        // Apply filtering
        if (selectedHazardRating) {
            data = data.filter(tree => tree.hazardRating === selectedHazardRating);
        }

        if (selectedYear) {
            data = data.filter(tree => tree.year === selectedYear);
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
    }, [searchResults, treeData, sortKey, selectedHazardRating, selectedYear]);

    return (
        <div className="directory">
            {/* <SearchBar onSearch={handleSearchInput} /> */}
            <div className="directory-lower">
                <div className="directory-sort-and-filter">
                    <FilterHistory
                        hazardRating={hazardRatingArr}
                        year={yearArr}
                        onFilter={handleFilter}
                    />
                    <SortHistory onSort={handleSort} />
                </div>
                <div className="directory-display">
                    <Display data={filteredAndSortedDataHistory} />
                </div>
            </div>
        </div>
    );
}
