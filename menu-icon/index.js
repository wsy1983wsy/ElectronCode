const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

/*
菜单类型:
1.norma 默认的菜单类型
2.separator:分割线
3.submenu 子菜单
4.checkbox 多选材单
5.radio 单选菜单

图标：
    window 使用ico
    其他系统使用png
按照图片的原始尺寸显示,一般为16x16
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
    var icon = ''
    if (process.platform == 'win32') {
        icon = '../images/folder.ico'
    } else {
        icon = '../images/open.png'
    }
    //定义菜单模板
    const menuTemplate = [{
        label: '文件',
        submenu: [
            {
                label: '打开',
                icon: icon
            },
            {
                label: '重做',
                role: 'redo'
            }
        ]
    }];
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