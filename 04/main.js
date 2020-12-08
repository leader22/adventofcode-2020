// 04: Passport Processing
// 空行で区切られたkey:valueを含むテキストをパースする
// それがパスポートであり、必要な項目が含まれているかをチェックする
// - byr (Birth Year)
// - iyr (Issue Year)
// - eyr (Expiration Year)
// - hgt (Height)
// - hcl (Hair Color)
// - ecl (Eye Color)
// - pid (Passport ID)
// - cid (Country ID)
// cidだけはOptionalで、ほかはRequired
// validなパスポートはいくつあるかが答え
const { txt2arr } = require("../shared/utils");

(async () => {
  const inputs = await txt2arr(__dirname + "/input.txt", "\n\n");
  // const inputs = await txt2arr(__dirname + "/example.txt", "\n\n");

  let numOfValid = 0;
  for (const lines of inputs) {
    const p = lines2passport(lines);
    isValidPassport(p) && numOfValid++;
  }

  console.log("%s passports are valid", numOfValid);
})();

const lines2passport = (lines) => {
  const passport = {};
  for (const kv of lines.split(/\s/)) {
    const [key, value] = kv.split(":");
    passport[key] = value;
  }
  return passport;
};

const isValidPassport = (passport) => {
  return (
    "byr" in passport &&
    "iyr" in passport &&
    "eyr" in passport &&
    "hgt" in passport &&
    "hcl" in passport &&
    "ecl" in passport &&
    "pid" in passport
  );
};
