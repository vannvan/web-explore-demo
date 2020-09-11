const fs = require('fs');
var path = require("path");

var filePath = path.resolve();

const exclude = ['.git', '.gitignore', 'node_modules']

fs.readdir('./', 'utf8', (err, data) => {
    let datas = data.filter(item => !exclude.includes(item) && !/\./.test(item))
    console.log('已写入：', datas.length, '条资源至README.md')
    writeFile(datas)
})

// 写入到filelist.js文件
function writeFile(datas) {
    let content = `
### [web-explore-demo](https://vannvan.github.io/web-explore-demo/)
---- \n
`
    datas.map(el => {
        content += `- [${el}](https://github.com/vannvan/web-explore-demo/blob/master/${el}/index.html) \n`
    })
    // let itemStr = `- [${name}](https://github.com/vannvan/web-explore-demo/blob/master/${name}.html)`


    fs.writeFile(filePath + "/" + "README.md", content + '\n', function(err) {
        if (err) throw err;
    });
}