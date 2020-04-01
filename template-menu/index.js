const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

function createWindow() {
    //BrowserWindow代表一个window，
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true //electron>=5 后必须设置webviewTag 标签为true
        }
    })
    //加载index.html
    win.loadFile('index.html')

    //定义菜单模板
    const menuTemplate = [
        {
            label: '文件', submenu: [
                {
                    label: '关于',
                    // role: 'about', //只有mac 有用
                    click: () => {
                        var aboutWin = new BrowserWindow({
                            width: 300,
                            height: 300
                        })
                        aboutWin.loadURL('https://www.baidu.com')
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: '关闭',
                    accelerator: 'Command+Q',
                    click: () => { win.close() }
                }
            ]
        },
        {
            label: '编辑', submenu: [
                {
                    label: '复制',
                    accelerator: 'Command+C',
                    click: () => {
                        win.webContents.insertText('复制')
                    }
                },

                {
                    label: '剪切',
                    accelerator: 'Command+X',
                    click: () => {
                        win.webContents.insertText('复制')
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: '查找',
                    accelerator: 'Command+F',
                    click: () => {
                        win.webContents.insertText('复制')
                    }
                }
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
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