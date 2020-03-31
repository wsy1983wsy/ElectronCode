const { remote, ipcRenderer } = require('electron');
const ipcMain = remote.ipcMain


/**
 * 使用HTML5 API创建子窗口
 当调用  window.open 以在网页中创建新窗口时，将为url 创建一个新的BrowserWindow 实例，并返回一个代理至 window.open 以让页面对其进行有限的控制。
该代理具有有限的标准功能，与传统网页兼容。
 * window.open
 *
 * window.open(url[,title][,attributes])
 * url：要打开的页面的链接,可以使本地链接或远程
 * title：要打开页面的标题，如果再页面中已经设置了标题，这个参数将被忽略
 * attributes:设置与窗口相关的一些属性，如窗口的宽度和高度
 * 返回值：
 * BrowserWindowProxy
 * 
 * 
 * 控制窗口
 * 1.获取焦点：focus 
 * 2.让窗口失去焦点：blur
 * 3.关闭窗口：close
 * 4.显示打印对话框：print
 * 
 * 
 * 窗口之间的交互：最简单的数据方式
 * postMessage(data,'*')
 * 
 * 从子窗口返回数据
 * ipcRenderer.send(...)
 * ipcMain.on
 * 
 * 页面来源：谁使用url打开的新的子窗口，在本例中，谁是指index.html所在的路径
 * 
 * eval向子窗口传递数据
 * eval方法用来执行javascript代码
 */

ipcMain.on('close', (event, str) => {
    alert(str)
})

function windowOpen() {
    win = window.open('./other.html', '子窗口', 'width=400,height=400')
}
//获取焦点
function focusWindow() {
    if (win != undefined) {
        win.focus()
    }
}

function blurWindow() {
    if (win != undefined) {
        win.blur()
    }
}

function closeWindow() {
    if (win != undefined) {
        if (win.closed) {
            alert('已经关闭，不能再关闭')
            return
        }
        win.close()
    }
}
//显示打印对话框
function printWindow() {
    if (win != undefined) {
        win.print()
    }
}

function sendDataToChild() {
    if (win != undefined) {
        // win.postMessage(data.value, '*')
        win.postMessage({ name: data.value }, '*')
    }
}

function onLoad() {
    window.addEventListener('message', function (e) {
        data.innerText = e.data.name
        alert(e.origin)
    })
}

function closeSubWindow() {
    const win = remote.getCurrentWindow()
    ipcRenderer.send('close', '窗口已经关闭')
    win.close()
}

function evalSendData() {
    if (win != undefined) {
        win.eval('data.innerText = "' + data.value + '"')
    }
}