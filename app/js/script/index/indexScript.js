/**
 * Created by Airma on 2016/9/30.
 */

import utilTools from "../../common/utilTools"

$('a[targetname]').on('click', function(){
    var pageName = $(this).attr('targetname');
    utilTools.skipPage(configUrl[pageName], null, pageName);
});