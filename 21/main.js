// 21: Allergen Assesment
// 食品（素材+そのアレルギー表記）の文字列の配列が与えられる
// 素材はそれぞれ0か1のアレルギーを含む
// アレルギー表記は、完全ではなく、欠損している可能性がある
// 少なくとも、アレルギーを含んでない素材を見つけ出して数える
// その素材が使われた回数を、素材リストから数えたものが答え
// しかしコードにできなかった
// https://github.com/pixelomer/AdventOfCode/blob/main/2020/Day%2021%20-%20Allergen%20Assessment/solution.js
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");

  const foods = inputs.map(string2food);

  const allergenMap = {};
  for (const food of foods) {
    for (const allergen of food.allergens) {
      if (allergen in allergenMap === false) {
        allergenMap[allergen] = [...food.ingredients];
        continue;
      }

      allergenMap[allergen] = allergenMap[allergen]
        .filter((i) => food.ingredients.includes(i));
    }
  }

  console.log(allergenMap);

  const set = new Set();
  for (const allergens of Object.values(allergenMap)) {
    for (const allergen of allergens) {
      set.add(allergen);
    }
  }

  console.log(set);

  let sum = 0;
  for (const food of foods) {
    sum += food.ingredients.length;

    for (const allergen of set) {
      if (food.ingredients.includes(allergen)) sum--;
    }
  }

  console.log("answer is %s", sum);
})();

const string2food = (string) => {
  const [ingredients_, allergens_] = string.split(" (contains ");

  const ingredients = ingredients_.split(" ");
  const allergens = allergens_.slice(0, -1).split(", ");

  return { ingredients, allergens };
};

