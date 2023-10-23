---
outline: deep
title: fs
titleTemplate: Node.js
---

# 对 `Node.js` 中的 `fs` 模块的理解？有哪些常用方法？

![fs-about](https://github.com/MrZhuA00/image-repo/blob/main/facial-sutra/nodejs/fs-about.png?raw=true)

## 1. `fs` 模块是什么

`fs` (`filesystem`)，该模块提供本地文件的读写能力，基本上是 `POSIX` 文件操作命令的简单包装，其提供了异步和同步的文件读写方法

可以说，所有与文件的操作都是通过 `fs` 模块来实现的

导入 `fs` 模块：

```js
const fs = require("fs");
```

这个模块对所有文件系统操作提供了 **_异步_** 和 **_同步_** 两种操作方式，异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息 `error`，如果操作成功，则错误信息为 `null` 或者 `undefined`

## 2. `fs` 模块的文件知识

在计算机中有关于文件的一些基本概念：

- 权限位 `mode`
- 标识位 `flag`
- 文件描述符 `fd`

### 2.1. 权限位 `mode`

![fs-mode](https://github.com/MrZhuA00/image-repo/blob/main/facial-sutra/nodejs/fa-mode.png?raw=true)

针对文件所有者、文件所属组、其他用户进行权限分配，分别对应 `r` `w` `x` 三个权限，即：

- `r` ：读权限
- `w` ：写权限
- `x` ：执行权限

具备权限为 `4` `2` `1` ，不具备权限为 `0`

如在 `linux` 查看文件权限位

```bash
drwxr-xr-x 1 PandaShen 197121 0 Jun 28 14:41 core
-rw-r--r-- 1 PandaShen 197121 293 Jun 23 17:44 index.md
```

在开头前十位中， `d` 为文件夹， `-` 为文件，后九位就代表当前用户、用户所属组和其他用户的权限位，按每三位划分，分别代表读 (`r`) 、写 (`w`) 、执行 (`x`) ， `-` 代表没有当前位对应的权限

### 2.2. 标识位 `flag`

标识位 `flag` 代表着对文件的操作方式，如：可读、可写、既可读又可写等等，如下表所示：

| 符号  | 含义                                                     |
| :---: | :------------------------------------------------------- |
|  `r`  | 读取文件，如果文件不存在则抛出异常。                     |
| `r+`  | 读取并写入文件，如果文件不存在则抛出异常。               |
| `rs`  | 读取并写入文件，指示操作系统绕开本地文件系统缓存。       |
|  `w`  | 写入文件，文件不存在会被创建，存在则清空后写入。         |
| `wx`  | 写入文件，排它方式打开。                                 |
| `w+`  | 读取并写入文件，文件不存在则创建文件，存在则清空后写入。 |
| `wx+` | 和 w+ 类似，排他方式打开。                               |
|  `a`  | 追加写入，文件不存在则创建文件。                         |
| `ax`  | 与 a 类似，排他方式打开。                                |
| `a+`  | 读取并追加写入，不存在则创建。                           |
| `ax+` | 与 a+ 类似，排他方式打开。                               |

### 2.3. 文件描述符 `fd`

操作系统会为每个打开的文件分配一个名为文件描述符的数值表示，文件操作使用这些文件描述符来识别与跟踪每个特定的文件，文件描述符是非负整数

`window` 系统使用了一个不同但概念类似的机制来追踪资源，为方便用户， `NodeJS` 抽象了不同操作系统间的差异，为所有打开的文件分配了数值的文件描述符

在 `NodeJS` 中，每操作一个文件，文件描述符是递增的，文件描述符一般从 `3` 开始，因为前面有 `0` 、 `1` 、 `2` 三个比较特殊的描述符，分别为`process.stdin` （标准输入）、 `process.stdout` （标准输出）和 `process.stderr` （标准错误输出）

## 3. `fs` 模块的常用方法

- [文件读取](#文件读取)
- [文件写入](#文件写入)
- [文件追加写入](#文件追加写入)
- [文件拷贝](#文件拷贝)
- [创建目录](#创建目录)

### 文件读取

```bash
$ 创建 Hello.txt 文件
echo Hello > Hello.txt

$ 创建 text.txt 文件 不写入内容
touch text.txt
```

#### [`fs.readFileSync(path[, options])`](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)

同步读取文件内容，返回一个 `Buffer` 对象，如果指定了 `encoding` ，则返回字符串，参数如下：

- `path` ：读取文件的路径或文件描述符
- `options` ：默认值为 `null` ，其中有 `encoding` （编码，默认为 `null` ） 、 `flag` （标识位，默认为 `r` ），也可以直接传入 `encoding` 字符串，如 `utf8` 、 `ascii` 、 `base64` 等，结果为返回文件的内容

```js
const fs = require("fs");

let buf = fs.readFileSync("Hello.txt");
let data = fs.readFileSync("Hello.txt", "utf8");

console.log(buf); // <Buffer 48 65 6c 6c 6f>
console.log(data); // Hello
```

#### [`fs.readFile(path[, options], callback)`](https://nodejs.org/api/fs.html#fsreadfilepath-options-callback)

异步读取方法 `fs.readFile()` 与 `fs.readFileSync()` 的前两个参数相同，最后一个参数为回调函数，回调函数内有两个参数 `err` （错误信息）和 `data` （文件内容），该方法没有返回值，回调函数在读取文件成功后执行

```js
const fs = require("fs");

fs.readFile("Hello.txt", "utf8", (err, data) => {
  if (!err) {
    console.log(data); // Hello
  }
});
```

### 文件写入

#### [`fs.writeFileSync(file, data[, options])`](https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options)

同步写入文件内容，参数如下：

- `path` ：写入文件的路径或文件描述符
- `data` ：写入文件的内容，类型为 `string` 或 `Buffer`
- `options` ：默认值为 `null` ，其中有 `encoding` （编码，默认为 `utf8` ） 、 `mode` （权限位，默认为 `0o666` ） 、 `flag` （标识位，默认为 `w` ），也可以直接传入 `encoding` 字符串，如 `utf8` 、 `ascii` 、 `base64` 等

```js
const fs = require("fs");

fs.writeFileSync("text.txt", "Hello World");
let data = fs.readFileSync("text.txt", "utf8");

console.log(data); // Hello World
```

#### [`fs.writeFile(file, data[, options], callback)`](https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback)

异步写入文件内容， `writeFile` 与 `writeFileSync` 的前三个参数相同，最后一个参数为回调函数，回调函数内有一个参数 `err` （错误信息），该方法没有返回值，回调函数在写入文件成功后执行

```js
const fs = require("fs");

fs.writeFile("text.txt", "Hello World", (err) => {
  if (!err) {
    console.log("写入成功");

    fs.readFile("text.txt", "utf8", (err, data) => {
      console.log(data); // Hello World
    });
  }
});
```

### 文件追加写入

#### [`fs.appendFileSync(path, data[, options])`](https://nodejs.org/api/fs.html#fsappendfilesyncpath-data-options)

同步追加写入文件内容，参数如下：

- `path` ：写入文件的路径或文件描述符
- `data` ：写入文件的内容，类型为 `string` 或 `Buffer`
- `options`: 默认值为 `null` ，其中有 `encoding` （编码，默认为 `utf8` ） 、 `mode` （权限位，默认为 `0o666` ） 、 `flag` （标识位，默认为 `a` ），也可以直接传入 `encoding` 字符串，如 `utf8` 、 `ascii` 、 `base64` 等

```js
const fs = require("fs");

fs.appendFileSync("text.txt", "Hello World");
let data = fs.readFileSync("text.txt", "utf8");
```

#### [`fs.appendFile(data[, options])`](https://nodejs.org/api/fs.html#filehandleappendfiledata-options)

异步追加写入方法 `appendFile` 与 `appendFileSync` 的前三个参数相同，最后一个参数为回调函数，回调函数内有一个参数 `err` （错误信息），该方法没有返回值，回调函数在写入文件成功后执行

```js
const fs = require("fs");

fs.appendFile("text.txt", "Hello World", (err) => {
  if (!err) {
    console.log("写入成功");

    fs.readFile("text.txt", "utf8", (err, data) => {
      console.log(data); // Hello World
    });
  }
});
```

### 文件拷贝

#### [`fs.copyFileSync(src, dest[, mode])`](https://nodejs.org/api/fs.html#fscopyfilesyncsrc-dest-mode)

同步拷贝文件，参数如下：

- `src` ：源文件路径
- `dest` ：目标文件路径

```js
const fs = require("fs");

fs.copyFileSync("text.txt", "text2.txt");
```

#### [`fs.copyFile(src, dest[, mode], callback)`](https://nodejs.org/api/fs.html#fscopyfilesrc-dest-mode-callback)

异步拷贝文件， `copyFile` 与 `copyFileSync` 的前三个参数相同，最后一个参数为回调函数，回调函数内有一个参数 `err` （错误信息），该方法没有返回值，回调函数在拷贝文件成功后执行

```js
const fs = require("fs");

fs.copyFile("text.txt", "text2.txt", (err) => {
  if (!err) {
    console.log("拷贝成功");
  }
});
```

### 创建目录

#### [`fs.mkdirSync(path[, options])`](https://nodejs.org/api/fs.html#fsmkdirsyncpath-options)

同步创建目录，参数如下：

- `path` ：目录路径
- `options` ：默认值为 `null` ，其中有 `recursive` （是否递归创建，默认为 `false` ） 、 `mode` （权限位，默认为 `0o777` ）

```js
// 假设已经有了 a 文件夹和 a 下的 b 文件夹
fs.mkdirSync("a/b/c");
```

#### [`fs.mkdir(path[, options], callback)`](https://nodejs.org/api/fs.html#fsmkdirpath-options-callback)

异步创建目录， `mkdir` 与 `mkdirSync` 的前两个参数相同，最后一个参数为回调函数，回调函数内有一个参数 `err` （错误信息），该方法没有返回值，回调函数在创建目录成功后执行

```js
fs.mkdir("a/b/c", (err) => {
  if (!err) console.log("创建成功");
});
```

## 4.参考

- [Node.js File System](https://nodejs.org/api/fs.html)
- https://vue3js.cn/interview/NodeJS/fs.html
- https://segmentfault.com/a/1190000019913303
