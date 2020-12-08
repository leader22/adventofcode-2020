// 02: Password Philosophy
// パスワードのポリシーと、そのパスワードのリストが与えられる
// ポリシーは、N-M ? という形式になっている
// ?の文字がN-M回使われている必要があるというルール
// それを満たすvalidのパスワードはいくつあるかが答え
const { txt2arr } = require("../shared/utils");

(async () => {
  // const inputs = await txt2arr(__dirname + "/example.txt");
  const inputs = await txt2arr(__dirname + "/input.txt");

  const policyAndPasswordPairs = line2pairs(inputs);

  let valid = 0;
  for (const { policy, password } of policyAndPasswordPairs) {
    isValid(policy, password) && valid++;
  }

  console.log("%s passwords are valid!", valid);
})();

const isValid = (policy, password) => {
  password = password.split("").sort().join("");

  // ソートした上で、先頭と末尾のidxがわかれば、何文字あるかわかる
  const startPos = password.indexOf(policy.char);
  const lastPos = password.lastIndexOf(policy.char);

  if (startPos === -1 || lastPos === -1) return false;

  // 0, 0 だとしても1文字はあるので
  const len = 1 + lastPos - startPos;

  if (policy.min > len) return false;
  if (policy.max < len) return false;

  return true;
};

const line2pairs = (lines) => {
  const re = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/;
  const pairs = lines.map((line) => {
    const match = line.match(re);
    if (match === null) throw new Error("Invalid line!");

    return {
      policy: {
        min: Number(match[1]),
        max: Number(match[2]),
        char: match[3],
      },
      password: match[4],
    };
  });

  return pairs;
};
