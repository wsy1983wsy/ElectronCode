const remote = require('electron').remote;

function enterKiosk(){
    const win = remote.getCurrentWindow()
    win.setKiosk(true)
}

function closeKiosk(){
    const win = remote.getCurrentWindow()
    win.setKiosk(false)
}