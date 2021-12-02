import fs from 'fs';
import path from 'path';

const depths = fs
    .readFileSync(path.join(__dirname, '..', 'inputs', 'day1.txt'), 'utf-8')
    .trim()
    .split('\n')
    .map((depth) => +depth.trim());

let increasedSingle = 0;
let increasedWindow = 0;

for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) increasedSingle++;
    if (
        depths[i] + depths[i + 1] + depths[i + 2] >
        depths[i - 1] + depths[i] + depths[i + 1]
    )
        increasedWindow++;
}

console.log('The number of increased single entries is', increasedSingle);
console.log('The number of increased window entries is', increasedWindow);
