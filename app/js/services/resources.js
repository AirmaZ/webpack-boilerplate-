import {commonAjax} from '../common/utilTools'
// import {commonAjaxMock as commonAjax} from '../common/utilTools'

let resources = {
    get: (id, callback)=>{
        let url = `/95cg/api/snmp_res/${id}`;
        let type = 'GET';
        commonAjax(url, type, null, false, (data)=>{
            callback(data);
        });
    },
    queryPage: (params, callback)=>{
        let url = `/95cg/api/snmp_res/list`;
        let data = params;
        let type = 'POST';
        commonAjax(url, type, data, false, (data)=>{
            callback(data);
        });
    },
    queryPageFilter: (filterParams, callback)=>{
        let url = `/95cg/api/snmp_res/filter`;
        let data = filterParams;
        let type = 'POST';
        commonAjax(url, type, data, false, (data)=>{
            callback(data);
        });
    },
    queryPageFreeResources: (params, callback)=>{
        let url = `/95cg/api/snmp_res/free/list`;
        let data = params;
        let type = 'POST';
        commonAjax(url, type, data, false, (data)=>{
            callback(data);
        });
    },
    queryPageFilterFreeResources: (filterParams, callback)=>{
        let url = `/95cg/api/snmp_res/free/filter`;
        let data = filterParams;
        let type = 'POST';
        commonAjax(url, type, data, false, (data)=>{
            callback(data);
        });
    },
    create: (params, callback)=>{
        let url = `/95cg/api/snmp_res/add`;
        let data = params;
        let type = 'POST';
        commonAjax(url, type, data, true, (data)=>{
            callback(data);
        });
    },
    delete: (id, callback)=>{
        let url = `/95cg/api/snmp_res/${id}`;
        let type = 'DELETE';
        commonAjax(url, type, null, true, (data)=>{
            callback(data);
        });
    },
    update: (id, params, callback)=>{
        let url = `/95cg/api/snmp_res/${id}`;
        let data = params;
        let type = 'PUT';
        commonAjax(url, type, data, true, (data)=>{
            callback(data);
        });
    },
}

export default resources;