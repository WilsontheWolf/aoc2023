const { getInput } = require('../lib');

const symbolRegex = /[^\d.\n]/g;
const digitRegex = /\d/;

const input = getInput(3).replaceAll(symbolRegex, '#').split('\n').map(a => a.split(''));

const toCount = [...new Array(input.length)].map(() => [...new Array(input[0].length)].map(() => false))

for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < input.length; j++) {
        const item = row[j];
        if (item === '#') {
            toCount[i][j] = true;
            if (i !== 0) {
                toCount[i - 1][j] = true;
                toCount[i - 1][j + 1] = true;
                toCount[i - 1][j - 1] = true;
            }
            if (i !== input.length) {
                toCount[i + 1][j - 1] = true;
                toCount[i + 1][j + 1] = true;
                toCount[i + 1][j] = true;
            }
            toCount[i][j - 1] = true;
            toCount[i][j + 1] = true;
        }
    }
}

let mem = "";
let valid = false;
let res = 0;

for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < input.length; j++) {
        const item = row[j];
        if (item.match(digitRegex)) {
            mem += item;
            if (toCount[i][j]) valid = true;
            if (row[j + 1]?.match(digitRegex)) continue;
        } else {
            // This is probably not required but sanity check
            mem = "";
            valid = false;
            continue;
        }
        if(!valid){
            mem = "";
            valid = false;
            continue;
        }
        res += parseInt(mem);
        mem = "";
        valid = false;
    }
}
console.log(res)