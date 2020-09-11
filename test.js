const fs = require('fs');
fs.readdir('./', 'utf8', (err, data) => {
    console.log(data)
})