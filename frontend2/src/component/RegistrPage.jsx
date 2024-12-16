import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import '../css/AuthPages.css';

export default function RegisterFormPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !password || !confirmPassword) {
            setError("Все поля обязательны для заполнения.");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Пароли не совпадают.");
            return false;
        }
        if (password.length < 6) {
            setError("Пароль должен быть не менее 6 символов.");
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка регистрации. Проверьте данные и попробуйте снова.');
            }

            const data = await response.json();
            console.log('Server response:', data);

            // Сохраняем токен (если сервер его отправляет)
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            navigate('/main');
        } catch (err) {
            setError(err.message || "Ошибка регистрации. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="form-container">
                <header className="mb-4">
                    <h1>Register for LabWeb4</h1>
                    <p>Silaev Zahar P3210 409555 V-44443</p>
                </header>
                <h2>Register</h2>

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
                    <InputField
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button className="custom-btn" type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                    <button
                        className="custom-outline-btn"
                        type="button"
                        onClick={() => navigate('/login')}
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
}
