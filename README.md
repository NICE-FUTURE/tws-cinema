# Final project：思沃影院

## 实现过程

### 转存数据

使用 mongoimport 命令将 csv 数据导入到 mongodb 数据库中

`mongoimport -d mydb -c things --type csv --file locations.csv --headerline`

### 功能

- 首页展示最新的电影
- 选择相应类别后展示该类别下的电影
- 按名称搜索电影
- 点击电影海报跳转至电影详情页

- 提供获取最新电影的API
- 提供按电影名称匹配的API
- 提供按类别名称匹配的API
- 提供按ID匹配电影的API
- 提供按类别名称进行推荐的API

### 存在的问题

- 项目提供的数据中的图片链接很多失效，导致很多图片无法展示
- 项目未提供电影简介、详情、评论等信息，电影详情页的内容有限

### 项目运行

- `node server.js` 启动服务器
- 浏览器打开 `http://127.0.0.1:8080/` 进入首页

### 效果

![result.gif](https://raw.githubusercontent.com/NICE-FUTURE/tws-cinema/master/result.gif)

----

## 要求
- 实现原型中的功能，但具体界面设计不作限制
- 每个用户故事的开发尽量以TDD的方式完成（先写测试后实现功能）

## 项目资源

- 产品原型：见代码库根目录的`prototype.svg`文件
- 用户故事：见代码库根目录的`user-stories.md`文件
- 技术选型（仅供参考，不作限制）：见代码库根目录的`technology.md`文件
- 电影数据（仅供参考，不作限制）：见代码库根目录的`movies.csv`文件

## 输出结果

将团队练习代码库地址提交到任务卡。

代码库需包含：

1. 说明如何运行和测试代码的README.md文件
2. 运行结果截图的result.png文件

## 学习资源

- git-recipes：[https://github.com/geeeeeeeeek/git-recipes/wiki](https://github.com/geeeeeeeeek/git-recipes/wiki)
