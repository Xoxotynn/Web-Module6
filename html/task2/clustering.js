function clustering(centersNum) {
    let centers = generateKCenters(centersNum), minCenters = centers;
    let WTotal = clusteringStep(centers), WMin = WTotal;
    for (let i = 0; i < 15; i++) {
        centers = generateKCenters(centersNum);
        WTotal = clusteringStep(centers);
        if (WTotal < WMin) {
            WMin = WTotal;
            minCenters = centers;
        }
    }
    clusteringStep(minCenters);

    clearCanvas();
    points.forEach(p => {
        drawPoint(p);
    });
}

function clusteringStep(centers) {
    let clusters = createClusters(centers);
    let WPrev;
    let WTotal = assignPoints(clusters);
    while(WTotal != WPrev) {
        console.log(WTotal);
        WPrev = WTotal;
        calculateCenters(clusters);
        WTotal = assignPoints(clusters);
    }

    return WTotal;
}

function haveEmptyCluster(clusters) {
    let empty = false;
    for (let i = 0; i < clusters.length; i++) {
        if (clusters[i].points.length == 0) {
            empty = true;
            break;
        }
    }

    return empty;
}

function calculateCenters(clusters) {
    clusters.forEach(cluster => {
        cluster.center = calculateNewCenter(cluster);
    });
}

function calculateNewCenter(cluster) {
    if(cluster.points.length == 0) {
        return cluster.center;
    }

    let sumX = 0, sumY = 0;
    cluster.points.forEach(p => {
        sumX += p.x;
        sumY += p.y;
    });

    return new Point(sumX / cluster.points.length,
                     sumY / cluster.points.length,
                     cluster.center.color);
}

function assignPoints(clusters) {
    let WTotal = 0;
    clusters.forEach(cluster => cluster.points = []);

    points.forEach(p => {
        let minDist, minCluster;
        clusters.forEach(cluster => {
            let dist = euqlidDist(p, cluster.center);
            if (dist < minDist || minDist == null) {
                minDist = dist;
                minCluster = cluster;
            }
        });

        minCluster.points.push(p);
        p.color = minCluster.center.color;
        WTotal += Math.pow(minDist, 2);
    });

    return WTotal;
}

function createClusters(centers) {
    let clusters = [];
    
    centers.forEach(center => {
        const cluster = {
            center: center,
            points: [],
        };
        clusters.push(cluster);
    });

    return clusters;
}


function generateKCenters(k) {
    let centers = [];
    for(let i = 0; i < k; i++) {
        centers.push(randomPoint());
    }

    return centers;
}