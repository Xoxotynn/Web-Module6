const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const mouse = createMouse(canvas);
let radius = 5;

animation({
	clear() {
		// context.beginPath();
		// context.rect(0, 0, canvas.width, canvas.height);
		// context.fillStyle = "white";
		// context.fill();
	},

	update() {
		if (mouse.left && !mouse.pLeft) {
			context.beginPath();
		    context.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
		    context.fillStyle = "blue";
		    context.fill();
		}

		if (mouse.right && !mouse.pRight) {
			radius += 3;
		}

		mouse.tick();
	},

	render() {
		// context.beginPath();
		// context.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
		// context.fillStyle = mouse.over ? "red" : "white";
		// context.fill();
	},
});
   