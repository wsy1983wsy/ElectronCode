const remote = require('electron').remote;
const dialog = remote.dialog

//普通消息对话框
function messageBox() {
    const label = document.getElementById('label')
    const options = {}
    options.title = '信息'
    options.message = '这是一个消息提示框'
    label.innerText = dialog.showMessageBoxSync(options)
}

