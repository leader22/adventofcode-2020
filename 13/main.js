// 13: Shuttle Search
// 現在のタイムスタンプと、バスのIDの配列が与えられる
// バスのIDは、それぞれバスがやってくる時間の最小の倍数になってる
// つまり ID: 7は、7/14/21/28...のタイムスタンプのときにやってくる
// もっとも速いバスは、どのIDかを見つける
// そのバスIDと、出発時間までの待ち時間をかけたものが答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");

  const now = Number(inputs[0]);
  const busIds = inputs[1]
    .split(",")
    .map((i) => Number(i))
    .filter((i) => isNaN(i) === false);

  console.log({ now, busIds });

  let time = now;
  let busId;
  main:
  while (true) {
    for (const id of busIds) {
      if (time % id === 0) {
        busId = id;
        break main;
      }
    }

    time++;
  }

  console.log({ diff: time - now, busId });
  console.log("answer is %s", (time - now) * busId);
})();
