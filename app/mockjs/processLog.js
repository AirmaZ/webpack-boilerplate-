
Mock.mock(/95cg\/api\/log\/find/, 'get', {
    'data|7': [
        {
            'executeDay': '@date',
            'orderStep|1': [100, 101, 102, 201, 210, 301, 400],
            'stepStatus|1': [1, 0],
            'executeLog': '成功108次，失败9次'
        }
    ]
})

Mock.mock(/95cg\/api\/log\/week\/find/, 'get', {
    'data|7': [
        {
            executeDay: '@date',
            'log|7': [
                {
                    'executeDay': '@date',
                    'orderStep|1': [100, 101, 102, 201, 210, 301, 400],
                    'stepStatus|1': [1, 0],
                    'executeLog': '成功108次，失败9次'
                }
            ]
        }
    ]
})