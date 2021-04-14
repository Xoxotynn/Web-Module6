const generateButton = document.getElementById("generateBtn");
const clearButton = document.getElementById("clearBtn");
const euqlidButton = document.getElementById("euqlid");
const sqrEuqlidButton = document.getElementById("sqrEuqlid");
const manhattanButton = document.getElementById("manhattan");
const chebyshevButton = document.getElementById("chebyshev");

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const mouse = createMouse(canvas);
let points = [];
var distFunction = euqlidDist;


euqlidButton.addEventListener("click", function() { 
    drawClustersByChosenDistType(euqlidButton, euqlidDist);
});
sqrEuqlidButton.addEventListener("click", function() { 
    drawClustersByChosenDistType(sqrEuqlidButton, sqrEuqlidDist);
});
manhattanButton.addEventListener("click", function() { 
    drawClustersByChosenDistType(manhattanButton, manhattanDist);
});
chebyshevButton.addEventListener("click", function() { 
    drawClustersByChosenDistType(chebyshevButton, chebyshevDist);
});


clearButton.addEventListener("click", () => {
    clearCanvas();
    points = [];
});
generateButton.addEventListener("click", findAndDrawClusters);


function drawClustersByChosenDistType(distBtn, distTypeFunc) {
    chooseDistType(distBtn, distTypeFunc);
    findAndDrawClusters();
}

function chooseDistType(distBtn, distTypeFunc) {
    distFunction = distTypeFunc;
    let buttons = document.querySelectorAll("button.dType");
    buttons.forEach(button => button.classList.remove("choosed"));
    distBtn.classList.add("choosed");
}

function findAndDrawClusters() {
    let clustersCount = document.getElementById("kNum").value;
    clustersCount > 0 ? kClustering(clustersCount) : clustering();

    clearCanvas();
    drawPoints(points);
}


//canvas.addEventListener("click", addUserPoint);
canvas.addEventListener("contextmenu", ev => {
    ev.preventDefault();
    deleteUserPoint();
});