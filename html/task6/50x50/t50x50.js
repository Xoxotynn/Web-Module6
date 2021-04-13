
function init() {
    //слой 1
    let neuStart = [];
    for (let j = 0; j < 2500; j++) { //начальный нейрон
        let neuEnd = [];
        for (let k = 0; k < hiddenNeu1; k++) {  //конечный нейрон
            neuEnd.push(GetRandom(-1, 1));
        }
        neuStart.push(neuEnd);
    }
    w.push(neuStart);

    //слой 2
    neuStart = [];
    for (let j = 0; j < hiddenNeu1; j++) { //начальный нейрон
        let neuEnd = [];
        for (let k = 0; k < hiddenNeu2; k++) {  //конечный нейрон
            neuEnd.push(GetRandom(-1, 1));
        }
        neuStart.push(neuEnd);
    }
    w.push(neuStart);


    //слой 3
    neuStart = [];
    for (let j = 0; j < hiddenNeu2; j++) { //начальный нейрон
        let neuEnd = [];
        for (let k = 0; k < neuronOutput; k++) {  //конечный нейрон
            neuEnd.push(GetRandom(-1, 1));
        }
        neuStart.push(neuEnd);
    }
    w.push(neuStart);
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
function derivative(x) {
    return x * (1 - x);
}

function biasMass() {
    let b = [];
    for (let l = 0; l < hiddenNeu1; l++) {
        b.push(GetRandom(-1, 1));
    }
    bias.push(b);
    b = [];
    for (let l = 0; l < hiddenNeu2; l++) {
        b.push(GetRandom(-1, 1));
    }
    bias.push(b);
    b = [];
    for (let l = 0; l < neuronOutput; l++) {
        b.push(GetRandom(-1, 1));
    }
    bias.push(b);
}
function createDwfirst() {
    let dSt = [];
    for (let j = 0; j < 2500; j++) { //начальный нейрон
        let dEnd = [];
        for (let k = 0; k < hiddenNeu1; k++) {  //конечный нейрон
            dEnd.push(0);
        }
        dSt.push(dEnd);
    }
    dw.push(dSt);
    //слой 2
    dSt = [];
    for (let j = 0; j < hiddenNeu1; j++) { //начальный нейрон
        let dEnd = [];
        for (let k = 0; k < hiddenNeu2; k++) {  //конечный нейрон
            dEnd.push(0);
        }
        dSt.push(dEnd);
    }
    dw.push(dSt);
    //слой 3
    dSt = [];
    for (let j = 0; j < hiddenNeu2; j++) { //начальный нейрон
        let dEnd = [];
        for (let k = 0; k < neuronOutput; k++) {  //конечный нейрон
            dEnd.push(0);
        }
        dSt.push(dEnd);
    }
    dw.push(dSt);
}

function summ() {
    let hid = [];
    let hidY = [];

    for (let j = 0; j < hiddenNeu1; j++) {
        let s = 0;
        for (let i = 0; i < lenInput; i++) {
            s += neuronInput[i] * w[0][i][j];
        }
        let y = sigmoid(s + bias[0][j]);
        hidY.push(y);
        hid.push(s);
    }
    funcY.push(hidY);
    sum.push(hid);

    hid = [];
    hidY = [];
    for (let j = 0; j < hiddenNeu2; j++) {
        let s = 0;
        for (let i = 0; i < hiddenNeu1; i++) {
            s += funcY[0][i] * w[1][i][j];
        }
        let y = sigmoid(s + bias[1][j]);
        hidY.push(y);
        hid.push(s);
    }
    funcY.push(hidY);
    sum.push(hid);

    hid = [];
    hidY = [];
    for (let j = 0; j < neuronOutput; j++) {
        let s = 0;
        for (let i = 0; i < hiddenNeu2; i++) {
            s += funcY[1][i] * w[2][i][j];
        }
        let y = sigmoid(s + bias[2][j]);
        hidY.push(y);
        hid.push(s);
    }
    funcY.push(hidY);
    sum.push(hid);
    maxIndex = funcY[2].indexOf(Math.max.apply(null, funcY[2]));
    return maxIndex;
}
let E;
let maxIndex;
function trueOrFalse() {
    if (maxIndex == correctN) {
        return 1;
    }
    else return 0;
}

function mistake() {
    let d = [];
    for (let i = 0; i < neuronOutput; i++) {
        d.push(0);
    }
    E = 0;
    d[correctN] = 1;
    mis = [];
    let m = [];
    for (let i = 0; i < neuronOutput; i++) {
        E += Math.pow(funcY[2][i] - d[i], 2);
    }
    E = E / (2 * neuronOutput);

    for (let i = 0; i < neuronOutput; i++) {
        m.push((funcY[2][i] - d[i]) * derivative(funcY[2][i]));
    }
    mis.push(m); // тут в обратную сторону все
    m = [];
    for (let i = 0; i < hiddenNeu2; i++) {
        let sumMist = 0;
        for (let j = 0; j < neuronOutput; j++) {
            sumMist += w[2][i][j] * mis[0][j];
        }
        m.push(sumMist * derivative(funcY[1][i]));
    }
    mis.push(m);

    m = [];
    for (let i = 0; i < hiddenNeu1; i++) {
        let sumMist = 0;
        for (let j = 0; j < hiddenNeu2; j++) {
            sumMist += w[1][i][j] * mis[1][j];
        }
        m.push(sumMist * derivative(funcY[0][i]));
    }
    mis.push(m);

}

function createDw() {
    for (let i = 0; i < lenInput; i++) {
        for (let j = 0; j < hiddenNeu1; j++) {
            dw[0][i][j] = -nu * mis[2][j] * neuronInput[i];
            bias[0][j] += -nu * mis[2][j];
            w[0][i][j] += dw[0][i][j];
        }
    }
    for (let i = 0; i < hiddenNeu1; i++) {
        for (let j = 0; j < hiddenNeu2; j++) {
            dw[1][i][j] = -nu * mis[1][j] * funcY[0][i];
            bias[1][j] += -nu * mis[1][j];
            w[1][i][j] += dw[1][i][j];
        }
    }
    for (let i = 0; i < hiddenNeu2; i++) {
        for (let j = 0; j < neuronOutput; j++) {
            dw[2][i][j] = -nu * mis[0][j] * funcY[1][i];
            bias[2][j] += -nu * mis[0][j];
            w[2][i][j] += dw[2][i][j];
        }
    }

}

if (localStorage.getItem('keysB') == null) {
    init();
    biasMass();
}
else {
    w = JSON.parse(localStorage.getItem('keysW'));
    bias = JSON.parse(localStorage.getItem('keysB'));
}

let answer;
function determine() {
    funcY = [];
    y = [];
    dw = [];
    sum = [];
    createDwfirst();

    let answerStr = JSON.stringify(summ());
    divRes.innerHTML = answerStr;
}

function training() {
    mistake();
    createDw();
    let stringW = JSON.stringify(w);
    let stringB = JSON.stringify(bias);
    localStorage.setItem('keysW', stringW);
    localStorage.setItem('keysB', stringB);
}

//для обучения

let ex = document.getElementById('example');
ex.addEventListener('click', examples);
let example = []
function examples() {
    correctN = document.getElementById("RNum").value;
    neuronInput = matrix.flat();
    let obj = [neuronInput, correctN];
    example.push(obj)

    let stringA = JSON.stringify(example);
    localStorage.setItem('answers1', stringA);
}


let st = document.getElementById('selftr');
st.addEventListener('click', trainingAgain);

function trainingAgain() {
    let mass = JSON.parse(localStorage.getItem('answers1'));
   // console.log(mass);

    for (let j = 0; j < 5; j++) {
        let count = 0;
        for (let i = 0; i < 300; i++) {
            let index = GetIntRandom(0, 300);
            neuronInput = mass[index][0];
            correctN = mass[index][1];
            determine();
            training();
            count += trueOrFalse();
        }
        // if (j%2 == 0){
        console.log(count);
        // }
    }
}


