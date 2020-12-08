// 05: Binary Boarding
// FBFBBFFRLR のような文字列が与えられる
// F or Bから成る7桁と、L or Rから成る3桁の10文字
// 0-127までの128列と、0-7までの8行ある座席のどこかがわかる
// Fなら前半分、Bなら後半分、Lなら左、Rなら右、というように
// 2分探査していって、[row, column]を割り出す
// seatID = row * 8 + column として計算できる
// 文字列のリストからseatIDを計算し、その中での最大値が答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");

  let maxSid = 0;
  for (const input of inputs) {
    const [r1, r2, r3, r4, r5, r6, r7, c1, c2, c3] = [...input];
    const row = div([r1, r2, r3, r4, r5, r6, r7], 127);
    const col = div([c1, c2, c3], 7);
    const sid = row * 8 + col;

    maxSid = Math.max(maxSid, sid);
    console.log({ row, col, sid });
  }

  console.log("Max seatID is %s", maxSid);
})();

const div = (chars, end) => {
  const pos = [0, end];
  for (const char of chars) {
    const nextSize = (pos[1] - pos[0] + 1) / 2;
    if (char === "F" || char === "L") {
      pos[1] = pos[1] - nextSize;
    }
    if (char === "B" || char === "R") {
      pos[0] = pos[0] + nextSize;
    }
  }

  if (pos[0] !== pos[1]) throw new Error();
  return pos[0];
}
