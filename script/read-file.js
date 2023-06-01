const fs = require("fs");
const path = require("path");

const filePath = path.resolve();

const exclude = [".git", ".gitignore", "node_modules"];

fs.readdir("./source", "utf8", (err, data) => {
  let datas = data.filter(
    (item) => !exclude.includes(item) && !/\./.test(item)
  );
  console.log("已更新：", datas.length, "条资源");
  writeFile(datas);
});

// 写入到filelist.js文件
function writeFile(data) {
  data = JSON.stringify(data, null, "\t");
  let content = `const linkList = ${data}`;
  fs.writeFile("./script/filelist.js", content + "\n", function (err) {
    if (err) throw err;
  });
}
