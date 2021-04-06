const maxDepth = 5;
const minSize = 40;
const testD = `2.771244718,1.784783929,0
1.728571309,1.169761413,0
3.678319846,2.81281357,0
3.961043357,2.61995032,0
2.999208922,2.209014212,0
7.497545867,3.162953546,1
9.00220326,3.339047188,1
7.444542326,0.476683375,1
10.12493903,3.234550982,1
6.642287351,3.319983761,1`;

var trainingRecords = convertCsvToRecords(trainingTestData, true);//trainingTestData, true);
var predictRecords = convertCsvToRecords(predictData);

var tree = new Tree(trainingRecords, maxDepth, minSize);

var score = 0;
for (let i = 0; i < predictRecords.length; i++) {
    let predictedClass = tree.predict(predictRecords[i]);
    let actualClass = trainingRecords[i].classValue;
    if (predictedClass == actualClass) score++;
}

var accuracy = score / predictRecords.length * 100;
console.log(`Accuracy: ${accuracy}`);
