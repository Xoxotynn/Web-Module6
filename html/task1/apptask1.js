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

    move(nnum.value, Matrix);
    DrawMaze(nnum.value, Matrix);
    
}

function CreateMatrix(n) {
    const matrix = [];
    for (let y = 0; y < n; y++) {
        const row = [];
        for (let x = 0; x < n; x++) {
            row.push(false);
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

function move(n, Matrix) {
    const directionsX = [];
    const directionsY = [];
    if (tractor.x > 1) {
        directionsX.push(-2);
        directionsY.push(0);
    }
    if (tractor.x < n - 1) {
        directionsX.push(2);
        directionsY.push(0);
    }
    if (tractor.y > 1) {
        directionsY.push(-2);
        directionsX.push(0);;
    }
    if (tractor.y < n - 1) {
        directionsY.push(2);
        directionsX.push(0);
    }
    let i =GetRandomI(directionsX);
    let dx = directionsX[i];
    let dy = directionsY[i];
    tractor.x += dx;
    tractor.y += dy;

    if (Matrix[tractor.y][tractor.x])
    {
        Matrix[tractor.y][tractor.x] = true;
        Matrix[tractor.y - dy/2][tractor.x - dx/2] = true;
    }
}
function GetRandomI(arr) {
    const index = Math.floor(Math.random() * arr.lenght);
    return index;
}
