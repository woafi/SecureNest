import React from 'react'
import { Routes, Route } from "react-router-dom";

import Landing from '../pages/Landing';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default AppRoutes;
