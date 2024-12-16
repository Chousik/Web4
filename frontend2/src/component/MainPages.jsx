import React, { useState, useEffect } from 'react';
import '../css/MainPage.css';

export default function MainPage() {
    const [xValue, setXValue] = useState(null);
    const [yValue, setYValue] = useState('');
    const [rValue, setRValue] = useState(1);
    const [error, setError] = useState('');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 5;

    useEffect(() => {
        drawGraph();
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

    const handleSubmit = () => {
        if (!validateInputs()) return;

        const newResult = {
            x: xValue,
            y: yValue,
            r: rValue,
            result: Math.random() > 0.5 ? 'Попадание' : 'Промах',
        };
        setResults([newResult, ...results]);
    };

    const drawGraph = () => {
        const canvas = document.getElementById('graphCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(150, 0);
        ctx.lineTo(150, 300);
        ctx.moveTo(0, 150);
        ctx.lineTo(300, 150);
        ctx.strokeStyle = '#000';
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.arc(150, 150, rValue * 20, Math.PI, 1.5 * Math.PI);
        ctx.fill();
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

                <div className="input-section">
                    <div className="input-box">
                        <h3>X</h3>
                        {[...Array(5)].map((_, i) => (
                            <label key={i}>
                                <input
                                    type="checkbox"
                                    checked={xValue == i + 1}
                                    onChange={() => setXValue(i + 1)}
                                />{' '}
                                {i + 1}
                            </label>
                        ))}
                    </div>
                    <div className="input-box">
                        <h3>Input Y</h3>
                        <input
                            type="number"
                            placeholder="Enter Y (-5 to 5)"
                            value={yValue}
                            onChange={(e) => setYValue(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <h3>R</h3>
                        {[...Array(5)].map((_, i) => (
                            <label key={i}>
                                <input
                                    type="checkbox"
                                    checked={rValue === i + 1}
                                    onChange={() => setRValue(i + 1)}
                                />{' '}
                                {i + 1}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="graph-section">
                    <canvas id="graphCanvas" width="300" height="300"></canvas>
                </div>

                <button className="check-btn" onClick={handleSubmit}>
                    Check
                </button>

                {error && <div className="error-message">{error}</div>}

                <table className="results-table">
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentResults.map((res, index) => (
                        <tr key={index}>
                            <td>{res.x}</td>
                            <td>{res.y}</td>
                            <td>{res.r}</td>
                            <td>{res.result}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {Array.from(
                        { length: Math.ceil(results.length / resultsPerPage) },
                        (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={currentPage === i + 1 ? 'active' : ''}
                            >
                                {i + 1}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
