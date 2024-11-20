import { useState, useEffect, useMemo } from "react";
import "./history.css";
import Display from "./components/displayHistory";
import DisplayHistoryMobile from "./components/displayHistoryMobile";
import SearchBar from "../../components/searchBar";
import SortHistory from "./components/sortHistory";
import FilterHistory from "./components/filterHistory";
import handleSearchHistory from "../../../data/handleSearchHistory";
import { TreeHistory } from "../../../types/tree";
import fetchTreeHistoryInfo from "../../../data/treeHistory";
import Footer from "../../components/footer";
import api from "../../api/api";
import filterIcon from '../../../images/icons/fitler-icon.svg';


export default function History({ token }: { token: string | null }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isDirectoryMobile, setIsDirectoryMobile] = useState(false);

    const [treeData, setTreeData] = useState<TreeHistory[]>([]);
    const [searchResults, setSearchResults] = useState<TreeHistory[] | null>(null);
    const [sortKey, setSortKey] = useState<keyof TreeHistory | null>(null);
    const [selectedHazardRating, setSelectedHazardRating] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const [hazardRatingArr, setHazardRatingArr] = useState<string[]>([]);
    const [yearArr, setYearArr] = useState<number[]>([]);

    const [isAddHistoryModalOpen, setAddHistoryModalOpen] = useState(false);
    const [isEditHistoryModalOpen, setEditHistoryModalOpen] = useState(false);
    const [newHistory, setNewHistory] = useState<TreeHistory>({
        tree_id: 0,
        hist_id: 0,
        hazard_rating: "",
        DBH: undefined,
        notes: "",
        year: new Date().getFullYear(),
    });
    const [updatedHistory, setUpdatedHistory] = useState<TreeHistory | null>(null);

    const [isLoadingAddTreeHistory, setIsLoadingAddTreeHistory] = useState<boolean>(false);
    const [isLoadingEditTreeHistory, setIsLoadingEditTreeHistory] = useState<boolean>(false);
    
    useEffect(() => {
        const handleResize = () => {
          setIsDirectoryMobile(window.innerWidth <= 1100);
        };
    
        // Set initial value
        handleResize();
    
        // Attach resize event listener
        window.addEventListener('resize', handleResize);
    
        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    const [showNav, setShowNav] = useState(false);

    // Function to close the sidebar
    const closeSidebar = () => setShowNav(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTreeHistoryInfo();
                setTreeData(data.filter((history) => history && history.hist_id !== null));

                const hazardRatings = new Set<string>();
                const years = new Set<number>();

                data.forEach((history) => {
                    if (history.hazard_rating) hazardRatings.add(history.hazard_rating);
                    if (history.year) years.add(history.year);
                });

                setHazardRatingArr(Array.from(hazardRatings).sort());
                setYearArr(Array.from(years).sort());
            } catch (err) {
                console.error("Error fetching tree history:", err);
            }
        };
        fetchData();
    }, []);

    const handleSearchInput = async (query: string) => {
        if (query.trim() === "") {
            setSearchResults(null);
        } else {
            const results = await handleSearchHistory(query);
            setSearchResults(results);
        }
    };

    const handleFilter = (key: keyof TreeHistory, value: string | number | null) => {
        if (key === "hazard_rating") setSelectedHazardRating(value as string);
        if (key === "year") setSelectedYear(value as number);
    };

    const handleSort = (key: keyof TreeHistory | null) => {
        setSortKey((prevSortKey) => (prevSortKey === key ? null : key));
    };

    const filteredAndSortedDataHistory = useMemo(() => {
        let data = searchResults ?? treeData;

        if (selectedHazardRating) {
            data = data.filter((history) => history.hazard_rating === selectedHazardRating);
        }

        if (selectedYear) {
            data = data.filter((history) => history.year === selectedYear);
        }

        data = [...data].sort((a, b) => {
            const aValue = a.hist_id ?? "";
            const bValue = b.hist_id ?? "";

            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        });

        if (sortKey) {
            data = [...data].sort((a, b) => {
                const aValue = a[sortKey] ?? "";
                const bValue = b[sortKey] ?? "";

                if (aValue === "" && bValue !== "") return 1;
                if (aValue !== "" && bValue === "") return -1;

                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            });
        }

        return data;
    }, [searchResults, treeData, sortKey, selectedHazardRating, selectedYear]);

    const handleAddHistory = () => {
        setIsLoadingAddTreeHistory(true)

        if (!token) {
            alert("Authorization token is missing.");
            setIsLoadingAddTreeHistory(false);
            return;
        }

        console.log("Payload being sent:", newHistory);

        api
            .post(`${process.env.REACT_APP_FASTAPI_URL}treehistory/new`, newHistory, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert("History added successfully!");
                setTreeData((prevTreeData) => 
                    prevTreeData.map((tree) => (tree.hist_id === newHistory.hist_id ? newHistory : tree))
                );
                setNewHistory({
                    tree_id: 0,
                    hist_id: 0,
                    hazard_rating: "",
                    DBH: undefined,
                    notes: "",
                    year: new Date().getFullYear(),
                });
                setAddHistoryModalOpen(false);
            })
            .catch((err) => {
                console.error("Error response:", err.response?.data || err.message);
                alert(`Error: ${err.response?.data?.detail || err.message}`);
            })
            .finally(() => setIsLoadingAddTreeHistory(false));
    };

    const handleUpdateHistory = () => {
        if (!updatedHistory || updatedHistory.hist_id === undefined || updatedHistory.hist_id === null) {
            console.error("No valid history selected for update.");
            return;
        }

        setIsLoadingEditTreeHistory(true);

        api
            .patch(`${process.env.REACT_APP_FASTAPI_URL}treehistory/update/${updatedHistory.hist_id}`, updatedHistory, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert("Successfully updated tree!")
                setTreeData((prevTreeData) =>
                    prevTreeData.map((history) =>
                        history.hist_id === updatedHistory.hist_id ? updatedHistory : history
                    )
                );
                setUpdatedHistory(null);
                setEditHistoryModalOpen(false);
            })
            .catch((err) => {
                console.error("Error updating history:", err.response?.data || err.message);
                alert(`Error updating history: ${err.response?.data?.detail || err.message}`);
            })
            .finally(() => setIsLoadingEditTreeHistory(true));
    };

    const handleDeleteHistory = (histId: number) => {
        if (!window.confirm(`Are you sure you want to delete history ID ${histId}?`)) return;


        api
            .delete(`${process.env.REACT_APP_FASTAPI_URL}treehistory/delete/${histId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                alert("Successfully deleted tree!")
                setTreeData((prevTreeData) => prevTreeData.filter((history) => history.hist_id !== histId));
            })
            .catch((err) => alert(`Error deleting history: ${err.message}`));
    };

    // Detect screen width on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set initial value
        handleResize();

        // Attach resize event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            {isDirectoryMobile ? (
                <div>
                    <div className="directory">
                        <SearchBar onSearch={handleSearchInput} />
                        <div className="directory-lower">
                            {/* <div className="directory-sort-and-filter">
                            {!isMobile && (
                                <>
                                    {token && (
                                        <button className="login-button" onClick={() => setAddHistoryModalOpen(true)}>
                                            Add History
                                        </button>
                                    )}
                                    <FilterHistory
                                        hazardRating={hazardRatingArr}
                                        year={yearArr}
                                        onFilter={handleFilter}
                                    />
                                    <SortHistory onSort={handleSort} />
                                </>
                            )}
                            </div> */}
                            <div className="filter-top-bar">
                                {!isMobile && (
                                    <>
                                        {token && (
                                            <button className="login-button" onClick={() => setAddHistoryModalOpen(true)}>
                                                Add History
                                            </button>
                                        )}
                                    </>
                                )}
                                <div className="filter-mobile-container" onClick={() => setShowNav(!showNav)}>
                                    <img src={filterIcon} alt="Filter Icon" className="filter-mobile-icon" />
                                    Filter
                                </div>
                        </div>

                        <div className={`filter-sidebar-overlay ${showNav ? 'active' : ''}`}>
                            <div className="filter-sidebar-content">
                                <button className="filter-close-btn" onClick={closeSidebar}>
                                    ✕
                                </button>
                                <div className="directory-lower">
                                    <div className="directory-sort-and-filter">                            
                                        <FilterHistory
                                            hazardRating={hazardRatingArr}
                                            year={yearArr}
                                            onFilter={handleFilter}
                                        />
                                        <SortHistory onSort={handleSort} />
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="directory-display">
                                {
                                    isMobile ? (
                                        <DisplayHistoryMobile
                                            data={filteredAndSortedDataHistory}
                                        />
                                    ) : (
                                        <Display
                                            token={token}
                                            data={filteredAndSortedDataHistory}
                                            onEdit={(history) => {
                                                if (history && history.hist_id !== undefined && history.hist_id !== null) {
                                                    setUpdatedHistory(history);
                                                    setEditHistoryModalOpen(true);
                                                }
                                            }}
                                            onDelete={handleDeleteHistory}
                                        />
                                    )
                                }
                            </div>
                        </div>

                        {isAddHistoryModalOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>Add History</h2>
                                    <button className="modal-close" onClick={() => setAddHistoryModalOpen(false)}>
                                        x
                                    </button>
                                    <form
                                        className="modal-form long-modal-form"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleAddHistory();
                                        }}
                                    >
                                        <label>History Id</label>
                                        <input
                                            type="text"
                                            value={newHistory.hist_id !== null && newHistory.hist_id !== undefined ? newHistory.hist_id : ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setNewHistory({
                                                    ...newHistory,
                                                    hist_id: value === "" ? 0 : Number(value),
                                                })
                                            }}
                                            // readOnly
                                            required
                                        />
                                        <label>Tree Id</label>
                                        <input
                                            type="text"
                                            value={newHistory.tree_id !== null && newHistory.tree_id !== undefined ? newHistory.tree_id : ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setNewHistory({
                                                    ...newHistory,
                                                    tree_id: value === "" ? undefined : Number(value),
                                                })
                                            }}
                                            required
                                        />
                                        <label>Hazard Rating:</label>
                                        <input
                                            type="text"
                                            value={newHistory.hazard_rating}
                                            onChange={(e) => setNewHistory({ ...newHistory, hazard_rating: e.target.value })}
                                            required
                                        />
                                        <label>DBH:</label>
                                        <input
                                            type="number"
                                            value={newHistory.DBH || ""}
                                            onChange={(e) => setNewHistory({ ...newHistory, DBH: Number(e.target.value) })}
                                        />
                                        <label>Notes:</label>
                                        <textarea
                                            value={newHistory.notes}
                                            onChange={(e) => setNewHistory({ ...newHistory, notes: e.target.value })}
                                        />
                                        <label>Year:</label>
                                        <input
                                            type="number"
                                            value={newHistory.year || ""}
                                            onChange={(e) => setNewHistory({ ...newHistory, year: Number(e.target.value) })}
                                            required
                                        />
                                        <button className="submit-button" type="submit">
                                            {isLoadingAddTreeHistory ? <text>Add Tree History...</text> : <text>Add Tree History</text>}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {isEditHistoryModalOpen && updatedHistory && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>Edit History</h2>
                                    <button className="modal-close" onClick={() => setEditHistoryModalOpen(false)}>
                                        x
                                    </button>
                                    <form
                                        className="modal-form long-modal-form"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleUpdateHistory();
                                        }}
                                    >
                                        <label>History Id</label>
                                        <input 
                                            type="number" 
                                            value={updatedHistory.hist_id !== null && updatedHistory.hist_id !== undefined ? updatedHistory.hist_id : ""} 
                                            className="readonly-input"
                                            disabled 
                                        />
                                        <label>Tree Id</label>
                                        <input
                                            type="number"
                                            value={updatedHistory.tree_id !== null && updatedHistory.tree_id !== undefined ? updatedHistory.tree_id : ""}
                                            readOnly
                                            className="readonly-input"
                                            required
                                        />
                                        <label>Hazard Rating:</label>
                                        <input
                                            type="text"
                                            value={updatedHistory.hazard_rating || ""}
                                            onChange={(e) =>
                                                setUpdatedHistory({ ...updatedHistory, hazard_rating: e.target.value })
                                            }
                                            required
                                        />
                                        <label>DBH:</label>
                                        <input
                                            type="number"
                                            value={updatedHistory.DBH || ""}
                                            onChange={(e) =>
                                                setUpdatedHistory({ ...updatedHistory, DBH: Number(e.target.value) })
                                            }
                                        />
                                        <label>Notes:</label>
                                        <textarea
                                            value={updatedHistory.notes || ""}
                                            onChange={(e) =>
                                                setUpdatedHistory({ ...updatedHistory, notes: e.target.value })
                                            }
                                        />
                                        <label>Year:</label>
                                        <input
                                            type="number"
                                            value={updatedHistory.year || ""}
                                            onChange={(e) =>
                                                setUpdatedHistory({ ...updatedHistory, year: Number(e.target.value) })
                                            }
                                            required
                                        />
                                        <button className="submit-button" type="submit">
                                            {isLoadingEditTreeHistory ? <text>Edit Tree History...</text> : <text>Edit Tree History</text>}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="directory">
                        <SearchBar onSearch={handleSearchInput} />
                        <div className="directory-lower">
                            <div className="directory-sort-and-filter">
                            {!isMobile && (
                                <>
                                    {token && (
                                        <button className="login-button" onClick={() => setAddHistoryModalOpen(true)}>
                                            Add History
                                        </button>
                                    )}
                                    <FilterHistory
                                        hazardRating={hazardRatingArr}
                                        year={yearArr}
                                        onFilter={handleFilter}
                                    />
                                    <SortHistory onSort={handleSort} />
                                </>
                            )}
                            </div>
                            <div className="directory-display">
                                {
                                    isMobile ? (
                                        <DisplayHistoryMobile
                                            data={filteredAndSortedDataHistory}
                                        />
                                    ) : (
                                        <Display
                                            token={token}
                                            data={filteredAndSortedDataHistory}
                                            onEdit={(history) => {
                                                if (history && history.hist_id !== undefined && history.hist_id !== null) {
                                                    setUpdatedHistory(history);
                                                    setEditHistoryModalOpen(true);
                                                }
                                            }}
                                            onDelete={handleDeleteHistory}
                                        />
                                    )
                                }
                            </div>
                        </div>

                        {isAddHistoryModalOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>Add History</h2>
                                    <button className="modal-close" onClick={() => setAddHistoryModalOpen(false)}>
                                        x
                                    </button>
                                    <form
                                        className="modal-form long-modal-form"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleAddHistory();
                                        }}
                                    >
                                        <label>Tree Id</label>
                                        <input
                                            type="text"
                                            value={newHistory.tree_id !== null && newHistory.tree_id !== undefined ? newHistory.tree_id : ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setNewHistory({
                                                    ...newHistory,
                                                    tree_id: value === "" ? undefined : Number(value),
                                                })
                                            }}
                                            required
                                        />
                                        <label>History Id</label>
                                        <input
                                            type="text"
                                            value={newHistory.hist_id !== null && newHistory.hist_id !== undefined ? newHistory.hist_id : ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setNewHistory({
                                                    ...newHistory,
                                                    hist_id: value === "" ? 0 : Number(value),
                                                })
                                            }}
                                            // readOnly
                                            required
                                        />
                                        <label>Hazard Rating:</label>
                                        <input
                                            type="text"
                                            value={newHistory.hazard_rating}
                                            onChange={(e) => setNewHistory({ ...newHistory, hazard_rating: e.target.value })}
                                            required
                                        />
                                        <label>DBH:</label>
                                        <input
                                            type="number"
                                            value={newHistory.DBH || ""}
                                            onChange={(e) => setNewHistory({ ...newHistory, DBH: Number(e.target.value) })}
                                        />
                                        <label>Notes:</label>
                                        <textarea
                                            value={newHistory.notes}
                                            onChange={(e) => setNewHistory({ ...newHistory, notes: e.target.value })}
                                        />
                                        <label>Year:</label>
                                        <input
                                            type="number"
                                            value={newHistory.year || ""}
                                            onChange={(e) => setNewHistory({ ...newHistory, year: Number(e.target.value) })}
                                            required
                                        />
                                        <button className="submit-button" type="submit">
                                            {isLoadingAddTreeHistory ? <text>Add Tree History...</text> : <text>Add Tree History</text>}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {isEditHistoryModalOpen && updatedHistory && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>Edit History</h2>
                                    <button className="modal-close" onClick={() => setEditHistoryModalOpen(false)}>
                                        x
                                    </button>
                                    <form
                                        className="modal-form long-modal-form"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleUpdateHistory();
                                        }}
                                    >
                                        <label>Tree Id</label>
                                        <input
                                            type="number"
                                            value={updatedHistory.tree_id !== null && updatedHistory.tree_id !== undefined ? updatedHistory.tree_id : ""}
                                            readOnly
                                            className="readonly-input"
                                            required
                                        />
                                        <label>History Id</label>
                                        <input 
                                            type="number" 
                                            value={updatedHistory.hist_id !== null && updatedHistory.hist_id !== undefined ? updatedHistory.hist_id : ""} 
                                            className="readonly-input"
                                            disabled 
                                        />
                                        <label>Hazard Rating:</label>
                                        <input
                                            type="text"
                                            value={updatedHistory.hazard_rating || ""}
                                            onChange={(e) =>
                                                setUpdatedHistory({ ...updatedHistory, hazard_rating: e.target.value })
                                            }
                                            required
                                        />
                                        <label>DBH:</label>
                                        <input
                                            type="number"
                                            value={updatedHistory.DBH || ""}
                                            onChange={(e) =>
                                                setUpdatedHistory({ ...updatedHistory, DBH: Number(e.target.value) })
                                            }
                                        />
                                        <label>Notes:</label>
                                        <textarea
                                            value={updatedHistory.notes || ""}
                                            onChange={(e) =>
                                                setUpdatedHistory({ ...updatedHistory, notes: e.target.value })
                                            }
                                        />
                                        <label>Year:</label>
                                        <input
                                            type="number"
                                            value={updatedHistory.year || ""}
                                            onChange={(e) =>
                                                setUpdatedHistory({ ...updatedHistory, year: Number(e.target.value) })
                                            }
                                            required
                                        />
                                        <button className="submit-button" type="submit">
                                            {isLoadingEditTreeHistory ? <text>Edit Tree History...</text> : <text>Edit Tree History</text>}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
