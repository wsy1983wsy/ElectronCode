/*
菜单
1.应用菜单（窗口菜单）
    windows linux 和mac os（所有的应用共享）
2.上下文菜单


菜单实现方式
1.模板

2.代码
*/

const electron = require('electron');
const remote = electron.remote;
const { screen } = remote
function clickScreen() {
    const win = remote.getCurrentWindow();
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    console.log('width:' + width);
    console.log('height:' + height);
    win.setSize(width, height, true);
    win.setPosition(0, 0);

    // 获取鼠标当前的绝对坐标
    console.log('x:' + screen.getCursorScreenPoint().x);
    console.log('y:' + screen.getCursorScreenPoint().y);
}