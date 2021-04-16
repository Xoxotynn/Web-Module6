//Коэффиценты
let A = 3;
let B = 1;

// переменная сохранения индекса
let current;

var ants;

// константа высыхания
const dryingOut = 0.7;

// Константа Q
const Qfordrying = 240;


var antsAmount;
let testtime;
let best;
let min = 999999999999;
let summ;
function updatePheromons()
{
    testtime = 0;
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


// Рисование пути
function drawWay()
{
    let colorLine = "#62B5BB";
    context.lineWidth = 2;
    if (points.length != 0)
    {
        context.stroke();
    }
    for (let i = 1; i < points.length; i++) {
        context.beginPath();
        context.moveTo(points[best[i-1]].x, points[best[i-1]].y);
        context.lineTo(points[best[i]].x, points[best[i]].y);
        context.strokeStyle = colorLine;
        context.stroke();
    }
    if (points.length != 0)
    {
        context.beginPath();
        context.moveTo(points[best[best.length-1]].x, points[best[best.length-1]].y);
        context.lineTo(points[best[best.length-2]].x, points[best[best.length-2]].y);
        context.strokeStyle = colorLine;
        context.stroke();
    }
}

// Функция итераций в данном случае Отталкиваемся от кол-ва вершин. Можно будет сделать статику, но не желательно.
function ant()
{
    let amountIteration = tops * 6;
    for (let kolvo = 0; kolvo < amountIteration; kolvo++)
    {
        bundle();  
        updatePheromons();  
    }
    drawWay();
}


//Рулетка с возвращением индекса
function random(visited)
{

    rand = Math.random();
    sum = 0;
    for (let returnourValue = 0; returnourValue< visited.length; returnourValue++)
    {
        sum += visited[returnourValue].ver;
        
        if (sum >= rand)
        {
            return returnourValue;
        }
    }
}


// формирование различных маршрутов
function bundle()
{
    ants = [];
    antsAmount = tops * 3;
    for (let i = 0; i < antsAmount; i++)
    {
        let visited = [];
        let way = [];
        let current = Math.floor(Math.random() * (tops));
        way.push(current);
        for (let p = 0; p <tops; p++)
        {
            visited.push(new wayfor(p, AstMatr[current][p].distance,AstMatr[current][p].pheromons, AstMatr[current][p].vlech));
        }
        
        visited.splice(current, 1);
        while (visited.length !=0)
        {
            summ = 0;

            for (let j = 0; j<visited.length; j++)
            {
                summ = Math.pow(AstMatr[current][visited[j].indexInMatr].pheromons, A) * Math.pow(AstMatr[current][visited[j].indexInMatr].vlech, B);
            }


            for (let pol = 0; pol< visited.length; pol++)
            {
                visited[pol].ver = Math.pow(AstMatr[current][visited[pol].indexInMatr].pheromons, A) * Math.pow(AstMatr[current][visited[pol].indexInMatr].vlech, B) / summ;
            }
            let ind1 = random(visited);
            current = visited[ind1].indexInMatr;
            way.push(current);
            visited.splice(ind1,1);
        }
        way.push(way[0]);
        ants.push(way);
    }
}