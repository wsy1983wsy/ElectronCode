const { app, BrowserWindow } = require('electron')

function createWindow() {
    //BrowserWindow代表一个window，
    //如果fullscreen为true，则系统会忽略width，height,x,y这些属性，仍然全屏显示
    let win = new BrowserWindow({
        fullscreen: true,
        width: 200,
        height: 200,
        x: 200,
        y: 200,
        maxWidth: 600,
        maxHeight: 600,
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