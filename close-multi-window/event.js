const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

function closeCurrentWindow() {
    const win = remote.getCurrentWindow()
    win.close()
}


function createMultiWindow() {
    if (global.windows == undefined) {
        console.log('lobal.windows === undefined')
        global.windows = [];
    }
    var win = new BrowserWindow({ show: false, x: 10, y: 10, width: 200, height: 200 })
    global.windows.push(win)

    win.loadFile('./child.html')
    win.on('ready-to-show', () => {
        win.show()
    })
}

function closeAllWindow() {
    if (global.windows != undefined) {
        for (let i = 0; i < global.windows.length; i++) {
            global.windows[i].close()
        }

        global.windows.length = 0
        global.windows = undefined
    }

    const win = remote.getCurrentWindow()
    win.close()
}