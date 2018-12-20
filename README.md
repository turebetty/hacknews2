## hacknews项目对应的前端

- build:  打包后的js和css文件
- config:  js配置文件及webpack文件
    - path: 所有脚本的路径配置
    - webpack.config.dev.js: webpack 开发环境
    - webpack.config.prod.js: webpack 线上环境
    - webpack.config.start.js: webpack 本地测试
- src: 源文件
    - css
    - js
        - components： UI组件层
        - constants
            - actionTypes：action的type
            - apiServer：api的url
            - urlTypes: url
        - containers：UI容器层，接受redux的数据和方法
        - redux: data层，不操作UI
            - actions
            - configureStore: 中间层
            - reducers
        - utils: 公用组件
    - index.js: reactjs总入口
- public: 模版源文件
- script: 打包、加戳等脚本文件


#### 启动所需环境
- node环境 >= 7.0.0
- npm install

#### 命令行
- npm run start： 本地测试环境，热加载
- HTTPS=true npm start: 本地https运行
- npm run build： 线上



