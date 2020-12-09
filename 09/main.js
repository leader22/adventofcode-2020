// 09: Encoding Error
// 数列のリストと、preambleという数値が与えられる
// preambleの数の次の位置からリストを順に見ていき、値を評価する
// 値が、直前のpreambleヶの数列の中の、いずれか2つを足したものならvalid
// そうでないならinvalidで、最初にinvalidと判定される値が答え
// ペアは異なる値である必要がある
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");

  const items = inputs.map(Number);

  console.log(items);

  const preamble = 25;

  let idx = 0;
  let prev;
  let n;
  for (let i = preamble; i < items.length; i++) {
    prev = items.slice(idx, idx + preamble);
    n = items[i];

    // console.log("%s is in %s?", n, prev);

    let valid = false;
    loop:
    for (let j = 0; j < prev.length; j++) {
      for (let k = prev.length - 1; k >= 0; k--) {
        if (prev[j] === prev[k]) continue;
        // console.log(j, k, prev[j], prev[k]);
        if (n === prev[j] + prev[k]) {
          valid = true;
          break loop;
        }
      }
    }

    console.log("%s is valid ? %s", n, valid);
    if (!valid) break;
    idx++;
  }
})();
