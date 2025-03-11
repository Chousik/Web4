import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppPage from './pages/AppPage';
import { logoutUser, checkAuthStatus } from './api/auth';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function verifyAuth() {
            const authenticated = await checkAuthStatus();
            setIsLoggedIn(authenticated==="true");
            setIsLoading(false);
        }
        verifyAuth();
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleRegister = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        logoutUser();
        setIsLoggedIn(false);
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn
                            ? <Navigate to="/app" replace />
                            : <LoginPage onLogin={handleLogin} />
                    }
                />
                <Route
                    path="/register"
                    element={
                        isLoggedIn
                            ? <Navigate to="/app" replace />
                            : <RegisterPage onRegister={handleRegister} />
                    }
                />
                <Route
                    path="/app"
                    element={
                        isLoggedIn
                            ? <AppPage onLogout={handleLogout} />
                            : <Navigate to="/" replace />
                    }
                />
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </Router>
    );
}

export default App;
