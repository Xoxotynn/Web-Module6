class Point {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
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
    let p = new Point(mouse.x, mouse.y, "blue");
    points.push(p);
    drawPoint(p);
}

function randomPoint() {
    return new Point(randomInt(0, canvas.width), randomInt(0, canvas.height), randomColor());
}

function randomColor() {
    let symbols = "0123456789ABCDEF", color = "#";
    for(let i = 0; i < 6; i++) {
        color += symbols[randomInt(0, 16)];
    }

    return color;
}

function randomInt(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max));
}


//UI
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
    const mouse = {
		x: 0,
		y: 0,
	};

	element.addEventListener("mousemove", mousemoveHandler);

	function mousemoveHandler(event) {
		const rect = element.getBoundingClientRect();
		mouse.x = event.clientX - rect.left;
		mouse.y = event.clientY - rect.top;
	}

	return mouse;
}