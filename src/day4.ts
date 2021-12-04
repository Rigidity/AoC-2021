import fs from 'fs';
import path from 'path';

const input = fs
    .readFileSync(path.join(__dirname, '..', 'inputs', 'day4.txt'), 'utf-8')
    .trim()
    .split('\n\n')
    .map((item) => item.trim());

const numbers = input[0].split(',').map((item) => +item.trim());

interface BoardNumber {
    value: number;
    drawn: boolean;
}

type Board = BoardNumber[][];

const boards: Board[] = [];

for (const item of input.slice(1)) {
    boards.push(
        item.split('\n').map((line) =>
            line
                .trim()
                .split(/\s+/)
                .map((number) => ({ value: +number, drawn: false }))
        )
    );
}

let firstResult: number | undefined;
let lastResult: number | undefined;

for (const number of numbers) {
    const left = boards.filter((board) => !isBingo(board));
    if (!left.length) break;
    for (const board of left) {
        draw(board, number);
        if (isBingo(board)) {
            const remainder = allNotDrawn(board);
            lastResult = number * remainder.reduce((a, b) => a + b.value, 0);
            if (firstResult === undefined) firstResult = lastResult;
        }
    }
}

if (firstResult) {
    console.log('The first result of the bingo is', firstResult);
} else {
    console.log('There was no first result.');
}

if (lastResult) {
    console.log('The last result of the bingo is', lastResult);
} else {
    console.log('There was no last result.');
}

function isBingo(board: Board): boolean {
    search: for (let i = 0; i < 5; i++) {
        if (board[i].findIndex((number) => !number.drawn) === -1) return true;
        for (let j = 0; j < 5; j++) {
            if (!board[j][i].drawn) continue search;
        }
        return true;
    }
    return false;
}

function allNotDrawn(board: Board): BoardNumber[] {
    return board.flat(2).filter((number) => !number.drawn);
}

function draw(board: Board, value: number): void {
    const match = board.flat(2).find((number) => number.value === value);
    if (match) match.drawn = true;
}
