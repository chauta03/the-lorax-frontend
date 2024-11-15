import React, { useState, useMemo, useEffect } from 'react';
import { TreeHistory } from '../../../../types/tree';

type DisplayProps = {
    data: TreeHistory[]; 
};

export default function DisplayHistory({ data }: DisplayProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const treesPerPage = Math.floor((windowHeight * 0.45) / 50);

    // Calculate the index range for the current page
    const indexOfLastTree = currentPage * treesPerPage;
    const indexOfFirstTree = indexOfLastTree - treesPerPage;
    const currentTrees = useMemo(() => data.slice(indexOfFirstTree, indexOfLastTree), [data, indexOfFirstTree, indexOfLastTree]);

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    // Handle page changes
    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.length / treesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };



    return (
        <div className="display-container">
            {/* Header Section */}
            <div className='display-filter'>
                <div className="display-filter-header display-filter-history">
                    <span className="display-filter-column">Tree ID</span>
                    <span className="display-filter-column">History ID</span>
                    <span className="display-filter-column">Hazard Rating</span>
                    <span className="display-filter-column">DBH</span>
                    <span className="display-filter-column">Notes</span>
                    <span className="display-filter-column">Year</span>
                </div>

                {/* Display the rows of data */}
                <div className="display-filter-container">
                    {currentTrees.length > 0 ? (
                        currentTrees.map((tree) => (
                            <div key={tree.treeId} className="display-filter-row display-filter-history">
                                <span className="display-filter-column">{tree.treeId}</span>
                                <span className="display-filter-column">{tree.histId}</span>
                                <span className="display-filter-column">{tree.hazardRating}</span>
                                <span className="display-filter-column">{tree.DBH}</span>
                                <span className="display-filter-column">{tree.notes}</span>
                                <span className="display-filter-column">{tree.year}</span>
                            </div>
                        ))
                    ) : (
                        <div className="display-filter-loading">
                            No tree data to display
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="pagination-controls">
                    <button
                        className="pagination-button"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {Math.ceil(data.length / treesPerPage)} (total of {data.length} trees)</span>
                    <button
                        className="pagination-button"
                        onClick={handleNextPage}
                        disabled={currentPage >= Math.ceil(data.length / treesPerPage)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
