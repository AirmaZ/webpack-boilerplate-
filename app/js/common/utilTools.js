/**
 * Created by user on 2016/10/21.
 */

var utilTools = {
    // 页面间跳转
    skipPage: function(url, params, pageName){
        // 将参数追加至url
        url = this.appendParamsToUrl(url, params);
        var data = {
            type: 'addTab',
            params: ["tabid_" + Date.parse(new Date()), url, pageName, true]
        }
        utilTools.pageAccess(data);
    },
    // 向url追加参数
    appendParamsToUrl: function(url, params){
        if(!params || params === {}){
            return url;
        }
        var paramsStringArr = [];
        for(var key in params){
            if(params.hasOwnProperty(key)){
                var tempString = key + '=' + params[key];
                paramsStringArr.push(tempString);
            }
        }
        var paramsString = paramsStringArr.join('&&');
        url += '?' + paramsString;
        return url;
    },
    // 获取项目根路径，如： http://localhost:8083/uimcardprj
    getRootPath: function(){
        //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
        var curWwwPath = window.document.location.href;
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPaht = curWwwPath.substring(0,pos);
        //获取带"/"的项目名，如：/uimcardprj
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return(localhostPaht + projectName);
    },
    pageAccess: function(data, callback){
        // 跨域访问主框架
        var topOrigin = window.location.hash.substring(1, window.location.hash.length);
        window.top.postMessage(JSON.stringify(data), topOrigin);
        // 获取返回的数据
        window.addEventListener("message", function(e) {
            var result = JSON.parse(e.data);
            if (callback) {
                callback(result);
            };
        });
    }
};

export default utilTools

