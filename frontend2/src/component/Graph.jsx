import React from 'react';

export default function Graph({ canvasId }) {
    return (
        <div className="graph-section">
            <canvas id={canvasId} width="300" height="300"></canvas>
        </div>
    );
}

Graph.draw = (ctx, rValue) => {
    ctx.clearRect(0, 0, 300, 300);

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
