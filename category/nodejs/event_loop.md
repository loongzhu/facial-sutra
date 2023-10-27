---
outline: deep
title: Event Loop
titleTemplate: Node.js
---

# 对 `Node.js` 中的事件循环机制理解？

![event_loop-about](./images/event_loop-about.png?raw=true)

## 1. 事件循环机制 是什么

在 **_浏览器事件循环_** 中，我们了解到 `JavaScript` 在浏览器中的事件循环机制，其是根据 `HTML5` 定义的规范来实现

而在 `Node.js` 中， **_事件循环_** 是基于 [`libuv`](https://libuv.org/) 实现， `libuv` 是一个多平台的专注于异步 `I/O` 的库，如图：

![event_loop-libuv](./images/event_loop-libuv.png?raw=true)

上图 `EVENT_QUEUE` 给人看起来只有一个队列，但是实际上， `EventLoop` 存在 6 个阶段，每个阶段都有对应的一个先进先出的回调队列

## 2. 事件循环机制 执行过程

事件循环分成了 6 个阶段，对应如下：

![event_loop-stages](./images/event_loop-stages.png?raw=true)

- `timers` ：定时器检测阶段
  这个阶段执行 `timer` 的回调，即 `setTimeout` 、 `setInterval` 的回调

- `I/O callbacks` ：I/O 事件回调阶段
  执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的 `I/O` 回调

- `idle，prepare` ：闲置阶段
  仅系统内部使用

- `poll` ：轮询阶段
  检查新的 I/O 事件；执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 `setImmediate()` 调度的之外），其余情况 `node` 将在适当的时候在此阻塞

- `check` ：检测阶段
  `setImmediate()` 回调函数在这里执行

- `close callbacks` ：关闭回调阶段
  一些关闭的回调函数，如：`socket.on('close', ...)`

每个阶段对应一个队列，当事件循环进入某个阶段时，将会在该阶段内容执行回调，知道队列好紧或者回调的最大数量执行完毕，然后将进入下一个处理阶段

除了上述 6 个阶段，事件循环还有一个特殊的地方，就是 `nextTick` 队列，其不属于事件循环的任何一个阶段，它属于该阶段与下阶段之间的过渡，即本阶段执行结束，进入下一个阶段前，所要执行的回调，类似插队

流程图如下所示：

![event_loop-process](./images/event_loop-process.png?raw=true)

在 `Node` 中，同样存在宏任务和微任务，与浏览器中的事件循环相似：

- 微任务对应有：

  - `next tick queue` ：`process.nextTick`
  - `other queue` ：`Promise` 的 `then` 回调、 `async/await` 、 `queueMicrotask` 等

- 宏任务对应有：

  - `timers queue` ：`setTimeout`、`setInterval`
  - `poll queue` ：`I/O` 事件
  - `check queue` ：`setImmediate`
  - `close queue` ：`close` 事件

- 其执行顺序为：
  1. next tick microtask queue
  2. other microtask queue
  3. timer queue
  4. poll queue
  5. check queue
  6. close queue

## 3. 事件循环机制 相关题目

###### 下面代码的执行顺序是什么？

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout0");
}, 0);

setTimeout(function () {
  console.log("setTimeout2");
}, 300);

setImmediate(() => console.log("setImmediate"));

process.nextTick(() => console.log("nextTick1"));

async1();

process.nextTick(() => console.log("nextTick2"));

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
  console.log("promise2");
}).then(function () {
  console.log("promise3");
});

console.log("script end");
```

分析过程：

- 先找到同步任务，输出 `script start`
- 遇到第一个 `setTimeout` ，将其放入 `timer queue` 中
- 遇到第二个`setTimeout`，300ms 后将其放入 `timer queue` 中
- 遇到 `setImmediate` ，将其放入 `check queue` 中
- 遇到第一个 `process.nextTick` ，将其放入 `next tick microtask queue` 中
- 执行 `async1` 函数，输出 `async1 start` ，遇到 `await` ，将其后面的代码放入 `other microtask queue` 中
- 执行 `async2` 函数，输出 `async2` ， `async2` 后面的输出 `async1 end` 进入微任务，等待下一轮的事件循环
- 遇到第二个 `process.nextTick` ，将其放入 `next tick microtask queue` 中
- 遇到 `new Promise` ，输出 `promise1` ， `promise2` ，将其放入 `other microtask queue` 中
- 遇到同步任务 `console.log("script end")` ，输出 `script end`
- 本轮事件循环结束，进入下一轮事件循环，先依次输出 `nextTick` ，分别是 `nextTick1` 、 `promise2`
- 然后执行 `other microtask queue` ，输出 `promise3` 、 `async1 end`
- 然后执行 `timer queue` ，输出 `setTimeout0`
- 然后执行 `check queue` ，输出 `setImmediate`
- 300ms 后，执行 `timer queue` ，输出 `setTimeout2`

执行结果如下：

```js
script start
async1 start
async2
promise1
promise2
script end
nextTick1
nextTick2
async1 end
promise3
setTimeout0
setImmediate
setTimeout2
```

###### `setTimeout` 和 `setImmediate` 的执行顺序

```js
setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});
```

输出情况如下：

- 情况一：

  ```js
  setTimeout;
  setImmediate;
  ```

- 情况二：

  ```js
  setImmediate;
  setTimeout;
  ```

分析过程：

- 外层宏任务执行完毕，遇到异步 API 任务，将其放入对应的队列中
- 遇到 `setTimeout` ，虽然设置的是 0 ms 触发，但实际上会被强制改成 1 ms，时间到了然后将其放入 `timer queue` 中
- 遇到 `setImmediate` ，将其放入 `check queue` 中
- 同步代码执行完毕，进入下一轮事件循环
- 先进入 `timer queue` ，检查当前时间是否到达 `setTimeout` 的时间，如果到达则执行，否则继续等待
- 再进入 `check queue` ，执行 `setImmediate`

这里的关键在于 1ms ，如果同步代码执行时间较长，进入 `Event Loop` 的时候 1ms 已经过了， `setTimeout` 已经被放入 `timer queue` 中，因此会先执行 `setTimeout` ，否则会先执行 `setImmediate`

## 4. 参考

- https://segmentfault.com/a/1190000012258592
- https://juejin.cn/post/6844904100195205133
- https://vue3js.cn/interview/NodeJS/event_loop.html
- https://libuv.org/
