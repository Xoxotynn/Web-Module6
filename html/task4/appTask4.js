// Информация об следущих добавленных точках
class Point {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 7;
    }
}

// Класс информации для матрицы
class Info {
	constructor(pheromons, distance,vlech) {
		this.pheromons = pheromons;
		this.distance = distance;
        this.vlech = vlech;
	}
}


const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const mouse = createMouse(canvas);
canvas.addEventListener("click", addUserPoint);
canvas.width = 800;
canvas.height = 600;


// Массив точек.
let points = [];

// Переменная матрицы
let AstMatr;

// Кол-во наших вершин
let pointsCount;

// Переменная + функция для обновления канваса и переменных по нажатию кнопки "Удалить узлы"
let clearbut = document.querySelector(".clear")
clearbut.addEventListener("click", clearPoints);

// Кнопка запуск и выполнение алгоритма
let btn = document.querySelector(".zapusk");
btn.addEventListener('click', createMatrix);

// Создание матрицы которая используется во всём алгоритме
function createMatrix() {
    updatePoints();
	pointsCount = points.length;
	AstMatr = [];
	for (let i = 0; i < pointsCount; i++) {
		AstMatr[i] = [];
		for (let j = 0; j < pointsCount; j++) {
			AstMatr[i][j] = new Info(0.100, 0,0);
            AstMatr[i][j].distance = distance(points[i], points[j]);
            AstMatr[i][j].vlech = 101 / AstMatr[i][j].distance;
        }
	}
    ant();
}

function clearPoints() {
    clearAlgorithmData()
    points = [];
}

// Обновление канваса и переменных если мы добавили новые точки на канвас после уже найденного пути.
function updatePoints() {
    clearAlgorithmData();
    points.forEach(point => drawPoint(point));
}

function clearAlgorithmData() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    best = [];
    AstMatr = [];
    min = Number.MAX_VALUE;
    antsAmount = 0;
}

function estLI(target)
{
    for (let i = 0; i<points.length;i++)
    {
        if (points[i].x == target.x && points[i].y == target.y)
        {
            return 1;
        }
    }
    return 0;
}


function distance(p1,p2)
{
   return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
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
        drawer = setInterval(addUserPoint, 150);
    }
    function mouseClearHandler(event) {
        clearInterval(drawer);
    }

    return mouse;
}

// Добавление в массив точек поставленных на канвасе
function addUserPoint() {
    let p = new Point(mouse.x, mouse.y, "#62B5BB");
    if (estLI(p) == 0)
    {
        points.push(p);
        drawPoint(p);
    }
}

// Рисование поставленных точек на канвасе
function drawPoint(p) {
    context.beginPath();
    context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    context.fillStyle = p.color;
    context.fill();
}