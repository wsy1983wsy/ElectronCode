const remote = require('electron').remote;
const { webFrame } = require('electron')
function zoomIn() {
    //webFrame.setZoomLevel(2)
    webFrame.setZoomLevel(webFrame.getZoomLevel() + 1)
}

function zoomOut() {
    //webFrame.setZoomLevel(2)
    webFrame.setZoomLevel(webFrame.getZoomLevel() - 1)
}