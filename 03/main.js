// 03: Toboggan Trajectory
// .(道)と#(木)から構成される地図が与えられる
// 左上から右方向と下方向に同じ間隔で降りていき、最下段まで移動する
// 道と木は特定のパターンで右方向に永遠に繰り返す
// なので右端についたら左端からやり直してよいということ
// 最下段につくまでにぶつかった木の数が答え
const { txt2matrix } = require("../shared/utils");

(async () => {
  // const inputs = await txt2matrix(__dirname + "/example.txt");
  const inputs = await txt2matrix(__dirname + "/input.txt");

  const right = 3;
  const down = 1;
  const height = inputs.length;
  const width = inputs[0].length;

  console.log({ right, down, height, width });

  let numOfTrees = 0;
  const pos = [0, 0];
  while (pos[1] < height) {
    const [x, y] = pos;

    const target = inputs[y][x];
    console.log("[%s, %s] = %s", x, y, target);
    if (target === "#") numOfTrees++;

    const nextX = x + right;
    pos[0] = (nextX >= width) ? nextX - width : nextX;
    const nextY = y + down;
    pos[1] = nextY;
  }

  console.log("%s trees", numOfTrees);
})();
