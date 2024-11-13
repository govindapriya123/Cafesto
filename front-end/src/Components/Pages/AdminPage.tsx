// src/pages/AdminPage.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import UserManagement from '../AdminDashboard/UserManagment';
import OrderManagement from '../AdminDashboard/OrderManagment';
import ProductManagement from '../AdminDashboard/ProductManagment';
import Analytics from '../AdminDashboard/Analytics';
const AdminPage: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="analytics" element={<Analytics />} />
        </Routes>
    );
};

export default AdminPage;
