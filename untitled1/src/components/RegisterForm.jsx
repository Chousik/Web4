import React, { useState } from 'react';
import { registerUser } from '../api/auth';

function RegisterForm({ onSuccess }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            await registerUser(login, password);
            onSuccess();
        } catch (err) {
            console.error(err);
            setErrorMsg('Ошибка регистрации: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3" style={{ maxWidth: '400px' }}>
            <div className="mb-3">
                <label htmlFor="login" className="form-label">Логин</label>
                <input
                    type="text"
                    className="form-control"
                    id="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Пароль</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            <button type="submit" className="btn btn-success me-2">
                Зарегистрироваться
            </button>
        </form>
    );
}

export default RegisterForm;
