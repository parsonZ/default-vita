## 目录结构

* build _(production 版本)_

* public _(webpack不会触碰的公有文件)_

* src
    - Aisling _(素材库)_
    - Aragorn _(组件库)_
    - Eden _(工具库)_
    - Nevermore _(静态数据库)_
    - Routes _(前端路由库，使用code splitting)_
        - Common _(各路由间的共享部分)_
        - ***** _(路由)_
            - `_skeleton.js` _(骨架，注入到根路由中的第一层路由，可以注入base bundle，也可以注入布局。当注入布局时，可以在布局的子组件中进一步注入其他路由，从而实现路由嵌套)_
        - `index.js` _(入口)_
    - Store _(状态库，使用redux)_
        - Actions _(redux action 库)_
        - Epics _(redux-observable epic 库)_
            - `index.js` _(root)_
        - Reducers _(redux reducer 库)_
            - `index.js` _(root)_
        - Selectors _(reselect及re-reselect 库)_
        - Mediator _(调度者，用于模块间解耦)_
        - `index.js` _(入口)_
    - `index.js` _(入口)_

* .env _(环境变量配置文件)_

## git commit 规范

commit前须附带此次行为对应的emoji

emoji | 对应行为
---- | ----
:tada: | 首次提交
:art: | 结构优化、代码美化
:zap: | 性能提升
:fire: | 删除代码、文件
:bug: | 修复bug
:memo: | 文档修改
:sparkles: | 新的功能点开发
:lipstick: | UI开发
:white_check_mark: | 添加测试
:construction: | 进展中
:arrow_up: | 依赖升级
:arrow_down: | 依赖降级
:pushpin: | 依赖升升降降
:heavy_minus_sign: | 依赖移除
:heavy_plus_sign: | 增加依赖
:wrench: | 修改配置
:pencil2: | 字写错了
:hankey: | 本次提交代码和屎一样
:rewind: | 回滚
:alien: | 外部api的升级带来的代码更新
:truck: | 文件挪位置
:bento: | 资源新增和升级
:ok_hand: | code review 强迫的更新
:chart_with_upwards_trend: | 布点、监控等开发
:recycle: | 代码重构

## 请求规范

  * 所有请求都应在Nevermore/Common/host.json中配置，配置规则如下
```js
{
    "informationPlatform": {
        "domain": "/",
        "action": {
            "getTasks": { // 接口别称，描述接口行为
                "url": "infoplat/taskmanage/obtain_tasks", // 接口url
                "type": "get", // 接口类型
                "params": ["nflag", "from?", "size?", "page:1"] // 接口参数，非必要参数在参数尾加上?，默认参数用冒号分隔
            }
        }
    }
}
```
  * Eden/Utils/UrlManager中提供api对host.json进行相应操作
  * 最主要的api是Ajax，他会完成参数验证，请求异常捕捉，登录校验失败捕捉并弹出登录框、cancel其他并发请求、在登录成功后retry所有请求等。
  * 使用Ajax时，需要在它的下游做条件判断，将非请求结果的数据流直接抛出
