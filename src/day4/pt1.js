const { getInput } = require('../lib');

const input = getInput(4).split('\n').map(line => line.split(':')[1].split(' | ').map(nums => nums.trim().split(/\s+/).map(v => parseInt(v))));

let res = 0;
input.forEach(([card, win]) => {
    const winners = card.filter(v => win.includes(v)).length;
    if (winners)
        res += 2 ** (winners - 1)
})

console.log(res)