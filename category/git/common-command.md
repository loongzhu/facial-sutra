---
outline: deep
---

# About Git Commit

This page is common commands and submission specifications about Git.

### 常用命令

- `git init` 初始化一个本地仓库
- `git remote add origin` 添加远程仓库
- `git pull origin master` 拉取远程仓库
- `git add .` 添加所有文件到暂存区
- `git commit -m "提交信息"` 提交到本地仓库
- `git push origin master` 推送到远程仓库

#### 补充

- `git status` 查看当前仓库状态
- `git log` 查看提交日志
- `git reflog` 查看所有操作日志
- `git branch` 查看分支
- `git branch -m <oldname> <newname>` 重命名分支
- `git checkout -b dev` 创建并切换到 dev 分支
- `git checkout master` 切换到 master 分支
- `git merge dev` 合并 dev 分支到当前分支

### 提交格式

```
<type> (<scope>): <subject>
<BLANK LINE>
<body>
```

#### 示例

```
feat (home): add new feature

- add new feature
```

#### 说明

###### type（必需）

用于说明 commit 的类别

- `br`: 此项特别针对 bug 号，用于向测试反馈 bug 列表的 bug 修改情况
- `feat`：新功能（feature）
- `fix`：修补
- `docs`：文档（documentation）
- `style`： 格式（不影响代码运行的变动）
- `refactor`：重构（即不是新增功能，也不是修改 bug 的代码变动）
- `test`：增加测试
- `chore`：其他的小改动. 一般为仅仅一两行的改动, 或者连续几次提交的小改动属于这种
- `revert`：feat(pencil): add 'graphiteWidth' option (撤销之前的 commit)
- `upgrade`：升级改造
- `bugfix`：修补 bug
- `optimize`：优化
- `perf`: Performance 的缩写, 提升代码性能
- `test`：新增测试用例或是更新现有测试
- `ci`:主要目的是修改项目继续完成集成流程(例如 Travis，Jenkins，GitLab CI,Circle)的提交
- `build`: 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交

###### scope（可选）

scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

###### subject（必需）

subject 是 commit 目的的简短描述，不超过 50 个字符。\
 以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes\
 第一个字母小写\
 结尾不加句号（.）

###### body（可选）

是对本次 commit 的详细描述，可以分成多行
