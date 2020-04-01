const remote = require('electron').remote;
/**
 * 在窗口中嵌入web页面
 * 
 * 1.<webview> 必须设置webviewTag为true，
 *      let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true //electron>=5 后必须设置webviewTag 标签为true
        }
    })
 * 2.webview事件 
        const loadStart = () => {
        console.log('loadStart')
    }
    //页面装载完成
    const loadStop = () => {
        console.log('loadStop')
    }

    webview.addEventListener('did-start-loading', loadStart)
    webview.addEventListener('did-stop-loading', loadStop)

 * 3.在<webview>中装载页面中执行Node.js API  标签中加入nodeintegration
 * 4.webview常用的API
 */


function onLoad() {
    const webview = document.getElementById('webview1')
    //页面装载开始
    const loadStart = () => {
        console.log('loadStart')
    }
    //页面装载完成
    const loadStop = () => {
        console.log('loadStop')
    }

    webview.addEventListener('did-start-loading', loadStart)
    webview.addEventListener('did-stop-loading', loadStop)
}

function webviewAPI() {
    const webview = document.getElementById('webview1')
    webview.loadURL('https://www.baidu.com')
    // webview.reload()
    console.log(webview.getTitle())
    console.log(webview.getURL())
    webview.executeJavaScript('console.log("' + webview.getTitle() + '-' + webview.getURL() + '")')
    webview.openDevTools()
}