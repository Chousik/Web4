import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import InputSection from './InputSectionXYR';
import ResultsTable from './ResultsTable';
import Pagination from './Pagination';
import '../css/MainPage.css';

export default function MainPage() {
    const [xValue, setXValue] = useState(null);
    const [yValue, setYValue] = useState('');
    const [rValue, setRValue] = useState(1);
    const [error, setError] = useState('');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const resultsPerPage = 5;

    useEffect(() => {
        const canvas = document.getElementById('graphCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Graph.draw(ctx, rValue);
    }, [rValue]);

    const validateInputs = () => {
        const yNumber = parseFloat(yValue);
        if (xValue === null) {
            setError('Выберите X.');
            return false;
        }
        if (isNaN(yNumber) || yNumber < -5 || yNumber > 5) {
            setError('Y должно быть числом от -5 до 5.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async () => {
        if (!validateInputs()) return;

        const requestData = {
            x: xValue,
            y: parseFloat(yValue),
            r: rValue,
        };

        setLoading(true);
        setError('');

        try {
                const response = await fetch('http://localhost:8080/api/points/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Ошибка при проверке точки. Проверьте данные и попробуйте снова.');
            }

            const result = await response.json();
            setResults([result, ...results]);
        } catch (err) {
            setError(err.message || 'Произошла ошибка. Попробуйте снова.');
        } finally {
            setLoading(false);
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const currentResults = results.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    );

    return (
        <div className="register-page">
            <div className="main-page">
                <h1>Graph and Results</h1>

                <InputSection
                    xValue={xValue}
                    setXValue={setXValue}
                    yValue={yValue}
                    setYValue={setYValue}
                    rValue={rValue}
                    setRValue={setRValue}
                    error={error}
                />

                <Graph canvasId="graphCanvas" />

                <button className="check-btn" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Checking...' : 'Check'}
                </button>

                {error && <div className="error-message">{error}</div>}

                <ResultsTable results={currentResults} />
                <Pagination
                    totalResults={results.length}
                    resultsPerPage={resultsPerPage}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
        </div>
    );
}
