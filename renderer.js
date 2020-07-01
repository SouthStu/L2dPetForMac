// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// 这个文件是渲染进程里最最开始执行的代码，如果有比它还前的，那一定是preload.js,否则什么情况下不论引入顺序都是这个文件最先执行
// 引入jquery
window.$ = window.jQuery = require("./js/jq");
// 引入log方法
window.log = function (any, tag = "debug") {
    let gettime = function () {
        let now = new Date();
        let nowTime = now.toLocaleString();
        let date = nowTime.substring(0, 10);//截取日期
        let time = nowTime.substring(10, 20); //截取时间
        let week = now.getDay(); //星期
        let hour = now.getHours(); //小时
        return date + time;
    }
    let obj2string = function (o) {
        var r = [];
        if (typeof o == "string") {
            return "" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "";
        }
        if (typeof o == "object") {
            if (!o.sort) {
                for (var i in o) {
                    r.push(i + ":" + obj2string(o[i]));
                }
                if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                    r.push("toString:" + o.toString.toString());
                }
                r = "{" + r.join() + "}";
            } else {
                for (var i = 0; i < o.length; i++) {
                    r.push(obj2string(o[i]))
                }
                r = "[" + r.join() + "]";
            }
            return r;
        }
        return o.toString();
    }

    let time = gettime()
    console.log(`%c[${time}][${tag}]`, "text-shadow: 0px 0px 1px red", any);
    const {ipcRenderer} = require('electron')

    ipcRenderer.send('console_log', `[${time}][${tag}]` + obj2string(any))
}
const {ipcRenderer} = require('electron')

ipcRenderer.on('show_tips', (event, arg) => {

});
// 加载
window.nload = function () {
    log('执行成功', 'nload');
    // live2d.getModel(0).startMotion('TapBody', 1, 3, function () {
    //     log('初始动画执行完成', 'nload')
    // });
}
log('renderer load 100%');