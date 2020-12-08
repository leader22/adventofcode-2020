// 07: Handy Haversacks
// バッグには、色と、その中に入るバッグの数が決まっている
// ルールは以下のようなフォーマット
// light red bags contain 1 bright white bag, 2 muted yellow bags.
// dark orange bags contain 3 bright white bags, 4 muted yellow bags.
// bright white bags contain 1 shiny gold bag.
// muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
// shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
// dark olive bags contain 3 faded blue bags, 4 dotted black bags.
// vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
// faded blue bags contain no other bags.
// dotted black bags contain no other bags.
// 特定のバッグを指定されたとき、そのバッグを持ち込むにはどのパターンがありえるか
// その組み合わせの色の数が答え
// たとえばshiny goldの場合、
// 直接的にmuted yellowかbright whiteに入る場合と
// 間接的にmuted yellowとbrtight whiteが入るlight redとdark orangeに入ってる場合がある
// あわせて4色というのが答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");
  const rules = parseRules(inputs);

  console.log(rules);

  const target = "shiny gold";
  const found = new Set();

  walk(target, { rules, found });
  console.log("%s colors!", found.size);
})();

const parseRules = (lines) => {
  const rules = {};
  for (let line of lines) {
    const [outer, inner] = line.split(" contain ");
    const [outerName] = outer.split(" bags");

    const inners = {};
    const innerBags = inner.split(",");
    for (const bag of innerBags) {
      const match = bag.match(/(\d+) (.+) bag/);
      if (match) {
        inners[match[2]] = match[1] | 0;
      }
    }

    rules[outerName] = inners;
  }

  return rules;
};

const walk = (name, { rules, found }) => {
  console.log("search %s", name);
  for (const [key, rule] of Object.entries(rules)) {
    if (name in rule) {
      console.log("%s found in %s!", name, key);
      found.add(key);
      walk(key, { rules, found });
    }
  }
};
