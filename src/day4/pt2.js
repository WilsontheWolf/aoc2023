const { getInput } = require('../lib');

const input = getInput(4).split('\n').map(line => line.split(':')[1].split(' | ').map(nums => nums.trim().split(/\s+/).map(v => parseInt(v))));

const copies = [...new Array(input.length)].map(() => 0);
let res = 0;
input.forEach(([card, win], i) => {
    const winners = card.filter(v => win.includes(v)).length;
    const toCopy = copies[i];
    if (winners){
        for (let j = i + 1; j < i + winners + 1; j++) {
            copies[j] += (toCopy + 1)
        }
    }
})

console.log(copies.reduce((a, b ) => a + b) + input.length)