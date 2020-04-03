const remote = require('electron').remote;
const app = remote.app

//使用javascript引擎（sql.js)操作sqlite数据库
/**
 * 桌面级关系数据库
 */
let sql = require('./sql')
let db = new sql.Database() //创建内存数据库
const fs = require('fs')

function writeDBToDisk(callback) {
    let binaryArray = db.export()
    fs.writeFile('test.db', binaryArray, 'binary', function (err) {
        if (err) {
            if (callback != undefined) {
                callback(err)
            }
        } else {
            if (callback != undefined) {
                callback('成功创建数据库文件')
            }
        }
    })
}

function createDatabase() {
    fs.exists('test.db', function (exists) {
        if (exists) {
            fs.unlinkSync('test.db')
        }
        let createTableSql = `create table if not exists t_products (
                             id integer primary key autoincrement,
                             product_name varchar(100) not null,
                             price float not null)`
        db.run(createTableSql)
        writeDBToDisk(msg => {
            btn_create.disabled = true
            btn_insert.disabled = false
        })
    })
}

function insert() {
    if (db == undefined) {
        return
    }

    let insertSQL = `insert into t_products(product_name,price) 
                     select "iPhone10", 10000 
                     union all 
                     select "Android手机",8888
                     union all
                     select "特斯拉电动车",888888;`
    db.run(insertSQL);

    writeDBToDisk((msg) => {
        alert(msg);
        btn_insert.disabled = true;
        btn_query.disabled = false;
        btn_update.disabled = false;
        btn_delete.disabled = false;
    })
}

function query() {
    if (db == undefined) return;
    let selectSQL = 'select * from t_products';
    var rows = db.exec(selectSQL);

    label_row.innerText = '';

    for (var i = 0; i < rows[0].values.length; i++) {
        label_row.innerText += '\r\n产品ID：' + rows[0].values[i][0] +
            '\r\n产品名称：' + rows[0].values[i][1] +
            '\r\n产品价格：' + rows[0].values[i][2] + '\r\n';
    }
}

function update() {
    if (db == undefined) return;
    let updateSQL = 'update t_products set price=999999 where id = 3';
    db.exec(updateSQL);
    writeDBToDisk((msg) => {
        alert(msg);
    })
}

function onClick_Delete() {
    if (db == undefined) returnl;
    let deleteSQL = 'delete from t_products where id = 2;';
    db.exec(deleteSQL);
    writeDBToDisk((msg) => {
        alert(msg);
    })
}
