// 17: Conway Cubes
// よくわからなかった
// https://github.com/davidsharp/advent-of-code/blob/main/2020/days/17.js
const { txt2matrix } = require("../shared/utils");

(async () => {
  const inputs = await txt2matrix(__dirname + "/input.txt");
  // const inputs = await txt2matrix(__dirname + "/example.txt");

  const { state, bounds } = parseInputs(inputs);
  console.log({ state, bounds });

  let turn = 1;
  while (turn <= 6) {
    // re-define cube boundaries
    const prevState = new Set(state);
    prevState.forEach((val) => {
      const [x, y, z] = val.split(",").map(Number);
      if (x - 1 < bounds[0][0]) bounds[0][0] = x - 1;
      if (x + 1 > bounds[0][1]) bounds[0][1] = x + 1;
      if (y - 1 < bounds[1][0]) bounds[1][0] = y - 1;
      if (y + 1 > bounds[1][1]) bounds[1][1] = y + 1;
      if (z - 1 < bounds[2][0]) bounds[2][0] = z - 1;
      if (z + 1 > bounds[2][1]) bounds[2][1] = z + 1;
    });

    for (let x = bounds[0][0]; x <= bounds[0][1]; x++) {
      for (let y = bounds[1][0]; y <= bounds[1][1]; y++) {
        for (let z = bounds[2][0]; z <= bounds[2][1]; z++) {
          let count = 0;
          for (let _x = -1; _x <= 1; _x++) {
            for (let _y = -1; _y <= 1; _y++) {
              for (let _z = -1; _z <= 1; _z++) {
                if (
                  !(_x === 0 && _y === 0 && _z === 0) &&
                  prevState.has(`${x + _x},${y + _y},${z + _z}`)
                ) {
                  count++;
                }
              }
            }
          }

          // #: active
          if (prevState.has(`${x},${y},${z}`)) {
            if (count !== 2 && count !== 3) {
              state.delete(`${x},${y},${z}`);
            }
          }
          // .: inactive
          else {
            if (count === 3) {
              state.add(`${x},${y},${z}`);
            }
          }
        }
      }
    }

    turn++;
  }

  console.log(state.size);
})();

const parseInputs = (matrix) => {
  const state = new Set();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "#") state.add(`${j},${i},0`);
    }
  }

  const bounds = [
    [0, matrix[0].length],
    [0, matrix.length],
    [0, 0],
  ];

  return { state, bounds };
};

