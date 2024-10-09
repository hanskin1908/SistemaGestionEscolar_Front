import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import AdminDashboard from './Pages/AdminDashboard';

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage setToken={setToken} />} />
                <Route
                    path="/dashboard"
                    element={token ? <AdminDashboard /> : <Navigate to="/login" replace />}
                />
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;