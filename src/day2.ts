import fs from 'fs';
import path from 'path';

enum Direction {
    Forward,
    Up,
    Down,
}

type Instruction = [direction: Direction, amount: number];

const instructions: Instruction[] = fs
    .readFileSync(path.join(__dirname, '..', 'inputs', 'day2.txt'), 'utf-8')
    .trim()
    .split('\n')
    .map((instruction) => {
        const [direction, amount] = instruction.split(' ');
        const value =
            direction === 'forward'
                ? Direction.Forward
                : direction === 'up'
                ? Direction.Up
                : direction === 'down'
                ? Direction.Down
                : null;
        if (value === null) throw new Error('Unknown direction.');
        return [value, +amount];
    });

let rawX = 0;
let rawY = 0;
let aimY = 0;
let aim = 0;

for (const instruction of instructions) {
    if (instruction[0] === Direction.Up) {
        aim -= instruction[1];
        rawY -= instruction[1];
    } else if (instruction[0] === Direction.Down) {
        aim += instruction[1];
        rawY += instruction[1];
    } else if (instruction[0] === Direction.Forward) {
        rawX += instruction[1];
        aimY += aim * instruction[1];
    }
}

console.log(
    'The raw position is',
    rawX,
    'X',
    rawY,
    'Y for a product of',
    rawX * rawY
);
console.log(
    'The aim position is',
    rawX,
    'X',
    aimY,
    'Y for a product of',
    rawX * aimY
);
