const { app, BrowserWindow } = require('electron')
/**
 * 模态窗口，指禁用父窗口的子窗口，也就是说，处于模态的子窗口显示后，无法使用父窗口，直到子窗口关闭
 * 1.模态窗口需要是另一个窗口的子窗口
 * 2.一旦模态窗口显示，父窗口将无法显示
 * modal=true
 * 主要用于设置，输入框，打开对话框之类的场景
 * mac 下：
 *      会隐藏模态窗口的标题栏，只能通过close方法关闭模态子窗口
 *      父窗口仍然可以拖动，但无法关闭
 * windows 下：
 *      模态窗口仍然会显示菜单和标题栏
 *      父窗口无法拖动
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
        modal: true,
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