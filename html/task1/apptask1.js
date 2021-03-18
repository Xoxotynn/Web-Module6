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

            element.setAttribute("row", i);
            element.setAttribute("column", j);
            element.addEventListener("click", handle);
            rows.append(element);
        }
        matrix.append(rows);
    }
}

// Флаг для режимов
var mode;
var buttons = document.querySelectorAll("button.setmode");
//Проходим все кпопки и присваиваем значения mode при нажатии
buttons.forEach(function(button) {
  button.addEventListener("click", function(e) {
    mode = e.target.getAttribute("mode");
  });
});



// Покраска тем блокам таблицы на которые нажали кнопкой мыши после кнопки "Начало", "Стена", "Конец".
function handle(e) 
{
    let start = document.querySelector(".elem.start");
    let finish = document.querySelector(".elem.finish");

  if (mode == "start" && e.target != finish && !e.target.classList.contains("wall"))
  {

    if (start && e.target != start) 
    {
      start.classList.remove("start");
    }

    e.target.classList.add("start");
  }



  if (mode == "wall" && e.target != start && e.target != finish) 
  {
    if (e.target.classList.contains("wall")) 
    {
      e.target.classList.remove("wall");
    }
    else
    {
        e.target.classList.add("wall");
    }
  }



  if (mode == "finish" && e.target != start && !e.target.classList.contains("wall")) 
  {

    if (finish && e.target != finish) 
    {
      finish.classList.remove("finish");
    }

    e.target.classList.add("finish");
  }
}

