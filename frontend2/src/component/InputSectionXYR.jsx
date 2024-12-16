import React from 'react';

export default function InputSection({
                                         xValue,
                                         setXValue,
                                         yValue,
                                         setYValue,
                                         rValue,
                                         setRValue,
                                         error,
                                     }) {
    return (
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
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
