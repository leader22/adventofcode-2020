// 14: Docking Data
// 36桁のビットマスクと、メモリへの値の代入を表す行が与えられる
// mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
// mem[3] = 10
// 代入したい値を、36ビットの2進数にして、maskと照合する
// maskのX: 元の値をそのまま、maskの0|1: maskの値で上書き
// そうして生成された新たな値を、元の指示の場所に代入する
// 最終的にメモリに代入された値たちを、合計したものが答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");

  const memory = [];

  let mask;
  let operation;
  for (const line of inputs) {
    const [op, val] = line.split(" = ");
    if (op.startsWith("mask")) {
      mask = val;
      continue;
    }
    if (op.startsWith("mem")) {
      const address = op.slice(4, -1);
      operation = { address: address|0, value: val|0 };
    }

    const masked = maskedValue(mask, operation.value);
    console.log("assign mem[%s] = %s", operation.address, masked);
    memory[operation.address] = masked;
  }

  const sum = memory.reduce((p, x) => p + x, 0);
  console.log("sum of all values = %s", sum);
})();

const maskedValue = (mask, value) => {
  // 10進数 > 2進数
  const bit = value.toString(2).padStart(36, "0");
  let answer = "";
  for (let i = 0; i < mask.length; i++) {
    answer += mask[i] === "X"
      ? bit[i]
      : mask[i];
  }

  // console.log(value);
  // console.log(bit)
  // console.log(mask);
  // console.log("-".repeat(36));
  // console.log(answer);

  // 2進数 > 10進数
  return parseInt(answer, 2);
};
