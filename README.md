# 基于webpack的前端工程化 #

----------


## 安装 ##

 + `$ git clone`
 + `$ npm install`
 + `$ npm run start`
 + 打开`http://localhost:9090/dist/view/main.html`

## 功能概述 ##

可将项目app目录（可配置）下的js入口文件和html模板自动检测，执行编译指令后生成到dist文件夹（可配置）中，其中整合：

1. js、html、css、图片打包压缩功能
2. 自动提取js和css公共模块打包成chunk
3. 支持less、es6、jsx自动编译
4. 支持各类依赖管理，包含CommonJS、AMD、RequireJS等
5. 支持mock测试工具，可用于编写测试接口
6. 支持server，支持server自动检测文件变动
7. html片段加载
8. 支持source map调试功能，可方便的调试es6等需要编译的代码
9. dev/pro两套配置

## 配置详解 ##

见项目的`webpack.config.js`或者`webpack.config.pro.js`。内有详细的注释说明。

## 使用详解 ##

### 文件夹结构 ###

```
-app                      //开发目录
  |-config                //项目配置文件
  |-css                   //项目样式
  |  |-common 
  |  |-lib
  |  |-page               //css入口
  |-img                   
  |-js                    //项目脚本
  |  |-common             //公共模块
  |  |-page               //js入口
  |  |-script             //业务脚本
  |-mockjs                //接口测试工具
  |-view                  //项目视图
     |-page               //视图入口
     |-html               //html片段
-dist
-package.json             //npm配置文件
-README.md                //帮助
-webpack.config.js        //webpack开发环境配置文件
-webpack.config.pro.js    //webpack生产环境配置文件
```

### 命令 ###

+ `$ npm run start` 启动开发环境的webpack-dev-server，配置文件`webpack.config.js`
+ `$ npm run build` 启动开发环境的编译，配置文件`webpack.config.js`
+ `$ npm run pro`   启动生产环节的编译，配置文件`webpack.config.pro.js`

***自定义命令参考`package.json`文件中的`scripts`字段。***

### 新增页面 ###

1. 增加“视图”html：在`app/view/page`里新增`xxx.html`文件
2. 增加脚本入口：在`app/js/page`里新增`xxx.js`文件（文件名一定要相同）,然后在`xxx.js`中`require()`你所需要的依赖，比如css，而不需要再html中引用了。
3. 增加业务脚本：在`app/js/script`增加相应文件夹和文件。
4. 增加导航：在`app/view/page/main.html`中新增`<li><a targetname="xxx">xxx</a></li>`,并在`app/config`的两份配置文件中新增页面的url路径。

***注意：脚本入口只引入各种依赖，而不做业务逻辑代码的编写***

### 插件的引用 ###

插件的引用有几种不同的方法，根据需求选择合适的方式：

1. npm引用：适合jquery这样纯js框架或者有对应webpack版本的插件。jquery需要在webpack配置文件中的`webpack.ProvidePlugin`插件新增全局变量。其他webpack版本插件请参照插件本身的说明文档。
2. 传统引用：适合自写和需要动源码插件，或一些NPM引用困难的插件。请在`app`文件夹中自建插件文件夹，通过`require()`或者其他模块引用方式引用。建议自写插件符合一些模块编写规范（如webpack模块、CommonJS、AMD等）

***注意：***

1. ***如引用插件时更改了webpack.config.js，请注意是否要在生产上使用此插件。如需要，请务必更改webpack.config.pro.js。***
2. ***通过npm下载的依赖，如果是多人协作，请务必在安装时`--save-dev`,保证同步代码时，其他人也会下载此依赖。***

## 结束 ##

2016/10/25 11:47:04 

version: 1.0