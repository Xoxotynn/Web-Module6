class Node {
    constructor(index, value, left, right) {
        this.index = index;
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(trainingRecords, maxDepth, minSize) {
        this.root = this.getBestSingleSplit(trainingRecords);
        this.maxDepth = maxDepth;
        this.minSize = minSize;
        this.splitData(this.root);
    }

    predict(record, node=this.root) {
        if (record.values[node.index] < node.value) {
            if (node.left instanceof Node) {
                return this.predict(record, node.left);
            } else {
                return node.left;
            }
        } else {
            if (node.right instanceof Node) {
                return this.predict(record, node.right);
            } else {
                return node.right;
            }
        }
    }

    splitData(node, depth=1) {
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
        let best = 0, bestClass;
        classes.forEach(classVal => {
            let cur = this.classOutcome(outcome, classVal);
            if (cur > best) {
                best = cur;
                bestClass = classVal;
            }
        });
    
        return bestClass;
    }

    classOutcome(outcome, classVal) {
        return outcome.filter(currClassOutcome => currClassOutcome == classVal).length;
    }
    
    getBestSingleSplit(records) {
        let bestIndex, bestValue, bestScore, bestGroups;
        
        for (let index = 0; index < records[0].values.length; index++) {
            records.forEach(record => {
                let groups = this.singleSplit(index, record.values[index], records);
                let gini = this.giniIndex(groups);
                if (gini < bestScore || bestScore == null) {
                    bestIndex = index;
                    bestValue = record.values[index];
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
            if (record.values[attrIndex] < attrValue) {
                left.push(record);
            } else {
                right.push(record);
            }
        });
    
        return [left, right];
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

    logTree(decision='', node=this.root, depth=0) {
        if (node.index != undefined) {
            console.log(`${' '.repeat(depth)}${decision} if X${node.index+1} < ${node.value}`)
            this.logTree('then', node.left, depth+1);
            this.logTree('else', node.right, depth+1);
        } else {
            console.log(`${' '.repeat(depth)}${decision} ${node}`);
        }
    }
}