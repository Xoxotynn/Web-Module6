let w = [];
let dw = [];
let neuronInput = [];
let hiddenNeu = 150;
let neuronOutput = 10;
let sum = [];
let lenInput = 2500;
let nu = 0.18;
let correctN;
let y = [];
let funcY = [];
let bias = [];
let mis = [];

let divRes = document.getElementsByClassName('res')[0];
let fileName = document.getElementById('fileName');

let findN = document.getElementById('find');
findN.addEventListener('click', function () {
    neuronInput = matrix.flat();
    determine();
});

let clearA = document.getElementById('clear');
clearA.addEventListener('click', clearAll);

let testsArr = [];
let downloadTestBtn = document.getElementById('downloadTestBtn');
var upload = document.getElementById('upload');

upload.onchange = function(){
    let file = upload.files[0];
    try {
        fileName.innerHTML = file.name;
        let reader = new FileReader;
        reader.readAsText(file);
        reader.onload = function(){
            testsArr = JSON.parse(reader.result);
            w = testsArr[0];
            bias = testsArr[1];
        }
    } catch (e) {
        fileName.innerHTML = 'Файл не выбран';
    }
}
