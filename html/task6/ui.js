let w = [];
let dw = [];
let neuronInput = [];
let hiddenNeu = 17;
let neuronOutput = 10;
let sum = [];
let lenInput = 25;
let nu = 0.05;
let correctN;
let y = [];
let funcY = [];
let bias = [];
let mis = [];

let divRes = document.getElementsByClassName('res')[0];

let train = document.getElementById('train');
train.addEventListener("click", function () {
    correctN = document.getElementById("RNum").value;
    training();
});

let findN = document.getElementById('find');
findN.addEventListener('click', function () {
    neuronInput = matrix.flat();
    determine();
});

let clearA = document.getElementById('clear');
clearA.addEventListener('click', clearAll);

