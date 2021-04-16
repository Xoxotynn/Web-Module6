

function isValidMaze() {
	for (let qwe = 0; qwe < nnum; qwe += 2) {
		for (let xqwz = 0; xqwz < nnum; xqwz += 2) {
			if (AstMatr[qwe][xqwz].value != 1) {
				return false;
			}
		}
	}
	return true;
}


function generateLab() {
	var tractor = new strPUSH(0, 0);
	if (nnum % 2 == 0) {
		while (!isValidMaze()) {
			var directions = [];
			if (tractor.x > 0) {
				directions.push([-2, 0]);
			}
			if (tractor.x < nnum - 3) {
				directions.push([2, 0]);
			}
			if (tractor.y > 0) {
				directions.push([0, -2]);
			}
			if (tractor.y < nnum - 3) {
				directions.push([0, 2]);
			}

			const [dx, dy] = getRandomItem(directions);
			tractor.x += dx;
			tractor.y += dy;


			if (AstMatr[tractor.x][tractor.y].value == 0) {
				AstMatr[tractor.x][tractor.y].value = 1;
				AstMatr[tractor.x - dx / 2][tractor.y - dy / 2].value = 1;
				document.querySelector(`td[row = "${tractor.x}"][column = "${tractor.y}"]`).classList.remove("wall");
				document.querySelector(`td[row = "${tractor.x - dx / 2}"][column = "${tractor.y - dy / 2}"]`).classList.remove("wall");
			}
		}
	}
	else {
		while (!isValidMaze()) {
			var directions = [];

			if (tractor.x > 0) {
				directions.push([-2, 0]);
			}
			if (tractor.x < nnum - 2) {
				directions.push([2, 0]);
			}
			if (tractor.y > 0) {
				directions.push([0, -2]);
			}
			if (tractor.y < nnum - 2) {
				directions.push([0, 2]);
			}

			const [dx, dy] = getRandomItem(directions);
			tractor.x += dx;
			tractor.y += dy;


			if (AstMatr[tractor.x][tractor.y].value == 0) {
				AstMatr[tractor.x][tractor.y].value = 1;
				AstMatr[tractor.x - dx / 2][tractor.y - dy / 2].value = 1;
				document.querySelector(`td[row = "${tractor.x}"][column = "${tractor.y}"]`).classList.remove("wall");
				document.querySelector(`td[row = "${tractor.x - dx / 2}"][column = "${tractor.y - dy / 2}"]`).classList.remove("wall");
			}
		}
	}
}

function getRandomItem(array) {
	const all = Math.floor(Math.random() * array.length)
	return array[all];
}