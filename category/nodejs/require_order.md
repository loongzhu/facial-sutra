---
outline: deep
title: Node.js require_order
---

# `Node.js` 文件查找的优先级以及 `Require` 方法的查找策略？

![require_order](./images/require_order.png)

## 1. 模块规范

`Node.js` 对 `CommonJs` 进行了支持和实现，让我们在开发的过程中可以方便的进行模块化开发：

- 在 `node` 中每一个 `js` 文件就是一个单独的模块，拥有自己的作用域
- 模块中包括 `CommonJS` 规范的核心变量： `exports` 、`module.exports` 、`require` 、`__dirname` 、`__filename` 等
- 通过上述变量进行模块化开发

而模块化的核心是导出与导入，在 `node` 中通过 `exports` 和 `module.exports` 负责对模块中的内容进行导出，通过 `require` 函数导入其他模块（自定义模块、系统模块、第三方库模块）中的内容

## 2. 模块查找策略

`require` 方法接收以下几种参数的传递：

- 原生模块，如：`http`、`fs`、`path` 等
- 相对路径的文件模块，如：`./mod` 或 `../mod` 开头
- 绝对路径的文件模块，如：`/pathtomodule/mod` 开头
- 目录作为模块： `./dirname`
- 非原生模块的第三方模块，如：`express`、`koa` 等

`require` 参数较为简单，但是内部的加载却是十分复杂的，其加载优先级也各自不同，如下图：

![require_order-require](./images/require_order-require.png)

从上图可以看见，文件模块存在缓存区，寻找模块路径的时候都会有限从缓存中加载已经存在的模块

### 原生模块

而像原生模块这些，通过 `require` 方法在解析文件名之后，优先检查模块是否在原生模块列表中，如果在则直接加载，如果不在则继续进行下一步

### 绝对路径、相对路径

如果 `require` 绝对路径的文件，则直接查找对应的路径，速度最快

相对路径的模块则相对于当前调用 `require` 的文件去查找

如果按确切的文件名没有找到，则会尝试为文件名添加 `.js` 、`.json` 、`.node` 后缀，依次尝试，直到找到为止

### 目录作为模块

默认情况是根据根目录中 `package.json` 文件中的 `main` 字段进行查找，如

```json
{
  "name": "some-library",
  "main": "main.js"
}
```

如果这是在 `./some-library node_modules` 目录中，则 `require(./some-library)` 会导入 `./some-library/main.js`

如果目录里没有 `package.json` 文件，或者 `package.json` 文件中没有 `main` 字段，则会尝试加载目录下的 `index.js` 或 `index.node` 文件

### 非原生模块

在每个文件中都存在 `module.paths` ，表示模块的搜索路径， `require` 就是根据起来寻找文件

在 `window` 下输出如下：

```js
console.log(module.paths);

["c:\\nodejs\\node_modules", "c:\\node_modules"];
```

可以看出 `module path` 的生成规则为：
从当前文件目录开始寻找 `node_modules` 目录；然后依次进入父目录，查找父目录下的 `node_modules` 目录，依次迭代，知道根目录下的 `node_modules` 目录

当都找不到的时候，则会从系统 `NODE_PATH` 环境变量中查找，如果还是找不到，则会报错

举个例子：

如果在 `/home/ry/projects/foo.js` 文件里调用了 `require('bar.js') `，则 `Node.js` 会按以下顺序查找：

- `/home/ry/projects/node_modules/bar.js`
- `/home/ry/node_modules/bar.js`
- `/home/node_modules/bar.js`
- `/node_modules/bar.js`

这使得程序本地化它们的依赖，避免它们产生冲突

## 3. 总结

通过上面模块的文件查找策略之后，总结下文件查找的优先级：

- 缓存的模块优先级最高
- 如果是内置模块，则直接返回，优先级仅次缓存的模块
- 如果是绝对路径 `/` 开头，则从根目录找
- 如果是相对路径 `./` 开头，则从当前 `require` 文件相对位置找
- 如果文件没有携带后缀，先从 `js` 、 `json` 、 `node` 按顺序查找
- 如果是目录，则根据 `package.json` 的 `main` 属性值决定目录下入口文件，默认情况为 `index.js`
- 如果文件为第三方模块，则会引入 `node_modules` 文件，如果不在当前仓库文件中，则自动从上级递归查找，直到根目录

## 4.参考

- [Node.js Modules: CommonJS modules](https://nodejs.org/api/modules.html#module)
- https://vue3js.cn/interview/NodeJS/require_order.html
- https://blog.csdn.net/qq_36801250/article/details/106352686
- https://www.cnblogs.com/samve/p/10805908.html
