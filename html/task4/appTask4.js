const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.addEventListener("click", addUserPoint);
canvas.width = 800;
canvas.height = 600;


// Массив точек.
let points = [];

// Индекс(испольуем чтобы присвоить индекс при добавлении точки на канвасе)
let ind = 0;

// Переменная матрицы
let AstMatr;

// Кол-во наших вершин
let tops;

// Переменная чтобы хранить кол-во нажатий на кнопку "Найти путь"
let pushbuttons;

// Переменная + функция для обновления канваса и переменных по нажатию кнопки "Удалить узлы"
let clearbut = document.querySelector(".clear")
clearbut.addEventListener("click", function clear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    best = [];
    AstMatr = [];
    A = 1;
    B = 3;
    min = 99999999;
    antsAmount = 0;
    points = [];
    ants;
    ind = 0;
    pushbuttons = 0;
});


// Информация об следущих добавленных точках
class Point {
    constructor(x, y, color, index) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 7;
        this.index = index;
    }
}

// Добавление в массив точек поставленных на канвасе
const mouse = createMouse(canvas);
function addUserPoint() {
    let p = new Point(mouse.x, mouse.y, "#62B5BB", ind);
    points.push(p);
    ind++;
    drawPoint(p);
}


// Рисование поставленных точек на канвасе
function drawPoint(p) {
    context.beginPath();
    context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    context.fillStyle = p.color;
    context.fill();
}


// Функция считывающая где находится указатель.
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
        drawer = setInterval(addUserPoint, 200);
    }
    function mouseClearHandler(event) {
        clearInterval(drawer);
    }

    return mouse;
}


// Кнопка запуск и выполнение алгоритма
let btn = document.querySelector(".zapusk");
btn.addEventListener('click', createMatrix);

// Класс информации для матрицы
class Info {
	constructor(pheromons, distance,vlech) {
		this.pheromons = pheromons;
		this.distance = distance;
        this.vlech = vlech;
	}
}


// Создание матрицы которая используется во всём алгоритме
function createMatrix() {
    if (pushbuttons !=0 && points.length != tops)
    {
        updateCanvas();
    }
    pushbuttons += 1;
	tops = points.length;
	AstMatr = [];
	for (let i = 0; i < tops; i++) {
		AstMatr[i] = [];
		for (let j = 0; j < tops; j++) {
			AstMatr[i][j] = new Info(0.100, 0,0);
            AstMatr[i][j].distance = distance(points[i], points[j]);
            AstMatr[i][j].vlech = 101 / AstMatr[i][j].distance;
        }
	}
    ant();
}

// Обновление канваса и переменных если мы добавили новые точки на канвас после уже найденного пути.
function updateCanvas()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    best = [];
    AstMatr = [];
    A = 1;
    B = 3;
    min = 99999999;
    antsAmount = 0;
    ants;
    
    for (let i = 0; i<points.length; i++)
    {
        context.beginPath();
        context.arc(points[i].x, points[i].y, points[i].radius, 0, Math.PI * 2);
        context.fillStyle = "#62B5BB";
        context.fill();
    }
}


// Функция вычисления дистанции между точками.
function distance(p1,p2)
{
   return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}