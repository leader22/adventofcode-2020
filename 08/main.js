// 08: Handheld Halting
// 独自の言語で書かれたプログラムを実装して動かすタイプ
// 各行(instruction)ごとに命令が書いてあって、
// operation(acc, jmp, nop) argument($int) という形式
// - accはグローバルなカウンターをargumentで計算して次の行へ
// - jmpはその行から相対的に行移動
// - nopは何もせず次の行へ
// プログラムは無限ループに陥るようになっている
// 2度目の実行となる行にきた時点での、カウンターの値が答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");
  const instructions = inputs.map(line2instruction);

  let acc = 0;
  let pos = 0;
  while (true) {
    const inst = instructions[pos];
    if (inst.pass) break;

    console.log(inst);
    switch (inst.op) {
      case "acc": {
        acc += inst.arg;
        pos++;
        break;
      }
      case "nop": {
        pos++;
        break;
      }
      case "jmp": {
        pos += inst.arg;
        break;
      }
    }
    inst.pass = true;
  }

  console.log("acc is %s", acc);
})();

const line2instruction = (line) => {
  const [op, arg] = line.split(" ");
  return { op, arg: arg|0, pass: false };
};
