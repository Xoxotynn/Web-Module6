const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.addEventListener("click", addUserPoint);
canvas.width = 800;
canvas.height = 600;










class Point {
    constructor(x, y, color, index) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 13;
        this.index = index;
    }
}

const mouse = createMouse(canvas);
let points = [];
let ind = 0;
function addUserPoint() {
    
    let p = new Point(mouse.x, mouse.y, "#62B5BB", ind);
    points.push(p);
    ind++;
    drawPoint(p);
}

function drawPoint(p) {
    context.beginPath();
    context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    context.fillStyle = p.color;
    context.fillText("123213",p.x,p.y);
    context.fill();
}



function createMouse(element) {
    let drawer;
    const mouse = {
        x: 0,
        y: 0,
    };

    element.addEventListener("mousemove", mousemoveHandler);
    element.addEventListener("mousedown", mouseDownHandler);
    element.addEventListener("mouseup", mouseUpHandler);

    function mousemoveHandler(event) {
        const rect = element.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    }
    function mouseDownHandler(event) {
        drawer = setInterval(addUserPoint, 200);
    }
    function mouseUpHandler(event) {
        clearInterval(drawer);
    }

    return mouse;
}






let AstMatr = [];
var tops;
let btn = document.querySelector(".zapusk");
btn.addEventListener('click', createMatrix);

// Переменная отвечающая за получение кол-ва вершин графа.

// Матрица для того чтобы выполнять алгоритм.


class Info {
	clear()
	{
		this.pheromons = 0;
		this.distance = 0;
	}
	constructor(pheromons, distance,vlech) {
		this.pheromons = pheromons;
		this.distance = distance;
        this.vlech = vlech;
	}
}


function createMatrix() {
	tops = points.length;
	AstMatr = [];
	for (let i = 0; i < tops; i++) {
		AstMatr[i] = [];
		for (let j = 0; j < tops; j++) {
			AstMatr[i][j] = new Info(0.400, 0,0);
            AstMatr[i][j].distance = distance(points[i], points[j]);
            AstMatr[i][j].vlech = 1 / AstMatr[i][j].distance;
        }
	}
    ant();
    
    
}


function distance(p1,p2)
{
   return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

