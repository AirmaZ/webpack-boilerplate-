/**
 * Created by Airma on 2016/11/1.
 */


// 查询分页数据
Mock.mock(/95cg\/api\/snmp_res\/list/, 'post', {
	draw: 1,
	dataTotal: 100,
	'list|15': [{
		'id|0-10000': 1,
		'resourceStatus|1': [0, 1, 2],
		'switchesId': /[A-Z]{4}-[A-Z]{2}-Cache-[A-Z]{2}\d{2}-[A-Z]{3}\d{4}/,
		'resourceEntryDate': '@date',
		'remark': '新增资源新增资源新增资源新增资源新增资源新增资源新增资源新增资源新增资源新增资源新增资源',
		'port': /GigabitEthernet\d\/\d\/\d\/\d{2}/
	}]
})

// 查询分页过滤数据
Mock.mock(/95cg\/api\/snmp_res\/filter/, 'post', {
	draw: 1,
	dataTotal: 100,
	'list|15': [{
		'id|0-10000': 1,
		'resourceStatus|1': [0, 1, 2],
		'switchesId': /[A-Z]{4}-[A-Z]{2}-Cache-[A-Z]{2}\d{2}-[A-Z]{3}\d{4}/,
		'resourceEntryDate': '@date',
		'remark': '新增资源新增资源新增资源新增资源新增资源新增资源新增资源新增资源新增资源新增资源新增资源',
		'port': /GigabitEthernet\d\/\d\/\d\/\d{2}/
	}]
});

// 新增数据
Mock.mock(/95cg\/api\/snmp_res\/add/, 'post', {
	data: 'createSuccess'
});

// 删除数据
Mock.mock(/95cg\/api\/snmp_res\/\d{1,10}/, 'delete', {
	data: ''
});

// 更新数据
Mock.mock(/95cg\/api\/snmp_res\/\d{1,10}/, 'put', {
	data: ''
});
