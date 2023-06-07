/*
 * Description: 生成一个新的demo
 * Created: 2023-06-07 17:08:03
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-06-07 17:15:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const fs = require('fs')
const path = require('path')

const name = process.argv[2]

if (!name) {
  console.log('无效的名称')
} else {
  ;(async () => {
    fs.mkdirSync(path.resolve(`./source/${name}`))

    fs.writeFileSync(
      path.resolve(`./source/${name}/index.html`),
      `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${name}</title>
    </head>
    <body>
      
    </body>
    </html>
    `
    )
  })()
}

console.log(name)
