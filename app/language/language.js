/**
 * Created by zhuhongwei on 2016/10/28.
 */


/**
 * 国际化文件替换方法，将{}中的字符替换
 * @param {object} language 国际化文件
 * @return {string} {string}
 */
String.prototype.strFormatter = function (language) {
    let args = language;
    return this.replace(/\{[^\{]+\}/g, function (m, i) {
        let string = m.replace(/{/, "").replace(/}/, "");
        return args[string];
    });
};


/**
 * html国际化字符串替换
 */
let languageHtml = function () {
    if (window.LANGUAGE) {
        let ele = document.getElementsByClassName("i18n");
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].attributes["i18n"]) {
                ele[i].innerHTML = ele[i].attributes["i18n"].value.strFormatter(window.LANGUAGE);
            }
            ele[i].innerHTML = ele[i].textContent.strFormatter(window.LANGUAGE);
        }
    } else {
        console.log("language err!")
    }
}();

/**
 *  js字符串国际化
 * @param {string} string
 * @param {bool} obj 返回的时候是json
 * @return {*}
 */
let languageString = function (string,obj) {
    if (window.LANGUAGE) {
        if(obj){
            let obj = {};
            string.replace(/\{[^\{]+\}/g, function (m, i) {
                let string = m.replace(/{/, "").replace(/}/, "");
                obj = window.LANGUAGE[string];
            });
            return obj;
        }else{
            return string.strFormatter(window.LANGUAGE);
        }
    } else {
        console.log("language err!")
    }
};

/**
 * 格式化html片段
 * @param html
 * @return {*|jQuery|HTMLElement}
 */
let HtmlInit = function (html) {
    html = $(html);
    if (window.LANGUAGE) {
        let ele = html.find(".i18n");
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].attributes["i18n"]) {
                html.find(ele[i])[0].innerHTML = ele[i].attributes["i18n"].value.strFormatter(window.LANGUAGE);
            }
            html.find(ele[i])[0].innerHTML = ele[i].textContent.strFormatter(window.LANGUAGE);
        }
        return html[0].outerHTML;
    } else {
        console.log("language err!")
    }
};


export {HtmlInit,languageString};