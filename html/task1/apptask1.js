//Переменная матрицы
const matrix = document.getElementById('matrix')

// прячем кнопку Подтвердить
document.querySelector(".hiddenbut").style.display = 'none';


//Ожидание нажатия кнопки 
let btn = document.querySelector('button');
btn.addEventListener('click', CreateTab);

var nnum;


//Для клеток в матрице 
class Info{
	constructor(value,F,G,H,roditelX,roditelY)
	{
		this.value = value;
		this.F = F;
		this.G = G;
		this.H = H;
		this.roditelX = roditelX;
		this.roditelY = roditelY;
	}
}

// Для всего что использует только x,y
class strPUSH{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}
}


var AstMatr = [];
var OtkSpisok = [];
var ZakSpisok = [];
function Matr()
{
	for (var i = 0; i < nnum; i++)
	{
		AstMatr[i] = [];
		for (var j = 0; j < nnum; j++)
		{
			AstMatr[i][j] = new Info(1,0,0,0,0,0);
			
		}
	}


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
			element.addEventListener("click", handle);

			let elGrid = document.createElement("div");
			elGrid.className = "el-grid";


			let elTop = document.createElement("div");
			elTop.className = "el-top";

			let elTopLeft = document.createElement("div");
			elTopLeft.className = "el-left";
			elTopLeft.innerText = "F";
			elTop.appendChild(elTopLeft);

			let elBottom = document.createElement("div");
			elBottom.className = "el-bottom";

			let elBottomLeft = document.createElement("div");
			elBottomLeft.className = "el-left";
			elBottomLeft.innerText = "G";
			let elBottomRight = document.createElement("div");
			elBottomRight.className = "el-right";
			elBottomRight.innerText = "H";

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



//переменная отвечающая за координаты Начала
var startMatrix = new strPUSH(0,0);
var finishMatrix = new strPUSH(0,0);




// Покраска тем блокам таблицы на которые нажали кнопкой мыши после кнопки "Начало", "Стена", "Конец".
function handle(e) {
	let start = document.querySelector(".elem.start");
	let finish = document.querySelector(".elem.finish");

	if (mode == "start" && e.target != finish && !e.target.classList.contains("wall")) {

		if (start && e.target != start) 
		{
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
}












// ------ Здесь можно сказать начинается алгоритм(РЕАЛЬНАЯ ЖОПА) -------



//Ожидание нажатия кнопки Подтвердить ввод
let hiddenbut = document.querySelector('.hiddenbut');
hiddenbut.addEventListener('click', SpacePress);


// Эвристика созданная хорошим человек, но теперь я сделаю для неё новое название. 
function NewYork(pos0, pos1) 
{
	
	let d1 = Math.abs(finishMatrix.x - pos0)
	let d2 = Math.abs(finishMatrix.y - pos1);
	return (d1 + d2) * 10;
}


// Проверка закрытого используется для того чтобы не пушить клетки которые уже были обработаны
function proverkaZak(prov)
{
	for (let i = 0; i<ZakSpisok.length; i++)
	{
		if (prov.x == ZakSpisok[i].x && prov.y == ZakSpisok[i].y)
		{
			return 1;
		}
	}
	return 0;
}



function proverkaOtk(prov)
{
	for (let i = 0; i<OtkSpisok.length; i++)
	{
		if (prov.x == OtkSpisok[i].x && prov.y == OtkSpisok[i].y)
		{
			return 1;
		}
	}
	return 0;
}



// Обновление значений в визуале
function updatevalues(dlina1,dlina2)
{
	let time;
	let timex;
	let timey;
	for (let i = dlina1-1; i<dlina2; i++)
	{
		timex = OtkSpisok[i].x; 
		timey = OtkSpisok[i].y;
		time = document.querySelector(`td[row = "${timex}"][column = "${timey}"]`);
		if (timex == 4 && timey == 1)
		{
			console.log(OtkSpisok);
			console.log(AstMatr[timex][timey].F);
			console.log(AstMatr[timex][timey].G);
			console.log(AstMatr[timex][timey].H);
		}
		time.querySelector(".el-top .el-left").innerText = AstMatr[timex][timey].F;
		time.querySelector(".el-bottom .el-left").innerText = AstMatr[timex][timey].G;
		time.querySelector(".el-bottom .el-right").innerText = AstMatr[timex][timey].H;
	}
}


let type;
let paaaar;

// Функция проверки соседй и всё что с ними связано(сердце алгоритма)
function proverkaSosedei(tochka)
{
	
	// Чтобы JS не творил хуйню с преобразованием типов
	let x = parseInt(tochka.x, 10);
	let y = parseInt(tochka.y, 10);
	paaaar = 0;
	
	
	// Алгоритм всех различных проверок!
	


	//Диагональ Вверх - влево
	if (x - 1 >= 0 && y - 1 >=0 && AstMatr[x - 1][y - 1].value !=0 && proverkaZak(new strPUSH(x-1,y-1)) == 0)
	{
		if (proverkaOtk(new strPUSH(x-1,y-1)) == 0) // клетка не в открытом списке
		{
			AstMatr[x - 1][y - 1].roditelX = x;
			AstMatr[x - 1][y - 1].roditelY = y;
			AstMatr[x - 1][y - 1].G = 14 + AstMatr[x][y].G;
			AstMatr[x - 1][y - 1].H = NewYork(x-1,y-1);
			AstMatr[x - 1][y - 1].F = AstMatr[x - 1][y - 1].H + AstMatr[x - 1][y - 1].G;
			OtkSpisok.push(new strPUSH(x-1,y-1));
			if (x-1 == finishMatrix.x && y-1 == finishMatrix.y)
			{
				paaaar = 1;
				return paaaar;
			}
		}
		else if (AstMatr[x][y].G + 14 < AstMatr[x-1][y-1].G)
		{
			AstMatr[x - 1][y - 1].roditelX = x;
			AstMatr[x - 1][y - 1].roditelY = y;
			AstMatr[x - 1][y - 1].G = AstMatr[x][y] + 14;
			AstMatr[x - 1][y - 1].F = AstMatr[x - 1][y - 1].H + AstMatr[x - 1][y - 1].G;
		}
	}

	// Вверх
	if (x - 1 >= 0 && AstMatr[x - 1][y].value !=0 && proverkaZak(new strPUSH(x-1,y)) == 0)
	{
		if (proverkaOtk(new strPUSH(x-1,y)) == 0)
		{
			AstMatr[x - 1][y].roditelX = x;
			AstMatr[x - 1][y].roditelY = y;
			AstMatr[x - 1][y].G = 10 + AstMatr[x][y].G;
			AstMatr[x - 1][y].H = NewYork(x-1,y);
			AstMatr[x - 1][y].F = AstMatr[x - 1][y].H + AstMatr[x - 1][y].G;
			OtkSpisok.push(new strPUSH(x-1,y));
			if (x-1 == finishMatrix.x && y == finishMatrix.y)
			{
				paaaar = 1;
				return paaaar;
			}
		}
		else if (AstMatr[x][y].G + 10 < AstMatr[x - 1][y].G)
		{
			AstMatr[x - 1][y].roditelX = x;
			AstMatr[x - 1][y].roditelY = y;
			AstMatr[x - 1][y].G = AstMatr[x][y] + 10;
			AstMatr[x - 1][y].F = AstMatr[x - 1][y].H + AstMatr[x - 1][y].G;
		}
	}

	// Диагональ вверх-вправо
	if (x - 1 >= 0 && y + 1 <nnum && AstMatr[x - 1][y + 1].value !=0 && proverkaZak(new strPUSH(x-1, y+1)) == 0)
	{
		if (proverkaOtk(new strPUSH(x-1, y+1)) == 0)
		{
			AstMatr[x - 1][y + 1].roditelX = x;
			AstMatr[x - 1][y + 1].roditelY = y;
			AstMatr[x - 1][y + 1].G = 14 + AstMatr[x][y].G;
			AstMatr[x - 1][y + 1].H = NewYork(x-1,y+1);
			AstMatr[x - 1][y + 1].F = AstMatr[x - 1][y + 1].H + AstMatr[x - 1][y + 1].G;
			OtkSpisok.push(new strPUSH(x-1,y+1));
			if (x-1 == finishMatrix.x && y+1 == finishMatrix.y)
			{
				paaaar = 1;
				return paaaar;
			}
		}
		else if (AstMatr[x][y].G + 14 < AstMatr[x-1][y+1].G)
		{
			AstMatr[x - 1][y+1].roditelX = x;
			AstMatr[x - 1][y+1].roditelY = y;
			AstMatr[x - 1][y+1].G = AstMatr[x][y] + 14;
			AstMatr[x - 1][y+1].F = AstMatr[x - 1][y+1].H + AstMatr[x - 1][y+1].G;
		}
	}

	//ВПРАВО
	if (y + 1 < nnum && AstMatr[x][y + 1].value !=0 && proverkaZak(new strPUSH(x,y+1)) == 0)
	{
		if (proverkaOtk(new strPUSH(x, y+1)) == 0)
		{
			AstMatr[x][y + 1].roditelX = x;
			AstMatr[x][y + 1].roditelY = y;
			AstMatr[x][y + 1].G = 10 + AstMatr[x][y].G;
			AstMatr[x][y + 1].H = NewYork(x,y+1);
			AstMatr[x][y + 1].F = AstMatr[x][y + 1].H + AstMatr[x][y + 1].G;
			OtkSpisok.push(new strPUSH(x,y+1));
			if (x == finishMatrix.x && y+1 == finishMatrix.y)
			{
				paaaar = 1;
				return paaaar;
			}
		}
		else if (AstMatr[x][y].G + 10 < AstMatr[x][y+1].G)
		{
			AstMatr[x][y+1].roditelX = x;
			AstMatr[x][y+1].roditelY = y;
			AstMatr[x][y+1].G = AstMatr[x][y] + 10;
			AstMatr[x][y+1].F = AstMatr[x][y+1].H + AstMatr[x][y+1].G;
		}
	}

	// Диагональ вниз-право
	if (x + 1 < nnum && y + 1 < nnum && AstMatr[x + 1][y + 1].value !=0 && proverkaZak(new strPUSH(x+1,y+1)) == 0)
	{
		if (proverkaOtk(new strPUSH(x+1, y+1)) == 0)
		{
			AstMatr[x + 1][y + 1].roditelX = x;
			AstMatr[x + 1][y + 1].roditelY = y;
			AstMatr[x + 1][y + 1].G = 14 + AstMatr[x][y].G;
			AstMatr[x + 1][y + 1].H = NewYork(x+1, y+1);
			AstMatr[x + 1][y + 1].F = AstMatr[x + 1][y + 1].H + AstMatr[x + 1][y + 1].G;
			OtkSpisok.push(new strPUSH(x+1, y+1));
			if (x+1 == finishMatrix.x && y+1 == finishMatrix.y)
			{
				paaaar = 1;
				return paaaar;
			}
		}
		else if (AstMatr[x][y] + 14 < AstMatr[x+1][y+1])
		{
			AstMatr[x+1][y+1].roditelX = x;
			AstMatr[x+1][y+1].roditelY = y;
			AstMatr[x+1][y+1].G = AstMatr[x][y] + 14;
			AstMatr[x+1][y+1].F = AstMatr[x+1][y+1].H + AstMatr[x+1][y+1].G;
		}
	}

	// Вниз
	if (x + 1 < nnum && AstMatr[x+1][y].value !=0 && proverkaZak(new strPUSH(x+1,y)) == 0)
	{
		if ((proverkaOtk(new strPUSH(x+1, y)) == 0))
		{
			AstMatr[x + 1][y].roditelX = x;
			AstMatr[x + 1][y].roditelY = y;
			AstMatr[x + 1][y].G = 10 + AstMatr[x][y].G;
			AstMatr[x + 1][y].H = NewYork(x+1, y);
			AstMatr[x + 1][y].F = AstMatr[x + 1][y].H + AstMatr[x + 1][y].G;
			OtkSpisok.push(new strPUSH(x+1, y));
			if (x+1 == finishMatrix.x && y == finishMatrix.y)
			{
				paaaar = 1;
				return paaaar;
			}
		}
		else if (AstMatr[x][y] + 10 < AstMatr[x+1][y])
		{
			AstMatr[x+1][y].roditelX = x;
			AstMatr[x+1][y].roditelY = y;
			AstMatr[x+1][y].G = AstMatr[x][y] + 10;
			AstMatr[x+1][y].F = AstMatr[x+1][y].H + AstMatr[x+1][y].G;
		}
	}

	// Диагональ вниз-влево
	if (x + 1 < nnum && y - 1 >= 0 && AstMatr[x + 1][y - 1].value !=0 && proverkaZak(new strPUSH(x+1,y-1)) == 0)
	{
		if (proverkaOtk(new strPUSH(x+1, y-1)) == 0)
		{
			AstMatr[x + 1][y - 1].roditelX = x;
			AstMatr[x + 1][y - 1].roditelY = y;
			AstMatr[x + 1][y - 1].G = 14 + AstMatr[x][y].G;
			AstMatr[x + 1][y - 1].H = NewYork(x+1, y-1);
			AstMatr[x + 1][y - 1].F = AstMatr[x + 1][y - 1].H + AstMatr[x + 1][y - 1].G;
			OtkSpisok.push(new strPUSH(x+1, y-1));
			if (x+1 == finishMatrix.x && y-1 == finishMatrix.y)
			{
				paaaar = 1;
				return paaaar;
			}
		}
		else if (AstMatr[x][y] + 14 < AstMatr[x+1][y-1])
		{
			AstMatr[x+1][y-1].roditelX = x;
			AstMatr[x+1][y-1].roditelY = y;
			AstMatr[x+1][y-1].G = AstMatr[x][y] + 14;
			AstMatr[x+1][y-1].F = AstMatr[x+1][y-1].H + AstMatr[x+1][y-1].G;
		}
	}

	//Влево
	if (y - 1 >= 0 && AstMatr[x][y-1].value !=0 && proverkaZak(new strPUSH(x,y-1)) == 0)
	{
		if (proverkaOtk(new strPUSH(x, y-1)) == 0)
		{
			AstMatr[x][y - 1].roditelX = x;
			AstMatr[x][y - 1].roditelY = y;
			AstMatr[x][y - 1].G = 10 + AstMatr[x][y].G;
			AstMatr[x][y - 1].H = NewYork(x, y-1);
			AstMatr[x][y - 1].F = AstMatr[x][y - 1].H + AstMatr[x][y - 1].G;
			OtkSpisok.push(new strPUSH(x, y-1));
			if (x == finishMatrix.x && y-1 == finishMatrix.y)
			{
				paaaar = 1;
				return paaaar;
			}
		}
		else if (AstMatr[x][y] + 10 < AstMatr[x][y-1])
		{
			AstMatr[x][y-1].roditelX = x;
			AstMatr[x][y-1].roditelY = y;
			AstMatr[x][y-1].G = AstMatr[x][y] + 10;
			AstMatr[x][y-1].F = AstMatr[x][y-1].H + AstMatr[x][y-1].G;
		}
	}


	OtkSpisok.shift();
	ZakSpisok.push(new strPUSH(x,y));
	return 0;
}





//Достаём мининимум из Открытого списка.
function MINOTK(target) {
	let px;
	let py;
	let min = 999999999; 
	for (let i=0; i<target.length; i++)
	{
		px = target[i].x;
		py = target[i].y;
		if (AstMatr[px][py].F <= min)
		{
			min = AstMatr[px][py].F;
			save = new strPUSH(px,py); //Использую этот класс просто потому что там есть x,y
		}
	}
	return (save)
}


// Если нашли то выведем что нибудь другое, это просто тест
function stop()
{
	console.log("STOPStOPSTOPSTOPSTOP")
}




let dlina1;
let dlina2;

// функция алгоритма A*
function Astar()
{
	// Установка старта в поля для AST MATR;
	AstMatr[startMatrix.x][startMatrix.y].roditelX = "lol";
	AstMatr[startMatrix.x][startMatrix.y].roditelY = "lol";
	let r;
	OtkSpisok.push(new strPUSH(startMatrix.x, startMatrix.y));


	while(OtkSpisok.length > 0)
	{
		console.log(OtkSpisok);
		//Функция минимума(Возращает переменную с координатами x;y)
		min = MINOTK(OtkSpisok);
		dlina1 = OtkSpisok.length;
		r = proverkaSosedei(min);
		dlina2 = OtkSpisok.length;
		console.log(OtkSpisok);

		updatevalues(dlina1,dlina2);
		//Проверка если мы запушили наш финиш oxxxx]====> значит нашли путь
		if (r == 1)
		{
			stop();
			console.log(OtkSpisok);
			console.log(AstMatr);
			return true;
		}
		else if (OtkSpisok.length <= 0)
		{
			stop();
			console.log(OtkSpisok);
			console.log(AstMatr);
			return true;
		}
		
	}

}


function SpacePress() {
	document.getElementById("228").innerHTML="Нажмите пробел чтобы начать выполнение алгоритма !!!";


	document.body.addEventListener("keydown", function(e){
	if (e.code == "Space") 
	{
		Astar();
		document.getElementById("228").innerHTML="Алгоритм выполнился!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
	}
	});
}

