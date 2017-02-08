/**
 * Created by Airma on 2016/10/24.
 */
// mock---------------------------------
// require("../mockjs/mock");

let HOST = location.hostname+":"+location.port;
//页面url
window.configUrl = {};
window.configUrl["RESOURCEM"] = "http://"+HOST+"/dist/view/resourceManagement.html";
window.configUrl["CUSTOMER"] = "http://"+HOST+"/dist/view/customerManagement.html";
window.configUrl["PROCESSLOG"] = "http://"+HOST+"/dist/view/processLog.html";
window.configUrl["PROCESSLOG_DPI"] = "http://"+HOST+"/dist/view/DPIProcessLog.html";
window.configUrl["RESOURCEM_DPI"] = "http://"+HOST+"/dist/view/resourceDPIManagement.html";
window.configUrl["CUSTOMER_DPI"] = "http://"+HOST+"/dist/view/customerDPIManagement.html";
window.configUrl["DETAILLOG"] = "http://"+HOST+"/dist/view/detailLog.html";
window.configUrl["DETAILLOG_DPI"] = "http://"+HOST+"/dist/view/DPIDetailLog.html";

// 数据请求域名
// window.host = 'http://localhost:9090';
window.host = 'http://ci.haohanheifei.com:13000';
// window.host = 'http://172.16.20.253:8080';