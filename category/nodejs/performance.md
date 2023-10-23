---
outline: deep
title: Performance optimization
---

# `Node` 性能如何进行监控以及优化？

![Performance optimization](./images/performance.png)

## 是什么

`Node` 作为一门服务端语言，性能方面尤为重要，其衡量指标一般有如下：

- `CPU`
- 内存
- `I/O`
- 网络

### `CPU`

主要分成了两部分：

- 负载：在某个时间段内，占用以及等待的进程数
- 使用率：在某个时间段内，占用状况，等于 1 - 空闲时间（ `idle time` ）/ 总时间

这两个指标都是用来评估系统当前 `CPU` 的繁忙程度的量化指标

`Node` 应用一般不会消耗很多的 `CPU` ，如果占用率高，则表明应用存在很多同步操作，导致异步任务回调被阻塞

### 内存指标

内存是一个非常容易量化的指标。内存占用率是评判一个系统的内存批瓶颈的常见指标。对于 `Node` 来说，内部内存堆栈的使用状况也是一个可以量化的指标

```js
// app/lib/memory.js
const os = require("os");

// 获取当前 node 内存堆栈情况
const { rss, heapUsed, heapTotal } = process.memoryUsage();

// 获取系统空闲内存
const sysFree = os.freemem();

// 获取系统总内存
const sysTotal = os.totalmem();

module.exports = {
  memory: () => {
    return {
      sys: 1 - sysFree / sysTotal, // 系统内存占用率
      heap: heapUsed / heapTotal, // Node堆内存占用率
      node: rss / sysTotal, // Node占用系统内存的比例
    };
  },
};
```

- `rss` ：表示 `node` 进程占用的内存总量
- `heapTotal` ：表示堆内存的总量
- `heapUsed` ：实际堆内存的使用量
- `extemal` ：外部程序的内存使用量，包含 `Node` 核心`V8` 引擎内部的 `C++` 对象占用的内存

在 `Node` 中，一个进程的最大内存容量为 `1.5GB` 左右，如果超过这个限制，会抛出 `JavaScript heap out of memory` 的错误。因此我们需要减少内存泄露

### 磁盘 `I/O`

磁盘的 `IO` 开销是非常昂贵的，硬盘 `IO` 花费的 `CPU` 时钟周期是内存的 _164000_ 倍

内存 `IO` 比磁盘 `IO` 快非常多，所以使用内存缓存数据是有效的优化方法。常用的工具如 `redis` 、 `memcached` 等

并不是所有数据都需要缓存，访问频率高，生成代价比较高的才考虑是否缓存，也就是说影响性能的数据才考虑缓存，而且缓存还有缓存雪崩、缓存穿透等问题需要解决

## 如何监控

关于性能方面的监控，一般情况需要借助工具来实现

这里采用 `Easy-Monitor 2.0` ，其是轻量级的 `Node.js` 项目内核性能监控 + 分析工具，在默认情况下，只需要在项目入口 `require` 一次，无需改动任何业务代码即可开启内核级别的性能监控分析

使用方法如下：

在你的项目入口文件下引入 `easy-monitor` ，并传入项目名称

```js
const easyMonitor = require("easy-monitor");
easyMonitor("your-project-name");
```

打开你的浏览器，访问 `http://localhost:12333` ，即可看到性能监控的页面

关于定制化开发、通用配置项以及如何动态更新配置项等，详见官方文档

## 如何优化

关于 `Node` 的性能优化，主要从以下几个方面入手：

- 使用最新版本 `Node.js`
- 正确使用流 `stream`
- 代码层面优化
- 内存管理优化

### 使用最新版本 `Node.js`

每个版本的性能提升主要来自两个方面：

- `V8` 版本引擎的优化
- `Node` 内部代码的更新优化

### 正确使用流 `stream`

在 `Node` 中，很多对象都实现了流，对于一个大文件可以通过流的形式发送，不需要将其完全读入内存

```js
const http = require("http");
const fs = require("fs");

// bad
http.createServer((req, res) => {
  fs.readFile(__dirname + "/data.txt", (err, data) => {
    res.end(data);
  });
});

// good
http.createrServer((req, res) => {
  const stream = fs.createReadStream(__dirname + "/data.txt");
  stream.pipe(res);
});
```

### 代码层面优化

合并查询，将多次查询合并为一次查询，减少 `I/O` 操作（减少数据库的查询次数）

```js
// bad
for user_id in userIds
  let account = user_account.findOne(user_id)

// good
const user_account_mao = {}
user_account.find(user_id in userIds).forEach(account => {
  user_account_map[account.user_id] = account
})
for user_id in userIds
  var account = user_account_map[user_id]
```

### 内存管理优化

在 `V8` 中，主要将内存分为新生代和老生代两部分：

- 新生代：对象的存货时间较短。新生对象或只经过一次垃圾回收的对象
- 老生代：对象的存活时间较长。经历过一次或多次垃圾回收的对象

若新生代内存空间不够，直接分配给老生代

通过减少内存占用，可以提高服务器的性能。如果有内存泄漏，也会导致大量的对象存储到老生代中，服务器性能会大大降低

如下面情况：

```js
const buffer = fs.readFileSync(__dirname + "/source/index.htm");

app.use(
  mount("/", async (ctx) => {
    ctx.status = 200;
    ctx.type = "text/html";
    ctx.body = buffer;
    leak.push(fs.readFileSync(__dirname + "/source/index.htm"));
  })
);

const leak = [];
```

`leak` 的内存非常大，造成内存泄漏，应当避免这样的操作，通过减少内存使用，是提高服务性能的手段之一

而节省内存最好的方法是使用池，将其频用、可服用对象存储起来，减少创建和销毁操作

例如有个图片请求接口，每次请求，都需要用到类。若每次都需要重新 `new` 这些类，并不是很合适，在大量请求时，频繁创建和销毁这些类，造成内存抖动

使用对象池的机制，对这种频繁需要创建和销毁的对象保存在一个对象池中。每次用到该对象是，就取对象池空闲的对象，并对它进行初始化操作，从而提高框架的性能

## 参考

- [Easy-Monitor 文档](https://github.com/hyj1991/easy-monitor)
- [Easy-Monitor 使用](https://segmentfault.com/a/1190000010231628)
- [Node.js 性能监控](https://segmentfault.com/a/1190000039327565)
- [Node.js 性能优化](https://zhuanlan.zhihu.com/p/50055740)
- [《深入浅出 Node.js》-内存控制](https://lz5z.com/%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BANode-js-%E5%86%85%E5%AD%98%E6%8E%A7%E5%88%B6/)
- https://vue3js.cn/interview/NodeJS/performance.html
