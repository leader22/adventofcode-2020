// 06: Custom Customs
// 空行で区切られたグループごとのアンケートの結果を集計する
// 各グループは行単位で人を表していて、結果はa-zのアルファベットになってる
// yesならそのアルファベットを答えていて、重複は無視してよい
// グループごとにユニークなアルファベットを数えて、合計したものが答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt", "\n\n");
  // const inputs = await txt2arr(__dirname + "/example.txt", "\n\n");

  let count = 0;
  for (const input of inputs) {
    const groupAnswer = parseGroup(input);
    count += groupAnswer.size;
  }
  console.log("Total counts = %s", count);
})();

const parseGroup = (chars) => {
  const answer = new Set([...(chars.replace(/\s/g, ""))]);
  return answer;
};
