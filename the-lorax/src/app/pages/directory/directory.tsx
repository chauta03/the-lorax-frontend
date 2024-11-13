import { useState, useEffect } from "react";
import './directory.css';
import Header from '../../components/header';
import Display from "./components/display";
import SearchBar from "../action/action_buttons/searchBar";
import handleSearch from "../../../data/handleSearch";
import { Point } from "../../../types/tree"; // Ensure this path is correct

export default function Directory() {
    const [treeData, setTreeData] = useState<Point[]>([]);
    const [searchResults, setSearchResults] = useState<Point[] | null>(null);

    // Fetch the initial tree data
    useEffect(() => {
        const fetchData = async () => {
            const data = await handleSearch("");
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

    return (
        <div className="directory">
            <Header />
            <SearchBar onSearch={handleSearchInput} />
            <div className="directory-body">
                {/* Pass either the full treeData or filtered searchResults to Display */}
                <Display data={searchResults ?? treeData} />
            </div>
        </div>
    );
}
