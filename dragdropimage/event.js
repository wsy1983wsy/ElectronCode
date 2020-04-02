const remote = require('electron').remote;

function getSizeAndPosition() {
    const win = remote.getCurrentWindow()
    console.log("宽:" + win.getSize()[0])
    console.log("高:" + win.getSize()[1])
    console.log("x:" + win.getPosition()[0])
    console.log("y:" + win.getPosition()[1])
}

function setSizeAndPosition() {
    const win = remote.getCurrentWindow()
    win.setSize(400, 400)
    win.setPosition(100, 100)
}