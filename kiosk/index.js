const { app, BrowserWindow } = require('electron')
/**
 * mac os下设置图标不会显示，只有windows和linux会显示
 */
function createWindow() {
    //frame 设置边框
    //transparent 设置透明
    let win = new BrowserWindow({
        //锁定界面
        width: 400,
        height: 400,
        icon: '../../images/folder.png',
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
    //判断是否为苹果系统
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