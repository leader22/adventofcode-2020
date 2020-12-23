// 23: Crab Cups
// 数列が与えられ、それぞれをcupと呼ぶ
// cupはそれぞれ値がラベリングされていて、円状に並べられる
// 最初に指定されるcurrent cupから、100回に渡って、以下の動作をする
// - current cupの隣の3つを円からpick upして避ける
// - destination cupを選ぶ
//   - current cup -1 のcupがあればそれ
//   - もしpick upした中にそれがあったら、さらに-1していく
//   - cupの最低値を下回ってしまったら、最高値にする
// - pick upしたcupを、destination cupの隣に配置する
// - 次のcurrent cup（現currentの隣）へ
// これを繰り返し終わったあと、1のcupの隣から数を並べたものが答え
// しかし意味がわからなかった
// https://github.com/constb/aoc2020/blob/main/23/index.js
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");

  let cups = [...inputs[0]].map(Number);

  for (let i = 0; i < 100; i++) {
    console.log("-- move %s --", i + 1);
    console.log("cups: %s", toString(cups, i));

    const pickUps = cups.slice(1, 4);
    console.log("pick up: %s", pickUps.join(", "));

    const remaining = [cups[0]].concat(cups.slice(4));

    let destination = cups[0] - 1;
    while (true) {
      if (destination === 0) destination += cups.length;

      const pos = remaining.indexOf(destination);
      if (pos !== -1) {
        cups = remaining
          .slice(0, pos + 1)
          .concat(pickUps)
          .concat(remaining.slice(pos + 1));
        break;
      }

      destination--;
    }
    console.log("destination: %s", destination);

    cups.push(cups.shift());
    console.log("");
  }

  const res = cups.concat(cups);
  const answer = res.slice(res.indexOf(1) + 1, res.indexOf(1) + cups.length);
  console.log(answer.join(""));
})();

const toString = (cups, idx) =>
  cups.map((c, i) => (idx % cups.length) === i ? `(${c})` : c).join(" ");
