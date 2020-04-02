/*
为应用程序添加多个托盘图标


 */
const {app, Menu, Tray, BrowserWindow} = require('electron');


function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true //electron>=5 后必须设置webviewTag 标签为true
        }
    });
    win.loadFile('index.html');
    win.on('closed', () => {
        console.log('closed');
        win = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    console.log('window-all-closed');
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    console.log('activate');
    if (win == null) {
        createWindow();
    }
})

