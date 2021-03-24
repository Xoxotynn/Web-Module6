const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 500;
const canvas1 = document.getElementById("start");
const context1 = canvas1.getContext("2d");
canvas1.width = 700;
canvas1.height = 500;
let points = [];
let matrix = [];
let MassStartPointDist = [];
const clearC = document.getElementById("clear");
clearC.addEventListener("click", ClearCanvas);
canvas1.addEventListener("click", addUserPoint);
function ClearCanvas() {
    context1.clearRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
}
let flag = 0;
const start1 = document.getElementById("startPoint");
start1.addEventListener("click", drawStart);
function drawStart() {
    flag = 1;
}
const notStart = document.getElementById("NotStart");
NotStart.addEventListener("click", drawNotStart);
function drawNotStart() {
    flag = 0;
}


let PercentOf = 80;
let genetation = 100;


function distSP() {
    let MassStartPointDist = [];
    for (let i = 0; i < points.length; i++) {
        MassStartPointDist[i] = distance(StartPoint, points[i]);
    }
    return MassStartPointDist;
}
function CreateMatrix(num) {
    let matrix = [];
    for (let i = 0; i < num; i++) {
        let res = []
        for (let j = 0; j < num; j++) {
            matrix.push(res);
            matrix[i][j] = distance(points[i], points[j]);
        }
    }
    return matrix;
}

function distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
} 

function AllDistance(mass) {
    let dist = MassStartPointDist[mass[0].index] + MassStartPointDist[mass[mass.length - 1].index];
    for (let i = 1; i < mass.length; i++) {
            dist += matrix[mass[i-1].index][mass[i].index];
        
    }
    //console.log(dist);
    return dist;
}

//------Начало алгоритма-----


function GenAlg() {
    MassStartPointDist = distSP();
    matrix = CreateMatrix(points.length);
    let ways = [];
    for (let i = 0; i < points.length; i++) {
        let wayi = { arr: [], dist: 0 };
        let temp = shuffle(points).slice();
        wayi.arr = temp; 
        let distI = AllDistance(wayi.arr);
        wayi.dist = distI;
        ways.push(wayi);
    }
    SortByDistance(ways);
    //ways = ways.slice(0, points.length);
    for (let i = 0; i < genetation; i++) {
        ways = Crossbreedein(ways);
        let DistanceI = AllDistance(ways[0].arr);
        drawStartPoint(StartPoint);
        DrawBestWay(ways[0].arr);
    }
    
    console.log(ways[0].arr);
    let BestDistance = AllDistance(ways[0].arr);
    DrawBestWay(ways[0].arr);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// function shuffle(arr){
//     arrr = arr.sort((a, b) => 0.5 - Math.random());
//     return arrr;
// }

function SortByDistance(arr) {
    arr.sort((a, b) => a.dist > b.dist ? 1 : -1);
}

//-----Новое поколение----

function NewGenetation(ways, SonW_1, SonW_2) {
    let wayi = { arr: [], dist: 0 };
    wayi.arr = SonW_1;
    wayi.dist = AllDistance(SonW_1);
    ways.push(wayi);
    wayi.arr = SonW_2;
    wayi.dist = AllDistance(SonW_2);
    ways.push(wayi);
    SortByDistance(ways);
    console.log('====+==+==+=+++====+');
    console.log(points.length);
    ways = ways.slice(0, points.length);
    return ways;
}

function GetRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


//-------Функция скрещивания--------

function Crossbreedein(ways) {
    let father = GetRandom(0, ways.length);
    let mother = GetRandom(0, ways.length);
    while (father == mother) {
        mother = GetRandom(0, ways.length);
    }
    let MWay = ways[mother];
    let FWay = ways[father];
    let len = ways.length;
    let x = 0;
    console.log('=======');
    console.log(ways);
    while (x < len && MWay.arr[x].index == FWay.arr[x].index) {
        x++
    }
    let SonW_1 = []; let SonW_2 = [];
    if (x != len)
    {
        x++;
    }

    for (let i = 0; i < x; i++) {
        SonW_1.push(MWay.arr[i]);
        SonW_2.push(FWay.arr[i]);
    }

    for (let i = x ; i < len; i++) {
        let count1 = 0;
        let count2 = 0;
        for (let j = 0; j < x; j++) {
            if (FWay.arr[i].index != MWay.arr[j].index) {
                count1++;
            }
            if (FWay.arr[j].index != MWay.arr[i].index) {
                count2++;
            }
        }
        if (count1 == x ) {
            SonW_1.push(FWay.arr[i]);
        }
        if (count2 == x ) {
            SonW_2.push(MWay.arr[i]);;
        }
    }
    if (SonW_1.length < len) {
        for (let i = 0; i < x; i++) {
            for (let j = x; j < len; j++) {
                if (FWay.arr[i].index == MWay.arr[j].index) {
                    SonW_1.push(FWay.arr[i]);
                }
            }
        }
    }
    if (SonW_2.length < len) {
        for (let i = 0; i < x; i++) {
            for (let j = x ; j < len; j++) {
                if (FWay.arr[j].index == MWay.arr[i].index) {
                    SonW_2.push(MWay.arr[i]);
                }
            }
        }
    }
    if (GetRandom(0, 101) < PercentOf) {
        SonW_1 = Mutation(len, SonW_1)
    }
    ways = NewGenetation(ways, SonW_1, SonW_2);
    return ways;
}

//----Мутации----

function Mutation(len, SonW) {
    let index1 = GetRandom(0, len);
    let index2 = GetRandom(0, len)
    let t = SonW[index1];
    SonW[index1] = SonW[index2];
    SonW[index2] = t;
    return SonW;
}

const SWAY = document.getElementById("generateBtn");
SWAY.addEventListener("click", GenAlg);