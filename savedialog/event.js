const remote = require('electron').remote;
const dialog = remote.dialog

//显示最简单的打开对话框
function save() {
    const label = document.getElementById('label')
    const options = {}
    options.title = '保存文件'
    options.buttonLabel = '保存'
    options.defaultPath = '.'
    options.nameFieldLabel = '请输入:'
    label.innerText = dialog.showSaveDialogSync(options)
}

function saveAsync() {
    const label = document.getElementById('label')
    const options = {}
    options.title = '保存文件'
    options.buttonLabel = '保存'
    options.defaultPath = '.'
    options.nameFieldLabel = '请输入:'
    dialog.showSaveDialog(options)
        .then(result => {
            label.innerText = result.filePath
        })
}