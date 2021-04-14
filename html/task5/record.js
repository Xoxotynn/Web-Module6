class Record {
    constructor(recString, isTraining) {
        let recArray = this.splitString(recString);
        this.values = this.parseNums(isTraining ? recArray.slice(0, recArray.length - 1) : recArray);
        this.classValue = isTraining ? recArray[recArray.length - 1] : null;
    }

    splitString(recString) {
        let splitReg = /(?<=^|,)(\"(?:[^\"])*\"|[^,]*)/g;
        return recString.match(splitReg);
    }

    parseNums(strArray) {
        return strArray.map(str => {
            let parsed = parseFloat(str);
            return isNaN(parsed) ? str.trim() : parsed;
        });
    }
}

function convertCsvToRecords(csvData, isTraining) {
    let stringRecords = csvData.replaceAll('\r', '');
    stringRecords = stringRecords.split("\n");
    let records = stringRecords.map(rec => new Record(rec, isTraining));
    return records;
}