const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

/*
菜单
1.应用菜单（窗口菜单）
    windows linux 和mac os（所有的应用共享）
2.上下文菜单


菜单实现方式
1.模板

2.代码

electron-packager
npm
*/

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
            label: '编辑',
            submenu: [
                {
                    label: '撤销',
                    role: 'undo'
                },
                {
                    label: '重做',
                    role: 'redo'
                },
                {
                    label: '剪切',
                    role: 'cut'
                },
                {
                    label: '复制',
                    role: 'copy'
                },
                {
                    label: '粘贴',
                    role: 'paste'
                }
            ]
        },
        {
            label: '窗口',
            submenu: [
                {
                    label: '全屏显示窗口',
                    role: 'toggleFullScreen'
                },
                {
                    label: '窗口放大10%',
                    role: 'zoomIn'
                },
                {
                    label: '窗口缩小10%',
                    role: 'zoomOut'
                }
            ]

        }
    ]
    if (process.platform == 'darwin') {
        menuTemplate.unshift({
            label: 'Mac',
            submenu: [
                {
                    label: '关于',
                    role: 'about'
                },
                {
                    label: '开始说话',
                    role: 'startSpeaking'
                },
                {
                    label: '停止说话',
                    role: 'stopSpeaking'
                }
            ]
        })
    }
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