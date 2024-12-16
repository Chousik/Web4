class Canvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'absolute';
        this.canvas.height = 360;
        this.canvas.width = 360;
        this.ctx.font = "20px Times New Roman";
        this.ctx.fillStyle = "#F92C85";
    }

    redrawAll(r) {
        this.clearCanvas();
        this.drawFig(r);
        this.drawAxes();
        this.drawPoints();
    }

    drawFig(r) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(180, 180, 12 * r, Math.PI, Math.PI/2, true);
        ctx.lineTo(180, 180);
        ctx.lineTo(180 - 12 * r, 180);
        ctx.moveTo(180, 180);
        ctx.lineTo(180, 180 - 24 * r);
        ctx.lineTo(180 - r * 12, 180);
        ctx.lineTo(180, 180);
        ctx.fill();
        ctx.fillRect(180, 180, r * 24, r * 24);
        ctx.beginPath();
    }

    drawAxes() {
        const ctx = this.ctx;
        this.canvas_arrow(ctx, 30, 180, 330, 180);
        this.canvas_arrow(ctx, 180, 330, 180, 30);

        // Draw ticks on the axes
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

        // Draw labels on the axes
        ctx.strokeText("-5", 52, 175);
        ctx.strokeText("-1", 144, 175);
        ctx.strokeText("5", 295, 175);
        ctx.strokeText("1", 199, 175);
        ctx.strokeText("5", 185, 65);
        ctx.strokeText("1", 185, 161);
        ctx.strokeText("-1", 185, 208);
        ctx.strokeText("-5", 185, 304);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, 360, 360);
    }

    canvas_arrow(context, fromX, fromY, tox, toy) {
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

    drawPoint(x, y, isIn) {
        y = -y;
        const ctx = this.ctx;
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
    drawPoints() {
        const arrData = [];
        $("#result_table tr").each(function(index) {
            if (index === 0) return;

            let currentRow = $(this);
            arrData.push({
                "x": parseFloat(currentRow.find("td:eq(0)").text()),
                "y": parseFloat(currentRow.find("td:eq(1)").text()),
                "status": currentRow.find("td:eq(3)").text() === "true",
            });
        });

        arrData.forEach(dot => {
            this.drawPoint(dot.x, dot.y, dot.status);
        });
    }
}
