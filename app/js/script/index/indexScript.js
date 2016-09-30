/**
 * Created by Airma on 2016/9/30.
 */

let fragment = require("../../../view/html/indexFragment.html");

const title = "新的前端框架,haha";

$(".index-title").text(title);debugger;
$(".index-indexFragment").html(fragment);



$.ajax({
    url: 'http://g.cn',
}).done(function(data){
    console.log(data)
});