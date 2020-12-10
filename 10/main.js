// 10: Adapter Array
// 数列のリストが与えられる
// それらはアダプターの規格をあらわす
// アダプターは、自身の値より1から3まで上の数値に接続できる
// 0 -> 1 or 2 or 3 | 1 -> 2-4 | 2 -> 3-5 | 3 -> 4-6 のように
// outlet: 0からはじまって、すべてのアダプターを接続していく
// さいごは3の差でdeviceにつながる
// このとき、差が1で接続した回数と、差が3で接続した個数を、掛けた数が答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");

  const items = inputs.map(Number).sort((a, b) => a - b);

  const gap = {
    1: 0,
    2: 0,
    3: 0,
  };

  // outlet -> adapter
  gap[items[0]]++;

  // adapter -> adapter
  let i = 0;
  let cur, next;
  while (i < items.length) {
    cur = items[i];
    next = items[i + 1];

    if (!next) break;

    const jolt = next - cur;
    gap[jolt]++;
    console.log(cur, next, jolt);

    i++;
  }

  // adapter -> device
  gap[3]++;

  console.log("1-jolt: %s x 3-jolt: %s = %s", gap[1], gap[3], gap[1] * gap[3]);
})();
