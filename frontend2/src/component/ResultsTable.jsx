import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

export default function ResultsTable() {
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // const fetchData = async () => {
        //     setLoading(true);
        //     setError('');
        //     try {
        //         const response = await fetch('http://localhost:8080/api/points', {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //         });
        //
        //         if(!response.ok) {
        //             throw new Error("Ошибка");
        //         }
        //
        //         const data = await response.json();
        //         setResults(data);
        //     } catch (err) {
        //         setError(err.message || 'An error occurred while fetching data');
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        //
        // fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <table className="results-table">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Result</th>
                <th>Time</th>
                <th>Execution Time (ms)</th>
            </tr>
            </thead>
            <tbody>
            {results.map((res, index) => (
                <tr key={index}>
                    <td>{res.x}</td>
                    <td>{res.y}</td>
                    <td>{res.r}</td>
                    <td>{res.isHit ? 'Hit' : 'Miss'}</td>
                    <td>{res.time}</td>
                    <td>{res.executionTime}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
