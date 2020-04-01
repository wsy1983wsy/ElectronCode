const electron = require('electron');
const remote = electron.remote;
const {Menu, MenuItem, BrowserWindow} = remote

function saveClick() {
    let win = new BrowserWindow({width: 300, height: 300})
    win.loadURL('https://www.baidu.com')
}

let customMenu = new Menu()

function allOriginMenu() {
    const menu = new Menu()
    let icon = ''
    if (process.platform == 'win32') {
        icon = '../images/folder.ico'
    } else {
        icon = '../images/open.png'
    }

    let menuItemOpen = new MenuItem({label: '打开', icon: icon})
    let menuItemSave = new MenuItem({label: '保存', click: saveClick})
    let menuItemFile = new MenuItem({label: '文件', submenu: [menuItemOpen, menuItemSave]})

    let MyCustom = new MenuItem({label: '定制菜单', submenu: customMenu})
    menu.append(menuItemFile)
    menu.append(MyCustom)

    Menu.setApplicationMenu(menu)
}

function addMenuItem() {
    let type = 'normal'
    if (radio.checked) {
        type = 'radio'
    }
    if (checkbox.checked) {
        type = 'checkbox'
    }
    customMenu.append(new MenuItem({label: menuitem.value, type: type}))
    menuitem.value = ''
    radio.checked = false;
    checkbox.checked = false;
    Menu.setApplicationMenu(Menu.getApplicationMenu())
}
