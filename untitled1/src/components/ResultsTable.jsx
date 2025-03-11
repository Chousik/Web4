import React from 'react';

function ResultsTable({ points }) {
    if (!points) return null;

    return (
        <div className="table-responsive mt-4">
            <table className="table table-hover table-bordered">
                <thead className="table-primary">
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Попадание?</th>
                </tr>
                </thead>
                <tbody>
                {points.map((p, idx) => (
                    <tr key={idx}>
                        <td>{p.x}</td>
                        <td>{p.y}</td>
                        <td>{p.r}</td>
                        <td className={p.isHit ? 'text-success' : 'text-danger'}>
                            {p.isHit ? 'Пробил' : 'Нет пробитие'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ResultsTable;
