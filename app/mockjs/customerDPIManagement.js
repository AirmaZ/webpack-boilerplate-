/**
 * Created by Airma on 2016/11/1.
 */

//客户管理
Mock.mock(/95cg\/api\/customer\/list/, 'post', {
        "draw": 1,
        "dataTotal":200,
        "list|15-15":[
            {
                "id|1-10000": 1,
                "accountId|1-10000": 1,
                "groupId|1-10000": 1,
                "groupName": "中国电信",
                "openTime": "@date",
                "chargeId|2105-2304559": 1,
                "expireTime": "@date",
                "updateTime": "@date",
                "chargeCycle|1-365": 1,
                "orderTime": "@date",
                "customerStatus|1": [0,1,9],
                "orderStatus|1": [0,1,2,3],
                "resourcesData": "点击查询"
            }
        ]
});
//搜索接口
Mock.mock(/95cg\/api\/customer\/filter/, 'post', {
    "draw": 1,
    "dataTotal": 30,
    "list|15-15": [
        {
            "accountId|1-10000": 1,
            "groupId|1-10000": 1,
            "groupName": "中国电信",
            "openTime": "@date",
            "chargeId|2105-2304559": 1,
            "expireTime": "@date",
            "updateTime": "@date",
            "chargeCycle|1-365": 1,
            "orderTime": "@date",
            "customerFlag|1": [0, 1],
            "resourceStatus|1": [0, 1, 2, 3],
            "resourcesData": "点击查询"
        }
    ]
});

Mock.mock(/95cg\/api\/cust_res\/find/, 'post', {
    "data|10-10": [
        {
            "resourceStatus|1": [0,1],
            "resourcesId|1000-10000": 1,
            'resourceIpHeader': /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
            'resourceIpStart': /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
            'resourceIpEnd': /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
            "resourceEntryDate": "@date",
            "remark": "备注",
        }
    ]
});

// 获取待提交订单
Mock.mock(/api\/cust_res\/temp\/find/, 'post', {
    "data|10-10": [
        {
            "resourceStatus|1": [0,1],
            "resourcesId|1000-10000": 1,
            'resourceIpHeader': /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
            'resourceIpStart': /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
            'resourceIpEnd': /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
            "resourceEntryDate": "@date",
            "remark": "备注",
        }
    ]
});

// 新建资源订单
Mock.mock(/95cg\/api\/cust_res\/add/, 'post', {
    "data": "成功"
});

// 修改资源订单
Mock.mock(/95cg\/api\/cust_res\/update/, 'put', {
    "data": "成功"
});

// 删除客户资源关系
Mock.mock(/95cg\/api\/cust_res\/\d{1,5}/, 'delete', {
    "data": "成功"
});

// // 修改资源订单（后台先删除，再新建）
// Mock.mock(/95cg\/api\/cust_res\/new\/add/, 'put', {
//     "data": "成功"
// });
// 增加客户
Mock.mock(/95cg\/api\/customer\/add/, 'post', {
    "data": "创建成功"
});
// 修改客户
Mock.mock(/95cg\/api\/customer\/\d{1,5}/, 'put', {
    "data": "修改成功"
});