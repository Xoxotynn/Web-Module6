function clustering() {
    let WTotals = [kClustering(1)], 
        clustersCountMax = 20,
        maxWRatio, clustersCount;

    for (let i = 2; i <= clustersCountMax; i++) {
        WTotals.push(kClustering(i));
        let ratio = WTotals[i-2] / WTotals[i-1];
        if(ratio > maxWRatio || maxWRatio == null) {
            maxWRatio = ratio;
            clustersCount = i;
        }
    }

    kClustering(clustersCount);
}

function kClustering(clustersCount) {
    let centers = generateKCenters(clustersCount), minCenters = centers;
    let WTotal = clusteringStep(centers), WMin = WTotal;
    for (let i = 0; i < 70; i++) {
        centers = generateKCenters(clustersCount);
        WTotal = clusteringStep(centers);
        if (WTotal < WMin) {
            WMin = WTotal;
            minCenters = centers;
        }
    }
    clusteringStep(minCenters);

    return WMin;
}

function generateKCenters(centersCount) {
    let centers = [];
    for(let i = 0; i < centersCount; i++) {
        centers.push(randomPoint());
        centers[i].color = colors[i];
    }

    return centers;
}

function clusteringStep(centers) {
    let clusters = createClusters(centers);
    let WPrev;
    let WTotal = assignPoints(clusters);
    while(WTotal != WPrev) {
        WPrev = WTotal;
        calculateCenters(clusters);
        WTotal = assignPoints(clusters);
    }

    clusters.sort((c1, c2) => c1.center.x - c2.center.x);
    for(let i = 0; i < clusters.length; i++) {
        clusters[i].center.color = colors[i];
    }
    WTotal = assignPoints(clusters);

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

function assignPoints(clusters) {
    let WTotal = 0;
    clusters.forEach(cluster => cluster.points = []);

    points.forEach(p => {
        WTotal += findBestCluster(p, clusters);
    });

    return WTotal;
}

function findBestCluster(point, clusters) {
    let minDist, minCluster;
    clusters.forEach(cluster => {
        let dist = distFunction(point, cluster.center);
        if (dist < minDist || minDist == null) {
            minDist = dist;
            minCluster = cluster;
        }
    });

    minCluster.points.push(point);
    point.clusterColors[currentClusterIndex] = minCluster.center.color;

    return Math.pow(minDist, 2);
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