import React from 'react'
import { Routes, Route } from "react-router-dom";

import Landing from '../pages/Landing';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Dashboard from '../pages/Dashboard';
import ViewPassword from '../pages/ViewPassword';
import AddPassword from '../pages/AddPassword';
import Settings from '../pages/Settings';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Public Route */}
            <Route element={<PublicRoute />}>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-password" element={<AddPassword />} />
                <Route path="/password/:id" element={<ViewPassword />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
