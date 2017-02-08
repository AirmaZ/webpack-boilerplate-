/**
 * Created by user on 2016/10/21.
 */
import { HtmlInit, languageString } from '../../language/language'

window.flag = 0

var utilTools = {
  // 页面间跳转
  skipPage: (url, params, pageName) => {
    // 将参数追加至url
    url = utilTools.appendParamsToUrl(url, params)
    var data = {
      type: 'addTab',
      params: ['tabid_' + Date.parse(new Date()), url, pageName, true]
    }
    utilTools.pageAccess(data)
  },
  // 向url追加参数
  appendParamsToUrl: (url, params) => {
    if (!params || params === {}) {
      return url
    }
    var paramsStringArr = []
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var tempString = key + '=' + params[key]
        paramsStringArr.push(tempString)
      }
    }
    var paramsString = paramsStringArr.join('&')
    url += '?' + paramsString
    return url
  },
  // 获取项目根路径，如： http://localhost:8083/uimcardprj
  getRootPath: () => {
    // 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href
    // 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname
    var pos = curWwwPath.indexOf(pathName)
    // 获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos)
    // 获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1)
    return (localhostPaht + projectName)
  },
  // 跨域访问通信
  pageAccess: (data, callback) => {
    // 跨域访问主框架
    var topOrigin = window.location.hash.substring(1, window.location.hash.length)
    window.top.postMessage(JSON.stringify(data), topOrigin)
    // 获取返回的数据
    window.addEventListener('message', (e) => {
      var result = JSON.parse(e.data)
      if (callback) {
        callback(result)
      }
    })
  },
  // 获取sessionID
  getSessionId: () => {
    var c_name = 'JSESSIONID'
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + '=')
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1
        c_end = document.cookie.indexOf(';', c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
  },
  // 系统提示
  systemTip: (color, content) => {
    if (!content) {
      return
    }
    if ($tip) {
      $tip.remove()
    }
    let tipTmpl = `<div><div id="sys_tip">${content}</div></div>`
    tipTmpl = HtmlInit(tipTmpl)
    let $tip = $(tipTmpl)
    $tip.css({
      'position': 'fixed',
      'display': 'none',
      'top': '0',
      'margin-left': '-20em',
      'left': '50%',
      'width': '40em',
      'height': '2em',
      'line-height': '2em',
      'background-color': color,
      'border-radius': '0px 0px 0.3em 0.3em',
      'color': '#fff',
      'text-align': 'center',
      'font-size': '13px',
      'z-index': '10000'
    })
    $('body').append($tip)
    $tip.slideDown('normal')

    setTimeout(() => {
      $tip.slideUp('normal', function () {
        $tip.remove()
      })
    }, 3000)
  },
  /**
   * 表单序列化对象(post),与其他的serialize不同的是，该方法返回的参数是对象形式，在使用post方法传值的时候使用
   * @param {object} formObj
   * */
  formSerialize: (formObj) => {
    var o = {}
    var a = formObj.serializeArray()
    $.each(a, function () {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]]
        }
        o[this.name].push($.trim(this.value) || '')
      } else {
        o[this.name] = $.trim(this.value) || ''
      }
    })
    return o
  },
  getTableHeight: () => {
    var winHeight = $(window).height()
    return winHeight - 150
  },
  getItemById: (arr, id) => {
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i].id === id) {
        return arr[i]
      }
    }
    return {}
  }
}

export let commonAjax = (url, type, data, showTip, callback) => {
  let resourcesAjax = function (permissionAjax) {
    $.ajax({
      type: type,
      url: window.host + url,
      data: data ? JSON.stringify(data) : null,
      contentType: 'application/json',
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: (data) => {
        callback(data)
      },
      error: (ret) => {
        // 极其重要！！！！！！！！
        // 为单点登录跨域鉴权方案，等待补充！！！！！！
        // 由于设置了contentType:application/json无法处理302重定向，所以只能检测status为0；
        // 并且是跨域的，所有需要设置xhrFields来携带跨域的cookie，并让后端做相应处理。
        if (ret.status === 0) {
          window.flag = 0
          permissionAjax()
        }
        else if (ret.status === 417) {
          utilTools.systemTip('#E73C3C', languageString('{language.systemException}'))
          console.log(data.data)
        }
        else if (ret.status === 400) {
          utilTools.systemTip('#E73C3C', JSON.parse(ret.responseText).data || languageString('{language.systemException}'))
        }
      }
    }).done((data, msg, rsp) => {
      // 以2开头：200/201...
      if (/^2\d{2}$/.test(rsp.status)) {
        if (rsp.status === 201) {
          utilTools.systemTip('#00A776', languageString('{language.createSuccess}'))
        }
        else if (rsp.status === 200 && showTip) {
          utilTools.systemTip('#00A776', data.data || languageString('{language.operatSuccess}'))
        }
      }
    })
  }
  // 极其重要！！！！！！！！
  // 为单点登录跨域鉴权方案，等待补充！！！！！！
  // 并且是跨域的，所有需要设置xhrFields来携带跨域的cookie，并让后端做相应处理。
  let permissionAjax = function () {
    if (window.flag == 0) {
      $.ajax({
        type: 'GET',
        url: window.host + '/95cg/apiSession/check',
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      }).done((data) => {
        if (data == 'success') {
          window.flag = 1
          permissionAjax()
        }else {
          utilTools.systemTip('#E73C3C', languageString('{language.noPermission}'))
        }
      })
    }else {
      resourcesAjax(permissionAjax)
    }
  }
  permissionAjax()
}

export let commonAjaxMock = (url, type, data, showTip, callback) => {
  $.ajax({
    type: type,
    url: window.host + url,
    data: data ? JSON.stringify(data) : null,
    contentType: 'application/json',
    dataType: 'json',
    success: (data) => {
      callback(data)
    },
    error: (ret) => {
      if (ret.status === 417) {
        utilTools.systemTip('#E73C3C', languageString('{language.systemException}'))
        console.log(data.data)
      }
      else if (ret.status === 400) {
        utilTools.systemTip('#E73C3C', JSON.parse(ret.responseText).data || languageString('{language.systemException}'))
      }
    }
  }).done((data, msg, rsp) => {
    // 以2开头：200/201...
    if (/^2\d{2}$/.test(rsp.status)) {
      if (rsp.status === 201) {
        utilTools.systemTip('#00A776', languageString('{language.createSuccess}'))
      }
      else if (rsp.status === 200 && showTip) {
        utilTools.systemTip('#00A776', data.data || languageString('{language.operatSuccess}'))
      }
    }
  })
}

export default utilTools
