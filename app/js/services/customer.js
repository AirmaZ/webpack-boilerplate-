import {commonAjax} from '../common/utilTools'
// import {commonAjaxMock as commonAjax} from '../common/utilTools'

let customer = {
    get: (id, callback)=>{
        let url = `/95cg/api/customer/${id}`;
        let type = 'GET';
        commonAjax(url, type, null,false, (data)=>{
            callback(data);
        });
    },
    // 获取已绑定资源订单
    getBindOrder: (params, callback)=>{
        let url = `/95cg/api/cust_res/find`;
        let type = 'POST';
        commonAjax(url, type, params,false, (data)=>{
            callback(data);
        });
    },
    // 待提交的资源订单
    getSubmitOrder: (params, callback)=>{
        let url = `/95cg/api/cust_res/temp/find`;
        let type = 'POST';
        commonAjax(url, type, params,false, (data)=>{
            callback(data);
        });
    },
    // 新建资源订单
    createResourceOrder: (params, callback)=>{
        let url = `/95cg/api/cust_res/add`;
        let type = 'POST';
        commonAjax(url, type, params,true, (data)=>{
            callback(data);
        });
    },
    // 修改资源订单
    updateResourcesOrder: (params, callback)=>{
        let url = `/95cg/api/cust_res/update`;
        let type = 'POST';
        commonAjax(url, type, params,true, (data)=>{
            callback(data);
        });
    },
    // 删除客户资源关系
    delResourcesOrder: (id, callback)=>{
        let url = `/95cg/api/cust_res/${id}`;
        let type = 'DELETE';
        commonAjax(url, type, null,true, (data)=>{
            callback(data);
        });
    },
    //客户查询（主页的表格获取）
    queryPage: (params, callback)=>{
        let url = `/95cg/api/customer/list`;
        let data = params;
        let type = 'POST';
        commonAjax(url, type, data,false, (data)=>{
            callback(data);
        });
    },
    //客户查询页面搜索功能
    queryPageFilter: (filterParams, callback)=>{
        let url = `/95cg/api/customer/filter`;
        let data = filterParams;
        let type = 'POST';
        commonAjax(url, type, data,false, (data)=>{
            callback(data);
        });
    },
    //新增客户
    create: (params, callback)=>{
        let url = `/95cg/api/customer/add`;
        let data = params;
        let type = 'POST';
        commonAjax(url, type, data,true, (data)=>{
            callback(data);
        });
    },
    //修改客户姓名和状态
    update: (id, params, callback)=>{
        let url = `/95cg/api/customer/${id}`;
        let data = params;
        let type = 'PUT';
        commonAjax(url, type, data,true, (data)=>{
            callback(data);
        });
    },
    //删除客户
    delete: (id, callback)=>{
        let url = `/95cg/api/customer/${id}`;
        let type = 'DELETE';
        commonAjax(url, type, null, true, (data)=>{
            callback(data);
        });
    },
};

export default customer;