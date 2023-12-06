const { getInput } = require('../lib');

const [times, distances] = getInput(6).replaceAll(/\w+:\s+/g, '').split('\n').map(v => v.split(/\s+/).map(v => parseInt(v)));

let res = 1;
for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    let faster = 0;
    for (let j = 1; j < time; j++) {
        const timeLeft = time - j;
        if (j * timeLeft > distance) faster++;
    }
    if (faster)
        res *= faster;
}

console.log(res)