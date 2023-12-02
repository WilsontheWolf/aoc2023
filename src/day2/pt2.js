const { getInput } = require('../lib');

const input = getInput(2).split('\n');

const lineRegex = /Game (\d+): ((?:\d+ \w+[,;]? ?)+)/;
const gameRegex = /(.+?)(?:;|$)/g;
const gameDataRegex = /\d+ \w+/g;

const coloursBlank = () => ({
    red: 0,
    green: 0,
    blue: 0,
});

let res = 0;

input.forEach((line) => {
    const [, id, data] = line.match(lineRegex);

    const games = [...data.matchAll(gameRegex)].map(r => r[1]);

    const gameData = games.map(g => g.match(gameDataRegex).map(g => g.split(' ')));

    console.log(id, gameData);

    const needed = coloursBlank();
    for (const plays of gameData) {
        const neededGame = coloursBlank();
        for (const play of plays) {
            let [num, colour] = play;
            num = parseInt(num);
            neededGame[colour] += num;
        }
        if(needed.red < neededGame.red) {
            needed.red = neededGame.red;
        }
        if (needed.blue < neededGame.blue) {
            needed.blue = neededGame.blue;
        }
        if (needed.green < neededGame.green) {
            needed.green = neededGame.green;
        }
    }
    console.log(needed)
    res += (needed.red * needed.green * needed.blue) 
    console.log(res)
})