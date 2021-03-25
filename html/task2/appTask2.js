const generateButton = document.getElementById("generateBtn");
const dropDownButton = document.getElementById("dropDown");

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 500;

const mouse = createMouse(canvas);
const points = [];

generateButton.addEventListener("click", function() {
    let clustersCount = document.getElementById("kNum").value;
    clustersCount > 0 ? kClustering(clustersCount) : clustering();

    clearCanvas();
    drawPoints(points);
});
dropDownButton.addEventListener("click", function() {
    document.getElementById("distTypesContent").classList.toggle("show");
});

canvas.addEventListener("click", addUserPoint);
canvas.addEventListener("contextmenu", ev => {
    ev.preventDefault();
    deleteUserPoint();
});

window.onclick = function(event) {
    if (!event.target.matches(".distDropBtn")) {
        document.getElementById("distTypesContent").classList.remove("show");   
    }
} 