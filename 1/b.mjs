import { readFile } from "fs/promises";

const input = await readFile("./input.txt");
const stringified_input = input.toString();

const words = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function findNumber(input, first = true) {
        let result = 0,
                i = 1;
        while (result === 0) {
                const test = first
                        ? input.substring(0, i)
                        : input.substring(input.length - i, input.length);
                const word = words.some((w) => test.includes(w));
                const num = numbers.some((n) => test.includes(n));

                const checker = word ? words : num ? numbers : [];
                for (let j = 0; j < checker.length; j++) {
                        result =
                                test.indexOf(checker[j]) !== -1
                                        ? j + 1
                                        : result;
                }
                i++;
        }
        return result;
}

const result = stringified_input
        .split("\n")
        .filter((i) => i)
        .reduce((acc, curr) => {
                const first = findNumber(curr);
                const last = findNumber(curr, false);
                return acc + Number(`${first}${last}`);
        }, 0);

console.log(result);
