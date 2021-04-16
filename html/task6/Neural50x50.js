
function init() {
    //слой 1
    let neuStart = [];

    for (let j = 0; j < 2500; j++) { //начальный нейрон
        let neuEnd = [];
        for (let k = 0; k < hiddenNeu; k++) {  //конечный нейрон
            neuEnd.push(GetRandom(-1, 1));
        }
        neuStart.push(neuEnd);
    }
    w.push(neuStart);
    //слой 2
    neuStart = [];
    for (let j = 0; j < hiddenNeu; j++) { //начальный нейрон
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
    for (let l = 0; l < hiddenNeu; l++) {
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
        for (let k = 0; k < hiddenNeu; k++) {  //конечный нейрон
            dEnd.push(0);
        }
        dSt.push(dEnd);
    }
    dw.push(dSt);
    //слой 2
    dSt = [];
    for (let j = 0; j < hiddenNeu; j++) { //начальный нейрон
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
    for (let j = 0; j < hiddenNeu; j++) {
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
    for (let j = 0; j < neuronOutput; j++) {
        let s = 0;
        for (let i = 0; i < hiddenNeu; i++) {
            s += funcY[0][i] * w[1][i][j];
        }
        let y = sigmoid(s + bias[1][j]);
        hidY.push(y);
        hid.push(s);
    }
    funcY.push(hidY);
    sum.push(hid);
    maxIndex = funcY[1].indexOf(Math.max.apply(null, funcY[1]));
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
        E += Math.pow(funcY[1][i] - d[i], 2);
    }
    E = E / (2 * neuronOutput);

    for (let i = 0; i < neuronOutput; i++) {
        m.push((funcY[1][i] - d[i]) * derivative(funcY[1][i]));
    }
    mis.push(m); // тут в обратную сторону все
    m = [];
    for (let i = 0; i < hiddenNeu; i++) {
        let sumMist = 0;
        for (let j = 0; j < neuronOutput; j++) {
            sumMist += w[1][i][j] * mis[0][j];
        }
        m.push(sumMist * derivative(funcY[0][i]));
    }
    mis.push(m);

}

function createDw() {
    for (let j = 0; j < hiddenNeu; j++) {
        for (let i = 0; i < lenInput; i++) {
            dw[0][i][j] =  -nu* mis[1][j] * neuronInput[i];
            w[0][i][j] += dw[0][i][j];
        }
        bias[0][j] += -nu * mis[1][j];
    }
    for (let j = 0; j < neuronOutput; j++) {
        for (let i = 0; i < hiddenNeu; i++) {
            dw[1][i][j] = -nu * mis[0][j] * funcY[0][i];
            w[1][i][j] += dw[1][i][j];
        }
        bias[1][j] += -nu * mis[0][j];
    }
}


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
    testsArr = [w, bias];
}

//самообучение

// let st = document.getElementById('selftr');
// st.addEventListener('click', trainingAgain);

let mass;
function trainingAgain() {
    for (let j = 0; j < 100; j++) {
        let count = 0;
        for (let i = 0; i < 798; i++) {
            let index = GetIntRandom(0, 798);
            neuronInput = mass[index][0];
            correctN = mass[index][1];
           
            determine();
            training();
            count += trueOrFalse();
        }
        // if (j%10 == 0){
        //     console.log(count);
        // }
    }
    //console.log('end');
}

init();
biasMass();

