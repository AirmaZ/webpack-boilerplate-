/**
 * Created by Airma on 2016/9/30.
 */
// import utilTools from "../common/utilTools"

// 配置项目地址
const PROJECTPATH = 'http://localhost:9090/WPF/';

// 接口模拟
Mock.mock(PROJECTPATH + 'getData', {
    'name': 'Misar',
    'city': "HeFei"
});

Mock.mock("io/getdata", {
    'name': 'Misar',
    'city': "HeFei"
});