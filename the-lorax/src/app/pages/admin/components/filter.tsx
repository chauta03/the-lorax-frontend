import React, { useState } from 'react';
import "../adminDashboard.css";
import ArrowDown from '../../../../images/icons/arrow-down.svg';
import { User } from "../../../../types/user";

type FilterProps = {
    onSort: (key: keyof User) => void; 
};

export default function Filter({ onSort }: FilterProps) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        full_name: '',
        password: '',
        data_permissions: false,
        user_permissions: false
    });

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        
        if (!token) {
            alert("You are not logged in!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/users/new", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                alert("User added successfully!");
                closeModal();
            } else {
                alert("Failed to add user. Username might already exist.");
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    return (
        <div>
            {/* Add User Button */}
            <button onClick={openModal} className="add-user-button">Add User</button>

            {/* Modal for Adding New User */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>×</button>
                        <h2>Add New User</h2>
                        <form className="model-form" onSubmit={handleAddUser}>
                            <label>
                                Username:
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={newUser.username} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </label>
                            <label>
                                Email:
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={newUser.email} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </label>
                            <label>
                                Full Name:
                                <input 
                                    type="text" 
                                    name="full_name" 
                                    value={newUser.full_name} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </label>
                            <label>
                                Password:
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={newUser.password} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </label>
                            <label>
                                Data Permissions:
                                <input 
                                    type="checkbox" 
                                    name="data_permissions" 
                                    checked={newUser.data_permissions} 
                                    onChange={handleChange} 
                                />
                            </label>
                            <label>
                                User Permissions:
                                <input 
                                    type="checkbox" 
                                    name="user_permissions" 
                                    checked={newUser.user_permissions} 
                                    onChange={handleChange} 
                                />
                            </label>
                            <button className="add-user-button" type="submit">Add User</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Sort Options */}
            <div className="admin">
                <span className="admin-text">Sort</span>
                <div className="admin-category">
                    <div className="admin-category-field" onClick={() => onSort('username')}>
                        <span>Username</span>
                        <img src={ArrowDown} alt="Sort" />
                    </div>
                    <div className="admin-category-field" onClick={() => onSort('email')}>
                        <span>Email</span>
                        <img src={ArrowDown} alt="Sort" />
                    </div>
                    <div className="admin-category-field" onClick={() => onSort('full_name')}>
                        <span>Full Name</span>
                        <img src={ArrowDown} alt="Sort" />
                    </div>
                    <div className="admin-category-field" onClick={() => onSort('data_permissions')}>
                        <span>Data Permission</span>
                        <img src={ArrowDown} alt="Sort" />
                    </div>
                    <div className="admin-category-field" onClick={() => onSort('user_permissions')}>
                        <span>User Permission</span>
                        <img src={ArrowDown} alt="Sort" />
                    </div>
                </div>
            </div>
        </div>
    );
};
