const { type } = require('os');
const { getInput } = require('../lib');

const input = getInput(7).split('\n').map(v => {
    const o = v.split(' ')
    o[1] = parseInt(o[1]);
    return o;
});

const types = {
    HIGH_CARD: 0,
    ONE_PAIR: 1,
    TWO_PAIR: 2,
    THREE_OAK: 3,
    FULL_HOUSE: 4,
    FOUR_OAK: 5,
    FIVE_OAK: 6,
}

const rank = 'A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2'.split(', ').reverse();
console.log(
    input.map(([cards]) => {
        const data = {};
        cards.split('').forEach(c => {
            if (!data[c]) data[c] = 1;
            else data[c]++;
        });
        const sorted = Object.values(data).sort((a, b) => b - a);
        if (sorted[0] === 1) return types.HIGH_CARD;
        if (sorted[0] === 2) {
            if (sorted[1] === 2) return types.TWO_PAIR;
            return types.ONE_PAIR;
        }
        if (sorted[0] === 3) {
            if (sorted[1] === 2) return types.FULL_HOUSE;
            return types.THREE_OAK;
        }
        if (sorted[0] === 4) return types.FOUR_OAK;
        if (sorted[0] === 5) return types.FIVE_OAK;
    })
        .map((type, i) => {
            const [cards, bet] = input[i];
            return {
                type,
                cards,
                bet,
            }
        })
        .sort((a, b) => {
            if (a.type !== b.type) return a.type - b.type;
            for (let i = 0; i < b.cards.length; i++) {
                const ac = a.cards[i];
                const bc = b.cards[i];
                if (ac === bc) continue;
                return rank.findIndex(v => v === ac) - rank.findIndex(v => v === bc);
            }
        })
        .reduce((acc, val, i) => {
            return acc + val.bet * (i + 1);
        }, 0)
)