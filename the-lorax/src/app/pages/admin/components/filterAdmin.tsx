import React, { useState, useRef, useEffect } from "react";
import "../admin.css";
import ArrowDown from "../../../../images/icons/arrow-down.svg";

type FilterProps = {
    onFilter: (key: "data_permissions" | "user_permissions", value: boolean | null) => void;
};

const FilterAdmin: React.FC<FilterProps> = ({ onFilter }) => {
    const [showDataPermissionsDropdown, setShowDataPermissionsDropdown] = useState(false);
    const [showUserPermissionsDropdown, setShowUserPermissionsDropdown] = useState(false);

    const [selectedDataPermissions, setSelectedDataPermissions] = useState<string | null>(null);
    const [selectedUserPermissions, setSelectedUserPermissions] = useState<string | null>(null);

    const dataPermissionsRef = useRef<HTMLDivElement | null>(null);
    const userPermissionsRef = useRef<HTMLDivElement | null>(null);

    const valueSet = ["Yes", "No"];

    const handleDataPermissionsSelect = (value: string | null) => {
        setSelectedDataPermissions(value);
        onFilter("data_permissions", value === "Yes" ? true : value === "No" ? false : null);
        setShowDataPermissionsDropdown(false);
    };
    
    const handleUserPermissionsSelect = (value: string | null) => {
        setSelectedUserPermissions(value);
        onFilter("user_permissions", value === "Yes" ? true : value === "No" ? false : null);
        setShowUserPermissionsDropdown(false);
    };
    

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dataPermissionsRef.current &&
                !dataPermissionsRef.current.contains(event.target as Node)
            ) {
                setShowDataPermissionsDropdown(false);
            }
            if (
                userPermissionsRef.current &&
                !userPermissionsRef.current.contains(event.target as Node)
            ) {
                setShowUserPermissionsDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="sort-directory">
            <span className="sort-directory-text">Filter</span>
            <div className="sort-directory-category">
                {/* Data Permissions Dropdown */}
                <div
                    className="sort-directory-category-field"
                    onClick={() => {
                        setShowDataPermissionsDropdown(!showDataPermissionsDropdown);
                        setShowUserPermissionsDropdown(false);
                    }}
                    ref={dataPermissionsRef}
                >
                    <span className="filter-field">
                        Data Permission: {selectedDataPermissions || "All"}
                    </span>
                    {/* <img src={ArrowDown} alt="Sort" /> */}
                    {showDataPermissionsDropdown && (
                        <div className="dropdown">
                            <div
                                onClick={() => handleDataPermissionsSelect(null)}
                                style={{
                                    fontWeight: selectedDataPermissions === null ? "bold" : "normal",
                                }}
                            >
                                All
                            </div>
                            {valueSet.map((bool) => (
                                <div
                                    key={bool}
                                    onClick={() => handleDataPermissionsSelect(bool)}
                                    style={{
                                        fontWeight: selectedDataPermissions === bool ? "bold" : "normal",
                                    }}
                                >
                                    {bool}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* User Permissions Dropdown */}
                <div
                    className="sort-directory-category-field"
                    onClick={() => {
                        setShowUserPermissionsDropdown(!showUserPermissionsDropdown);
                        setShowDataPermissionsDropdown(false);
                    }}
                    ref={userPermissionsRef}
                >
                    <span className="filter-field">
                        User Permission: {selectedUserPermissions || "All"}
                    </span>
                    {/* <img src={ArrowDown} alt="Sort" /> */}
                    {showUserPermissionsDropdown && (
                        <div className="dropdown">
                            <div
                                onClick={() => handleUserPermissionsSelect(null)}
                                style={{
                                    fontWeight: selectedUserPermissions === null ? "bold" : "normal",
                                }}
                            >
                                All
                            </div>
                            {valueSet.map((bool) => (
                                <div
                                    key={bool}
                                    onClick={() => handleUserPermissionsSelect(bool)}
                                    style={{
                                        fontWeight: selectedUserPermissions === bool ? "bold" : "normal",
                                    }}
                                >
                                    {bool}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterAdmin;
