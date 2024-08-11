function finalPositionOfSnake(n: number, commands: string[]): number {
  let col = 0;
  let row = 0;

  for (const cmd of commands) {
    if (cmd === "UP") {
      row -= 1;
    } else if (cmd === "DOWN") {
      row += 1;
    } else if (cmd === "LEFT") {
      col -= 1;
    } else if (cmd === "RIGHT") {
      col += 1;
    }
    console.log("row: ", row, "col: ", col);
  }

  return row * n + col;
}

console.log(finalPositionOfSnake(3, ["DOWN", "RIGHT", "UP"]));
