// Массив маршрута для каждого муравья
var way;

// кол-во итераций 
var amountIteration;

//Коэффиценты
const A = 1;
const B = 2;

// массив муравьёв
var ants;

// переменная сохранения индекса
let current;

// Переменная всех вероятностей для дальнейшего деления
var summ = 0;

// Кол-во муравьёв. БУДЕМ БРАТЬ КАК КоЛ_ВО ВЕРШИН
var antsAmount; //= tops;

// константа высыхания
const dryingOut = 0.9;

// Константа Q
const Qfordrying = 7;

// Массив который будет использоваться для обозначеня вершин которые мы прошли.
let visited;

// Функция обновления феромонов

let testtime;
let best;
let min = 999999999;
function updatePheromons()
{
    testtime =0 ;
    for (let i = 0; i < tops; i++)
    {
        for (let j = 0; j < tops; j++)
        {
            AstMatr[i][j].pheromons *= dryingOut;

        }
    }

    for (let i = 0; i < antsAmount; i++)
    {
        for (let j = 0; j < tops; j++)
        {
            first = ants[i][j];
            second = ants[i][j+1]; 
            testtime += AstMatr[first][second].distance;
        }
        if (testtime < min)
        {
            {
                min = testtime;
                best = ants[i];
            }
        }

        for (let k = 0; k<tops; k++)
        {
            first = ants[i][k];
            second = ants[i][k+1];
            if (first != second)
            {
                AstMatr[first][second].pheromons += Qfordrying / testtime;
                AstMatr[second][first].pheromons += Qfordrying / testtime;
        
            }
        }
        testtime = 0;
    }

}


// Класс для function. Удобство + необходимость
class wayfor{
    constructor (indexInMatr,distance,pheromons,ver)
    {
        this.indexInMatr = indexInMatr;
        this.distance = distance;
        this.pheromons = pheromons;
        this.ver = ver;
    }
}

function visual()
{
    for (let i = 0; i < tops; i++)
    {
        for (let j = 0; j < tops; j++)
        {
            AstMatr

        }
    }
}

// Функция итераций в данном случае Отталкиваемся от кол-ва вершин. Можно будет сделать статику, но не желательно.
function ant()
{
    amountIteration = tops * 3;
    for (let kolvo = 0; kolvo < amountIteration; kolvo++)
    {
        bundle();  
        updatePheromons();  
       // visual();
    }
    console.log(best);
}


//Рулетка с возвращением индекса
function random(visited)
{
    rand = Math.random();
    sum = 0;
    for (let eb = 0; eb< visited.length; eb++)
    {
        sum += visited[eb].ver;
        
        if (sum >= rand)
        {
            return eb;
        }

    }
}


// формирование различных маршрутов
function bundle()
{
    ants = [];
    antsAmount = tops + 1;
    for (let i = 0; i < antsAmount; i++)
    {
        visited = [];
        way = [];
        current = Math.floor(Math.random() * (tops));
        way.push(current);
        for (let p = 0; p <tops; p++)
        {
            visited.push(new wayfor(p, AstMatr[current][p].distance,AstMatr[current][p].pheromons, AstMatr[current][p].vlech));
        }
        
        visited.splice(current, 1);

        while (visited.length !=0)
        {
            summ = 0

            for (let j = 0; j<visited.length; j++)
            {
                summ += Math.pow(AstMatr[current][visited[j].indexInMatr].pheromons, A) * Math.pow(AstMatr[current][visited[j].indexInMatr].vlech, B);
            }


            for (let pol = 0; pol< visited.length; pol++)
            {
                visited[pol].ver = Math.pow(AstMatr[current][visited[pol].indexInMatr].pheromons, A) * Math.pow(AstMatr[current][visited[pol].indexInMatr].vlech, B) / summ;
            }
            ind = random(visited);
            current = visited[ind].indexInMatr;
            way.push(current);
            visited.splice(ind,1);
        }
        way.push(way[0]);
        ants.push(way);
    }
}