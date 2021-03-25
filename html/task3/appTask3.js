
class Point {
    constructor(x, y, color, index) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 7;
        this.index = index;
    }
}
const mouse = {
    x: 0,
    y: 0,
};
var StartPoint;
let ind = 0;
function addUserPoint(e) {
    const rect = e.target.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    if (flag == 1) {
        StartPoint = new Point(mouse.x, mouse.y, "green", -1);
        drawStartPoint(StartPoint);
    }
    else {
        let p = new Point(mouse.x, mouse.y, "blue", ind);
        points.push(p);
        ind++;
        drawPoint(p);
    }
}

function drawPoint(p) {
    context.beginPath();
    context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    context.fillStyle = p.color;
    context.fill();
}
function drawStartPoint(p) {
    context1.clearRect(0, 0, canvas.width, canvas.height);
    context1.beginPath();
    context1.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    context1.fillStyle = p.color;
    context1.fill();
}

function DrawBestWay(w) {
    context1.beginPath();
    context1.moveTo(StartPoint.x, StartPoint.y);
    context1.lineTo(w[0].x, w[0].y);
    context1.strokeStyle = "green";
    context1.stroke();
    for (let i = 1; i < w.length; i++) {
        context1.beginPath();
        context1.moveTo(w[i - 1].x, w[i - 1].y)
        context1.lineTo(w[i].x, w[i].y);
        context1.strokeStyle = "green";
        context1.stroke();
    }
    context1.beginPath();
    context1.moveTo(StartPoint.x, StartPoint.y);
    context1.lineTo(w[w.length - 1].x, w[w.length - 1].y);
    context1.strokeStyle = "green";
    context1.stroke();
    //await delay(1000);
}