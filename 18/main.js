// 18: Operation Order
// 計算式が文字列で与えられるので、それを演算する
// ただしルールが我々の知ってるものとは違うらしい
// +も*も関係なく、左から順に演算していく
// ()で囲われたところは、先に演算される
// すべての計算式を演算した結果を足し合わせたものが答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");
  // const answers = [71, 51, 26, 437, 12240, 13632];

  let total = 0;
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    const tokens = mathStr2mathToken(input);
    const answer = calcTokens(tokens);
    // const answer = answers[i];

    console.log("%s = %s", input, answer);
    console.log("");

    total += answer;
  }

  console.log("Total: %s", total);
})();

const mathStr2mathToken = (str) => {
  str = str.replace(/(\d+)/g, "{ 't': 'v', 'v': $1 },");
  str = str.replace(/([+*])/g, "{ 't': 'o', 'v': '$1' },");
  str = str.replace(/\(/g, "[");
  str = str.replace(/\)/g, "],");
  str = "[" + str + "]";

  return eval(str);
};

const calcTokens = (tokens) => {
  let answer = 0;
  let operator = "+";
  for (const token_ of tokens) {
    // console.log(token_);
    const token = Array.isArray(token_)
      ? { t: "v", v: calcTokens(token_) }
      : token_;

    if (token.t === "v") {
      if (operator === "+") {
        answer += token.v;
      }
      if (operator === "*") {
        answer *= token.v;
      }
    }
    if (token.t === "o") {
      operator = token.v;
    }
  }

  return answer;
};
