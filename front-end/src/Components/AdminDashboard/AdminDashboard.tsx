// src/components/AdminDashboard/AdminDashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/admin/users">User Management</Link></li>
                    <li><Link to="/admin/orders">Order Management</Link></li>
                    <li><Link to="/admin/products">Product Management</Link></li>
                    <li><Link to="/admin/analytics">Analytics</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminDashboard;
