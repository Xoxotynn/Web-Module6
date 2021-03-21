function clustering(centersNum) {
    let clusters = clusteringStep(centersNum);
    if (clusters.length <= points.length) {
        while(haveEmptyCluster(clusters)) {
            clusters = clusteringStep(centersNum);
        }
    }

    clearCanvas();
    points.forEach(p => {
        drawPoint(p);
    });
}

function clusteringStep(centersNum) {
    let clusters = assignPoints(generateKCenters(centersNum));
    let centers = clusters.map(cluster => cluster.center);
    let prevCenters;
    while(!clustersDontChange(centers, prevCenters)) {
        prevCenters = [...centers];
        clusters = calculateCenters(clusters);
        centers = clusters.map(cluster => cluster.center);
        clusters = assignPoints(centers);
    }

    return clusters;
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

function clustersDontChange(centers1, centers2) {
    if(centers1 == null || centers2 == null) {
        return true;
    }

    let equal = true;
    for (let i = 0; i < centers1.length; i++) {
        if (centers1[i] != centers2[i]) {
            change = false;
            break;
        }
    }

    return change
}

function calculateCenters(clusters) {
    let newClusters = [];
    clusters.forEach(cluster => {
        const newCluster = {
            center: calculateNewCenter(cluster),
            points: cluster.points,
        };
        newClusters.push(newCluster);
    });

    return newClusters;
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
        let minDist = null, minCluster;
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


function generateKCenters(k) {
    let centers = [];
    for(let i = 0; i < k; i++) {
        centers.push(randomPoint());
    }

    return centers;
}

function distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}