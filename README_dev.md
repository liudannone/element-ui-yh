# 二次开发流程

- 下载源码
```git
git clone https://github.com/ElemeFE/element
```
- 安装依赖
```npm
npm i || cnpm i || yarn add
```
- 启动项目
```npm
npm run dev // 官网开发模式
npm run dev:play // 组件开发模式
```
运行打开 http://localhost:8085

- 替换文件名
  主要为了防止npm包上传的时候和element-ui名字重复，而无法上传。全局搜索 element-ui 替换为 element-ui-test （替换后可能会报错，localhost:8085打不开，看提示找到报错为找到的模块在做替换)

- 源码修改和扩展
    1、packages下新建要扩展的模块
    2、src下index.js中新增路由

- 打包
```npm
npm run dist
```
生成lib目录之后

- 上传npm