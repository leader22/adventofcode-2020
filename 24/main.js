// 24: Lobby Layout
// 六角形の白タイルが無限に敷き詰められているとする
// 与えらる文字列は、中心のタイルからどの方向に移動していくかの指示
// W, E, NW, NE, SW, SEのいずれかに移動していき、ゴールが決まる
// ゴールのタイルは裏返って、白なら黒に、黒なら白になる
// すべての指示を終えた時、黒になってるタイルの数が答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");
  const lists = inputs.map(toDirections);

  const tiles = {};
  for (const line of lists) {
    console.log(line.join("|"));
    const pos = { x: 0, y: 0, z: 0 };
    for (const direction of line) {
      switch (direction) {
        case  "w": pos.x += -1; pos.y +=  1; pos.z +=  0; break;
        case  "e": pos.x +=  1; pos.y += -1; pos.z +=  0; break;
        case "nw": pos.x +=  0; pos.y += +1; pos.z += -1; break;
        case "ne": pos.x +=  1; pos.y +=  0; pos.z += -1; break;
        case "sw": pos.x += -1; pos.y +=  0; pos.z +=  1; break;
        case "se": pos.x +=  0; pos.y += -1; pos.z +=  1; break;
      }
    }

    console.log(pos);

    const ref = [pos.x, pos.y, pos.z].join(",");
    if (ref in tiles === false) tiles[ref] = 0;
    tiles[ref]++;
  }

  const numOfBlacks = Object.values(tiles).filter((c) => c % 2).length;
  console.log("%s tiles are black", numOfBlacks);

})();

const toDirections = (line) => line.match(/e|se|sw|w|nw|ne/g);
