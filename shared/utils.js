const fs = require("fs").promises;

exports.txt2arr = async (path, splitter = "\n") => {
  const contents = await fs.readFile(path, "utf-8");
  return contents.trim().split(splitter);
};

exports.txt2matrix = async (path) => {
  const contents = await fs.readFile(path, "utf-8");
  return contents.trim().split("\n")
    .map((line) => line.split(""));
};
