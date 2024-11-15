import React, { useState, useEffect } from "react";
import './adminDashboard.css';
import Header from '../../components/header';
import AdminFilter from "./components/adminFilter";
import AdminSort from "./components/adminSort"; // Import the Filter component
import { User } from '../../../types/user';


export default function AdminDashboard() {
    const [sortKey, setSortKey] =  useState<keyof User | null>(null);

    // Handle sorting when clicking on the filter buttons
    const handleSort = (key: keyof User) => {
        setSortKey(key);
    };

    return (
        <div className="admin">
            <div className="admin-body">
                <AdminSort onSort={handleSort} /> {/* Add Filter here */}
                <AdminFilter sortKey={sortKey} /> {/* Pass sortKey as prop */}
            </div>
        </div>
    );
}
