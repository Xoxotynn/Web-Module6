function calculateAccuracy(trainRecs, predictRecords) {
    var score = 0;
    for (let i = 0; i < predictRecords.length; i++) {
        let predictedPath = tree.predict(predictRecords[i]);
        let actualClass = trainRecs[i].classValue;
        if (predictedPath[predictedPath.length-1].terminalValue == actualClass) score++;
    }
    return score / predictRecords.length * 100;
}

function showFileMessage(msg) {
    let fileName = document.getElementById('fileName');
    fileName.innerHTML = msg;
}


function clearTree(uiTree) {
    uiTree.innerHTML = '';
}

function drawTree(node, ulParent) {
    let li = document.createElement('li');
    let span = document.createElement('span');

    let spanText;
    if (!tree.isTerminal(node)) {
        let sign = isString(node.value) ? '=' : '<';
        spanText = `X${node.index+1} ${sign} ${node.value}`;
    } else {
        spanText = `${node.terminalValue}`;
    }

    span.innerHTML = spanText;
    li.appendChild(span);
    ulParent.appendChild(li);
    node.domElement = span;

    if (tree.isTerminal(node)) {
        return;
    } else {
        let ul = document.createElement('ul');
        li.appendChild(ul);
        drawTree(node.left, ul);
        drawTree(node.right, ul);
    }
}


async function animatePrediction(paths) {
    predictBtn.disabled = true;

    clearUiNodesColors();
    await drawPredictedPath(paths[0]);
    for (let i = 1; i < paths.length; i++) {
        clearPathBackgrounds(paths[i-1]);
        await drawPredictedPath(paths[i]);
    }

    predictBtn.disabled = false;
}

async function drawPredictedPath(path) {
    await sleep(250);
    for (let i = 0; i < path.length; i++) {
        toggleBackground(path[i]);
        await sleep(250);
    }
}

function toggleBackground(node) {
    if (tree.isTerminal(node)) {
        node.domElement.classList.toggle('coloredTerminal');
    } else {
        node.domElement.classList.toggle('colored');
    }
}

function clearUiNodesColors(node=tree.root) {
    removeBackground(node);
    if(tree.isTerminal(node)) return;

    clearUiNodesColors(node.left);
    clearUiNodesColors(node.right);
}

function removeBackground(node) {
    node.domElement.classList.remove('coloredTerminal');
    node.domElement.classList.remove('colored');
}

function clearPathBackgrounds(nodes) {
    for (let i = 0; i < nodes.length; i++) {
        removeBackground(nodes[i]);
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
