/**
 * 
 * @authors liumin
 * @date    2016-11-02 17:44:28
 * @version $Id$
 */

import utilTools from './utilTools'
import {HtmlInit, languageString} from '../../language/language'

let initUploader = (url, selectId, sessionId, importPop, table)=>{
    let uploader = WebUploader.create({
        // swf文件路径
        swf: './webuploader-0.1.5/Uploader.swf',
        // 文件接收服务端。
        server: url + ';jsessionid=' + sessionId,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#' + selectId,
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        fileVal: 'pageUpload'
    });

    // 当有文件被添加进队列的时候
    uploader.on( 'fileQueued', (file)=> {
        var $list = $('#thelist');
        $list.append( '<div id="' + file.id + '" class="item">' +
            '<h4 class="info">' + file.name + '</h4>' +
            '<p class="state">等待上传...</p>' +
            '</div>' );
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', (file, percentage)=> {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress .progress-bar');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<div class="progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                '</div>' +
                '</div>').appendTo( $li ).find('.progress-bar');
        }

        $li.find('p.state').text('上传中');

        $percent.css( 'width', percentage * 100 + '%' );
    });

    uploader.on( 'uploadSuccess', (file, response)=> {
        $( '#'+file.id ).find('p.state').text(response.log);
        // 关闭弹出层
        importPop.close();
        // 刷新表格
        if(table)
            table.draw();
            // table.page('last').draw(false);
        utilTools.systemTip('#00A776', languageString('{language.operatSuccess}'));
    });

    uploader.on( 'uploadError', (file)=>{
        $( '#'+file.id ).find('p.state').text('上传出错');
        utilTools.systemTip('#E73C3C', languageString('{language.systemException}'));
    });

    uploader.on( 'uploadComplete', (file)=> {
        $( '#'+file.id ).find('.progress').fadeOut();
    });

    $('#ctlBtn').on('click', ()=>{
        uploader.upload();
    });
};

export default initUploader