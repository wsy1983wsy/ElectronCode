const remote = require('electron').remote;
const { webFrame } = require('electron')
function zoomIn() {
    //webFrame.setZoomLevel(2)
    webFrame.setZoomLevel(webFrame.getZoomLevel() + 1)
}