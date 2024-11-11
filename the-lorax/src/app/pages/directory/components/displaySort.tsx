import React from 'react';
import "../directory.css";
import ArrowDown from '../../../../images/icons/arrow-down.svg';
import fetchTreeInfo from "../../../../data/trees";
import { Point } from "../../../../types/tree";
import { useState, useEffect } from 'react';
import Sort from "./sort";
import Filter from "./filter";


export default function DisplayFilter() {
    const [treeData, setTreeData] = useState<Point[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState<keyof Point | null>(null); // Update the sortKey type to be keyof Point or null
    const treesPerPage = 15;

    // Fetch the tree data when the component mounts
    useEffect(() => {
        const getData = async () => {
            const data = await fetchTreeInfo();
            setTreeData(data);
        };
        getData();
    }, []);

    // Sort the data based on the selected sort key
    const sortedData = React.useMemo(() => {
        if (sortKey) {
            return [...treeData].sort((a, b) => {
                const aValue = a[sortKey] ?? '';
                const bValue = b[sortKey] ?? '';

                // Handle undefined or empty values
                if (aValue === undefined || aValue === '') return 1;  // Put `a` at the bottom
                if (bValue === undefined || bValue === '') return -1; // Put `b` at the bottom

                if (aValue < bValue) return -1;
                if (aValue > bValue) return 1;
                return 0;
            });
        }
        return treeData;
    }, [treeData, sortKey]);

    // Calculate the index range for the current page
    const indexOfLastTree = currentPage * treesPerPage;
    const indexOfFirstTree = indexOfLastTree - treesPerPage;
    const currentTrees = sortedData.slice(indexOfFirstTree, indexOfLastTree);

    // Handle page changes
    const handleNextPage = () => {
        if (currentPage < Math.ceil(treeData.length / treesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle sorting when clicking on the filter buttons
    const handleSort = (key: keyof Point) => {
        setSortKey(key);
    };

    return (
        <div className="directory-body">
            {/* Filter Component */}
            <div>
                <Sort onSort={handleSort} />
                <Filter onSort={handleSort}/>
            </div>

            {/* Header Section */}
            <div className='display-filter'>
                <div className="display-filter-header">
                    <span className="display-filter-column">Tag Number</span>
                    <span className="display-filter-column">Species Code</span>
                    <span className="display-filter-column">Latin Name</span>
                    <span className="display-filter-column">Common Name</span>
                    <span className="display-filter-column">Sun</span>
                    <span className="display-filter-column">Latitude</span>
                    <span className="display-filter-column">Longitude</span>
                </div>

                {/* Display the rows of data */}
                <div className="display-filter-container">
                    {currentTrees.length > 0 ? (
                        currentTrees.map((tree) => (
                            <div key={tree.key} className="display-filter-row">
                                <span className="display-filter-column">{tree.tagNum}</span>
                                <span className="display-filter-column">{tree.speciesCo}</span>
                                <span className="display-filter-column">{tree.latinName}</span>
                                <span className="display-filter-column">{tree.commonName}</span>
                                <span className="display-filter-column">{tree.sun}</span>
                                <span className="display-filter-column">{tree.lat}</span>
                                <span className="display-filter-column">{tree.lng}</span>
                            </div>
                        ))
                    ) : (
                        <div className="display-filter-loading">
                            Loading tree data...
                        </div>
                    )}
                </div>

                {/* Pagination Buttons */}
                <div className="pagination-controls">
                    <button
                        className="pagination-button"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {Math.ceil(treeData.length / treesPerPage)}</span>
                    <button
                        className="pagination-button"
                        onClick={handleNextPage}
                        disabled={currentPage >= Math.ceil(treeData.length / treesPerPage)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}