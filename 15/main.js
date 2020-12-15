// 15: Rambunctions Recitation
// 順番に数を言っていくゲームのルールをコードにする
// 最初にいくつかの数列が与えれる
// 最後に登場した数をお題に、各ターンで数を答える
// 初登場の場合、0を答えて次へ
// 1度目の場合、0を答えて次へ
// 2度目以上の場合、最新の登場ターンの差分を答えて次へ
// 2020ターン目の数が答え

(async () => {
  // const inputs = [0, 3, 6]; // 436
  // const inputs = [1, 3, 2]; // 1
  // const inputs = [2, 1, 3]; // 10
  // const inputs = [1, 2, 3]; // 27
  // const inputs = [2, 3, 1]; // 78
  // const inputs = [3, 2, 1]; // 438
  // const inputs = [3, 1, 2]; // 1836

  const inputs = [1, 0, 18, 10, 19, 6];

  let lastSpoken = null;
  const spokenMap = new Map();
  let turn = 1;
  while (true) {
    console.log("Turn %s:", turn);
    // console.log(" ", lastSpoken, spokenMap);

    if (turn === 2021) {
      console.log("2020th number is %s", lastSpoken);
      break;
    }

    // starting numbers
    if (inputs.length) {
      const number = inputs.shift();

      spokenMap.set(number, [turn]);
      lastSpoken = number;

      console.log("  => %s / from starting", number);
      turn++;
      continue;
    }

    // first time
    const onceSpoken = spokenMap.get(lastSpoken);
    if (onceSpoken && onceSpoken.length === 1) {
      const number = 0;
      const target = spokenMap.get(number);

      if (target) {
        spokenMap.set(number, [target[target.length - 1], turn]);
      } else {
        spokenMap.set(number, [turn]);
      }
      lastSpoken = number;

      console.log("  => %s / first time spoken", number);
      turn++;
      continue;
    }

    // already spoken
    if (onceSpoken && onceSpoken.length > 1) {
      const number = onceSpoken[1] - onceSpoken[0];
      const target = spokenMap.get(number);

      if (target) {
        spokenMap.set(number, [target[target.length - 1], turn]);
      } else {
        spokenMap.set(number, [turn]);
      }
      lastSpoken = number;

      console.log("  => %s / already spoken %s", number, onceSpoken);
      turn++;
      continue;
    }
  }
})();
