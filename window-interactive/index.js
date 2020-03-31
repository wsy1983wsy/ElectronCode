
/**
 *窗口交互（数据传递）
 window1 和window2 window1<-->window2
 窗口之间的交互就是两个窗口之间双向的数据传递
 使用ipc(interprocess Commnunication) 进程间通信方式在窗口之间传递数据
 ipcMain 和ipcRenderer
 ipcMain ，只能用在package.json指定的入口js中
 ipcRenderer，可以用于其他的窗口
 主窗口：window1，其他窗口：window2
 window1--->window2
 在window2中通过ipcRenderer触发一个时间，用于接收window1传递的数据
 在window2中会通过picRenderer给window1发一个消息，window1通过picMain触发一个事件，
 用户获取window2发过来的数据
 */
const { app, BrowserWindow } = require('electron');

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