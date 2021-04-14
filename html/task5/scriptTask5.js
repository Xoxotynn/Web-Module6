const maxDepth = 12;
const minSize = 1;

var upload = document.getElementById('upload');
var createTreeBtn = document.getElementById('treeBtn');
var predictBtn = document.getElementById('predictBtn');
var csvString;
var tree;
var predictRunning;

upload.style.opacity = 0;
upload.addEventListener('change', tryParseFile);

createTreeBtn.addEventListener('click', createTree);
predictBtn.addEventListener('click', predict);

function tryParseFile() {
    let files = upload.files;
    if (files.length == 0) {
        showFileMessage("Файл не выбран");
        return;
    }
    if (!validFileType(files[0])) {
        showFileMessage("Неверный тип файла");
        return;
    }
    showFileMessage(files[0].name);
    parseFile(files[0]);
}

function createTree() {
    if (invalidData(csvString)) return;

    let trainingRecords = convertCsvToRecords(csvString, true);
    tree = new Tree(trainingRecords, maxDepth, minSize);
    var uiTree = document.getElementsByClassName('tree')[0];
    clearTree(uiTree);
    drawTree(tree.root, uiTree);
}

function predict() {
    if (invalidData(csvString)) return;

    if (typeof(tree) == undefined || tree == null) {
        console.log('no tree to predict');
        return;
    }

    let records = convertCsvToRecords(csvString);
    let predictedPaths = [];
    for (let i = 0; i < records.length; i++) {
        predictedPaths.push(tree.predict(records[i]));
    }
    animatePrediction(predictedPaths);
}


function parseFile(file) {
    let reader = new FileReader;
    reader.onload = function(){
        csvString = reader.result;
    }
    reader.readAsText(file);
}

function validFileType(file) {
    let fileTypes = ["text/plain", ""];
    for (let i = 0; i < fileTypes.length; i++) {
        if (fileTypes[i] == file.type) {
            return true;
        }
    }
    return false;
}


function invalidData(data) {
    if (typeof(data) == undefined || data == null || data.length == 0) {
        console.log('no data');
        return true;
    }
}