// 22: Crab Combat
// 2人のプレーヤーが、与えられた数列をデッキとして戦う
// デッキの先頭を各ラウンドで出し合う
// 数字の大きいほうが勝利
// 勝ったら、自分の出した数と相手の出した数を、自分のデッキの末尾に加える
// デッキが尽きたら負け
// 勝者のデッキの数を、末尾からidxで掛け算して足し合わせたものが答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt", "\n\n");
  // const inputs = await txt2arr(__dirname + "/example.txt", "\n\n");

  const [deck1, deck2] = inputs.map(str2deck);

  let round = 1;
  while (true) {
    console.log("-- Round %s --", round);
    console.log(deck1.toString());
    console.log(deck2.toString());

    const p1 = deck1.pick();
    const p2 = deck2.pick();

    console.log("%s plays: %s", deck1.name, p1);
    console.log("%s plays: %s", deck2.name, p2);

    if (p1 > p2) {
      console.log("%s wins the round!", deck1.name);
      deck1.keep([p1, p2]);
    } else {
      console.log("%s wins the round!", deck2.name);
      deck2.keep([p2, p1]);
    }

    console.log("")

    // end game
    if (deck1.noHands || deck2.noHands) {
      break;
    }

    round++;
  }

  console.log("== Post-game results ==");
  console.log(deck1.toString());
  console.log(deck2.toString());
  console.log("")

  const winner = deck1.noHands ? deck2 : deck1;

  console.log("Winner is %s", winner.name);
  console.log("Total score = %s", winner.score);
})();

const str2deck = (string) => {
  const [playerLine, ...cards] = string.split("\n");

  return new Deck(
    playerLine.slice(0, -1),
    cards.map(Number),
  );
};

class Deck {
  constructor(name, cards) {
    this.name = name;
    this.cards = cards;
  }

  get noHands() {
    return this.cards.length === 0;
  }

  get score() {
    let totalScore = 0;
    this.cards.forEach((card, idx) => {
      const score = this.cards.length - idx;
      totalScore += (card * score);
    });
    return totalScore;
  }

  pick() {
    const [pick, ...cards] = this.cards;
    this.cards = cards;
    return pick;
  }

  keep(cards) {
    this.cards = [...this.cards, ...cards];
  }

  toString() {
    const cards = this.cards.join(", ");
    return `${this.name}'s deck: ${cards}`;
  }
}

const printDeck = (decks) => {
  decks.forEach((deck) =>
    console.log(deck.toString())
  );
};
