class Point {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.clusterColors = [];
        this.radius = 7;
    }

    equal(other) {
        return this.x == other.x &&
                this.y == other.y && 
                this.color == other.color &&
                this.radius == other.radius;
    }
}

function euqlidDist(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function sqrEuqlidDist(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

function manhattanDist(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function chebyshevDist(p1, p2) {
    return Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
}

function addUserPoint() {
    let p = new Point(mouse.x, mouse.y, "#ef9a9a");
    points.push(p);
    drawPoint(p);
}

function randomPoint() {
    return new Point(randomInt(0, canvas.width), randomInt(0, canvas.height), randomColor());
}

function randomColor() {
    return colors[randomInt(0, 20)];
}

function randomInt(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max));
}


//UI
function updateCanvas(pts) {
    clearCanvas();
    drawPoints(pts);
}

function drawPoints(pts) {
    pts.forEach(p => {
        drawPoint(p);
    });
}

function drawPoint(p) {
    context.beginPath();
    context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    context.fillStyle = p.color;
    context.fill();
}

function clearCanvas() {
	canvas.width = canvas.width;
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
        drawer = setInterval(addUserPoint, 50);
    }
    function mouseClearHandler(event) {
        clearInterval(drawer);
    }

	return mouse;
}

const colors = [
    "#7FAF5C", "#FF1A4B", "#9888A5", "#C84C09", "#31E981",
    "#BCAB79", "#5FBB97", "#F5E5FC", "#0081A7", "#7067CF",
    "#F7A072", "#FF9B42", "#F4F482", "#66C7F4", "#BDD358",
    "#BF0603", "#8D9F87", "#99F7AB", "#C792DF", "#95B2B8",
];