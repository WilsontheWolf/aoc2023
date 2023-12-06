const { getInput } = require('../lib');

const [time, distance] = getInput(6).replaceAll(/\w+:\s+/g, '').split('\n').map(v => parseInt(v.replaceAll(/\s+/g, '')));

let faster = 0;
for (let j = 1; j < time; j++) {
    const timeLeft = time - j;
    if (j * timeLeft > distance) faster++;
}

console.log(faster)