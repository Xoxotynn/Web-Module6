//Переменная матрицы
const matrix = document.getElementById('matrix')

// Используем для того чтобы если нет начало и конца, то алгоритм не выполняется.(Нужно поставить начало и конец, чтобы алгоритм заработал)
let checkSTART = 0;
let checkFINISH = 0;

// Кол-во нажатий кнопки сгенерировать. Используется для того чтобы кнопки начало и конец работали коректно если генерация лабиринта идёт более одного раза.
let buttonspush = 0;

//Ожидание нажатия кнопки 
let btn = document.querySelector('.zapusk');
btn.addEventListener('click', CreateTab);


//Кол-во ячеек
let nnum;

// Всяческая информация для клеток в матрице. 
class Info {
	clear()
	{
		this.value = 1;
		this.F = 0;
		this.G = 0;
		this.H = 0;
		this.roditelX = 0;
		this.roditelY = 0;
	}
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
let startMatrix = new strPUSH(0, 0);
let finishMatrix = new strPUSH(0, 0);

let AstMatr = [];
let OtkSpisok = [];
let ZakSpisok = [];
function Matr() {
	AstMatr = [];
	for (let i = 0; i < nnum; i++) {
		AstMatr[i] = [];
		for (let j = 0; j < nnum; j++) {
			AstMatr[i][j] = new Info(0, 0, 0, 0, 0, 0);
		}
	}
}


//Создание таблицы по клеткам
function CreateTab() {
	buttonspush += 1;
	nnum = document.getElementById('nnum').value;


	matrix.innerHTML = '';
	matrix.hidden = false;

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

let mode;
// Флаг для режимов
let buttons = document.querySelectorAll("button.setmode");
//Проходим все кпопки и присваиваем значения mode при нажатии
buttons.forEach(function (button) {
	button.addEventListener("mousedown", function (e) {
		mode = button.getAttribute("mode");
		buttons.forEach(button => button.classList.remove("choosed"));
		button.classList.add("choosed");
	});
});


function discharge(type)
 {
	 if (!((finishMatrix.x <= nnum) || (finishMatrix.y <= nnum) || (startMatrix.x <= nnum) || (startMatrix.x <= nnum))) {
		AstMatr[finishMatrix.x][finishMatrix.y].clear();
		AstMatr[startMatrix.x][startMatrix.y].clear();
	 }
	document.querySelectorAll(".elem.notopen").forEach(function (elem) {
		elem.classList.remove("notopen")
	});

	document.querySelectorAll(".elem.open").forEach(function (elem) {
		elem.classList.remove("open")
	});
	if (type == "start" && buttonspush == 1)
	{
		document.querySelector(".start").classList.remove("start");
	}
	if (type == "finish" && buttonspush == 1)
	{
		document.querySelector(".finish").classList.remove("finish");
	}
	
	OtkSpisok.splice(0,OtkSpisok.length);
	ZakSpisok.splice(0,ZakSpisok.length);
	checkINDBUTTON = 0;
	checkSTOPIND = 0;
}



// Покраска тех блоков таблицы на которые нажали кнопкой мыши после кнопки "Начало", "Стена", "Конец".
function handle(e) {
	let start = document.querySelector(".elem.start");
	let finish = document.querySelector(".elem.finish");


	if (mode == "start" && e.target != finish && !e.target.classList.contains("wall")) {

		if (checkINDBUTTON == 1)
		{
			discharge("start");
		}

		if (start && e.target != start) {
			start.classList.remove("start");


			AstMatr[start.getAttribute("row")][start.getAttribute("column")].value = 1;
		}

		e.target.classList.add("start");


		AstMatr[e.target.getAttribute("row")][e.target.getAttribute("column")].value = -1;
		startMatrix.x = e.target.getAttribute("row");
		startMatrix.y = e.target.getAttribute("column");
	}

	if (mode == "wall" && e.target != start && e.target != finish) {
		if (checkINDBUTTON == 1)
		{
			discharge("wall");
		}
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

		if (checkINDBUTTON == 1)
		{
			discharge("finish");
		}

		if (finish && e.target != finish) {
			finish.classList.remove("finish");

			AstMatr[finish.getAttribute("row")][finish.getAttribute("column")].value = 1;
		}
		e.target.classList.add("finish");
		AstMatr[e.target.getAttribute("row")][e.target.getAttribute("column")].value = -2;
		finishMatrix.x = e.target.getAttribute("row");
		finishMatrix.y = e.target.getAttribute("column");
	}


}


// ---------------------------------- Здесь можно сказать начинается алгоритм--------------------------------------;

document.querySelector('.hiddenbut').addEventListener('click', preparation);
let checkINDBUTTON = 0;

function preparation() {
	for (let i = 0; i <nnum;i++)
	{
		for (let j = 0; j < nnum; j++)
		{
			if (document.querySelector(`td[row = "${i}"][column = "${j}"]`).classList.contains("start"))
			{
				checkSTART = 1;
			}
			if (document.querySelector(`td[row = "${i}"][column = "${j}"]`).classList.contains("finish"))
			{
				checkFINISH = 1;
			}
		}
	}

	//проверка для того чтобы алгоритм мог запускаться если есть начало и конец. Если нету то ничего не делаем
	if (checkFINISH == 1 && checkSTART == 1)
	{
		Astar();
		checkINDBUTTON = 1;
	}
}


function Chebishev(pos0, pos1) {
	let d1 = Math.max(Math.abs(pos0 - finishMatrix.x), Math.abs(pos1 - finishMatrix.x));
	return d1;
}

// Проверка закрытого списка используется для того чтобы не пушить клетки которые уже были обработаны
function checkClosed(prov) {
	for (let i = 0; i < ZakSpisok.length; i++) {
		if (prov.x == ZakSpisok[i].x && prov.y == ZakSpisok[i].y) {
			return 1;
		}
	}
	return 0;
}

// Проверка Открытого списка используется для того чтобы не пушить клетки которые уже были обработаны
function checkOpen(prov) {
	for (let i = 0; i < OtkSpisok.length; i++) {
		if (prov.x == OtkSpisok[i].x && prov.y == OtkSpisok[i].y) {
			return 1;
		}
	}
	return 0;
}


let index;
let save;
//Достаём мининимум из Открытого списка.
function MINOTK(OtkSpisok) {
	let min = 999999999;
	for (let i = 0; i < OtkSpisok.length; i++) {
		let px = OtkSpisok[i].x;
		let py = OtkSpisok[i].y;
		if (AstMatr[px][py].F < min) {
			index = i;
			min = AstMatr[px][py].F;
			save = new strPUSH(px, py); //Использую этот класс просто потому что там есть x,y
		}
	}
	return (save);
}


let checkSTOPIND = 0;
// функция алгоритма A*
function Astar() {
	if (document.querySelector("#vertical").checked)
	{
		OtkSpisok.push(new strPUSH(startMatrix.x, startMatrix.y));

		setTimeout(function timmee() {
			save = MINOTK(OtkSpisok);
			checkNeighborsVertical(save);

			if (checkSTOPIND == 1) {
				risovka();
				return true;
			}
			else if (OtkSpisok.length <= 0) {
				return true;
			}
			if (OtkSpisok.length > 0)
			{
				setTimeout(timmee,20);
			}
				
		},20);
	}
	else if (document.querySelector("#diagonal").checked)
	{
		OtkSpisok.push(new strPUSH(startMatrix.x, startMatrix.y));

		setTimeout(function timmee() {
			save = MINOTK(OtkSpisok);
			checkNeighborsDiagonal(save);

			if (checkSTOPIND == 1) {
				risovka();
				return true;
			}
			else if (OtkSpisok.length <= 0) {
				return true;
			}
			if (OtkSpisok.length > 0)
			{
				setTimeout(timmee,20);
			}
				
		},20);
	}
	checkSTART = 0;
	checkFINISH = 0;
}

function risovka() {
	let x = parseInt(finishMatrix.x, 10);
	let y = parseInt(finishMatrix.y, 10);
	while (x != startMatrix.x || y != startMatrix.y) 
	{
		let time = x;
		x = AstMatr[time][y].roditelX;
		y = AstMatr[time][y].roditelY;
		document.querySelector(`td[row = "${x}"][column = "${y}"]`).classList.add("open");
		
		
	}
	document.querySelector(`td[row = "${startMatrix.x}"][column = "${startMatrix.y}"]`).classList.remove("open");
	document.querySelector(`td[row = "${finishMatrix.x}"][column = "${finishMatrix.y}"]`).classList.remove("notopen");
}