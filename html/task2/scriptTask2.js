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

euqlidButton.addEventListener("click", () => chooseDistType(euqlidButton, euqlidDist));
sqrEuqlidButton.addEventListener("click", () => chooseDistType(sqrEuqlidButton, sqrEuqlidDist));
manhattanButton.addEventListener("click", () => chooseDistType(manhattanButton, manhattanDist));
chebyshevButton.addEventListener("click", () => chooseDistType(chebyshevButton, chebyshevDist));

function chooseDistType(distBtn, distTypeFunc) {
    distFunction = distTypeFunc;
    let buttons = document.querySelectorAll("button.dType");
    buttons.forEach(button => button.classList.remove("choosed"));
    distBtn.classList.add("choosed");
}

clearButton.addEventListener("click", () => {
    clearCanvas();
    points = [];
});
generateButton.addEventListener("click", function() {
    let clustersCount = document.getElementById("kNum").value;
    clustersCount > 0 ? kClustering(clustersCount) : clustering();

    clearCanvas();
    drawPoints(points);
});


canvas.addEventListener("click", addUserPoint);
canvas.addEventListener("contextmenu", ev => {
    ev.preventDefault();
    deleteUserPoint();
});