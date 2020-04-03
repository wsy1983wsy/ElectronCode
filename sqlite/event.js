const remote = require('electron').remote;
const app = remote.app

//使用javascript引擎（sql.js)操作sqlite数据库
/**
 * 桌面级关系数据库
 */
/**
 * 使用sqlite模块操作SQLite数据库
 *
 * Node.js中的模块
 * 
 *
 * 
 * electron中 sqlite3需要重新编译，因为sqlite3是一个本地模块
 * 
 * windows: visual studio 2017
 * mac: xcode
 * 
 * npm install -g node-gyp
 *
 * node-gyp
 * 
 * mac:
 * npm install --save sqlite3
 * npm install --save electron-rebuild
 * ./node_modules/.bin/electron-rebuild -v 8.1.1(electron版本号)
 * 
 * windows:
 * npm install --save sqlite3
 * npm install --save electron-rebuild
 * ./node_modules/.bin/electron-rebuild.cmd -v 8.1.1(electron版本号)
 */


const sqlite3 = require('sqlite3').verbose();

let db;
var fs = require('fs');
//  创建数据库
function createDatabase() {
    fs.exists('test.db', function (exists) {
        if (exists) {
            fs.unlinkSync('test.db');
        }
        db = new sqlite3.Database('test.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                alert(err.message);
            } else {
                alert('成功连接test.db数据库!');

                let createTableSQL = `create table if not exists t_products(
                          id integer primary key autoincrement,
                          product_name varchar(100) not null,
                          price float not null
                      )`;
                db.run(createTableSQL, function (err) {
                    if (err) {
                        alert(err.message);
                    } else {
                        btn_create.disabled = true;
                        btn_insert.disabled = false;

                    }
                });

            }
        });
    })



}

function insert() {
    if (db == undefined) return;
    let insertSQL = 'insert into t_products(product_name,price) select "iPhone10",10000 union all select "Android手机",8888 union all select "特斯拉",888888;'
    db.run(insertSQL, function (err) {
        if (err) {
            alert(err.message);
        } else {
            alert('成功插入记录');
            btn_insert.disabled = true;
            btn_query.disabled = false;
            btn_update.disabled = false;
            btn_delete.disabled = false;
        }
    });
}

function query() {
    if (db == undefined) return;
    let selectSQL = 'select * from t_products';
    db.all(selectSQL, [], function (err, rows) {
        if (err) {
            alert(err.message);
        } else {
            label_rows.innerText = '';
            for (var i = 0; i < rows.length; i++) {
                label_rows.innerText += '\r\n产品ID:' + rows[i].id +
                    '\r\n产品名称:' + rows[i].product_name +
                    '\r\n产品价格:' + rows[i].price + '\r\n';

            }



        }
    });
}

function update() {
    if (db == undefined) return;
    let updateSQL = 'update t_products set price = 999999 where id = 3';
    db.run(updateSQL, function (err) {
        if (err) {
            alert(err.message);
        } else {
            alert('成功更新记录');

        }
    });
}

function delte() {
    if (db == undefined) return;
    let deleteSQL = 'delete from t_products where id = 2';
    db.run(deleteSQL, function (err) {
        if (err) {
            alert(err.message);
        } else {
            alert('成功删除记录');

        }
    });
}
