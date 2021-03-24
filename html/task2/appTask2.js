const generateButton = document.getElementById("generateBtn");
const dropDownButton = document.getElementById("dropDown");

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 700;

const mouse = createMouse(canvas);
const points = [];

generateButton.addEventListener("click", clustering);
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


function clustering() {
    let clusters = assignPoints(generateKCenters());
    for(let i = 0; i < 20; i++) {
        calculateCenters(clusters);
        const centers = clusters.map(cluster => cluster.center);
        clusters = assignPoints(centers);
    }

    clearCanvas();
    points.forEach(p => {
        drawPoint(p);
    });
}

function calculateCenters(clusters) {
    clusters.forEach(cluster => {
        cluster.center = calculateNewCenter(cluster);
    });
}

function calculateNewCenter(cluster) {
    let sumX = 0, sumY = 0;
    cluster.points.forEach(p => {
        sumX += p.x;
        sumY += p.y;
    });

    return new Point(sumX / cluster.points.length, sumY / cluster.points.length, cluster.center.color);
}

function assignPoints(clusterCenters) {
    let clusters = [];
    clusterCenters.forEach(center => {
        const cluster = {
            center: center,
            points: [],
        };
        clusters.push(cluster);
    });

    
    points.forEach(p => {
        let minDist, minCluster;
        clusters.forEach(cluster => {
            let dist = distance(p, cluster.center);
            if (dist < minDist || minDist == null) {
                minDist = dist;
                minCluster = cluster;
            }
        });

        minCluster.points.push(p);
        p.color = minCluster.center.color;
    });

    return clusters;
}


function generateKCenters() {
    let k = document.getElementById("kNum").value;
    let centers = [];
    for(let i = 0; i < k; i++) {
        centers.push(randomPoint());
    }

    return centers;
}

function distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}


   