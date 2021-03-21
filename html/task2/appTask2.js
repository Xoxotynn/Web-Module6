const generateButton = document.getElementById("generateBtn");
const dropDownButton = document.getElementById("dropDown");

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 700;

const mouse = createMouse(canvas);
const points = [];

generateButton.addEventListener("click", function() {
    let centersNum = document.getElementById("kNum").value;
    clustering(centersNum);
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