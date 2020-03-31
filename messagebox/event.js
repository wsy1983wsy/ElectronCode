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

function messageBoxIcon() {
    const label = document.getElementById('label')
    const options = {}
    options.title = '信息'
    options.message = '这是一个消息提示框'
    options.icon = '../images/kt.png'
    label.innerText = dialog.showMessageBoxSync(options)
}

//消息对话框类型
// 1. 默认对话框 none
// 2. 信息对话框 info
// 3. 错误对话框 error
// 4. 询问对话框 question
// 5. 警告对话框 warning
function messageBoxType() {
    const label = document.getElementById('label')
    const options = {}
    options.title = '信息'
    options.message = '这是一个消息提示框'
    options.type = 'error'
    options.icon = '../images/kt.png'
    label.innerText = dialog.showMessageBoxSync(options)
}

function messageBoxMultiButton() {
    const label = document.getElementById('label')
    const options = {}
    options.title = '信息'
    options.message = '这是一个消息提示框'
    options.buttons = ['button1', 'button2', 'button3']
    options.type = 'error'
    options.icon = '../images/kt.png'
    //返回按钮的id
    label.innerText = dialog.showMessageBoxSync(options)
}

function showErrorBox() {
    dialog.showErrorBox('错误','错误信息')
}