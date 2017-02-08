/**
 * Created by user on 2016/10/19.
 */

/**
 * 显示页面
 * @param {string} url 需要展示页面的url
 */
function showPage(url) {
    // do something...
    // 添加hash（主框架域名）
    url += '#' + window.location.origin;
    $('iframe').attr('src', url);
}
// 左侧导航点击事件处理：在iframe框架中显示对应子页面
$('a[targetname]').on('click', function(){
    // var url = $(this).attr('linkhref');
    var url = $(this).attr('targetname');
    showPage(configUrl[url]);
});

// 捕获子页面请求访问并处理
window.addEventListener( "message", function(e) {
    var data = JSON.parse(e.data);
    var params = data.params;
    // 请求添加标签页
    if (data.type === 'addTab') {
        // window.TabManager.addTab(params[0], params[1], params[2], params[3]);
        showPage(params[1]);
    }
});