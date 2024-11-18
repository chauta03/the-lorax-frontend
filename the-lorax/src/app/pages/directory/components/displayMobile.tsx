import React, { useState, useMemo, useEffect } from 'react';
import { Point } from "../../../../types/tree";
import LearnMore from "../../../../images/buttons/3-dots.svg";

type DisplayProps = {
    data: Point[]; 
};

export default function DisplayMobile({data}: DisplayProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [selectedTree, setSelectedTree] = useState<Point | null>(null);

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

    const handleLearnMore = (tree: Point) => {
        setSelectedTree(tree);
    };

    const closeModal = () => {
        setSelectedTree(null);
    }


    return (
        <div className="display-container">
            {/* Header Section */}
            <div className='display-filter'>
                <div className="display-filter-header">
                    <span className="display-filter-column">Tag #</span>
                    <span className="display-filter-column">Latin Name</span>
                    <span className="display-filter-column">Common Name</span>
                </div>

                {/* Display the rows of data */}
                <div className="display-filter-container">
                    {currentTrees.length > 0 ? (
                        currentTrees.map((tree) => (
                            <div key={tree.tree_id} className="display-filter-row">
                                <span className="display-filter-column">{tree.tag_number}</span>
                                <span className="display-filter-column">{tree.latin_name}</span>
                                <span className="display-filter-column">{tree.common_name}</span>
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

                {/* Info Modal */}
                {selectedTree && (
                    <div className="modal">
                        <div className="modal-content">
                            <button className="modal-close" onClick={closeModal}>
                                x
                            </button>
                            <h2>Tree Information</h2>
                            <ul>
                                <li><strong>Tag #:</strong> {selectedTree.tag_number}</li>
                                <li><strong>Latin Name:</strong> {selectedTree.latin_name}</li>
                                <li><strong>Common Name:</strong> {selectedTree.common_name}</li>
                                <li><strong>Species Code:</strong> {selectedTree.species_code}</li>
                                <li><strong>Sun:</strong> {selectedTree.sun}</li>
                                <li><strong>Latitude:</strong> {selectedTree.lat}</li>
                                <li><strong>Longitude:</strong> {selectedTree.long}</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
