const electron = require('electron');
const remote = electron.remote;
const {Menu, MenuItem, BrowserWindow, dialog} = remote

function saveClick() {
    let win = new BrowserWindow({width: 300, height: 300})
    win.loadURL('https://www.baidu.com')
}

function onLoad() {
    let panel = document.getElementById('panel')
    const menu = new Menu()
    let icon = ''
    if (process.platform == 'win32') {
        icon = '../images/folder.ico'
    } else {
        icon = '../images/open.png'
    }

    let menuItemOpen = new MenuItem(
        {
            label: '打开',
            icon: icon,
            click: () => {
                let paths = dialog.showOpenDialogSync({properties: ['openFile']});
                if (paths != undefined) {
                    remote.getCurrentWindow().setTitle(paths[0])
                }
            }
        }
    )
    let menuItemSave = new MenuItem(
        {
            label: '文件',
            click: saveClick
        }
    )

    let menuFile = new MenuItem({label: '文件', submenu: [menuItemOpen, menuItemSave]})

    let menuItemInsertImage = new MenuItem({label: '插入图像'})
    let menuItemRemoveImage = new MenuItem({label: '删除图像'})

    menu.append(menuFile)
    menu.append(menuItemInsertImage)
    menu.append(menuItemRemoveImage)

    panel.addEventListener('contextmenu', event => {
        event.preventDefault()
        menu.popup({x: event.x, y: event.y})
    })
}