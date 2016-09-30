# 基于webpack的前端工程化 #

## 使用方法 ##

 + `$ git clone`
 + `$ npm install`
 + `$ npm run build`
 + `$ npm run start`
 + 打开`http://localhost:9090/dist/view/index.html`

## 功能概述 ##

可将项目app目录（可配置）下的js入口文件和html模板自动检测，执行编译指令后生成到dist文件夹（可配置）中，其中整合：

1. js、html、css、图片打包压缩功能
2. 自动提取js和css公共模块打包成chunk
3. 支持less、es6、jsx自动编译
4. 支持各类依赖管理，包含CommonJS、AMD、RequireJS等
5. 支持mock测试工具，可用于编写测试接口
6. 支持server，支持server自动检测文件变动
7. html片段加载

## 配置详解 ##

待完善。