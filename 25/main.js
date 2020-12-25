// 25: Combo Breaker
// カードとドアのハンドシェイクを解読する
// ハンドシェイクには、サブジェクト番号を変換する操作がある
// value = 1からはじめて、特定の回数(loop size）だけ次の手順を実行する
// - value = value * subject number
// - value = value % 20201227
// 公開鍵 = ↑のロジック(subjectNumber, loopSize)
// 公開鍵が文字列として与えられるので、それぞれのサブジェクト番号とloop sizeを復号する
// そのあとで、カードのloop sizeでドアのサブジェクト番号を変換したものが答え
// しかし計算効率が悪くて、答えが出せなかった
// https://github.com/constb/aoc2020/blob/main/25/index.js
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");

  const [cardPubKey, doorPubKey] = inputs.map(Number);

  const [min, max] = [cardPubKey, doorPubKey].sort();

  let i, j, val;
  for (val = 7, i = 1; val !== min; i++) {
    val = (val * 7) % 20201227;
  }
  let key = max;
  for (j = 1; j < i; j++) {
    key = (key * max) % 20201227;
  }

  console.log("Encryption key is %s", key);
})();
