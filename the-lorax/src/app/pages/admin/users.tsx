import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./admin.css";
import { User, NewUser, ModifyUser, UsersProps } from "../../../types/user";
import FilterAdmin from "./components/filterAdmin";
import DisplayAdmin from "./components/displayAdmin";
import SearchBar from "../../components/searchBar";
import api from "../../api/api"

const Users: React.FC<UsersProps> = ({ token }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [newUser, setNewUser] = useState<NewUser>({
        username: "",
        email: "",
        full_name: "",
        password: "",
        data_permissions: false,
        user_permissions: false,
    });
    const [modifyUser, setModifyUser] = useState<ModifyUser | null>(null);
    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);

    const [selectedDataPermissions, setSelectedDataPermissions] = useState<boolean | null>(null);
    const [selectedUserPermissions, setSelectedUserPermissions] = useState<boolean | null>(null);
    const [loadingAddUser, setLoadingAddUser] = useState<boolean>(false);
    const [loadingEditUser, setLoadingEditUser] = useState<boolean>(false);

    useEffect(() => {
        api
            .get<User[]>(`${process.env.REACT_APP_FASTAPI_URL}users`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Error fetching users", error));
    }, [token]);

    const handleAddUser = () => {
        setLoadingAddUser(true);
    
        api
            .post(`${process.env.REACT_APP_FASTAPI_URL}users/new`, newUser, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                alert("User added successfully!");
                setNewUser({
                    username: "",
                    email: "",
                    full_name: "",
                    password: "",
                    data_permissions: false,
                    user_permissions: false,
                });
    
                // Refresh user list
                axios
                    .get<User[]>(`${process.env.REACT_APP_FASTAPI_URL}users`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => setUsers(response.data));
                setAddUserModalOpen(false);
            })
            .catch((error) => alert("Error adding user: " + error))
            .finally(() => {
                setLoadingAddUser(false); // Ensure this is properly wrapped in a function
            });
    };
    

    const handleDeleteUser = (username: string) => {
        api
            .delete(`${process.env.REACT_APP_FASTAPI_URL}users/delete/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                alert("User deleted successfully!");
                setUsers(users.filter((user) => user.username !== username));
            })
            .catch((error) => alert("Error deleting user: " + error));
    };

    const handleUpdateUser = () => {
        if (!modifyUser || !modifyUser.username) return;

        setLoadingEditUser(true);

        api
            .patch(
                `${process.env.REACT_APP_FASTAPI_URL}users/update/${modifyUser.username}`,
                modifyUser,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then(() => {
                alert("User updated successfully!");
                setModifyUser(null); // Reset modifyUser state
                // Refresh user list
                axios
                    .get<User[]>(`${process.env.REACT_APP_FASTAPI_URL}users`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => setUsers(response.data));
                setEditUserModalOpen(false);
            })
            .catch((error) => alert("Error updating user: " + error))
            .finally(() => setLoadingEditUser(false))
    };

    const handleFilter = (key: "data_permissions" | "user_permissions", value: boolean | null) => {
        if (key === "data_permissions") {
            setSelectedDataPermissions(value);
        } else if (key === "user_permissions") {
            setSelectedUserPermissions(value);
        }
    };

    const filteredData = useMemo(() => {
        let data = users;

        if (searchQuery.trim()) {
            data = data.filter(
                (user) =>
                    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedDataPermissions !== null) {
            data = data.filter((user) => user.data_permissions === selectedDataPermissions);
        }

        if (selectedUserPermissions !== null) {
            data = data.filter((user) => user.user_permissions === selectedUserPermissions);
        }

        return data;
    }, [users, searchQuery, selectedDataPermissions, selectedUserPermissions]);

    return (
        <div className="admin">
            <SearchBar 
                onSearch={(query) => setSearchQuery(query)}
                initialQuery=""
            />

            <div className="admin-body">
                <div className="admin-left">
                    {/* Add User Button */}
                    <button className="login-button" onClick={() => setAddUserModalOpen(true)}>Add New User</button>

                    {/* Add User Modal */}
                    {isAddUserModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Add New User</h2>
                                <button
                                        className="modal-close"
                                        type="button"
                                        onClick={() => setAddUserModalOpen(false)}
                                    >
                                        x
                                </button>
                                <form
                                    className="modal-form"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleAddUser();
                                    }}
                                >
                                    <label>Username:</label>
                                    <input
                                        type="text"
                                        value={newUser.username}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, username: e.target.value })
                                        }
                                        required
                                    />
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, email: e.target.value })
                                        }
                                        required
                                    />
                                    <label>Full Name:</label>
                                    <input
                                        type="text"
                                        value={newUser.full_name}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, full_name: e.target.value })
                                        }
                                        required
                                    />
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        value={newUser.password}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, password: e.target.value })
                                        }
                                        required
                                    />
                                    <label>Data Permissions:
                                        <input
                                            type="checkbox"
                                            checked={newUser.data_permissions}
                                            onChange={(e) =>
                                                setNewUser({
                                                    ...newUser,
                                                    data_permissions: e.target.checked,
                                                })
                                            }
                                        />
                                    </label>
                                    <label>User Permissions:
                                        <input
                                            type="checkbox"
                                            checked={newUser.user_permissions}
                                            onChange={(e) =>
                                                setNewUser({
                                                    ...newUser,
                                                    user_permissions: e.target.checked,
                                                })
                                            }
                                        />
                                    </label>
                                    <button className="submit-button" type="submit">
                                        {loadingAddUser ? <text>Add User...</text> : <text>Add User</text>}
                                    </button>

                                </form>
                            </div>
                        </div>
                    )}
                    <FilterAdmin onFilter={handleFilter} />
                </div>

                {/* User Table */}
                <DisplayAdmin
                    data={filteredData}
                    onDelete={handleDeleteUser}
                    onEdit={(user) => {
                        setModifyUser(user);
                        setEditUserModalOpen(true);
                    }}
                />
            </div>
            


            {/* Edit User Modal */}
            {isEditUserModalOpen && modifyUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit User</h2>
                        <button
                                className="modal-close"
                                type="button"
                                onClick={() => setEditUserModalOpen(false)}
                            >
                                x
                        </button>
                        <form
                            className="modal-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateUser();
                            }}
                        >
                            
                            <label>Email:</label>
                            <input
                                className="readonly-input"
                                type="email"
                                value={modifyUser.email || ""}
                                readOnly
                            />
                            <label>Full Name:</label>
                            <input
                                className="readonly-input"
                                type="text"
                                value={modifyUser.full_name || ""}
                                readOnly
                                required
                            />
                            <label>Password:</label>
                            <input
                                type="password"
                                value={modifyUser.password || ""}
                                onChange={(e) =>
                                    setModifyUser({ ...modifyUser, password: e.target.value })
                                }
                            />
                            <label>Data Permissions:</label>
                            <input
                                type="checkbox"
                                checked={modifyUser.data_permissions || false}
                                onChange={(e) =>
                                    setModifyUser({
                                        ...modifyUser,
                                        data_permissions: e.target.checked,
                                    })
                                }
                            />
                            <label>User Permissions:</label>
                            <input
                                type="checkbox"
                                checked={modifyUser.user_permissions || false}
                                onChange={(e) =>
                                    setModifyUser({
                                        ...modifyUser,
                                        user_permissions: e.target.checked,
                                    })
                                }
                            />
                            <button className="submit-button" type="submit">
                                {loadingEditUser ? <text>Update User...</text> : <text>Update User</text>}
                            </button>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
