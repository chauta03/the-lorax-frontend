import React, { useState, useMemo, useEffect } from "react";
import { User } from "../../../../types/user";

type DisplayProps = {
    data: User[];
    onDelete: (username: string) => void;
    onEdit: (user: User) => void;
};

export default function DisplayAdmin({ data, onDelete, onEdit }: DisplayProps) {
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

    // Handle window resize to adjust the number of rows displayed per page
    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const usersPerPage = Math.floor((windowHeight * 0.45) / 50); // Adjust rows per page based on window height

    // Calculate the index range for the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    // Memoize the data slice for the current page
    const currentUsers = useMemo(
        () => data.slice(indexOfFirstUser, indexOfLastUser),
        [data, indexOfFirstUser, indexOfLastUser]
    );

    // Reset to the first page when the data changes
    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    // Handle page navigation
    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.length / usersPerPage)) {
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
            <div className="display-filter">
                <div className="admin-display-filter-header">
                    <span className="display-filter-column">Username</span>
                    <span className="display-filter-column">Email</span>
                    <span className="display-filter-column">Full Name</span>
                    <span className="display-filter-column">Data Permission</span>
                    <span className="display-filter-column">User Permission</span>
                    <span className="display-filter-column">Actions</span>
                </div>

                {/* Display the rows of user data */}
                {loading ? (
                    <div className="display-filter-container">Loading users...</div>
                ) : (
                    <div className="display-filter-container">
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user) => (
                                <div key={user.username} className="admin-display-filter-row">
                                    <span className="display-filter-column">{user.username}</span>
                                    <span className="display-filter-column">{user.email}</span>
                                    <span className="display-filter-column">{user.full_name}</span>
                                    <span className="display-filter-column">
                                        {user.data_permissions ? "Yes" : "No"}
                                    </span>
                                    <span className="display-filter-column">
                                        {user.user_permissions ? "Yes" : "No"}
                                    </span>
                                    <span className="display-filter-column buttons-edit-delete">
                                        <button
                                            className="action-button edit-button"
                                            onClick={() => onEdit(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="action-button buttons-edit-delete"
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        `Are you sure you want to delete user ${user.username}?`
                                                )
                                                ) {
                                                    onDelete(user.username);
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="display-filter-loading">
                                No user data to display
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
                    <span>
                        Page {currentPage} of {Math.ceil(data.length / usersPerPage)} (total of{" "}
                        {data.length} users)
                    </span>
                    <button
                        className="pagination-button"
                        onClick={handleNextPage}
                        disabled={currentPage >= Math.ceil(data.length / usersPerPage)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
