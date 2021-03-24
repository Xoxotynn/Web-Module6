class Point {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 7;
    }
}

function randomizeColors(points) {
    points.forEach(p => p.color = randomColor());
}

function randomPoint() {
    return new Point(randomInt(canvas.width), randomInt(canvas.height), randomColor());
}

function randomColor() {
    let symbols = "0123456789ABCDEF", color = "#";
    for(let i = 0; i < 6; i++) {
        color += symbols[randomInt(16)];
    }

    return color;
}

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function addUserPoint() {
    let p = new Point(mouse.x, mouse.y, "blue");
    points.push(p);
    drawPoint(p);
}

function deleteUserPoint() {}

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