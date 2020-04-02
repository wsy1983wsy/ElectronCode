const remote = require('electron').remote;
const app = remote.app
//数据存储，用localstorage读写键值数据
//web 和Electron的数据存储方案，前端和和后端

/**
 * 键值存储，localstorage，IndexedDB
 * PouchDB：客户端库
 * SQLite
 */

function quit() {
    app.quit()
}

window.onload = function () {
    let notes = window.localStorage['notes']
    if (!notes) {
        notes = 'hello notes'
    }
    textarea.value = notes
}

function saveNotes() {
    let notes = textarea.value
    window.localStorage.setItem('notes', notes)
}