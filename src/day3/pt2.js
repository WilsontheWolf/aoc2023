const { getInput } = require('../lib');

const digitRegex = /\d/;
const rowDigitRegex = /\d+/g;
const backwardsDigitRegex = /(\d+)[^\d]*?$/;
const forwardsDigitRegex = /^[^\d]*?(\d+)/;

const input = getInput(3).split('\n').map(a => a.split(''));

let res = 0;

function doShit(lookupRow, seenDigits, product, j) {
    const toCheck = lookupRow[j - 1] + lookupRow[j] + lookupRow[j + 1];
    if (toCheck === '952') debugger
    const digits = toCheck.match(rowDigitRegex);
    if (digits?.length) {
        seenDigits++;
        if (digits.length > 1) {
            seenDigits++;
            {
                const toLook = lookupRow.join('').substring(j, -1);
                const num = parseInt(toLook.match(backwardsDigitRegex)?.[1])
                if (isNaN(num)) {
                    console.error('Backwards lookup NaN!');
                    console.log(toLook);
                    process.exit(1);
                }
                product *= num;
            }
            {
                const toLook = lookupRow.join('').substring(j + 1);
                const num = parseInt(toLook.match(forwardsDigitRegex)?.[1])
                if (isNaN(num)) {
                    console.error('Forwards lookup NaN!');
                    console.log(toLook);
                    process.exit(1);
                }
                product *= num;
            }
        } else {
            if (toCheck[0].match(digitRegex)) {
                const toLook = lookupRow.join('').substring(j + 2, -1);
                const num = parseInt(toLook.match(backwardsDigitRegex)?.[1])
                if (isNaN(num)) {
                    console.error('Backwards lookup NaN!');
                    console.log(toLook);
                    process.exit(1);
                }
                product *= num;
            } else {
                const toLook = lookupRow.join('').substring(j - 1);
                const num = parseInt(toLook.match(forwardsDigitRegex)?.[1])
                if (isNaN(num)) {
                    console.error('Forwards lookup NaN!');
                    console.log(toLook);
                    process.exit(1);
                }
                product *= num;
            }
        }
    }
    return {product, seenDigits};
}

for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < input.length; j++) {
        const item = row[j];
        let seenDigits = 0;
        let product = 1;
        if (item === '*') {
            if (i !== 0) {
                const lookupRow = input[i - 1];
                const processed = doShit(lookupRow, seenDigits, product, j);
                seenDigits = processed.seenDigits;
                product = processed.product;
            }
            {
                const lookupRow = row;
                const processed = doShit(lookupRow, seenDigits, product, j);
                seenDigits = processed.seenDigits;
                product = processed.product;

            }
            if (i !== input.length - 1) {
                const lookupRow = input[i + 1];
                const processed = doShit(lookupRow, seenDigits, product, j);
                seenDigits = processed.seenDigits;
                product = processed.product;
            }
            if (seenDigits < 2) continue;
            if (seenDigits > 2) {
                console.error('Theres more numbers than expected!!!!');
                process.exit(1);
            }
            res += product;

        }
    }
}


console.log(res)