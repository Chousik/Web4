import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

function LoginPage({ onLogin }) {
    return (
        <div>
            <Header
                fullName="Силаев Захар Алексеевич"
                groupNumber="P3210"
                variantNumber="777"
            />

            <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ minHeight: '80vh' }}
            >
                <h2 className="mb-4">Вход в систему</h2>
                <LoginForm onSuccess={onLogin} />

                <p className="mt-3">
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
