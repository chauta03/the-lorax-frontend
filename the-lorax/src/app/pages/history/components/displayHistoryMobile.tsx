import React, { useState, useMemo, useEffect } from 'react';
import { TreeHistory } from '../../../../types/tree';
import LearnMore from '../../../../images/buttons/3-dots.svg'

type DisplayProps = {
    data: TreeHistory[]; 
};

export default function DisplayHistoryMobile({ data }: DisplayProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [selectedTree, setSelectedTree] = useState<TreeHistory | null>(null);
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

    const handleLearnMore = (tree: TreeHistory) => {
        setSelectedTree(tree);
    };

    const closeModal = () => {
        setSelectedTree(null);
    }


    return (
        <div className="display-container">
            {/* Header Section */}
            <div className='display-filter'>
                <div className="display-filter-header display-filter-history">
                    <span className="display-filter-column">Tree ID</span>
                    <span className="display-filter-column">Hazard</span>
                    <span className="display-filter-column">Year</span>
                </div>

                {/* Display the rows of data */}
                {loading ? (
                    <div className="display-filter-container">
                        Loading...
                    </div> ) : (
                        <div className="display-filter-container">
                            {currentTrees.length > 0 ? (
                                currentTrees.map((tree) => (
                                    <div key={tree.tree_id} className="display-filter-row display-filter-history">
                                        <span className="display-filter-column">{tree.tree_id}</span>
                                        <span className="display-filter-column">{tree.hazard_rating}</span>
                                        <span className="display-filter-column">{tree.year}</span>
                                        <span className="display-filter-column">
                                            <img
                                                src={LearnMore}
                                                alt="Learn More"
                                                className="learn-more-icon"
                                                onClick={() => handleLearnMore(tree)} 
                                            />
                                        </span>
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

                {/* Info Modal */}
                {selectedTree && (
                    <div className="modal">
                        <div className="modal-content">
                            <button className="modal-close" onClick={closeModal}>
                                x
                            </button>
                            <h2>Tree Information</h2>
                            <ul>
                                <li><strong>Tree Id:</strong> {selectedTree.tree_id}</li>
                                <li><strong>History Id:</strong> {selectedTree.hist_id}</li>
                                <li><strong>Hazard Rating:</strong> {selectedTree.hazard_rating}</li>
                                <li><strong>DBH:</strong> {selectedTree.DBH}</li>
                                <li><strong>Notes:</strong> {selectedTree.notes}</li>
                                <li><strong>Year:</strong> {selectedTree.year}</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
