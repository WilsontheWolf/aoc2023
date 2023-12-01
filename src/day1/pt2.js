const { getInput } = require('../lib');

const input = getInput(1).split('\n');

const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g

const nums = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
}

function parseDigit (dig) {
    return nums[dig] ?? parseInt(dig);
}

console.log(
    input.map(v => {
        const matches = [...v.matchAll(regex)];
        let first = parseDigit(matches[0][1]);
        let last = parseDigit(matches[matches.length - 1][1]);
        if (isNaN(first) || !first) console.log('Woah somethings wrong', matches, 'first:', first);
        if (isNaN(last) || !last) console.log('Woah somethings wrong', matches, 'last:', last);
        return parseInt(`${first}${last}`);
    }).reduce((a, b) => a + b)
)