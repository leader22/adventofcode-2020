// 20: Jurassic Jigsaw
// 1枚の写真をN枚に分割し、ランダムに回転・反転させたタイルが与えられる
// タイルにはIDがある
// タイルはNxNの文字列で、.と#から成る
// 正しい位置のタイルは、必ず隣接するタイルと同じ辺を持つ
// 正しく配置できたとき、四隅のタイルのIDがわかるはず
// そのIDをかけ合わせたものが答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt", "\n\n");
  // const inputs = await txt2arr(__dirname + "/example.txt", "\n\n");

  const tiles = inputs.map(toTile);

  for (const tile of tiles) {
    for (const edge of tile.edges) {
      for (const nextTile of tiles) {
        const match = nextTile.edges.includes(edge);
        if (match) tile.matches++;
      }
    }
  }

  const corners = tiles
    .map(({ id, matches }) => ({ id, matches: matches / 2 - 4 }))
    .sort((a, b) => a.matches - b.matches);
  console.log(corners);

  const answer = corners.slice(0, 4).reduce((acc, cur) => {
    acc *= cur.id;
    return acc;
  }, 1);

  console.log(answer);
})();

const toTile = (line) => {
  const [idLine, ...tileLines] = line.split("\n");
  const id = idLine.slice(5, -1) | 0;

  // console.log(id);
  // console.log(tileLines.join("\n"));
  const edges = collectEdges(tileLines);

  return { id, edges, matches: 0 };
};

// 1. rotate   0
// 2. rotate  90
// 3. rotate 180
// 4. rotate 270
// x
// a. flip vertical
// b. flip horizontal
// = 8 patterns
const collectEdges = (tileLines) => {
  const top = tileLines.slice(0, 1)[0];
  const right = tileLines.map((line) => line.slice(-1)).join("");
  const left = tileLines.map((line) => line.slice(0, 1)).join("");
  const bottom = tileLines.slice(-1)[0];

  const topRev = top.split("").reverse().join("");
  const rightRev = right.split("").reverse().join("");
  const leftRev = left.split("").reverse().join("");
  const bottomRev = bottom.split("").reverse().join("");

  return [
    top, right, left, bottom,
    topRev, rightRev, leftRev, bottomRev,
  ];
};
