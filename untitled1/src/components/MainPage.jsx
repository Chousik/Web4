import React, { useState } from 'react';
import CanvasArea from './CanvasArea';
import ResultsTable from './ResultsTable';
import { usePoints, sendPoint } from '../api/points';

function MainPage({ onLogout }) {
    const [x, setX] = useState('0');
    const [y, setY] = useState('');
    const [r, setR] = useState('1');
    const [errorMsg, setErrorMsg] = useState('');

    const { points, isLoading, isError, mutate } = usePoints();

    const handleCheckClick = async () => {
        const parsedX = parseFloat(x);
        const parsedY = parseFloat(y);
        const parsedR = parseFloat(r);

        if (isNaN(parsedX) || isNaN(parsedY) || isNaN(parsedR)) {
            setErrorMsg('Ошибка: некорректные значения X, Y или R.');
            return;
        }
        if (parsedR < 0) {
            setErrorMsg('Ошибка: R должно быть положительным.');
            return;
        }

        try {
            await sendPoint({ x: parsedX, y: parsedY, r: parsedR });
            mutate();
            setErrorMsg("")
        } catch (err) {
            setErrorMsg('Ошибка при отправке точки: ' + err.message);
        }
    };

    const handleCanvasClick = async (canvasX, canvasY) => {
        const parsedR = parseFloat(r);
        if (parsedR < 0) {
            setErrorMsg('Сначала введите корректное R!');
            return;
        }
        try {
            await sendPoint({ x: canvasX, y: canvasY, r: parsedR });
            mutate();
        } catch (err) {
            setErrorMsg('Ошибка при отправке точки: ' + err.message);
        }
    };

    return (
        <div className="container-fluid">
            <div className="content-wrapper">
                <div className="input-canvas-wrapper">
                    <div className="input-section">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <i className="fas fa-edit me-2"></i>Введите данные
                                </h5>
                                <div className="mb-4">
                                    <label className="form-label">Выберите X:</label>
                                    <div className="btn-group mb-3 d-flex flex-wrap">
                                        {[-3,-2,-1,0,1,2,3,4,5].map((val) => (
                                            <button
                                                key={val}
                                                className={`btn btn-outline-primary m-1 ${x === val.toString() ? 'active' : ''}`}
                                                onClick={() => setX(val.toString())}
                                            >
                                                {val}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Введите Y (-5 ... 5):</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={y}
                                        min={-5}
                                        max={5}
                                        onChange={(e) => setY(e.target.value)}
                                        placeholder="Введите значение Y"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Выберите R:</label>
                                    <div className="btn-group mb-3 d-flex flex-wrap">
                                        {[0,1,2,3,4,5].map((val) => (
                                            <button
                                                key={val}
                                                className={`btn btn-outline-success m-1 ${r === val.toString() ? 'active' : ''}`}
                                                onClick={() => setR(val.toString())}
                                            >
                                                {val}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                                <div className="d-flex justify-content-between">
                                    <button onClick={handleCheckClick} className="btn btn-primary">
                                        <i className="fas fa-check me-2"></i>Проверить
                                    </button>
                                    <button onClick={onLogout} className="btn btn-secondary">
                                        <i className="fas fa-sign-out-alt me-2"></i>Выйти
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="canvas-section">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <i className="fas fa-chart-area me-2"></i>График
                                </h5>
                                <CanvasArea
                                    x={parseFloat(x)}
                                    y={parseFloat(y)}
                                    r={parseFloat(r)}
                                    points={points}
                                    onCanvasClick={handleCanvasClick}
                                    width={360}
                                    height={360}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="results-section">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-table me-2"></i>Результаты
                            </h5>
                            {isLoading && <p>Загрузка...</p>}
                            {isError && <p className="alert alert-danger"><i className="fas fa-exclamation-triangle me-2"></i>Ошибка загрузки данных</p>}
                            {!isLoading && !isError && <ResultsTable points={points} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default MainPage;
