const { getInput } = require('../lib');

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
    for (const {start, end, offset} of map) {
        if(value < start || value > end) continue;
        num += offset; 
        break;
    }
    return resolve(num, type + 1);
}

let lowest = Infinity;

seeds.forEach((n) => {
    lowest = Math.min(resolve(n), lowest)
})

console.log(lowest)