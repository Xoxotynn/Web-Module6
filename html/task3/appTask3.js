const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
const canvas1 = document.getElementById("start");
const context1 = canvas1.getContext("2d");
canvas1.width = 800;
canvas1.height = 600;


class Point {
    constructor(x, y, color, index) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 7;
        this.index = index;
    }
}
const mouse = createMouse(canvas1);
let colors = ["#C8F4DE",
"#A4E5D9",
"#66C6BA",
"#D3D4D8",
"#FFFFC2",
"#FFA5A5",
"#EBD5D5",
"#FBAC91",
"#EAB4F8",
"#A1DE93"];

var StartPoint = 0;
let ind = 0;
function addUserPoint() {
    if (flag == 1) {
        StartPoint = new Point(mouse.x, mouse.y, "#7FAF5C", -1);
        drawStartPoint(StartPoint);
    }
    else {
        let p = new Point(mouse.x, mouse.y, "#62B5BB", ind);
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
function randomColor() {

    return colors[randomInt(0, colors.length)];
}

function randomInt(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max));
}

function DrawBestWay(w) {
    context1.beginPath();
    context1.moveTo(StartPoint.x, StartPoint.y);
    context1.lineTo(w[0].x, w[0].y);
    let colorLine = randomColor();
    context1.strokeStyle = colorLine;
    context1.lineWidth = 2;
    context1.stroke();
    for (let i = 1; i < points.length; i++) {
        context1.beginPath();
        context1.moveTo(w[i - 1].x, w[i - 1].y)
        context1.lineTo(w[i].x, w[i].y);
        context1.strokeStyle = colorLine;
        context1.stroke();
    }
    context1.beginPath();
    context1.moveTo(StartPoint.x, StartPoint.y);
    context1.lineTo(w[points.length - 1].x, w[points.length - 1].y);
    context1.strokeStyle = colorLine;
    context1.stroke();
}
function DrawEndWay(w) {
    context1.beginPath();
    context1.moveTo(StartPoint.x, StartPoint.y);
    context1.lineTo(w[0].x, w[0].y);
    let colorLine = "#62B5BB";
    context1.strokeStyle = colorLine;
    context1.lineWidth = 4;
    context1.stroke();
    for (let i = 1; i < points.length; i++) {
        context1.beginPath();
        context1.moveTo(w[i - 1].x, w[i - 1].y)
        context1.lineTo(w[i].x, w[i].y);
        context1.strokeStyle = colorLine;
        context1.stroke();
    }
    context1.beginPath();
    context1.moveTo(StartPoint.x, StartPoint.y);
    context1.lineTo(w[points.length - 1].x, w[points.length - 1].y);
    context1.strokeStyle = colorLine;
    context1.stroke();
}


function createMouse(element) {
    let drawer;
    const mouse = {
        x: 0,
        y: 0,
    };

    element.addEventListener("mousemove", mousemoveHandler);
    element.addEventListener("mousedown", mouseDownHandler);
    element.addEventListener("mouseup", mouseClearHandler);
    element.addEventListener("mouseout", mouseClearHandler);

    function mousemoveHandler(event) {
        const rect = element.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    }
    function mouseDownHandler(event) {
        drawer = setInterval(addUserPoint, 100);
    }
    function mouseClearHandler(event) {
        clearInterval(drawer);
    }

    return mouse;
}