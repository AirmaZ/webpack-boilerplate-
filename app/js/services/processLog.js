import {commonAjax} from '../common/utilTools'
// import {commonAjaxMock as commonAjax} from '../common/utilTools'

let processLog = {
    get: (callback)=>{
        let url = `/95cg/api/log/find`;
        let type = 'GET';
        commonAjax(url, type, null, false, (data)=>{
            callback(data.data);
        });
    },
    queryPage: (data, callback)=>{
        let url = `/95cg/api/log/list`;
        let type = 'POST';
        commonAjax(url, type, data, false, (data)=>{
            callback(data);
        });
    }
}

export default processLog;