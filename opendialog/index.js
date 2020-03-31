const { app, BrowserWindow } = require('electron')
/**
 * 打开对话框
 * Dialog.showOpenDialog([browserWindow,]options[,callback])
 * browserWindow参数允许该对话框将自身附加到父窗口，作为父窗口的模态对话框
 * callback，返回选择的文件或路径，如果不指定callback，选择文件或目录会通过showOpenDialog方法的返回值返回
 * options：
 *  title: string 对话框的标题（适用于windows)
 *  defaultPath：string 默认的路径
 *  buttonlabel：string 按钮文本（mac 右侧，windows 左侧）
 *  filters:Array 用于过滤指定类型的文件
 *  properties,Array 包含对话框的功能，如果打开文件，打开目录，多选等
 *  message string 对话框标题（mac）
 *  
 */
function createWindow() {
    //BrowserWindow代表一个window，
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    //加载index.html
    win.loadFile('index.html')
    win.on("close", () => {
        console.log('closed')
        win = null
    })

    // 打开开发者工具
    win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    console.log('all window closed')
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    console.log('activate')
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})