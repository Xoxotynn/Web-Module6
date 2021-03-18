//Переменная матрицы
const matrix = document.getElementById('matrix')

//Ожидание нажатия кнопки 
let btn = document.querySelector('button');
btn.addEventListener('click', CreateTab);


//Создание таблицы по клеткам
function CreateTab()
 {
    matrix.innerHTML='';
    matrix.hidden = false;
    let nnum = document.getElementById('nnum').value;

    for (let i = 0; i < nnum; i++) 
    {
        let rows = document.createElement('tr');

        for (let j = 0; j < nnum; j++) 
        {
            let element = document.createElement('td');
            
            element.className = "elem";
            element.name = "em";
            element.onclick;
            element.id = i*nnum+j;
            rows.append(element);
        }
        matrix.append(rows);
    }
}

// То что будет происходить при нажатии на элемент таблицы 
//(Если была нажата до этого кнопка start, то необходимо покрасить клетку в зелёный. 
//2 Вариант до этого была нажата кнопка стена, то покрасить в чёрный(по выбору).
//3 вариант: была прожата кнопка конец, то покрасить в жёлтый(по выбору)).
function obrabotka()
{
    
}