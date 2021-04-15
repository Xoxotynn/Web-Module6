const generateButton = document.getElementById("generateBtn");
const clearButton = document.getElementById("clearBtn");
const distButtons = document.querySelectorAll('button.dType');
const distFunctions = [euqlidDist, sqrEuqlidDist, manhattanDist, chebyshevDist];

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const mouse = createMouse(canvas);
var points = [];
var distFunction = euqlidDist;
var currentClusterIndex = 0;


canvas.addEventListener("contextmenu", ev => {
    ev.preventDefault();
});


for (let i = 0; i < distButtons.length; i++) {
    distButtons[i].addEventListener('click', function() {
        drawClustersByChosenDistType(this, i);
    });
}


clearButton.addEventListener("click", () => {
    clearCanvas();
    points = [];
});
generateButton.addEventListener("click", findClusters);


function drawClustersByChosenDistType(distBtn, index) {
    chooseDistType(distBtn, index);
    updatePoints();
}

function chooseDistType(distBtn, index) {
    currentClusterIndex = index;

    let buttons = document.querySelectorAll("button.dType");
    buttons.forEach(button => button.classList.remove("choosed"));
    distBtn.classList.add("choosed");
}

function findClusters() {
    let clustersCount = document.getElementById("kNum").value;
    for (let i = 0; i < distFunctions.length; i++) {
        findClustersByDistType(distFunctions[i], i, clustersCount);
    }

    updatePoints();
}

function findClustersByDistType(distTypeFunc, index=0, k=0) {
    distFunction = distTypeFunc;
    currentClusterIndex = index;
    k > 0 ? kClustering(k) : clustering();
}

function updatePoints() {
    points.forEach(p => {
        p.color = p.clusterColors[currentClusterIndex];
    });

    updateCanvas(points);
}