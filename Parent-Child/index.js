const { app, BrowserWindow } = require('electron')
/**
 * 父子窗口
 * 1.子窗口总是在父窗口上面
 * 2.如果父窗口关闭，子窗口自动关闭
 * 3.子窗口相当于父窗口的悬浮窗口
 * Mac os x 和windows 区别在于，Mac os x 中移动父窗口，子窗口跟随移动，windows下不会移动
 */
function createWindow() {
    //创建父窗口
    let parent = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
    let child = new BrowserWindow({
        parent: parent,
        width: 200,
        height: 200,
        webPreferences: {
            nodeIntegration: true
        }
    })
    //加载index.html
    parent.loadFile('index.html')
    child.loadFile('child.html')
    parent.on("close", () => {
        console.log('closed')
        parent = null
    })

    // 打开开发者工具
    parent.webContents.openDevTools()
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