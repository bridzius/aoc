import { readFile } from "fs/promises";

const input = await readFile("./input.txt");
const stringified_input = input.toString();

const result = stringified_input.split("\n").filter(i => i).reduce((acc, curr) => {
	const numbers = curr.replaceAll(/[a-z]*/g, "");
	console.log(`${numbers.at(0)}${numbers.at(-1)}`);
	return acc + Number(`${numbers.at(0)}${numbers.at(-1)}`);
}, 0);


console.log(result);
