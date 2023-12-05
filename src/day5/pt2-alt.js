const { getInput } = require('../lib');

// This alternative solution does work, but takes forever.
// I had this running while I was rewriting part 2, but 
// figured I might as well just leave it here, as it's 
// what got me my answer first, but not what I finished with.

let [seeds, ...mapData] = getInput(5).split('\n\n');

seeds = seeds.split(': ')[1].split(' ').map(n => parseInt(n));

const maps = {
    soil: [], // seed-to-soil
    fertilizer: [], // soil-to-fertilizer
    water: [], // fertilizer-to-water
    light: [], // water-to-light
    temperature: [], // light-to-temperature
    humidity: [], // temperature-to-humidity
    location: [], // humidity-to-location
};

mapData.forEach(m => {
    let [type, values] = m.split(' map:\n')
    type = type.split('-to-')[1];
    const map = maps[type];
    values.split('\n').forEach(v => {
        const [dest, source, range] = v.split(' ').map(v => parseInt(v));
        map.push({ start: source, end: source + range - 1, offset: dest - source });
    })
});

const path = [
    "soil",
    "fertilizer",
    "water",
    "light",
    "temperature",
    "humidity",
    "location",
];

function resolve(value, type = 0) {
    if (type >= path.length) return value;
    const map = maps[path[type]];
    let num = value;
    for (const { start, end, offset } of map) {
        if (value < start || value > end) continue;
        num += offset;
        break;
    }
    return resolve(num, type + 1);
}

let lowest = Infinity;

seeds.forEach((n, i) => {
    if (i % 2) return;
    const range = seeds[i + 1];
    for (let j = n; j < n + range; j++) {
        lowest = Math.min(resolve(j), lowest);
    }
})

console.log(lowest)
