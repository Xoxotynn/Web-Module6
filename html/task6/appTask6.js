const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
const cellSize = 120;

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = '#b0bec5';
    context.lineJoin = 'miter';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}
function drawCell(x, y) {
    context.beginPath();
    context.fillStyle = '#b0bec5';
    context.strokeStyle = '#b0bec5';
    context.lineJoin = 'miter';
    context.lineWidth = 1;
    context.rect(x, y, cellSize, cellSize);
    context.fill();
}
function clearAll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    nullMatrix();
    divRes.innerHTML = '';
}
function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
    for (let x = cellSize; x < canvas.width; x += cellSize) {
        drawLine(x, 0, x, canvas.height);
    }
    for (let y = cellSize; y < canvas.height; y += cellSize) {
        drawLine(0, y, canvas.width, y);
    }
}
drawGrid();
let matrix = [];
for (let i = 0; i < 5; i++) {
    let str = [];
    for (let j = 0; j < 5; j++) {
        str.push(0);
    }
    matrix.push(str);
}
function nullMatrix() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
           matrix[i][j] = 0;
        }
    }
}

function clearR() {
    clear();
    drawGrid();
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] == 1) {
                drawCell(j * cellSize, i * cellSize);
            }
        }
    }
}
canvas.addEventListener('click',
    function calculate(e) {
        const rect = e.target.getBoundingClientRect();
        let xC = e.clientX - rect.left;
        let yC = e.clientY - rect.top;
        let coefX = Math.floor(xC / cellSize);
        let coefY = Math.floor(yC / cellSize);
        if (matrix[coefY][coefX] == 0) {
            matrix[coefY][coefX] = 1;
            drawCell(coefX * cellSize, coefY * cellSize);
        }
        else {
            matrix[coefY][coefX] = 0;
            clearR();
        }
    }
);
function GetRandom(min, max) {
    return Math.random() * (max - min) + min;
}
function GetIntRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
