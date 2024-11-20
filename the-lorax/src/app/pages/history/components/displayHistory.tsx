import React, { useState, useMemo, useEffect } from 'react';
import { TreeHistory } from '../../../../types/tree';

type DisplayProps = {
    token: string | null;
    onEdit: (tree: TreeHistory) => void;
    onDelete: (tree: number) => void;
    data: TreeHistory[]; 
};

export default function DisplayHistory({token, onEdit, onDelete, data }: DisplayProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        if (data && data.length > 0) {
            // If data is loaded and not empty, stop loading immediately
            setLoading(false);
            return;
        }
    
        // If data isn't available, start loading
        setLoading(true);
    
        // Fallback timeout to stop loading after a maximum duration
        const timer = setTimeout(() => {
            setLoading(false);
        }, 10000); // Adjust the timeout duration as needed
    
        return () => clearTimeout(timer); // Clear timeout on cleanup
    }, [data]);

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
                <div className={token ? "display-filter-header logged-in-display-filter-history" : "display-filter-header display-filter-history"}>
                    <span className="display-filter-column">History ID</span>
                    <span className="display-filter-column">Tree ID</span>
                    <span className="display-filter-column">Hazard Rating</span>
                    <span className="display-filter-column">DBH</span>
                    <span className="display-filter-column">Notes</span>
                    <span className="display-filter-column">Year</span>
                    {token && <span className="display-filter-column">Actions</span>}
                </div>

                {/* Display the rows of data */}
                {loading ? (
                    <div className="display-filter-container">Loading...</div>
                ) : (
                    <div className="display-filter-container">
                        {currentTrees.length > 0 ? (
                            currentTrees.map((tree) => (
                                <div key={tree.tree_id} className={token ? "display-filter-row logged-in-display-filter-history" : "display-filter-row display-filter-history"}>
                                    <span className="display-filter-column">{tree.hist_id}</span>
                                    <span className="display-filter-column">{tree.tree_id}</span>
                                    <span className="display-filter-column">{tree.hazard_rating}</span>
                                    <span className="display-filter-column">{tree.DBH}</span>
                                    <span className="display-filter-column">{tree.notes}</span>
                                    <span className="display-filter-column">{tree.year}</span>
                                    {
                                        token && (
                                            <span className="display-filter-column admin-buttons-edit-delete">
                                                <button
                                                    className="action-button edit-button"
                                                    onClick={() => onEdit(tree)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="action-button delete-button"
                                                    onClick={() => {
                                                        onDelete(Number(tree.hist_id));
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </span>
                                        )
                                    }
                                </div>
                            ))
                        ) : (
                            <div className="display-filter-loading">
                                No tree data to display
                            </div>
                        )}
                    </div>
                )}
                

                {/* Pagination Controls */}
                <div className="pagination-controls">
                    <button
                        className="pagination-button"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {Math.ceil(data.length / treesPerPage)} (total of {data.length} observations)</span>
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
