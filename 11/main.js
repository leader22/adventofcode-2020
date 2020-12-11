// 11: Seating System
// .(フロア) / L(空シート) / #(満シート) から成るマトリックスが与えられる
// すべてのマスを同時に評価して、特定のルールによって更新する
// .: そのまま
// L: 周囲8マスのうち、すべてが#でないなら、#に、さもないとそのまま
// #: 周囲8マスのうち、4つ以上が#なら、Lに、さもないとそのまま
// 何度も更新を重ねると、そのうち結果が一定になるようになっている
// 更新が落ち着いたとき、最終的に#はいくつあるかが答え
const { txt2matrix } = require("../shared/utils");

(async () => {
  const inputs = await txt2matrix(__dirname + "/input.txt");
  // const inputs = await txt2matrix(__dirname + "/example.txt");

  let prev = matrix2string(inputs);
  while (true) {
    console.log(prev);
    console.log("");

    const outputs = iterateMatrix(string2matrix(prev));
    const latest = matrix2string(outputs);

    if (prev === latest) break;
    prev = latest;
  }

  const finallyOccupied = [...prev].filter((c) => c === "#").length;
  console.log("%s seats end up occupied", finallyOccupied);
})();

const matrix2string = (matrix) => {
  return matrix.map((row) => row.join("")).join("\n");
}
const string2matrix = (string) => {
  return string.split("\n").map((row) => row.split(""));
};

const createEmptyMatrix = (width, height) => {
  const matrix = [];

  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push("?");
    }
    matrix.push(row);
  }

  return matrix;
};

const iterateMatrix = (inputs) => {
  const height = inputs.length;
  const width = inputs[0].length;

  const outputs = createEmptyMatrix(width, height);

  const pos = [0, 0];
  while (pos[1] < height) {
    const [x, y] = pos;

    outputs[y][x] = calcNextMark(inputs, x, y);

    const nextX = x + 1;
    pos[0] = (nextX >= width) ? nextX - width : nextX;

    if (pos[0] === 0) {
      const nextY = y + 1;
      pos[1] = nextY;
    }
  }

  return outputs;
}

const calcNextMark = (inputs, x, y) => {
  const target = inputs[y][x];
  // console.log("[%s, %s] = %s", x, y, target);

  // .: floor = do nothing
  if (target === ".") return ".";

  // Otherwise, check adjacent pos
  const count = countAdjacentOccupied(inputs, x, y);
  // console.log("occupied adjacents = %s", count);

  // L: seat = if all adjacents are not occupied, mark as occupied
  if (target === "L")
    return count === 0 ? "#" : "L";

  // #: occupied = if 4~ adjacents are occupied, mark as seat
  if (target === "#")
    return count >= 4 ? "L" : "#";

  throw new Error("Undefined target!");
};

const countAdjacentOccupied = (inputs, x, y) => {
  let count = 0;

  // top left
  try {
    if (inputs[y-1][x-1] === "#") count++;
  } catch {}
  // top
  try {
    if (inputs[y-1][x] === "#") count++;
  } catch {}
  // top right
  try {
    if (inputs[y-1][x+1] === "#") count++;
  } catch {}
  // left
  try {
    if (inputs[y][x-1] === "#") count++;
  } catch {}
  // right
  try {
    if (inputs[y][x+1] === "#") count++;
  } catch {}
  // bottom left
  try {
    if (inputs[y+1][x-1] === "#") count++;
  } catch {}
  // bottom
  try {
    if (inputs[y+1][x] === "#") count++;
  } catch {}
  // bottom right
  try {
    if (inputs[y+1][x+1] === "#") count++;
  } catch {}

  return count;
};
