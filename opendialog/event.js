const remote = require('electron').remote;
const dialog = remote.dialog

//显示最简单的打开对话框
function openFile() {
    const label = document.getElementById('label')
    dialog.showOpenDialog({ properties: ['openFile'] })
        .then(result => {
            label.innerText = result.filePaths
        })
}

//定制打开对话框
function openCustomFile() {
    const label = document.getElementById('label')
    const options = {}
    options.title = '打开文件' //设置windows标题
    options.message = '打开我的文件' //设置Mac的标题
    options.properties = ['openFile']
    options.buttonLabel = '选择'
    dialog.showOpenDialog(options)
        .then(result => {
            label.innerText = result.filePaths
        })
}

//带过滤器
function openFileFileters() {
    const label = document.getElementById('label')
    const options = {}
    options.title = '打开文件' //设置windows标题
    options.message = '打开我的文件' //设置Mac的标题
    options.properties = ['openFile']
    options.buttonLabel = '选择'
    options.filters = [
        { name: '图像文件', extensions: ['jpg', 'jpeg', 'gif'] },
        { name: '视频文件', extensions: ['mkv', 'avi', 'mp4'] },
        { name: '所有文件(*)', extensions: ['*'] }
    ]
    dialog.showOpenDialog(options)
        .then(result => {
            label.innerText = result.filePaths
        })
}