//Переменная матрицы
const matrix = document.getElementById('matrix')

// прячем кнопку Подтвердить
document.querySelector(".hiddenbut").style.display = 'none';


//Ожидание нажатия кнопки 
let btn = document.querySelector('button');
btn.addEventListener('click', CreateTab);

var nnum;


//Для клеток в матрице 
class Info {
	constructor(value, F, G, H, roditelX, roditelY) {
		this.value = value;
		this.F = F;
		this.G = G;
		this.H = H;
		this.roditelX = roditelX;
		this.roditelY = roditelY;
	}
}

// Для всего что использует только x,y
class strPUSH {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}


//переменная отвечающая за координаты Начала
var startMatrix = new strPUSH(0, 0);
var finishMatrix = new strPUSH(0, 0);


var AstMatr = [];
var OtkSpisok = [];
var ZakSpisok = [];
function Matr() {
	for (var i = 0; i < nnum; i++) {
		AstMatr[i] = [];
		for (var j = 0; j < nnum; j++) {
			AstMatr[i][j] = new Info(0, 0, 0, 0, 0, 0);

		}
	}


}


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




var tractor = new strPUSH(0, 0);
function generateLab() {
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











//Создание таблицы по клеткам
function CreateTab() {
	matrix.innerHTML = '';
	matrix.hidden = false;

	nnum = document.getElementById('nnum').value;
	// Создание матрицы для алгоритма(не визуальная)
	Matr();




	for (let i = 0; i < nnum; i++) {
		let rows = document.createElement('tr');

		for (let j = 0; j < nnum; j++) {
			let element = document.createElement('td');

			element.className = "elem";
			element.name = "em";
			element.setAttribute("row", i);
			element.setAttribute("column", j);
			element.classList.add("wall");
			element.addEventListener("mousedown", handle);

			rows.append(element);
		}
		matrix.append(rows);
	}

	//для создания лабиринта
	AstMatr[0][0].value = 1;
	document.querySelector(`td[row = "${0}"][column = "${0}"]`).classList.remove("wall");
	generateLab();

}


// Флаг для режимов
var mode;
var buttons = document.querySelectorAll("button.setmode");
//Проходим все кпопки и присваиваем значения mode при нажатии
buttons.forEach(function (button) {
	button.addEventListener("mousedown", function (e) {
		mode = e.target.getAttribute("mode");
	});
});






// Покраска тем блокам таблицы на которые нажали кнопкой мыши после кнопки "Начало", "Стена", "Конец".
function handle(e) {
	let start = document.querySelector(".elem.start");
	let finish = document.querySelector(".elem.finish");

	if (mode == "start" && e.target != finish && !e.target.classList.contains("wall")) {

		if (start && e.target != start) {
			start.classList.remove("start");

			// Удаляем значение в матрицу 0 по индексам из таблицы
			AstMatr[start.getAttribute("row")][start.getAttribute("column")].value = 1;
		}

		e.target.classList.add("start");

		//Ставим значение в матрицу -1 по индексам из таблицы
		AstMatr[e.target.getAttribute("row")][e.target.getAttribute("column")].value = -1;
		startMatrix.x = e.target.getAttribute("row");
		startMatrix.y = e.target.getAttribute("column");
	}

	if (mode == "wall" && e.target != start && e.target != finish) {
		if (e.target.classList.contains("wall")) {
			e.target.classList.remove("wall");

			AstMatr[e.target.getAttribute("row")][e.target.getAttribute("column")].value = 1;
		}
		else {
			e.target.classList.add("wall");

			AstMatr[e.target.getAttribute("row")][e.target.getAttribute("column")].value = 0;
		}
	}

	if (mode == "finish" && e.target != start && !e.target.classList.contains("wall")) {

		if (finish && e.target != finish) {
			finish.classList.remove("finish");

			AstMatr[finish.getAttribute("row")][finish.getAttribute("column")].value = 1;
		}
		e.target.classList.add("finish");
		AstMatr[e.target.getAttribute("row")][e.target.getAttribute("column")].value = -2;
		finishMatrix.x = e.target.getAttribute("row");
		finishMatrix.y = e.target.getAttribute("column");
	}



	// Показываем кнопку Подтвердить
	document.querySelector(".hiddenbut").style.display = null;
	podgotovka();
}



// ---------------------------------- Здесь можно сказать начинается алгоритм(РЕАЛЬНАЯ ЖОПА) --------------------------------------;


//Функция с которой начинается, после кнопки подтвердить производится алгоритм
function podgotovka() {
	document.querySelector('.hiddenbut').addEventListener('click', Astar);
}

// Эвристика созданная хорошим человек, но теперь я сделаю для неё новое название. 
let d1;
function Chebishev(pos0, pos1) {
	d1 = Math.max(Math.abs(pos0 - finishMatrix.x), Math.abs(pos1 - finishMatrix.x));
	return d1;
}

// Проверка закрытого списка используется для того чтобы не пушить клетки которые уже были обработаны
function proverkaZak(prov) {
	for (let i = 0; i < ZakSpisok.length; i++) {
		if (prov.x == ZakSpisok[i].x && prov.y == ZakSpisok[i].y) {
			return 1;
		}
	}
	return 0;
}

// Проверка Открытого списка используется для того чтобы не пушить клетки которые уже были обработаны
function proverkaOtk(prov) {
	for (let i = 0; i < OtkSpisok.length; i++) {
		if (prov.x == OtkSpisok[i].x && prov.y == OtkSpisok[i].y) {
			return 1;
		}
	}
	return 0;
}

// Функция проверки соседей и всё что с ними связано(сердце алгоритма)
function proverkaSosedei(tochka) {

	// Чтобы JS не творил хуйню с преобразованием типов
	let x = parseInt(tochka.x, 10);
	let y = parseInt(tochka.y, 10);


	OtkSpisok.splice(index, 1);
	ZakSpisok.push(new strPUSH(x, y));


	// -----------------------------------------Алгоритм всех различных проверок!-------------------------------------------------



	//Диагональ Вверх - влево
	if (x - 1 >= 0 && y - 1 >= 0 && AstMatr[x - 1][y - 1].value != 0 && proverkaZak(new strPUSH(x - 1, y - 1)) == 0) {
		if (proverkaOtk(new strPUSH(x - 1, y - 1)) == 0) // клетка не в открытом списке
		{
			AstMatr[x - 1][y - 1].roditelX = x;
			AstMatr[x - 1][y - 1].roditelY = y;
			AstMatr[x - 1][y - 1].G = 14 + AstMatr[x][y].G;
			AstMatr[x - 1][y - 1].H = Chebishev(x - 1, y - 1);
			AstMatr[x - 1][y - 1].F = AstMatr[x - 1][y - 1].H + AstMatr[x - 1][y - 1].G;
			OtkSpisok.push(new strPUSH(x - 1, y - 1));
			document.querySelector(`td[row = "${x - 1}"][column = "${y - 1}"]`).style.backgroundColor = "#f6ff00";


			if (x - 1 == finishMatrix.x && y - 1 == finishMatrix.y) {
				checkSTOPIND = 1;
				return 0;
			}
		}
		else if (AstMatr[x][y].G + 14 < AstMatr[x - 1][y - 1].G) {
			AstMatr[x - 1][y - 1].roditelX = x;
			AstMatr[x - 1][y - 1].roditelY = y;
			AstMatr[x - 1][y - 1].G = AstMatr[x][y] + 14;
			AstMatr[x - 1][y - 1].F = AstMatr[x - 1][y - 1].H + AstMatr[x - 1][y - 1].G;
		}
	}

	// Вверх
	if (x - 1 >= 0 && AstMatr[x - 1][y].value != 0 && proverkaZak(new strPUSH(x - 1, y)) == 0) {
		if (proverkaOtk(new strPUSH(x - 1, y)) == 0) {
			AstMatr[x - 1][y].roditelX = x;
			AstMatr[x - 1][y].roditelY = y;
			AstMatr[x - 1][y].G = 10 + AstMatr[x][y].G;
			AstMatr[x - 1][y].H = Chebishev(x - 1, y);
			AstMatr[x - 1][y].F = AstMatr[x - 1][y].H + AstMatr[x - 1][y].G;
			OtkSpisok.push(new strPUSH(x - 1, y));
			document.querySelector(`td[row = "${x - 1}"][column = "${y}"]`).style.backgroundColor = "#f6ff00";
			if (x - 1 == finishMatrix.x && y == finishMatrix.y) {
				checkSTOPIND = 1;
				return 0;
			}
		}
		else if (AstMatr[x][y].G + 10 < AstMatr[x - 1][y].G) {
			AstMatr[x - 1][y].roditelX = x;
			AstMatr[x - 1][y].roditelY = y;
			AstMatr[x - 1][y].G = AstMatr[x][y] + 10;
			AstMatr[x - 1][y].F = AstMatr[x - 1][y].H + AstMatr[x - 1][y].G;
		}
	}

	// Диагональ вверх-вправо
	if (x - 1 >= 0 && y + 1 < nnum && AstMatr[x - 1][y + 1].value != 0 && proverkaZak(new strPUSH(x - 1, y + 1)) == 0) {
		if (proverkaOtk(new strPUSH(x - 1, y + 1)) == 0) {
			AstMatr[x - 1][y + 1].roditelX = x;
			AstMatr[x - 1][y + 1].roditelY = y;
			AstMatr[x - 1][y + 1].G = 14 + AstMatr[x][y].G;
			AstMatr[x - 1][y + 1].H = Chebishev(x - 1, y + 1);
			AstMatr[x - 1][y + 1].F = AstMatr[x - 1][y + 1].H + AstMatr[x - 1][y + 1].G;
			OtkSpisok.push(new strPUSH(x - 1, y + 1));
			document.querySelector(`td[row = "${x - 1}"][column = "${y + 1}"]`).style.backgroundColor = "#f6ff00";
			if (x - 1 == finishMatrix.x && y + 1 == finishMatrix.y) {
				checkSTOPIND = 1;
				return 0;
			}
		}
		else if (AstMatr[x][y].G + 14 < AstMatr[x - 1][y + 1].G) {
			AstMatr[x - 1][y + 1].roditelX = x;
			AstMatr[x - 1][y + 1].roditelY = y;
			AstMatr[x - 1][y + 1].G = AstMatr[x][y] + 14;
			AstMatr[x - 1][y + 1].F = AstMatr[x - 1][y + 1].H + AstMatr[x - 1][y + 1].G;
		}
	}

	//ВПРАВО
	if (y + 1 < nnum && AstMatr[x][y + 1].value != 0 && proverkaZak(new strPUSH(x, y + 1)) == 0) {
		if (proverkaOtk(new strPUSH(x, y + 1)) == 0) {
			AstMatr[x][y + 1].roditelX = x;
			AstMatr[x][y + 1].roditelY = y;
			AstMatr[x][y + 1].G = 10 + AstMatr[x][y].G;
			AstMatr[x][y + 1].H = Chebishev(x, y + 1);
			AstMatr[x][y + 1].F = AstMatr[x][y + 1].H + AstMatr[x][y + 1].G;
			OtkSpisok.push(new strPUSH(x, y + 1));
			document.querySelector(`td[row = "${x}"][column = "${y + 1}"]`).style.backgroundColor = "#f6ff00";
			if (x == finishMatrix.x && y + 1 == finishMatrix.y) {
				checkSTOPIND = 1;
				return 0;
			}
		}
		else if (AstMatr[x][y].G + 10 < AstMatr[x][y + 1].G) {
			AstMatr[x][y + 1].roditelX = x;
			AstMatr[x][y + 1].roditelY = y;
			AstMatr[x][y + 1].G = AstMatr[x][y] + 10;
			AstMatr[x][y + 1].F = AstMatr[x][y + 1].H + AstMatr[x][y + 1].G;
		}
	}

	// Диагональ вниз-право
	if (x + 1 < nnum && y + 1 < nnum && AstMatr[x + 1][y + 1].value != 0 && proverkaZak(new strPUSH(x + 1, y + 1)) == 0) {
		if (proverkaOtk(new strPUSH(x + 1, y + 1)) == 0) {
			AstMatr[x + 1][y + 1].roditelX = x;
			AstMatr[x + 1][y + 1].roditelY = y;
			AstMatr[x + 1][y + 1].G = 14 + AstMatr[x][y].G;
			AstMatr[x + 1][y + 1].H = Chebishev(x + 1, y + 1);
			AstMatr[x + 1][y + 1].F = AstMatr[x + 1][y + 1].H + AstMatr[x + 1][y + 1].G;
			OtkSpisok.push(new strPUSH(x + 1, y + 1));
			document.querySelector(`td[row = "${x + 1}"][column = "${y + 1}"]`).style.backgroundColor = "#f6ff00";
			if (x + 1 == finishMatrix.x && y + 1 == finishMatrix.y) {
				checkSTOPIND = 1;
				return 0;
			}
		}
		else if (AstMatr[x][y] + 14 < AstMatr[x + 1][y + 1]) {
			AstMatr[x + 1][y + 1].roditelX = x;
			AstMatr[x + 1][y + 1].roditelY = y;
			AstMatr[x + 1][y + 1].G = AstMatr[x][y] + 14;
			AstMatr[x + 1][y + 1].F = AstMatr[x + 1][y + 1].H + AstMatr[x + 1][y + 1].G;
		}
	}

	// Вниз
	if (x + 1 < nnum && AstMatr[x + 1][y].value != 0 && proverkaZak(new strPUSH(x + 1, y)) == 0) {
		if ((proverkaOtk(new strPUSH(x + 1, y)) == 0)) {
			AstMatr[x + 1][y].roditelX = x;
			AstMatr[x + 1][y].roditelY = y;
			AstMatr[x + 1][y].G = 10 + AstMatr[x][y].G;
			AstMatr[x + 1][y].H = Chebishev(x + 1, y);
			AstMatr[x + 1][y].F = AstMatr[x + 1][y].H + AstMatr[x + 1][y].G;
			OtkSpisok.push(new strPUSH(x + 1, y));
			document.querySelector(`td[row = "${x + 1}"][column = "${y}"]`).style.backgroundColor = "#f6ff00";
			if (x + 1 == finishMatrix.x && y == finishMatrix.y) {
				checkSTOPIND = 1;
				return 0;
			}
		}
		else if (AstMatr[x][y] + 10 < AstMatr[x + 1][y]) {
			AstMatr[x + 1][y].roditelX = x;
			AstMatr[x + 1][y].roditelY = y;
			AstMatr[x + 1][y].G = AstMatr[x][y] + 10;
			AstMatr[x + 1][y].F = AstMatr[x + 1][y].H + AstMatr[x + 1][y].G;
		}
	}

	// Диагональ вниз-влево
	if (x + 1 < nnum && y - 1 >= 0 && AstMatr[x + 1][y - 1].value != 0 && proverkaZak(new strPUSH(x + 1, y - 1)) == 0) {
		if (proverkaOtk(new strPUSH(x + 1, y - 1)) == 0) {
			AstMatr[x + 1][y - 1].roditelX = x;
			AstMatr[x + 1][y - 1].roditelY = y;
			AstMatr[x + 1][y - 1].G = 14 + AstMatr[x][y].G;
			AstMatr[x + 1][y - 1].H = Chebishev(x + 1, y - 1);
			AstMatr[x + 1][y - 1].F = AstMatr[x + 1][y - 1].H + AstMatr[x + 1][y - 1].G;
			OtkSpisok.push(new strPUSH(x + 1, y - 1));
			document.querySelector(`td[row = "${x + 1}"][column = "${y - 1}"]`).style.backgroundColor = "#f6ff00";

			if (x + 1 == finishMatrix.x && y - 1 == finishMatrix.y) {
				checkSTOPIND = 1;
				return 0;
			}
		}
		else if (AstMatr[x][y] + 14 < AstMatr[x + 1][y - 1]) {
			AstMatr[x + 1][y - 1].roditelX = x;
			AstMatr[x + 1][y - 1].roditelY = y;
			AstMatr[x + 1][y - 1].G = AstMatr[x][y] + 14;
			AstMatr[x + 1][y - 1].F = AstMatr[x + 1][y - 1].H + AstMatr[x + 1][y - 1].G;
		}
	}

	//Влево
	if (y - 1 >= 0 && AstMatr[x][y - 1].value != 0 && proverkaZak(new strPUSH(x, y - 1)) == 0) {
		if (proverkaOtk(new strPUSH(x, y - 1)) == 0) {
			AstMatr[x][y - 1].roditelX = x;
			AstMatr[x][y - 1].roditelY = y;
			AstMatr[x][y - 1].G = 10 + AstMatr[x][y].G;
			AstMatr[x][y - 1].H = Chebishev(x, y - 1);
			AstMatr[x][y - 1].F = AstMatr[x][y - 1].H + AstMatr[x][y - 1].G;
			OtkSpisok.push(new strPUSH(x, y - 1));
			document.querySelector(`td[row = "${x}"][column = "${y - 1}"]`).style.backgroundColor = "#f6ff00";
			if (x == finishMatrix.x && y - 1 == finishMatrix.y) {
				checkSTOPIND = 1;
				return 0;
			}
		}
		else if (AstMatr[x][y] + 10 < AstMatr[x][y - 1]) {
			AstMatr[x][y - 1].roditelX = x;
			AstMatr[x][y - 1].roditelY = y;
			AstMatr[x][y - 1].G = AstMatr[x][y] + 10;
			AstMatr[x][y - 1].F = AstMatr[x][y - 1].H + AstMatr[x][y - 1].G;
		}
	}

	return 0;
}



// Функция проверки соседей по вертикали и горизонтали
function proverkaSoseddei(tochka) {

	// Чтобы JS не творил хуйню с преобразованием типов
	let x = parseInt(tochka.x, 10);
	let y = parseInt(tochka.y, 10);
	paaaar = 0;


	OtkSpisok.splice(index, 1);
	ZakSpisok.push(new strPUSH(x, y));
	// Алгоритм всех различных проверок!



	// Вверх
	if (x - 1 >= 0 && AstMatr[x - 1][y].value != 0 && proverkaZak(new strPUSH(x - 1, y)) == 0) {
		if (proverkaOtk(new strPUSH(x - 1, y)) == 0) {
			AstMatr[x - 1][y].roditelX = x;
			AstMatr[x - 1][y].roditelY = y;
			AstMatr[x - 1][y].G = 10 + AstMatr[x][y].G;
			AstMatr[x - 1][y].H = Chebishev(x - 1, y);
			AstMatr[x - 1][y].F = AstMatr[x - 1][y].H + AstMatr[x - 1][y].G;
			OtkSpisok.push(new strPUSH(x - 1, y));
			document.querySelector(`td[row = "${x - 1}"][column = "${y}"]`).style.backgroundColor = "#f6ff00";
			if (x - 1 == finishMatrix.x && y == finishMatrix.y) {
				checkSTOPIND = 1;
				return 0;
			}
		}
		else if (AstMatr[x][y].G + 10 < AstMatr[x - 1][y].G) {
			AstMatr[x - 1][y].roditelX = x;
			AstMatr[x - 1][y].roditelY = y;
			AstMatr[x - 1][y].G = AstMatr[x][y] + 10;
			AstMatr[x - 1][y].F = AstMatr[x - 1][y].H + AstMatr[x - 1][y].G;
		}
	}

	//ВПРАВО
	if (y + 1 < nnum && AstMatr[x][y + 1].value != 0 && proverkaZak(new strPUSH(x, y + 1)) == 0) {
		if (proverkaOtk(new strPUSH(x, y + 1)) == 0) {
			AstMatr[x][y + 1].roditelX = x;
			AstMatr[x][y + 1].roditelY = y;
			AstMatr[x][y + 1].G = 10 + AstMatr[x][y].G;
			AstMatr[x][y + 1].H = Chebishev(x, y + 1);
			AstMatr[x][y + 1].F = AstMatr[x][y + 1].H + AstMatr[x][y + 1].G;
			OtkSpisok.push(new strPUSH(x, y + 1));
			document.querySelector(`td[row = "${x}"][column = "${y + 1}"]`).style.backgroundColor = "#f6ff00";
			if (x == finishMatrix.x && y + 1 == finishMatrix.y) {
				checkSTOPIND = 1;
				return 0;
			}
		}
		else if (AstMatr[x][y].G + 10 < AstMatr[x][y + 1].G) {
			AstMatr[x][y + 1].roditelX = x;
			AstMatr[x][y + 1].roditelY = y;
			AstMatr[x][y + 1].G = AstMatr[x][y] + 10;
			AstMatr[x][y + 1].F = AstMatr[x][y + 1].H + AstMatr[x][y + 1].G;
		}
	}

	// Вниз
	if (x + 1 < nnum && AstMatr[x + 1][y].value != 0 && proverkaZak(new strPUSH(x + 1, y)) == 0) {
		if ((proverkaOtk(new strPUSH(x + 1, y)) == 0)) {
			AstMatr[x + 1][y].roditelX = x;
			AstMatr[x + 1][y].roditelY = y;
			AstMatr[x + 1][y].G = 10 + AstMatr[x][y].G;
			AstMatr[x + 1][y].H = Chebishev(x + 1, y);
			AstMatr[x + 1][y].F = AstMatr[x + 1][y].H + AstMatr[x + 1][y].G;
			OtkSpisok.push(new strPUSH(x + 1, y));
			document.querySelector(`td[row = "${x + 1}"][column = "${y}"]`).style.backgroundColor = "#f6ff00";
			if (x + 1 == finishMatrix.x && y == finishMatrix.y) {
				checkSTOPIND = 1;
				return 0;
			}
		}
		else if (AstMatr[x][y] + 10 < AstMatr[x + 1][y]) {
			AstMatr[x + 1][y].roditelX = x;
			AstMatr[x + 1][y].roditelY = y;
			AstMatr[x + 1][y].G = AstMatr[x][y] + 10;
			AstMatr[x + 1][y].F = AstMatr[x + 1][y].H + AstMatr[x + 1][y].G;
		}
	}

	//Влево
	if (y - 1 >= 0 && AstMatr[x][y - 1].value != 0 && proverkaZak(new strPUSH(x, y - 1)) == 0) {
		if (proverkaOtk(new strPUSH(x, y - 1)) == 0) {
			AstMatr[x][y - 1].roditelX = x;
			AstMatr[x][y - 1].roditelY = y;
			AstMatr[x][y - 1].G = 10 + AstMatr[x][y].G;
			AstMatr[x][y - 1].H = Chebishev(x, y - 1);
			AstMatr[x][y - 1].F = AstMatr[x][y - 1].H + AstMatr[x][y - 1].G;
			OtkSpisok.push(new strPUSH(x, y - 1));
			document.querySelector(`td[row = "${x}"][column = "${y - 1}"]`).style.backgroundColor = "#f6ff00";
			if (x == finishMatrix.x && y - 1 == finishMatrix.y) {
				checkSTOPIND = 1;
				return 0;
			}
		}
		else if (AstMatr[x][y] + 10 < AstMatr[x][y - 1]) {
			AstMatr[x][y - 1].roditelX = x;
			AstMatr[x][y - 1].roditelY = y;
			AstMatr[x][y - 1].G = AstMatr[x][y] + 10;
			AstMatr[x][y - 1].F = AstMatr[x][y - 1].H + AstMatr[x][y - 1].G;
		}
	}

	return 0;
}


let px;
let py;
let min
var index;
//Достаём мининимум из Открытого списка.
function MINOTK(OtkSpisok) {
	min = 999999999;
	for (let i = 0; i < OtkSpisok.length; i++) {
		px = OtkSpisok[i].x;
		py = OtkSpisok[i].y;
		if (AstMatr[px][py].F < min) {
			index = i;
			min = AstMatr[px][py].F;
			save = new strPUSH(px, py); //Использую этот класс просто потому что там есть x,y
		}
	}
	return (save);
}



let dlina1;
let dlina2;
var checkSTOPIND = 0;
// функция алгоритма A*
function Astar() {
	// Установка старта в поля для AST MATR;
	AstMatr[startMatrix.x][startMatrix.y].roditelX = "lol";
	AstMatr[startMatrix.x][startMatrix.y].roditelY = "lol";
	OtkSpisok.push(new strPUSH(startMatrix.x, startMatrix.y));

	setTimeout(function timmee() {


		save = MINOTK(OtkSpisok);
		dlina1 = OtkSpisok.length;
		proverkaSoseddei(save);
		dlina2 = OtkSpisok.length;



		if (checkSTOPIND == 1) {
			risovka();
			return true;
		}
		else if (OtkSpisok.length <= 0) {
			return true;
		}
		if (OtkSpisok.length > 0) {
			setTimeout(timmee, 50);
		}

	}, 50);

}


let x;
let y;
let time;
function risovka() {
	x = parseInt(finishMatrix.x, 10);
	y = parseInt(finishMatrix.y, 10);
	while (x != startMatrix.x || y != startMatrix.y) {
		time = x;
		x = AstMatr[time][y].roditelX;
		y = AstMatr[time][y].roditelY;
		document.querySelector(`td[row = "${x}"][column = "${y}"]`).style.backgroundColor = "#9030b8";
	}
}

// Сделать рандомные грани при генерации лабиринта чётного кол-ва
// 2.Сделать 2 радио кнопки чтобы можно было выбирать вариант алгоритма. (Диагональный и без диагонаей)