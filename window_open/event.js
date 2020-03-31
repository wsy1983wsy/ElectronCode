const remote = require('electron').remote;

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
 */

function windowOpen() {
    win = window.open('./other.html', '子窗口', 'width=100,height=100')
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
function printWindow(){
    if(win != undefined){
        win.print()
    }
}