const { app, BrowserWindow } = require('electron')
/**
 * 优雅的加载页面
 * show,是否显示页面
 * 1.创建一个隐藏的window
 * 2.加载页面
 * 3.将ready-to-show事件绑定到页面
 * 4.在ready-to-show事件中，显示页面
 */
function createWindow() {
    //创建一个页面，设置show为false
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    })
    //加载index.html
    win.loadFile('index.html')
    //当页面加载完成后，调用show方法
    win.on('ready-to-show', () => {
        win.show()
    })
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