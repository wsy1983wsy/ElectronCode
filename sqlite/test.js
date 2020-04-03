const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database(':memory', (err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log('已经连接成功sqlite数据库')
})