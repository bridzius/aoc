import { readFile } from "node:fs/promises";

const matcher = [12, 13, 14];
const colors = ["red", "green", "blue"];

const input = (await readFile("./input.txt")).toString("utf-8");

const result = input
        .split("\n")
        .filter((l) => l)
        .map((row) => {
                const values = row
                        .substring(row.indexOf(":") + 1, row.length)
                        .replaceAll(" ", "")
                        .split(";");
                return values
                        .map((v) => {
                                let map = { red: 0, green: 0, blue: 0 };
                                const cubes = v.split(",");
                                for (let i = 0; i < cubes.length; i++) {
                                        const color = colors.find(
                                                (c) =>
                                                        cubes[i].indexOf(c) !==
                                                        -1,
                                        );
                                        map[color] = Number(
                                                cubes[i].replace(color, ""),
                                        );
                                }
                                return [map.red, map.green, map.blue];
                        })
                        .reduce((result, game) => {
                                for (let el = 0; el < 3; el++) {
                                        if (game[el] > matcher[el]) {
                                                return false;
                                        }
                                }
                                return result;
                        }, true);
        })
        .reduce((result, game, game_index) => {
                return game ? result + game_index + 1 : result;
        }, 0);

console.log(result);
