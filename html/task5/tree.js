class Node {
    constructor(index, value, left, right) {
        this.index = index;
        this.value = value;
        this.left = left;
        this.right = right;
        this.domElement = null;
        this.terminalValue = null;
    }
}

class Tree {
    constructor(trainingRecords, maxDepth, minSize) {
        this.root = this.getBestSingleSplit(trainingRecords);
        this.maxDepth = maxDepth;
        this.minSize = minSize;
        this.splitData();
        this.optimizeTerminals();
    }

    predict(record, node=this.root, path=[]) {
        path.push(node);
        if (this.match(record.values[node.index], node.value)) {
            if (this.isTerminal(node.left)) {
                return path.concat(node.left);
            } else {
                return this.predict(record, node.left, path);
            }
        } else {
            if (this.isTerminal(node.right)) {
                return path.concat(node.right);
            } else {
                return this.predict(record, node.right, path);
            }
        }
    }

    optimizeTerminals(node=this.root) {
        if (this.isTerminal(node)) {
            return node;
        }

        node.left = this.optimizeTerminals(node.left);
        node.right = this.optimizeTerminals(node.right);

        if (this.terminalsEqual(node)) {
            return node.left;
        }

        return node;
    }

    terminalsEqual(node) {
        return this.isTerminal(node.left) &&
         this.isTerminal(node.right) &&
         node.left.terminalValue == node.right.terminalValue;
    }

    splitData(node=this.root, depth=1) {
        let left = node.left, right = node.right;
    
        if (left.length == 0 || right.length == 0) {
            let terminal = this.makeTerminal(left.concat(right));
            node.left = terminal;
            node.right = terminal;
            return;
        }
    
        if (depth >= this.maxDepth) {
            node.left = this.makeTerminal(left);
            node.right = this.makeTerminal(right);
            return;
        }
    
        if (left.length <= this.minSize) {
            node.left = this.makeTerminal(left);
        } else {
            node.left = this.getBestSingleSplit(left);
            this.splitData(node.left, depth+1); 
        }
    
        if (right.length <= this.minSize) {
            node.right = this.makeTerminal(right);
        } else {
            node.right = this.getBestSingleSplit(right);
            this.splitData(node.right, depth+1);
        }
    }
    
    makeTerminal(records) {
        let classesOutcome = this.getClassesArray(records);
        let uniqueClasses = this.getUniqueClasses([records]);
        return this.findBestOutcome(classesOutcome, uniqueClasses);
    }
    
    findBestOutcome(outcome, classes) {
        let bestScore = 0, best = new Node();
        classes.forEach(classVal => {
            let cur = this.classOutcome(outcome, classVal);
            if (cur > bestScore) {
                bestScore = cur;
                best.terminalValue = classVal;
            }
        });
    
        return best;
    }

    classOutcome(outcome, classVal) {
        return outcome.filter(currClassOutcome => currClassOutcome == classVal).length;
    }
    
    getBestSingleSplit(records) {
        let bestIndex, bestValue, bestScore, bestGroups;
        
        for (let index = 0; index < records[0].values.length; index++) {
            let uniqueValues = this.getUniqueValues(records, index);
            
            uniqueValues.forEach(value => {
                let groups = this.singleSplit(index, value, records);
                let gini = this.giniIndex(groups);
                if (gini < bestScore || bestScore == null) {
                    bestIndex = index;
                    bestValue = value;
                    bestScore = gini;
                    bestGroups = groups;
                }
            });
        }
    
        return new Node(bestIndex, bestValue, bestGroups[0], bestGroups[1]);
    }
    
    singleSplit(attrIndex, attrValue, records) {
        let left = [], right = [];
        records.forEach(record => {
            if (this.match(record.values[attrIndex], attrValue)) {
                left.push(record);
            } else {
                right.push(record);
            }
        });
    
        return [left, right];
    }

    match(actualValue, trueValue) {
        if (isString(trueValue)) {
            return actualValue == trueValue;
        } else {
            return actualValue < trueValue;
        }
    }
    
    giniIndex(recordGroups) {
        let classes = this.getUniqueClasses(recordGroups);
        let recordsCount = this.countRecords(recordGroups);
        let gini = 0;
        
        recordGroups.forEach(group => {
            if (group.length == 0) return;
            let score = 0;
    
            classes.forEach(classVal => {
                let proportion = this.getClassProportion(group, classVal);
                score += Math.pow(proportion, 2);
            });
    
            gini += (1 - score) * (group.length / recordsCount);
        });
    
        return gini;
    }

    getUniqueValues(records, index) {
        let values = records.map(record => record.values[index]);
        return [...new Set(values)];
    }
    
    getUniqueClasses(groups) {
        let classes = [];
        groups.forEach(group => {
            classes = classes.concat(this.getClassesArray(group));
        });
        return [...new Set(classes)];
    }
    
    getClassesArray(records) {
        return records.map(record => record.classValue);
    }

    countRecords(groups) {
        return groups.reduce((count, group) => count + group.length, 0);
    }
    
    getClassProportion(records, classVal) {
        return records.filter(rec => rec.classValue == classVal).length / records.length;
    }

    isTerminal(node) {
        return node.terminalValue != null;
    }

    logTree(decision='', node=this.root, depth=0) {
        if (!this.isTerminal(node)) {
            let sign = isString(node.value) ? '=' : '<';
            console.log(`${'.'.repeat(depth)}${decision} X${node.index+1} ${sign} ${node.value}`);
            this.logTree(' yes:', node.left, depth+1);
            this.logTree(' no:', node.right, depth+1);
        } else {
            console.log(`${'.'.repeat(depth)}${decision} ${node}`);
        }
    }
}

function isString(value) {
    return typeof value == "string";
}