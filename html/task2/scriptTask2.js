const generateButton = document.getElementById("generateBtn");
const euqlidButton = document.getElementById("euqlid");
const sqrEuqlidButton = document.getElementById("sqrEuqlid");
const manhattanButton = document.getElementById("manhattan");
const chebyshevButton = document.getElementById("chebyshev");

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const mouse = createMouse(canvas);
const points = [];
var distFunction = euqlidDist;

euqlidButton.addEventListener("click", () => distType = euqlidDist);
sqrEuqlidButton.addEventListener("click", () => distType = sqrEuqlidDist);
manhattanButton.addEventListener("click", () => distType = manhattanDist);
chebyshevButton.addEventListener("click", () => distType = chebyshevDist);

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