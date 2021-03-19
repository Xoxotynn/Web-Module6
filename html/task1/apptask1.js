//Переменная матрицы
const matrix = document.getElementById('matrix')

// прячем кнопку Подтвердить
document.querySelector(".hiddenbut").style.display = 'none';

//Ожидание нажатия кнопки 
let btn = document.querySelector('button');
btn.addEventListener('click', CreateTab);


//Создание таблицы по клеткам
function CreateTab() {
	matrix.innerHTML = '';
	matrix.hidden = false;
	let nnum = document.getElementById('nnum').value;

	for (let i = 0; i < nnum; i++) {
		let rows = document.createElement('tr');

		for (let j = 0; j < nnum; j++) {
			let element = document.createElement('td');

			element.className = "elem";
			element.name = "em";
			element.setAttribute("row", i);
			element.setAttribute("column", j);
			element.addEventListener("click", handle);

			let elGrid = document.createElement("div");
			elGrid.className = "el-grid";


			let elTop = document.createElement("div");
			elTop.className = "el-top";

			let elTopLeft = document.createElement("div");
			elTopLeft.className = "el-left";
			elTopLeft.innerText = "tl";
			elTop.appendChild(elTopLeft);

			let elBottom = document.createElement("div");
			elBottom.className = "el-bottom";

			let elBottomLeft = document.createElement("div");
			elBottomLeft.className = "el-left";
			elBottomLeft.innerText = "bl";
			let elBottomRight = document.createElement("div");
			elBottomRight.className = "el-right";
			elBottomRight.innerText = "br";

			elBottom.appendChild(elBottomLeft);
			elBottom.appendChild(elBottomRight);

			elGrid.appendChild(elTop);
			elGrid.appendChild(elBottom);

			element.appendChild(elGrid);

			rows.append(element);
		}
		matrix.append(rows);
	}
}

// Флаг для режимов
var mode;
var buttons = document.querySelectorAll("button.setmode");
//Проходим все кпопки и присваиваем значения mode при нажатии
buttons.forEach(function (button) {
	button.addEventListener("click", function (e) {
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
		}

		e.target.classList.add("start");
	}

	if (mode == "wall" && e.target != start && e.target != finish) {
		if (e.target.classList.contains("wall")) {
			e.target.classList.remove("wall");
		}
		else {
			e.target.classList.add("wall");
		}
	}

	if (mode == "finish" && e.target != start && !e.target.classList.contains("wall")) {

		if (finish && e.target != finish) {
			finish.classList.remove("finish");
		}

		e.target.classList.add("finish");
	}

	// Показываем кнопку Подтвердить
	document.querySelector(".hiddenbut").style.display = null;
}

//Ожидание нажатия кнопки Подтвердить ввод
let hiddenbut = document.querySelector('.hiddenbut');
hiddenbut.addEventListener('click', SpacePress);


// ожидание нажатия пробела
function SpacePress() 
{
	document.getElementById("228").innerHTML="Нажмите пробел чтобы начать выполнение алгоритма !!!";
	
	$('body').keypress(function(e) {
		if (e.keyCode == 0 || e.keyCode == 32) 
		{

			Astar();
		}
	});
}

// функция алгоритма A*
function Astar()
{
	console.log("123");
}
