const { getInput } = require('../lib');

const input = getInput(1).split('\n');

console.log(
input.map(v => {
    let first;
    let last;
    for(const char of v) {
        if(isNaN(parseInt(char))) continue;
        if(!first) {
            first = char;
        }
        last = char;
    }
    return parseInt(`${first}${last}`);
}).reduce((a,b) => a + b)
)