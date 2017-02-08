/**
 * Created by Airma on 2016/10/24.
 */
//页面url
window.configUrl = {};

let HOST = location.hostname+":"+location.port;

window.configUrl["RESOURCEM"] = "http://"+HOST+"/dist/view/resourceManagement.html";
window.configUrl["CUSTOMER"] = "http://"+HOST+"/dist/view/customerManagement.html";

// 数据请求域名
// window.host = 'http://ci.haohanheifei.com:13000';
$.ajax({
    dataType: "json",
    url: "../../resource/www-config.json",
    async: false,
    success: function (data) {
        window.host = data.remoteUrl;
    }
});
// $.getJSON("/home/haohan/95charge_1.0.0-Build1/conf/www-config.json",function (data) {
//     window.host = data.remoteUrl;
// });