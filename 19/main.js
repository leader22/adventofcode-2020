// 19: Monster Messages
// 2つのパートからなる文字列が与えられる
// 前半のパートは、番号つきのルール表
// 1: "a" なら、1 は "a" という文字に対応するということ
// 3: "b" なら、3 は "b" に対応する
// 2: 1 | 3 なら、 2 は、 1（さっきの"a"）か、3（"b"）に対応するということ
// 0: 1 2 なら、 1:"a" + (2:"a" or "b") となり、
// aa or ab ということがわかる
// このルールに従って、まず0番のルールを解読して文字列を得る
// そのあと、後半のパートの文字列をチェックしていって、
// 0番のルールにマッチした回数が答え
// しかし、コードにはできなかった
// https://github.com/sohcah/AdventOfCode/blob/master/2020-Sam/19-1/index.js
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt", "\n\n");
  // const inputs = await txt2arr(__dirname + "/example.txt", "\n\n");

  const rules = inputs[0]
    .split("\n")
    .map((r) => r.split(": "))
    // sort is needed to optimize, otherwise stack exceeded
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map((r) => r[1]);

  const messages = inputs[1].split("\n");

  const cache = new Map();

  const valueRe = /^"([a-z])"$/;
  const generateRegex = (i) => {
    if (cache.has(i)) return cache.get(i);

    const match = rules[i].match(valueRe);
    if (match !== null) {
      const value = match[1];
      cache.set(i, match[1]);
      return value;
    }

    const r = rules[i].split(" | ");
    const x = `(${r
      .map((i) => `(${i.split(" ").map(generateRegex).join("")})`)
      .join("|")
    })`;
    cache.set(i, x);

    return x;
  }

  const regex = new RegExp(`^${generateRegex(0)}$`);
  console.log(generateRegex(0))
  console.log(messages.filter((m) => regex.test(m)).length);
})();
