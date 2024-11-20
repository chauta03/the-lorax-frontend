import { useState, useEffect, useMemo } from "react";
import './directory.css';
import '../../../App.css';
import { useSearchParams } from "react-router-dom";
import Display from "./components/display";
import SearchBar from "../../components/searchBar";
import Sort from "./components/sort";
import Filter from "./components/filter";
import handleSearch from "../../../data/handleSearch";
import { Point, UpdatedPoint } from "../../../types/tree"; 
import fetchTreeInfo from "../../../data/trees";
import Footer from "../../components/footer";
import api from "../../api/api"
import filterIcon from '../../../images/icons/fitler-icon.svg';

export default function Directory({token}: {token: string | null}) {
    const [isDirectoryMobile, setIsDirectoryMobile] = useState(false);
    
    const [treeData, setTreeData] = useState<Point[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchResults, setSearchResults] = useState<Point[] | null>(null);
    const [sortKey, setSortKey] = useState<keyof Point | null>(null);
    const [selectedLatinName, setSelectedLatinName] = useState<string | null>(null);
    const [selectedCommonName, setSelectedCommonName] = useState<string | null>(null);
    const [selectedSun, setSelectedSun] = useState<string | null>(null);
    const [selectedSpeciesCo, setSelectedSpeciesCo] = useState<string | null>(null);

    // If have query, search for it
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const [searchTerm, setSearchTerm] = useState(query);

    const [commonNames, setCommonNames] = useState<string[]>([]);
    const [latinNames, setLatinNames] = useState<string[]>([]);
    const [suns, setSuns] = useState<string[]>([]);
    const [speciesCos, setSpeciesCos] = useState<string[]>([]);

    // Add tree, delete tree modal
    const [isAddTreeModalOpen, setAddTreeModalOpen] = useState(false);
    const [isEditTreeModalOpen, setEditTreeModalOpen] = useState(false);
    const [updatedTree, setUpdatedTree] = useState<Point | null>(null);
    const [rawLat, setRawLat] = useState<string>("");
    const [rawLong, setRawLong] = useState<string>("");
    const [newTree, setNewTree] = useState<Point>({
        tree_id: undefined,
        tag_number: undefined,
        species_code: "",
        latin_name: "",
        common_name: "",
        sun: "",
        lat: 0,
        long: 0,
    }); 
    const [isLoadingAddTree, setIsLoadingAddTree] = useState<boolean>(false);
    const [isLoadingUpdateTree, setIsLoadingUpdateTree] = useState<boolean>(false);

    // Search when query changes
    useEffect(() => {
        if (searchTerm) {
            handleSearchInput(searchTerm);
        }
    }, [searchTerm]);

    // Fetch the initial tree data
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTreeInfo(); // Fetch all trees initially
            setTreeData(data);

            const commonNamesSet = new Set<string>();
            const latinNamesSet = new Set<string>();
            const sunsSet = new Set<string>();
            const speciesCosSet = new Set<string>();

            // Get all unique common names, latin names, suns, and speciesCos
            data.forEach(tree => {
                if (tree.common_name) {
                    commonNamesSet.add(tree.common_name);
                }

                if (tree.latin_name) {
                    latinNamesSet.add(tree.latin_name);
                }

                if (tree.sun) {
                    sunsSet.add(tree.sun);
                }

                if (tree.species_code) {
                    speciesCosSet.add(tree.species_code);
                }
            });

            setCommonNames(Array.from(commonNamesSet).sort());
            setLatinNames(Array.from(latinNamesSet).sort());
            setSuns(Array.from(sunsSet).sort());
            setSpeciesCos(Array.from(speciesCosSet).sort());

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

    // Handle filtering when clicking on the filter buttons
    const handleFilter = (key: keyof Point, value: string | null) => {
        if (key === 'latin_name') setSelectedLatinName(value);
        else if (key === 'common_name') setSelectedCommonName(value);
        else if (key === 'sun') setSelectedSun(value);
        else if (key === 'species_code') setSelectedSpeciesCo(value);
    };

    // Handle sorting when clicking on the filter buttons
    const handleSort = (key: keyof Point | null) => {
        setSortKey(prevSortKey => prevSortKey === key ? null : key);
        
    };

    // Apply sorting and filtering to data (either all trees or search results)
    const filteredAndSortedData = useMemo(() => {
        let data = searchResults ?? treeData;


        // Apply filtering
        if (selectedLatinName) {
            data = data.filter(tree => tree.latin_name === selectedLatinName);
        }
        if (selectedCommonName) {
            data = data.filter(tree => tree.common_name === selectedCommonName);
        }
        if (selectedSun) {
            data = data.filter(tree => tree.sun === selectedSun);
        }
        if (selectedSpeciesCo) {
            data = data.filter(tree => tree.species_code === selectedSpeciesCo);
        }

        data = [...data].sort((a, b) => {
            const aValue = a.tree_id ?? '';
            const bValue = b.tree_id ?? '';
            if (aValue === '' && bValue !== '') return 1;
            if (aValue !== '' && bValue === '') return -1;

            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        });

        // Apply sorting
        if (sortKey) {
            data = [...data].sort((a, b) => {
                const aValue = a[sortKey] ?? '';
                const bValue = b[sortKey] ?? '';
                if (aValue === '' && bValue !== '') return 1;
                if (aValue !== '' && bValue === '') return -1;
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            });
        }

        return data;
    }, [searchResults, treeData, sortKey, selectedLatinName, selectedCommonName, selectedSun, selectedSpeciesCo]);


    // Handle adding a tree
    const handleAddTree = () => {
        setIsLoadingAddTree(true);

        api
            .post(`${process.env.REACT_APP_FASTAPI_URL}treeinfo/new`, newTree, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert("Tree added successfully!");
                setTreeData((prevTreeData) =>
                    prevTreeData.map((tree) => (tree.tree_id === newTree.tree_id ? newTree : tree))
                );
                setNewTree({
                    tree_id: undefined,
                    tag_number: undefined,
                    species_code: "",
                    latin_name: "",
                    common_name: "",
                    sun: "",
                    lat: 0,
                    long: 0,
                });

                setAddTreeModalOpen(false);
            })
            .catch((err) => alert(`Error adding tree: ${err.message}`))
            .finally(() => setIsLoadingAddTree(false))
    };

    // Handle updating a tree
    const handleUpdateTree = (updatedTree: Point) => {
        if (!updatedTree) return;

        setIsLoadingUpdateTree(true);

        api
            .patch(`${process.env.REACT_APP_FASTAPI_URL}treeinfo/update/${updatedTree.tree_id}`, updatedTree, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                alert("Tree updated successfully!");
                setTreeData((prevTreeData) =>
                    prevTreeData.map((tree) => (tree.tree_id === updatedTree.tree_id ? updatedTree : tree))
                );
                setUpdatedTree(null);
                setEditTreeModalOpen(false);
            })
            .catch((err) => alert(`Error updating tree: ${err.message}`))
            .finally(() => setIsLoadingUpdateTree(false));
    };

    // Handle deleting a tree
    const handleDeleteTree = (treeId: number) => {
        if (!window.confirm(`Are you sure you want to delete tree ${treeId}?`)) return;

        api
            .delete(`${process.env.REACT_APP_FASTAPI_URL}treeinfo/delete/${treeId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert("Tree deleted successfully!");
                setTreeData((prevTreeData) => prevTreeData.filter((tree) => tree.tree_id !== treeId));
            })
            .catch((err) => alert(`Error deleting tree: ${err.message}`));
    };

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


    return (
        <div>
            {isDirectoryMobile ? (
                <div>
                <div className="directory">
                <SearchBar onSearch={handleSearchInput}  initialQuery={searchTerm}/>
                <div className="directory-lower">
                    {/* <div className="directory-sort-and-filter">
                        {token && (
                            <>
                                <button className="login-button" onClick={() => setAddTreeModalOpen(true)}>Add New Tree</button>

                            </>
                        )}
                        <Filter
                            latinNames={latinNames}
                            commonNames={commonNames}
                            sun={suns}
                            speciesCo={speciesCos}
                            onFilter={handleFilter}
                        />
                        <Sort onSort={handleSort} />
                    </div> */}
                    <div className="filter-top-bar">
                        {token && (
                                <>
                                    <button className="login-button" onClick={() => setAddTreeModalOpen(true)}>Add New Tree</button>
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
                                    <Filter
                                        latinNames={latinNames}
                                        commonNames={commonNames}
                                        sun={suns}
                                        speciesCo={speciesCos}
                                        onFilter={handleFilter}
                                    />
                                    <Sort onSort={handleSort} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="directory-display">
                        <Display
                            token={token}
                            data={filteredAndSortedData}
                            onEdit={(tree) => {
                                if (token) {
                                    setUpdatedTree(tree);
                                    setEditTreeModalOpen(true);
                                }
                            }}
                            onDelete={(treeId) => {
                                if (token) handleDeleteTree(treeId);
                            }}
                        />
                    </div>
                </div>
            </div>
            

            {isAddTreeModalOpen && (
                <div className="modal">
                    <div className="modal-content long-modal-content">
                        <h2>Add New Tree</h2>
                        <button 
                            className="modal-close" 
                            type="button"
                            onClick={() => setAddTreeModalOpen(false)}
                            >
                            x
                        </button>
                        <form 
                            className="modal-form long-modal-form"
                            onSubmit={(e) => {
                                e.preventDefault();

                                const lat = Number(rawLat);
                                const long = Number(rawLong);

                                if (!isNaN(lat) && !isNaN(long)) {
                                    setNewTree({ ...newTree, lat, long });
                                    handleAddTree();
                                } else {
                                    alert("Please enter valid latitude and longitude.");
                                }
                            }}
                        >
                            <>
                            
                            </>
                            <label>Tree ID:</label>
                            <input
                                type="number"
                                value={newTree.tree_id || ""}
                                onChange={(e) =>
                                    setNewTree({ ...newTree, tree_id: Number(e.target.value) })
                                }
                                required
                            />
                            <label>Tag #:</label>
                            <input
                                type="number"
                                value={newTree.tag_number || ""}
                                onChange={(e) =>
                                    setNewTree({ ...newTree, tag_number: Number(e.target.value) })
                                }
                                required
                            />
                            <label>Species Code:</label>
                            <input
                                type="text"
                                value={newTree.species_code || ""}
                                onChange={(e) =>
                                    setNewTree({ ...newTree, species_code: e.target.value })
                                }
                                required
                            />
                            <label>Latin Name:</label>
                            <input
                                type="text"
                                value={newTree.latin_name || ""}
                                onChange={(e) =>
                                    setNewTree({ ...newTree, latin_name: e.target.value })
                                }
                                required
                            />
                            <label>Common Name:</label>
                            <input
                                type="text"
                                value={newTree.common_name || ""}
                                onChange={(e) =>
                                    setNewTree({ ...newTree, common_name: e.target.value })
                                }
                                required
                            />
                            <label>Sun:</label>
                            <input
                                type="text"
                                value={newTree.sun || ""}
                                onChange={(e) =>
                                    setNewTree({ ...newTree, sun: e.target.value })
                                }
                                required
                            />
                            <label>Latitude:</label>
                            <input
                                type="text" // Allow "-" and intermediate text input
                                value={rawLat}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || value === "-" || !isNaN(Number(value))) {
                                        setRawLat(value); // Update raw latitude input
                                    }
                                }}
                                required
                            />
                            <label>Longitude:</label>
                            <input
                                type="text"
                                value={rawLong}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || value === "-" || !isNaN(Number(value))) {
                                        setRawLong(value);
                                    }
                                }}
                                required
                            />
                            <button className="submit-button" type="submit">Add Tree</button>
                        </form>
                    </div>
                </div>
            )}
        
                      

            {isEditTreeModalOpen && updatedTree && (
                <div className="modal">
                    <div className="modal-content long-modal-content">
                        <h2>Edit Tree</h2>
                        <button
                            className="modal-close"
                            type="button"
                            onClick={() => setEditTreeModalOpen(false)}
                        >
                            x
                        </button>
                        <form
                            className="modal-form long-modal-form"
                            onSubmit={(e) => {
                                e.preventDefault();

                                // Convert raw inputs to integers
                                const updatedTreeWithIntegers = {
                                    ...updatedTree,
                                    lat: Number(rawLat),
                                    long: Number(rawLong),
                                };

                                handleUpdateTree(updatedTreeWithIntegers);
                            }}
                        >
                            <label>Tree ID:</label>
                            <input
                                type="number"
                                value={updatedTree.tree_id !== null && updatedTree.tree_id !== undefined ? updatedTree.tree_id : ""}
                                readOnly
                                className="readonly-input"
                                required
                            />
                            <label>Tag #:</label>
                            <input
                                type="number"
                                value={updatedTree.tag_number || ""}
                                onChange={(e) =>
                                    setUpdatedTree({ ...updatedTree, tag_number: Number(e.target.value) })
                                }
                                required
                            />
                            <label>Species Code:</label>
                            <input
                                type="text"
                                value={updatedTree.species_code || ""}
                                onChange={(e) =>
                                    setUpdatedTree({ ...updatedTree, species_code: e.target.value })
                                }
                                required
                            />
                            <label>Latin Name:</label>
                            <input
                                type="text"
                                value={updatedTree.latin_name || ""}
                                onChange={(e) =>
                                    setUpdatedTree({ ...updatedTree, latin_name: e.target.value })
                                }
                                required
                            />
                            <label>Common Name:</label>
                            <input
                                type="text"
                                value={updatedTree.common_name || ""}
                                onChange={(e) =>
                                    setUpdatedTree({ ...updatedTree, common_name: e.target.value })
                                }
                                required
                            />
                            <label>Sun:</label>
                            <input
                                type="text"
                                value={updatedTree.sun || ""}
                                onChange={(e) =>
                                    setUpdatedTree({ ...updatedTree, sun: e.target.value })
                                }
                                required
                            />
                            <label>Latitude:</label>
                            <input
                                type="text" // Allow "-" and intermediate text input
                                value={rawLat}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || value === "-" || !isNaN(Number(value))) {
                                        setRawLat(value); // Update raw latitude input
                                    }
                                }}
                                required
                            />

                            <label>Longitude:</label>
                            <input
                                type="text" // Allow "-" and intermediate text input
                                value={rawLong}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || value === "-" || !isNaN(Number(value))) {
                                        setRawLong(value); // Update raw longitude input
                                    }
                                }}
                                required
                            />
                            <button className="submit-button" type="submit">Update Tree</button>
                        </form>
                    </div>
                </div>
            )}
            </div>
            ) : (
                <div>
                <div className="directory">
                    <SearchBar onSearch={handleSearchInput}  initialQuery={searchTerm}/>
                    <div className="directory-lower">
                        <div className="directory-sort-and-filter">
                            {token && (
                                <>
                                    <button className="login-button" onClick={() => setAddTreeModalOpen(true)}>Add New Tree</button>

                                </>
                            )}
                            <Filter
                                latinNames={latinNames}
                                commonNames={commonNames}
                                sun={suns}
                                speciesCo={speciesCos}
                                onFilter={handleFilter}
                            />
                            <Sort onSort={handleSort} />
                        </div>
                        <div className="directory-display">
                            <Display
                                token={token}
                                data={filteredAndSortedData}
                                onEdit={(tree) => {
                                    if (token) {
                                        setUpdatedTree(tree);
                                        setEditTreeModalOpen(true);
                                    }
                                }}
                                onDelete={(treeId) => {
                                    if (token) handleDeleteTree(treeId);
                                }}
                            />
                        </div>
                    </div>
                </div>
                

                {isAddTreeModalOpen && (
                    <div className="modal">
                        <div className="modal-content long-modal-content">
                            <h2>Add New Tree</h2>
                            <button 
                                className="modal-close" 
                                type="button"
                                onClick={() => setAddTreeModalOpen(false)}
                                >
                                x
                            </button>
                            <form 
                                className="modal-form long-modal-form"
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    const lat = Number(rawLat);
                                    const long = Number(rawLong);

                                    if (!isNaN(lat) && !isNaN(long)) {
                                        setNewTree({ ...newTree, lat, long });
                                        handleAddTree();
                                    } else {
                                        alert("Please enter valid latitude and longitude.");
                                    }
                                }}
                            >
                                <>
                                
                                </>
                                <label>Tree ID:</label>
                                <input
                                    type="text"
                                    value={newTree.tree_id !== null && newTree.tree_id !== undefined ? newTree.tree_id : ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setNewTree({
                                            ...newTree,
                                            tree_id: value === "" ? undefined : Number(value),
                                        });
                                    }}
                                    required
                                />
                                <label>Tag #:</label>
                                <input
                                    type="number"
                                    value={newTree.tag_number != null && newTree.tag_number !== undefined ? newTree.tag_number : ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setNewTree({
                                            ...newTree,
                                            tag_number: value === "" ? undefined : Number(value),
                                        });
                                    }}
                                    required
                                />
                                <label>Species Code:</label>
                                <input
                                    type="text"
                                    value={newTree.species_code || ""}
                                    onChange={(e) =>
                                        setNewTree({ ...newTree, species_code: e.target.value })
                                    }
                                    required
                                />
                                <label>Latin Name:</label>
                                <input
                                    type="text"
                                    value={newTree.latin_name || ""}
                                    onChange={(e) =>
                                        setNewTree({ ...newTree, latin_name: e.target.value })
                                    }
                                    required
                                />
                                <label>Common Name:</label>
                                <input
                                    type="text"
                                    value={newTree.common_name || ""}
                                    onChange={(e) =>
                                        setNewTree({ ...newTree, common_name: e.target.value })
                                    }
                                    required
                                />
                                <label>Sun:</label>
                                <input
                                    type="text"
                                    value={newTree.sun || ""}
                                    onChange={(e) =>
                                        setNewTree({ ...newTree, sun: e.target.value })
                                    }
                                    required
                                />
                                <label>Latitude:</label>
                                <input
                                    type="text" // Allow "-" and intermediate text input
                                    value={rawLat}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === "" || value === "-" || !isNaN(Number(value))) {
                                            setRawLat(value); // Update raw latitude input
                                        }
                                    }}
                                    required
                                />
                                <label>Longitude:</label>
                                <input
                                    type="text"
                                    value={rawLong}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === "" || value === "-" || !isNaN(Number(value))) {
                                            setRawLong(value);
                                        }
                                    }}
                                    required
                                />
                                <button className="submit-button" type="submit">
                                    {isLoadingAddTree ? <text>Add Tree...</text> : <text>Add Tree</text>}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            
                          

                {isEditTreeModalOpen && updatedTree && (
                    <div className="modal">
                        <div className="modal-content long-modal-content">
                            <h2>Edit Tree</h2>
                            <button
                                className="modal-close"
                                type="button"
                                onClick={() => setEditTreeModalOpen(false)}
                            >
                                x
                            </button>
                            <form
                                className="modal-form long-modal-form"
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    // Convert raw inputs to integers
                                    const updatedTreeWithIntegers = {
                                        ...updatedTree,
                                        lat: Number(rawLat),
                                        long: Number(rawLong),
                                    };

                                    handleUpdateTree(updatedTreeWithIntegers);
                                }}
                            >
                                <label>Tree ID:</label>
                                <input
                                    type="number"
                                    value={updatedTree.tree_id !== null && updatedTree.tree_id !== undefined ? updatedTree.tree_id : ""}
                                    readOnly
                                    className="readonly-input"
                                    required
                                />
                                <label>Tag #:</label>
                                <input
                                    type="number"
                                    value={updatedTree.tag_number || ""}
                                    onChange={(e) =>
                                        setUpdatedTree({ ...updatedTree, tag_number: Number(e.target.value) })
                                    }
                                    required
                                />
                                <label>Species Code:</label>
                                <input
                                    type="text"
                                    value={updatedTree.species_code || ""}
                                    onChange={(e) =>
                                        setUpdatedTree({ ...updatedTree, species_code: e.target.value })
                                    }
                                    required
                                />
                                <label>Latin Name:</label>
                                <input
                                    type="text"
                                    value={updatedTree.latin_name || ""}
                                    onChange={(e) =>
                                        setUpdatedTree({ ...updatedTree, latin_name: e.target.value })
                                    }
                                    required
                                />
                                <label>Common Name:</label>
                                <input
                                    type="text"
                                    value={updatedTree.common_name || ""}
                                    onChange={(e) =>
                                        setUpdatedTree({ ...updatedTree, common_name: e.target.value })
                                    }
                                    required
                                />
                                <label>Sun:</label>
                                <input
                                    type="text"
                                    value={updatedTree.sun || ""}
                                    onChange={(e) =>
                                        setUpdatedTree({ ...updatedTree, sun: e.target.value })
                                    }
                                    required
                                />
                                <label>Latitude:</label>
                                <input
                                    type="text" // Allow "-" and intermediate text input
                                    value={rawLat}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === "" || value === "-" || !isNaN(Number(value))) {
                                            setRawLat(value); // Update raw latitude input
                                        }
                                    }}
                                    required
                                />

                                <label>Longitude:</label>
                                <input
                                    type="text" // Allow "-" and intermediate text input
                                    value={rawLong}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === "" || value === "-" || !isNaN(Number(value))) {
                                            setRawLong(value); // Update raw longitude input
                                        }
                                    }}
                                    required
                                />
                                <button className="submit-button" type="submit">
                                    {isLoadingUpdateTree ? <text>Update Tree...</text> : <text>Update Tree</text>}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            
            </div>)}
        </div>
    );
}
