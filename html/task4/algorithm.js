// Класс для function. Удобство + необходимость
class wayfor{
    constructor (indexInMatr, distance, pheromons, ver)
    {
        this.indexInMatr = indexInMatr;
        this.distance = distance;
        this.pheromons = pheromons;
        this.ver = ver;
    }
}

//Коэффиценты
const A = 1;
const B = 3;
// константа высыхания
const dryingOut = 0.7;
// Константа Q
const Qfordrying = 240;

// переменная сохранения индекса
let current;

var ants;
var antsAmount;
let testtime;
let best;
let min = Number.MAX_VALUE;

// Функция итераций в данном случае Отталкиваемся от кол-ва вершин. Можно будет сделать статику, но не желательно.
function ant()
{
    let amountIteration = pointsCount * 6;
    for (let kolvo = 0; kolvo < amountIteration; kolvo++)
    {
        bundle();  
        updatePheromons();
    }
    drawWay();
}

// формирование различных маршрутов
function bundle()
{
    ants = [];
    antsAmount = pointsCount * 3;
    for (let i = 0; i < antsAmount; i++)
    {
        let visited = [];
        let way = [];
        let current = Math.floor(Math.random() * (pointsCount));
        way.push(current);
        for (let p = 0; p < pointsCount; p++)
        {
            visited.push(new wayfor(p, AstMatr[current][p].distance, AstMatr[current][p].pheromons, AstMatr[current][p].vlech));
        }
        
        visited.splice(current, 1);

        while (visited.length !=0)
        {
            let summ = 0

            for (let j = 0; j < visited.length; j++)
            {
                summ += Math.pow(AstMatr[current][visited[j].indexInMatr].pheromons, A)
                      * Math.pow(AstMatr[current][visited[j].indexInMatr].vlech, B);
            }


            for (let pol = 0; pol< visited.length; pol++)
            {
                visited[pol].ver = Math.pow(AstMatr[current][visited[pol].indexInMatr].pheromons, A)
                                 * Math.pow(AstMatr[current][visited[pol].indexInMatr].vlech, B) / summ;
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

function updatePheromons()
{
    testtime = 0;
    for (let i = 0; i < pointsCount; i++)
    {
        for (let j = 0; j < pointsCount; j++)
        {
            AstMatr[i][j].pheromons *= dryingOut;

        }
    }

    for (let i = 0; i < antsAmount; i++)
    {
        for (let j = 0; j < pointsCount; j++)
        {
            first = ants[i][j];
            second = ants[i][j+1]; 
            testtime += AstMatr[first][second].distance;
        }
        if (testtime < min)
        {
            min = testtime;
            best = ants[i];
        }

        for (let k = 0; k < pointsCount; k++)
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

function drawWay()
{
    let colorLine = "#62B5BB";
    context.lineWidth = 2;
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
    return visited.length-1;
}