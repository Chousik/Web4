import React from 'react';
import Header from '../components/Header';
import MainPage from '../components/MainPage';

function AppPage({ onLogout }) {
    return (
        <div>
            <Header
                fullName="Силаев Захар Алексеевич"
                groupNumber="P3210"
                variantNumber="777"
            />
            <MainPage onLogout={onLogout} />
        </div>
    );
}

export default AppPage;
