

const matrix = document.getElementById('matrix')
let btn = document.querySelector('button');
btn.addEventListener('click', CreateTab);

function CreateTab() {
    matrix.innerHTML='';
    let nnum = document.getElementById('nnum').value;
    for (let y = 0; y < nnum; y++) {
        let rows = document.createElement('tr');
        rows.setAttribute('id', `row[${y}]`);
        matrix.appendChild(rows);
        for (let x = 0; x < nnum; x++) {
            let col = document.createElement('td');
            col.innerText = '';
            col.setAttribute('id', `col[${y}][${x}]`)
            rows.appendChild(col);
        }
    }
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


