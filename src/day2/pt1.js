const { getInput } = require('../lib');

const input = getInput(2).split('\n');

const lineRegex = /Game (\d+): ((?:\d+ \w+[,;]? ?)+)/;
const gameRegex = /(.+?)(?:;|$)/g;
const gameDataRegex = /\d+ \w+/g;

const coloursAvailable = () => ({
    red: 12,
    green: 13,
    blue: 14,
});

let res = 0;

input.forEach((line) => {
    const [, id, data] = line.match(lineRegex);

    const games = [...data.matchAll(gameRegex)].map(r => r[1]);

    const gameData = games.map(g => g.match(gameDataRegex).map(g => g.split(' ')));

    console.log(id, gameData);

    let possible = true;
    for (const plays of gameData) {
        const available = coloursAvailable();
        for (const play of plays) {
            if(!possible) break;
            let [num, colour] = play;
            num = parseInt(num);
            let left = available[colour];
            if(left < num) {
                possible = false;
                break;
            }
            available[colour] = left - num;
        }
    }
    if(possible) res += parseInt(id);
    console.log(res)
})