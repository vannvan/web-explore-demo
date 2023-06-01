const fs = require('fs')
const path = require('path')

const filePath = path.resolve()

const previewUrl = 'https://vannvan.github.io/web-explore-demo'

fs.readdir('./source', 'utf8', (err, data) => {
  const datas = data.filter((item) => !/\./.test(item))

  writeFile(datas)
})

function writeFile(datas) {
  let content = `# 已包含${datas.length}条内容 [预览地址👉](${previewUrl})  \n ---- \n`

  const detail = `<details> 
<summary>案例内容⬇️</summary>
${datas
  .map((el) => {
    return `<li> <a href="https://github.com/vannvan/web-explore-demo/blob/master/source/${el}/index.html">${el}</a> </li>`
  })
  .join('\n')}
</details>`
  content += detail + '\n'

  content += '\n ## 来过 \n 如果为您提供了灵感欢迎点个⭐️'
  fs.writeFile(filePath + '/' + 'README.md', content, function (err) {
    if (err) throw err
    console.log('已写入：', datas.length, '条资源至README.md')
  })
}
