// 16: Ticket Translation
// フィールドの集まり、自分のチケット、近くのチケットの3つから成る文字列を与えられる
// - 各フィールドは0-4のようなレンジで表される
// - 各チケットは数値の配列で表される
// 近くのチケットの配列の中で、どのフィールドのレンジにも当てはまらないものを探す
// その当てはまらない数の合計が答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt", "\n\n");
  // const inputs = await txt2arr(__dirname + "/example.txt", "\n\n");

  const [fields, yourTicket, nearByTickets] = inputs;

  const range = parseFieldsRange(fields);
  const ticketValues = parseTicketValues(nearByTickets.split(":")[1].trim());

  let errorRate = 0;
  for (const value of ticketValues) {
    if (range.has(value)) continue;
    errorRate += value;
  }

  console.log("Error rate is %s", errorRate);
})();

const parseFieldsRange = (fields) => {
  const found = new Set();

  for (const field of fields.split("\n")) {
    const ranges = field.match(/(\d+-\d+)/g);
    for (const range of ranges) {
      let [from, to] = range.split("-").map(Number);
      for (from; from <= to; from++) {
        found.add(from);
      }
    }
  }

  return found;
};

const parseTicketValues = (tickets) => {
  const values = tickets.split(/[,\s]/g).map(Number);
  return values;
};
