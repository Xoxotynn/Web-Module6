function checkNeighborsDiagonal(tochka) {

	let x = parseInt(tochka.x, 10);
	let y = parseInt(tochka.y, 10);


	OtkSpisok.splice(index, 1);
	ZakSpisok.push(new strPUSH(x, y));

	// -----------------------------------------Алгоритм всех различных проверок!-------------------------------------------------

	//Диагональ Вверх - влево
	if (x - 1 >= 0 && y - 1 >= 0 && AstMatr[x - 1][y - 1].value != 0 && checkClosed(new strPUSH(x - 1, y - 1)) == 0) {
		if (checkOpen(new strPUSH(x - 1, y - 1)) == 0) // клетка не в открытом списке
		{
			AstMatr[x - 1][y - 1].roditelX = x;
			AstMatr[x - 1][y - 1].roditelY = y;
			AstMatr[x - 1][y - 1].G = 14 + AstMatr[x][y].G;
			AstMatr[x - 1][y - 1].H = Chebishev(x - 1, y - 1);
			AstMatr[x - 1][y - 1].F = AstMatr[x - 1][y - 1].H + AstMatr[x - 1][y - 1].G;
			OtkSpisok.push(new strPUSH(x-1,y-1));
			document.querySelector(`td[row = "${x-1}"][column = "${y-1}"]`).classList.add("notopen");

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
	if (x - 1 >= 0 && AstMatr[x - 1][y].value != 0 && checkClosed(new strPUSH(x - 1, y)) == 0) {
		if (checkOpen(new strPUSH(x - 1, y)) == 0) {
			AstMatr[x - 1][y].roditelX = x;
			AstMatr[x - 1][y].roditelY = y;
			AstMatr[x - 1][y].G = 10 + AstMatr[x][y].G;
			AstMatr[x - 1][y].H = Chebishev(x - 1, y);
			AstMatr[x - 1][y].F = AstMatr[x - 1][y].H + AstMatr[x - 1][y].G;

			OtkSpisok.push(new strPUSH(x-1,y));
			document.querySelector(`td[row = "${x-1}"][column = "${y}"]`).classList.add("notopen");
			if (x-1 == finishMatrix.x && y == finishMatrix.y)
			{
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
	if (x - 1 >= 0 && y + 1 < nnum && AstMatr[x - 1][y + 1].value != 0 && checkClosed(new strPUSH(x - 1, y + 1)) == 0) {
		if (checkOpen(new strPUSH(x - 1, y + 1)) == 0) {
			AstMatr[x - 1][y + 1].roditelX = x;
			AstMatr[x - 1][y + 1].roditelY = y;
			AstMatr[x - 1][y + 1].G = 14 + AstMatr[x][y].G;
			AstMatr[x - 1][y + 1].H = Chebishev(x - 1, y + 1);
			AstMatr[x - 1][y + 1].F = AstMatr[x - 1][y + 1].H + AstMatr[x - 1][y + 1].G;
			OtkSpisok.push(new strPUSH(x-1,y+1));
			document.querySelector(`td[row = "${x-1}"][column = "${y+1}"]`).classList.add("notopen");
			if (x-1 == finishMatrix.x && y+1 == finishMatrix.y)
			{
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
	if (y + 1 < nnum && AstMatr[x][y + 1].value != 0 && checkClosed(new strPUSH(x, y + 1)) == 0) {
		if (checkOpen(new strPUSH(x, y + 1)) == 0) {
			AstMatr[x][y + 1].roditelX = x;
			AstMatr[x][y + 1].roditelY = y;
			AstMatr[x][y + 1].G = 10 + AstMatr[x][y].G;
			AstMatr[x][y + 1].H = Chebishev(x, y + 1);
			AstMatr[x][y + 1].F = AstMatr[x][y + 1].H + AstMatr[x][y + 1].G;
			OtkSpisok.push(new strPUSH(x,y+1));
			document.querySelector(`td[row = "${x}"][column = "${y+1}"]`).classList.add("notopen");
			if (x == finishMatrix.x && y+1 == finishMatrix.y)
			{
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
	if (x + 1 < nnum && y + 1 < nnum && AstMatr[x + 1][y + 1].value != 0 && checkClosed(new strPUSH(x + 1, y + 1)) == 0) {
		if (checkOpen(new strPUSH(x + 1, y + 1)) == 0) {
			AstMatr[x + 1][y + 1].roditelX = x;
			AstMatr[x + 1][y + 1].roditelY = y;
			AstMatr[x + 1][y + 1].G = 14 + AstMatr[x][y].G;
			AstMatr[x + 1][y + 1].H = Chebishev(x + 1, y + 1);
			AstMatr[x + 1][y + 1].F = AstMatr[x + 1][y + 1].H + AstMatr[x + 1][y + 1].G;
			OtkSpisok.push(new strPUSH(x+1, y+1));
			document.querySelector(`td[row = "${x+1}"][column = "${y+1}"]`).classList.add("notopen");
			if (x+1 == finishMatrix.x && y+1 == finishMatrix.y)
			{
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
	if (x + 1 < nnum && AstMatr[x + 1][y].value != 0 && checkClosed(new strPUSH(x + 1, y)) == 0) {
		if ((checkOpen(new strPUSH(x + 1, y)) == 0)) {
			AstMatr[x + 1][y].roditelX = x;
			AstMatr[x + 1][y].roditelY = y;
			AstMatr[x + 1][y].G = 10 + AstMatr[x][y].G;
			AstMatr[x + 1][y].H = Chebishev(x + 1, y);
			AstMatr[x + 1][y].F = AstMatr[x + 1][y].H + AstMatr[x + 1][y].G;
			OtkSpisok.push(new strPUSH(x+1, y));
			document.querySelector(`td[row = "${x+1}"][column = "${y}"]`).classList.add("notopen");;
			if (x+1 == finishMatrix.x && y == finishMatrix.y)
			{
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
	if (x + 1 < nnum && y - 1 >= 0 && AstMatr[x + 1][y - 1].value != 0 && checkClosed(new strPUSH(x + 1, y - 1)) == 0) {
		if (checkOpen(new strPUSH(x + 1, y - 1)) == 0) {
			AstMatr[x + 1][y - 1].roditelX = x;
			AstMatr[x + 1][y - 1].roditelY = y;
			AstMatr[x + 1][y - 1].G = 14 + AstMatr[x][y].G;
			AstMatr[x + 1][y - 1].H = Chebishev(x + 1, y - 1);
			AstMatr[x + 1][y - 1].F = AstMatr[x + 1][y - 1].H + AstMatr[x + 1][y - 1].G;
			OtkSpisok.push(new strPUSH(x+1, y-1));
			document.querySelector(`td[row = "${x+1}"][column = "${y-1}"]`).classList.add("notopen");

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
	if (y - 1 >= 0 && AstMatr[x][y - 1].value != 0 && checkClosed(new strPUSH(x, y - 1)) == 0) {
		if (checkOpen(new strPUSH(x, y - 1)) == 0) {
			AstMatr[x][y - 1].roditelX = x;
			AstMatr[x][y - 1].roditelY = y;
			AstMatr[x][y - 1].G = 10 + AstMatr[x][y].G;
			AstMatr[x][y - 1].H = Chebishev(x, y - 1);
			AstMatr[x][y - 1].F = AstMatr[x][y - 1].H + AstMatr[x][y - 1].G;
			OtkSpisok.push(new strPUSH(x, y-1));
			document.querySelector(`td[row = "${x}"][column = "${y-1}"]`).classList.add("notopen");
			if (x == finishMatrix.x && y-1 == finishMatrix.y)
			{
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

function checkNeighborsVertical(tochka) {

	let x = parseInt(tochka.x, 10);
	let y = parseInt(tochka.y, 10);


	OtkSpisok.splice(index, 1);
	ZakSpisok.push(new strPUSH(x, y));
	// Алгоритм всех различных проверок!

	// Вверх
	if (x - 1 >= 0 && AstMatr[x - 1][y].value != 0 && checkClosed(new strPUSH(x - 1, y)) == 0) {
		if (checkOpen(new strPUSH(x - 1, y)) == 0) {
			AstMatr[x - 1][y].roditelX = x;
			AstMatr[x - 1][y].roditelY = y;
			AstMatr[x - 1][y].G = 10 + AstMatr[x][y].G;
			AstMatr[x - 1][y].H = Chebishev(x - 1, y);
			AstMatr[x - 1][y].F = AstMatr[x - 1][y].H + AstMatr[x - 1][y].G;
			OtkSpisok.push(new strPUSH(x-1,y));
			document.querySelector(`td[row = "${x-1}"][column = "${y}"]`).classList.add("notopen");
			if (x-1 == finishMatrix.x && y == finishMatrix.y)
			{
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
	if (y + 1 < nnum && AstMatr[x][y + 1].value != 0 && checkClosed(new strPUSH(x, y + 1)) == 0) {
		if (checkOpen(new strPUSH(x, y + 1)) == 0) {
			AstMatr[x][y + 1].roditelX = x;
			AstMatr[x][y + 1].roditelY = y;
			AstMatr[x][y + 1].G = 10 + AstMatr[x][y].G;
			AstMatr[x][y + 1].H = Chebishev(x, y + 1);
			AstMatr[x][y + 1].F = AstMatr[x][y + 1].H + AstMatr[x][y + 1].G;
			OtkSpisok.push(new strPUSH(x,y+1));
			document.querySelector(`td[row = "${x}"][column = "${y+1}"]`).classList.add("notopen");
			if (x == finishMatrix.x && y+1 == finishMatrix.y)
			{
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
	if (x + 1 < nnum && AstMatr[x + 1][y].value != 0 && checkClosed(new strPUSH(x + 1, y)) == 0) {
		if ((checkOpen(new strPUSH(x + 1, y)) == 0)) {
			AstMatr[x + 1][y].roditelX = x;
			AstMatr[x + 1][y].roditelY = y;
			AstMatr[x + 1][y].G = 10 + AstMatr[x][y].G;
			AstMatr[x + 1][y].H = Chebishev(x + 1, y);
			AstMatr[x + 1][y].F = AstMatr[x + 1][y].H + AstMatr[x + 1][y].G;
			OtkSpisok.push(new strPUSH(x+1, y));
			document.querySelector(`td[row = "${x+1}"][column = "${y}"]`).classList.add("notopen");
			if (x+1 == finishMatrix.x && y == finishMatrix.y)
			{
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
	if (y - 1 >= 0 && AstMatr[x][y - 1].value != 0 && checkClosed(new strPUSH(x, y - 1)) == 0) {
		if (checkOpen(new strPUSH(x, y - 1)) == 0) {
			AstMatr[x][y - 1].roditelX = x;
			AstMatr[x][y - 1].roditelY = y;
			AstMatr[x][y - 1].G = 10 + AstMatr[x][y].G;
			AstMatr[x][y - 1].H = Chebishev(x, y - 1);
			AstMatr[x][y - 1].F = AstMatr[x][y - 1].H + AstMatr[x][y - 1].G;
			OtkSpisok.push(new strPUSH(x, y-1));
			document.querySelector(`td[row = "${x}"][column = "${y-1}"]`).classList.add("notopen");
			if (x == finishMatrix.x && y-1 == finishMatrix.y)
			{
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