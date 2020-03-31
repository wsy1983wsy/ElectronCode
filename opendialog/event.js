const remote = require('electron').remote;
const dialog = remote.dialog
function openFile() {
    const label = document.getElementById('label')
    dialog.showOpenDialog({ properties: ['openFile'] })
        .then(result => {
            label.innerText = result.filePaths
        })
}