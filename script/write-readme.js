const fs = require("fs");
const path = require("path");

const filePath = path.resolve();

const exclude = [".git", ".gitignore", "node_modules"];

fs.readdir("./source", "utf8", (err, data) => {
  let datas = data.filter(
    (item) => !exclude.includes(item) && !/\./.test(item)
  );
  console.log("已写入：", datas.length, "条资源至README.md");
  writeFile(datas);
});

function writeFile(datas) {
  let content = `
### [web-explore-demo](https://vannvan.github.io/web-explore-demo/)
---- \n
`;
  datas.map((el) => {
    content += `- [${el}](https://github.com/vannvan/web-explore-demo/blob/master/source/${el}/index.html) \n`;
  });

  fs.writeFile(filePath + "/" + "README.md", content + "\n", function (err) {
    if (err) throw err;
  });
}
