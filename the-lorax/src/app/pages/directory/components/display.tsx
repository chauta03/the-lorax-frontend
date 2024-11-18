import React, { useState, useMemo, useEffect } from 'react';
import { Point } from "../../../../types/tree";

type DisplayProps = {
    token: string | null;
    data: Point[]; 
    onDelete: (treeId: number) => void;
    onEdit: (tree: Point) => void;
};

export default function Display({token, data, onDelete, onEdit }: DisplayProps) {
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
                <div className={token ? "logged-in-display-filter-header" : "display-filter-header"}>
                    <span className="display-filter-column">Tree ID</span>
                    <span className="display-filter-column">Tag #</span>
                    <span className="display-filter-column">Species Code</span>
                    <span className="display-filter-column">Latin Name</span>
                    <span className="display-filter-column">Common Name</span>
                    <span className="display-filter-column">Sun</span>
                    <span className="display-filter-column">Lat</span>
                    <span className="display-filter-column">Long</span>
                    {token && <span className="display-filter-column">Actions</span>}
                </div>

                {/* Display the rows of data */}
                <div className="display-filter-container">
                    {currentTrees.length > 0 ? (
                        currentTrees.map((tree) => (
                            <div key={tree.tree_id} className={token ? "logged-in-display-filter-row" : "display-filter-row"}>
                                <span className="display-filter-column">{tree.tree_id}</span>
                                <span className="display-filter-column">{tree.tag_number}</span>
                                <span className="display-filter-column">{tree.species_code}</span>
                                <span className="display-filter-column">{tree.latin_name}</span>
                                <span className="display-filter-column">{tree.common_name}</span>
                                <span className="display-filter-column">{tree.sun}</span>
                                <span className="display-filter-column">{tree.lat}</span>
                                <span className="display-filter-column">{tree.long}</span>
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
                                                    onDelete(Number(tree.tree_id));
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
