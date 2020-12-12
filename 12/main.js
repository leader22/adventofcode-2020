// 12: Rain Risk
// アルファベットと数値から成るコマンドの列が与えられる
// それらはマス目の地図上の船を、どう移動させるかを表している
// N, S, E, W: それぞれの方角へ、数値だけ進める
// L, R: 船首を、それぞれの角度へ向ける（進まない）
// F: 船首方向へ、その数値だけ進める
// コマンドを全て実行したあと、初期位置からのマンハッタン距離が答え
// マンハッタン距離 = マス目に描いた三角形の底辺と高さを足したもの
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt");
  // const inputs = await txt2arr(__dirname + "/example.txt");

  const ship = new Ship();
  for (const inst of inputs) {
    const op = { action: inst[0], value: Number(inst.slice(1)) };

    switch (op.action) {
      case "N": ship.moveToNorth(op.value); break;
      case "S": ship.moveToSouth(op.value); break;
      case "E": ship.moveToEast(op.value); break;
      case "W": ship.moveToWest(op.value); break;
      case "L": ship.turnLeft(op.value); break;
      case "R": ship.turnRight(op.value); break;
      case "F": ship.forward(op.value); break;
      default: throw new Error("Invalid action!");
    }

    console.log(op);
    console.log(ship, ship.toString());
  }

  console.log("MD is %s", ship.getManhattanDistance());
})();

class Ship {
  constructor(headTo = "E", x = 0, y = 0) {
    this.headTo = headTo;
    this.x = x;
    this.y = y;
  }

  moveToEast(value) {
    this.x += value;
  }
  moveToWest(value) {
    this.x -= value;
  }
  moveToNorth(value) {
    this.y += value;
  }
  moveToSouth(value) {
    this.y -= value;
  }

  turnRight(degrees) {
    const d = degrees / 90;
    if (degrees % 90) throw new Error("Unexpected degrees!");

    // 360: do nothing
    if (d === 4) return;

    // 180: flip
    if (d === 2) {
      switch (this.headTo) {
        case "E": return this.headTo = "W";
        case "W": return this.headTo = "E";
        case "N": return this.headTo = "S";
        case "S": return this.headTo = "N";
      }
    }

    // 270: anti-clockwise
    if (d === 3) {
      switch (this.headTo) {
        case "E": return this.headTo = "N";
        case "W": return this.headTo = "S";
        case "N": return this.headTo = "W";
        case "S": return this.headTo = "E";
      }
    }

    // 90: clockwise
    if (d === 1) {
      switch (this.headTo) {
        case "E": return this.headTo = "S";
        case "W": return this.headTo = "N";
        case "N": return this.headTo = "E";
        case "S": return this.headTo = "W";
      }
    }

    throw new Error("!?");
  }

  turnLeft(degrees) {
    const d = degrees / 90;
    if (degrees % 90) throw new Error("Unexpected degrees!");

    // 360: do nothing
    if (d === 4) return;

    // 180: flip
    if (d === 2) {
      switch (this.headTo) {
        case "E": return this.headTo = "W";
        case "W": return this.headTo = "E";
        case "N": return this.headTo = "S";
        case "S": return this.headTo = "N";
      }
    }

    // 270: clockwise
    if (d === 3) {
      switch (this.headTo) {
        case "E": return this.headTo = "S";
        case "W": return this.headTo = "N";
        case "N": return this.headTo = "E";
        case "S": return this.headTo = "W";
      }
    }

    // 90: anti-clockwise
    if (d === 1) {
      switch (this.headTo) {
        case "E": return this.headTo = "N";
        case "W": return this.headTo = "S";
        case "N": return this.headTo = "W";
        case "S": return this.headTo = "E";
      }
    }

    throw new Error("!?");
  }

  forward(value) {
    switch (this.headTo) {
      case "E": return this.moveToEast(value);
      case "W": return this.moveToWest(value);
      case "N": return this.moveToNorth(value);
      case "S": return this.moveToSouth(value);
      default: throw new Error("Invalid headTo!");
    }
  }

  toString() {
    const xStr = this.x >= 0 ? "east" : "west";
    const yStr = this.y >= 0 ? "north" : "south";
    return `${xStr} ${Math.abs(this.x)}, ${yStr} ${Math.abs(this.y)}`;
  }

  getManhattanDistance() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}
