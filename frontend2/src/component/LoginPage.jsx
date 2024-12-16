import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import '../css/AuthPages.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <div className="register-page">
            <div className="form-container">
                <header className="mb-4">
                    <h1>Welcome to LabWeb4</h1>
                    <p>Silaev Zahar P3210 409555 V-44443</p>
                </header>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="custom-btn" type="submit">
                        Login
                    </button>
                    <button
                        className="custom-outline-btn"
                        type="button"
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
