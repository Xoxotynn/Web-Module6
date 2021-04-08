let w = [];
let dw = [];
let neuronInput = [];
let hiddenNeu = 150;
let hiddenNeu1 = 25;
let hiddenNeu2 = 17;
let neuronOutput = 10;
let sum = [];
let lenInput = 2500;
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

let testsArr = [];
//let uploadTestBtn = document.getElementById('uploadTestBtn');
let downloadTestBtn = document.getElementById('downloadTestBtn');
let upload = document.getElementById('upload');

upload.onchange = function(){
    let file = upload.files[0];
    let reader = new FileReader;
    reader.readAsText(file);
    reader.onload = function(){
        testsArr = JSON.parse(reader.result);
        w = testsArr[0];
        bias = testsArr[1];
    }
   
}
downloadTestBtn.onclick = function(){
    let newTxt = JSON.stringify(testsArr);
    let file = new Blob([newTxt], {type: 'application/json'});
    downloadTestBtn.href = URL.createObjectURL(file);
    downloadTestBtn.download = "test.json";
}
//let downloadTestBtn = document.getElementById('downloadTestBtn');
let uploadTEST = document.getElementById('uploadTEST');

uploadTEST.onchange = function(){
    let file = uploadTEST.files[0];
    let reader = new FileReader;
    reader.readAsText(file);
    reader.onload = function(){
    mass = JSON.parse(reader.result);
    }
}
