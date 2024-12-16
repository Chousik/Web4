import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import '../css/AuthPages.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setLoading(true);

        try {
            const response = await fetch('api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.status === 401) {
                throw new Error('Неверный логин или пароль.');
            } else if (!response.ok) {
                throw new Error('Ошибка входа. Проверьте данные и попробуйте снова.');
            }
            navigate('/points');
        } catch (err) {
            setError(err.message || 'Ошибка входа. Попробуйте снова.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="form-container">
                <header className="mb-4">
                    <h1>Welcome to LabWeb4</h1>
                    <p>Silaev Zahar P3210 409555</p>
                </header>
                <h2>Login</h2>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

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
                    <button className="custom-btn" type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
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
