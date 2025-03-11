import React, { useRef, useEffect } from 'react';

function CanvasArea({ x, y, r, points, onCanvasClick, width = 360, height = 360 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        drawArea(ctx, points, r, width, height);
    }, [x, y, r, points, drawArea]);
    const handleClick = (event) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const xValue = ((x - rect.width / 2) / 24).toFixed(1);
        const yValue = (-(y - rect.height / 2) / 24).toFixed(1);
        onCanvasClick(xValue*1, yValue*1);
    };

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ border: '1px solid #ccc', cursor: 'pointer' }}
            onClick={handleClick}
        />
    );
}
function drawPoint(ctx, x, y, isIn) {
    y = -y;
    const radius = 4;
    const gradient = ctx.createRadialGradient(180 + x * 24 - 3, 180 + 24 * y - 3, 1, 180 + x * 24, 180 + 24 * y, radius);

    if (isIn) {
        gradient.addColorStop(0, "#00FF00");
        gradient.addColorStop(1, "#006400");
    } else {
        gradient.addColorStop(0, "#FF0000");
        gradient.addColorStop(1, "#8B0000");
    }

    ctx.beginPath();
    ctx.arc(180 + x * 24, 180 + 24 * y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "#F92C85";
}
function clearCanvas(ctx) {
    ctx.clearRect(0, 0, 360, 360);
}
function drawAxes(ctx) {
    canvas_arrow(ctx, 30, 180, 330, 180);
    canvas_arrow(ctx, 180, 330, 180, 30);

    ctx.moveTo(60, 177);
    ctx.lineTo(60, 183);
    ctx.moveTo(156, 177);
    ctx.lineTo(156, 183);
    ctx.moveTo(204, 177);
    ctx.lineTo(204, 183);
    ctx.moveTo(300, 177);
    ctx.lineTo(300, 183);
    ctx.moveTo(177, 60);
    ctx.lineTo(183, 60);
    ctx.moveTo(177, 156);
    ctx.lineTo(183, 156);
    ctx.moveTo(177, 204);
    ctx.lineTo(183, 204);
    ctx.moveTo(177, 300);
    ctx.lineTo(183, 300);
    ctx.stroke();

    ctx.strokeText("-5", 52, 175);
    ctx.strokeText("-1", 144, 175);
    ctx.strokeText("5", 295, 175);
    ctx.strokeText("1", 199, 175);
    ctx.strokeText("5", 185, 65);
    ctx.strokeText("1", 185, 161);
    ctx.strokeText("-1", 185, 208);
    ctx.strokeText("-5", 185, 304);
}
function canvas_arrow(context, fromX, fromY, tox, toy) {
    const len = 10;
    const dx = tox - fromX;
    const dy = toy - fromY;
    const angle = Math.atan2(dy, dx);
    context.moveTo(fromX, fromY);
    context.lineTo(tox, toy);
    context.lineTo(tox - len * Math.cos(angle - Math.PI / 6), toy - len * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - len * Math.cos(angle + Math.PI / 6), toy - len * Math.sin(angle + Math.PI / 6));
    context.stroke();
}
function drawFig(ctx, r) {
    ctx.fillStyle = "#F92C85";
    ctx.beginPath();
    ctx.arc(180, 180, 24 * r, Math.PI, Math.PI/2, true);
    ctx.lineTo(180, 180);
    ctx.lineTo(180 - 12 * r, 180);
    ctx.moveTo(180, 180);
    ctx.lineTo(180, 180 - 24 * r);
    ctx.lineTo(180 - r * 24, 180);
    ctx.lineTo(180, 180);
    ctx.fill();
    ctx.fillRect(180, 180, r * 12, r * 24);
    ctx.beginPath();
}
const drawArea = (ctx, points, r, width, height) => {
    ctx.clearRect(0, 0, width, height);
    clearCanvas(ctx)
    drawFig(ctx, r)
    drawAxes(ctx)

    if (points) {
        points.forEach((pt) => {
            drawPoint(ctx, pt.x, pt.y, pt.isHit)
        });
    }
};
export default CanvasArea;
