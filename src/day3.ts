import fs from 'fs';
import path from 'path';

const numbers = fs
    .readFileSync(path.join(__dirname, '..', 'inputs', 'day3.txt'), 'utf-8')
    .trim()
    .split('\n');

let gamma = '';
let epsilon = '';

for (let i = 0; i < numbers[0].length; i++) {
    const ones = numbers
        .map((number) => number[i] === '1')
        .filter((bit) => bit);
    if (ones.length >= numbers.length / 2) {
        gamma += '1';
        epsilon += '0';
    } else {
        gamma += '0';
        epsilon += '1';
    }
}

let oxygenSearch = numbers;
let scrubberSearch = numbers;
let index = 0;

while (oxygenSearch.length > 1 || scrubberSearch.length > 1) {
    if (oxygenSearch.length > 1) {
        const ones = oxygenSearch
            .map((number) => number[index] === '1')
            .filter((bit) => bit);
        oxygenSearch = oxygenSearch.filter(
            (number) =>
                number[index] ===
                (ones.length >= oxygenSearch.length / 2 ? '1' : '0')
        );
    }
    if (scrubberSearch.length > 1) {
        const ones = scrubberSearch
            .map((number) => number[index] === '1')
            .filter((bit) => bit);
        scrubberSearch = scrubberSearch.filter(
            (number) =>
                number[index] ===
                (ones.length >= scrubberSearch.length / 2 ? '0' : '1')
        );
    }
    index++;
}

const powerUsage = parseInt(gamma, 2) * parseInt(epsilon, 2);
const lifeSupport =
    parseInt(oxygenSearch[0], 2) * parseInt(scrubberSearch[0], 2);
console.log('The total power usage is', powerUsage);
console.log('The life support rating is', lifeSupport);
