import React from 'react';
import "../directory.css";
import fetchTreeInfo from "../../../../data/trees";
import { Point } from "../../../../types/tree";
import { useState, useEffect } from 'react';
import Sort from "./sort";
import Filter from "./filter";

type DisplayProps = {
    data: Point[]; 
};


export default function Display({ data }: DisplayProps) {
    const [treeData, setTreeData] = useState<Point[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState<keyof Point | null>(null);
    const [selectedLatinName, setSelectedLatinName] = useState<string | null>(null);
    const [selectedCommonName, setSelectedCommonName] = useState<string | null>(null);
    const treesPerPage = 15;

    let latinNameSet = new Set<string>();
    let commonNameSet = new Set<string>();


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
        let data = [...treeData];
        if (sortKey) {
            data.sort((a, b) => {
                const aValue = a[sortKey] ?? '';
                const bValue = b[sortKey] ?? '';

                if (aValue === '' && bValue !== '') return 1;
                if (aValue !== '' && bValue === '') return -1;

                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            });
        }
        if (selectedLatinName) {
            data = data.filter(tree => tree.latinName === selectedLatinName);
        }
        if (selectedCommonName) {
            data = data.filter(tree => tree.commonName === selectedCommonName);
        }
        return data;
    }, [treeData, sortKey, selectedLatinName, selectedCommonName]);

    // Get the set of all latin name
    treeData.forEach(tree => {
        if (tree.latinName) latinNameSet.add(tree.latinName);
        if (tree.commonName) commonNameSet.add(tree.commonName);
    });


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
    
    // Handle filtering when clicking on the filter buttons
    const handleFilter = (key: keyof Point, value: string | null) => {
        if (key === 'latinName') setSelectedLatinName(value);
        else if (key === 'commonName') setSelectedCommonName(value);
    };

    // Handle sorting when clicking on the filter buttons
    const handleSort = (key: keyof Point | null) => {
        setSortKey(prevSortKey => prevSortKey === key ? null : key);
    };

    return (
        <div className="directory-body">
            {/* Filter Component */}
            <div className="directory-sort-and-filter">
                <Sort onSort={handleSort} />
                <Filter
                    latinNames={Array.from(latinNameSet)}
                    commonNames={Array.from(commonNameSet)}
                    onFilter={handleFilter}
                />
            </div>

            {/* Header Section */}
            <div className='display-filter'>
                <div className="display-filter-header">
                    <span className="display-filter-column">Tag #</span>
                    <span className="display-filter-column">Species Code</span>
                    <span className="display-filter-column">Latin Name</span>
                    <span className="display-filter-column">Common Name</span>
                    <span className="display-filter-column">Sun</span>
                    <span className="display-filter-column">Lat</span>
                    <span className="display-filter-column">Long</span>
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
                            No tree data to display
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