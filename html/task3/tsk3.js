
let points = [];
let matrix = [];
let MassStartPointDist = [];
const clearC = document.getElementById("clear");
clearC.addEventListener("click", ClearCanvas);
canvas1.addEventListener("click", addUserPoint);
function ClearCanvas() {
    context1.clearRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    points.splice(0, points.length);
    StartPoint = 0;
}
let flag = 0;
const start1 = document.getElementById("startPoint");
start1.addEventListener("click", () => {
    drawStart();
    choosePointType(start1);
});
function drawStart() {
    flag = 1;
}
const notStart = document.getElementById("NotStart");
notStart.addEventListener("click", () => {
    drawNotStart();
    choosePointType(notStart);
});
function drawNotStart() {
    flag = 0;
}

function choosePointType(pointTypeBtn) {
    let buttons = document.getElementsByClassName("settings")[0].children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("choosed")
    }
    pointTypeBtn.classList.add("choosed");
}


const SWAY = document.getElementById("findWayButton");
SWAY.addEventListener("click", GenAlg);


let PercentOf = 15;
let genetation, sameBest;


function distSP(p1) {
    return Math.sqrt(Math.pow(p1.x - StartPoint.x, 2) + Math.pow(p1.y - StartPoint.y, 2));
}

function distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function AllDistance(mass) {
    let dist = distSP(mass[0]) + distSP(mass[mass.length - 1]);
    for (let i = 1; i < mass.length; i++) {
        dist += distance(mass[i - 1], mass[i]);
    }
    return dist;
}

//------Начало алгоритма-----

let count = 0;
let best;
let o = 0;
let wayschild = [];

function GenAlg() {
    let ways = [];
    if (StartPoint == 0) {
        StartPoint = points[GetRandom(0, points.length)];
        points.splice(StartPoint.index, 1);
    }
    count = 0, o = 0, wayschild = [];
    genetation = Math.pow(10, points.length);
    for (let i = 0; i < points.length; i++) {
        let wayi = { arr: [], dist: 0 };
        let temp = shuffle(points).slice();
        wayi.arr = temp;
        let distI = AllDistance(wayi.arr);
        wayi.dist = distI;
        ways.push(wayi);
    }
    SortByDistance(ways);
    best = ways[0].dist;
    crossingover(ways);

}

function DrawRes(arr) {
    drawStartPoint(StartPoint);
    DrawBestWay(arr);
}

function shuffle(array) {
    for (let k = 0; k < 50; k++) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    return array;
}

function SortByDistance(arr) {
    arr.sort((a, b) => a.dist > b.dist ? 1 : -1);
}

//-----Новое поколение----


function GetRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createChildren(i, j, ways) {
    let MWay = ways[i];
    let FWay = ways[j];
    let len = ways.length;
    let SonW_1 = []; let SonW_2 = [];
    let x = GetRandom(0, len - 1);
    for (let i = 0; i < x; i++) {
        SonW_1.push(MWay.arr[i]);
        SonW_2.push(FWay.arr[i]);
    }

    for (let i = x; i < len; i++) {
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
        if (count1 == x) {
            SonW_1.push(FWay.arr[i]);
        }
        if (count2 == x) {
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
            for (let j = x; j < len; j++) {
                if (FWay.arr[j].index == MWay.arr[i].index) {
                    SonW_2.push(MWay.arr[i]);
                }
            }
        }
    }
    if (GetRandom(0, 101) <= PercentOf) {
        SonW_1 = Mutation(SonW_1)
        if (PercentOf < 40) {
            PercentOf++;
        }
    }
    if (GetRandom(0, 101) <= PercentOf) {
        SonW_2 = Mutation(SonW_2)
        if (PercentOf < 40) {
            PercentOf++;
        }
    }
    let children = { arr: [], dist: 0 };

    let temp = SonW_1.slice();
    children.arr = temp;
    children.dist = AllDistance(temp);
    wayschild.push(children);
    children = { arr: [], dist: 0 };
    let temp1 = SonW_2.slice();
    children.arr = temp1;
    children.dist = AllDistance(temp1);
    wayschild.push(children);

}
//-------Функция скрещивания--------

function crossingover(ways) {
    let DistanceI;
    setTimeout(function Name() {
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                createChildren(i, j, ways);
                count += 2;
            }
        }

        ways = ways.concat(wayschild);
        SortByDistance(ways);
        ways.splice(points.length, ways.length - points.length);
        DistanceI = AllDistance(ways[0].arr);
        if (best == DistanceI) {
            o++;
        }
        else if (best > DistanceI) {
            o = 0;
            best = DistanceI;
        }
        DrawRes(ways[0].arr);
        if (o < 60 && count < genetation) {
            setTimeout(Name, 1);
        }
        else {
            console.log('конец');
            console.log(DistanceI);
            drawStartPoint(StartPoint);
            DrawEndWay(ways[0].arr);
        }

    }, 1);
}

//----Мутации----

function Mutation(SonW) {
    let index1 = GetRandom(0, SonW.length);
    let index2 = GetRandom(0, SonW.length);
    while (index1 == index2) {
        index2 = GetRandom(0, SonW.length);
    }
    if (index1 > index2) {
        let t = index1;
        index1 = index2;
        index2 = t;
    }
    let n = Math.floor((Math.abs(index1 - index2) + 1) / 2);
    for (let i = 0; i < n; i++) {
        let t = SonW[index1 + i];
        SonW[index1 + i] = SonW[index2 - i];
        SonW[index2 - i] = t;
    }
    return SonW;
}