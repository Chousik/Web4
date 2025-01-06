import React from 'react';

export default function ResultsTable({ results }) {
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
