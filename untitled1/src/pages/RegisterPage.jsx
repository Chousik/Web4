import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';

function RegisterPage({ onRegister }) {
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
                <h2 className="mb-4">Регистрация</h2>
                <RegisterForm onSuccess={onRegister} />

                <p className="mt-3">
                    Уже есть аккаунт? <Link to="/">Войти</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
