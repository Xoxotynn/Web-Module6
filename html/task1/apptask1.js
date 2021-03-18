const cellSize = 50;
const PADDING = 5;
const wallColor = 'black';
const freeColor = 'white';
const backgroundColor = 'gray';
const tractor = { x: 0, y: 0 };
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let btn = document.querySelector('button');
btn.addEventListener('click', foo);

function foo() {
    let nmum = document.getElementById('nnum');
    const Matrix = CreateMatrix(nnum.value);
    Matrix[0][0] = true;
    console.log(Matrix);
    DrawMaze(nnum.value, Matrix);
}
function GetRandom() {
    var y = Math.random();
    if (y < 0.3)
        y = 0;
    else
        y = 1;
    return y;
}

function CreateMatrix(n) {
    const matrix = [];
    for (let y = 0; y < n; y++) {
        const row = [];
        for (let x = 0; x < n; x++) {
            if (GetRandom() == 1) {
                row.push(true);
            }
            else {
                row.push(false);
            }
        }
        matrix.push(row);
    }
    return matrix;
}


function DrawMaze(n, matrix) {
    canvas.width = PADDING * 2 + n * cellSize;
    canvas.height = PADDING * 2 + n * cellSize;
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = backgroundColor;
    context.fill();

    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            const color = matrix[y][x] ? freeColor : wallColor;
            context.beginPath();
            context.rect(PADDING + x * cellSize, PADDING + y * cellSize, cellSize, cellSize);
            context.fillStyle = color;
            context.fill();
        }
    }
}


