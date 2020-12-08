// 01: Report Repair
// 数字のリストが与えられる
// 足して 2020 になるペアを見つけて、そのペアを掛け算した結果が答え
const { txt2arr } = require("../shared/utils");

(async () => {
  // const inputs = await txt2arr(__dirname + "/example.txt");
  const inputs = await txt2arr(__dirname + "/input.txt");

  const asc = inputs.map(Number).sort((a, b) => a - b);
  const desc = asc.slice().reverse();

  const found = [];
  for (const i of asc) {
    // もう足せない
    if (i > 2020) continue;

    for (const j of desc) {
      if (i + j === 2020) {
        // 既に見つけてるやつとおなじ
        if (found[1] === i) break;
        found[0] = i;
        found[1] = j;
        break;
      }
    }
  }

  const answer = found[0] * found[1];
  console.log(found, answer);
})();
