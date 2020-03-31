const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

//获取ipcMain对象
const { ipcRenderer } = require('electron')
// 获取ipcMain对象
const ipcMain = remote.ipcMain;
//主窗口接收其他窗口发送过来的消息
ipcMain.on('other', (event, str) => {
    const labelReturn = document.getElementById('labelFromOther');
    labelReturn.innerText = labelReturn.innerText + '\r\n' + str;
});

//主窗口向other窗口发送数据
function sendData() {
    var win = new BrowserWindow({
        show: false, x: 10, y: 10, width: 400, height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('./other.html')
    win.once('ready-to-show', () => {
        win.show()
        win.webContents.send('data', {
            name: 'aaa',
            salary: 2345
        })
    })
}

//关闭other窗口
function onClose() {
    const win = remote.getCurrentWindow()
    ipcRenderer.send('other', '窗口关闭')
    win.close()
}

function onLoad() {
    ipcRenderer.on('data', (event, data) => {
        const labelName = document.getElementById('label_name')
        const labelSalary = document.getElementById('label_salary')
        labelName.innerText = data.name
        labelSalary.innerText = data.salary
    })
}