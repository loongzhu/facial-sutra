---
outline: deep
title: Vuex vs Pinia
titleTemplate: Vue
---

# Vuex vs Pinia

## vuex

`Vuex` 是一个为 `Vue` 框架建立的流行的状态管理库，它是 `Vue` 核心团队推荐的状态管理库。 `Vuex` 高度关注应用的可扩展性、开发者的工效和信心。它基于与 `Redux` 相同的流量架构。

### 优点

- 支持调试功能，如时间旅行、编辑等
- 适用于大型、高复杂度的 Vue.js 应用程序

### 缺点

- 从 `Vue 3` 开始， `getter` 的结果不会像计算属性那样缓存
- `Vuex 4 `有一些与类型安全相关的问题 合适使用 Pinia ，何时使用 Vuex
- 由于 Vuex 的设计，它的类型定义比 Pinia 更复杂，因此在 Vuex 中添加 `TypeScript` 比在 Pinia 中添加 `TypeScript` 更困难
- 将 Vuex 用于中小型 Vue.js 项目是过度的，因为它重量级的，对性能降低有很大影响。因此， Vuex 适用于大规模、高复杂度的 Vue.js 项目。

## pinia

`Pinia` 是 `Vue.js` 的一个轻量级状态管理库，最近获得了广泛的关注。它使用 `Vue 3` 中新的反应性系统来构建一个直观的、完全类型化的状态管理库。

### 优点

- 完整的 `TypeScript` 支持：与在 Vuex 中添加 `TypeScript` 相比，添加 `TypeScript` 更容易
- 极其轻巧（体积约 1KB）
- `store` 的 `aciton` 被调度为常规的函数调用，而不是使用 `dispatch` 方法或 MapAction 辅助函数，这在 Vuex 中很常见
- 支持多个 `Store` 实例
- 支持 `Vue devtools` 、 `SSR` 和 `webpack` 代码拆分

### 缺点

- 不支持时间旅行和编辑等调试功能
- 由于 pinia 是轻量级的，体积很小，它适合于中小型应用。它也适用于低复杂度的 Vue.js 项目，因为一些调试功能，如时间旅行和编辑仍然不被支持。

## differences

pinia 和 vuex 在 vue2 和 vue3 都可以使用，一般来说 vue2 使用 vuex ， vue3 使用 pinia 。

- pinia 它没有 `mutation`,他只有 `state` ， `getters` ， `action` 【同步、异步】使用他来修改 `state` 数据
- pinia 他默认也是存入内存中，如果需要使用本地存储，在配置上比 `vuex` 麻烦一点
- pinia 语法上比 vuex 更容易理解和使用，灵活。
- pinia 没有 `modules` 配置，没一个独立的仓库都是 `definStore` 生成出来的
- pinia `state` 是一个对象返回一个对象和组件的 `data` 是一样的语法

**vuex** ： `State` 、 `Gettes` 、 `Mutations` (同步)、 `Actions` (异步)

**Pinia** ： `State` 、 `Gettes` 、 `Actions` (同步异步都支持)

### API 风格

在 API 风格上有所不同。Vuex 使用基于对象的 API 风格，其中状态、操作和获取器都被定义在单一的存储对象中。而 Pinia 使用类似于 Vue 3 Composition API 的 API 风格，你需要创建一个 Pinia store 类并使用类的属性和方法来定义状态和操作。

### TypeScript 支持

Pinia 在 TypeScript 支持方面表现更好。它利用了 Vue 3 的类型推断和 TypeScript 的装饰器，可以更容易地为状态和操作添加类型注解，并提供更好的类型推断和类型检查。Vuex 也支持 TypeScript，但在某些方面可能不如 Pinia 那样直接。

### 插件生态系统

由于 Vuex 是 Vue.js 社区的主要状态管理解决方案，它有一个庞大而成熟的插件生态系统。你可以找到许多与 Vue 生态系统和第三方库集成的 Vuex 插件。相比之下，Pinia 目前在插件方面的生态系统相对较小，但随着其在 Vue 社区的增长，预计也会逐渐增加插件支持。

### 性能

由于 Pinia 是基于 Vue 3 的响应式系统构建的，它在性能方面可能具有一些优势。Pinia 的响应式系统采用了 Proxy 对象，可以更准确地追踪状态的变化。Vuex 在 Vue 2 中使用的是基于 Object.defineProperty 的响应式系统。

Pinia 和 Vuex 在 API 风格、TypeScript 支持、插件生态系统和性能等方面存在一些区别。选择使用哪个库取决于个人偏好、项目需求和技术栈。如果你正在使用 Vue 3，并且喜欢基于类的 API 风格以及更好的 TypeScript 支持，那么 Pinia 可能是一个很好的选择。如果你已经在使用 Vuex，且有大量的 Vuex 插件和经验，那么继续使用 Vuex 也是合理的选择。

## references

- [Vuex](https://vuex.vuejs.org/)
- [Pinia](https://pinia.esm.dev/)
- [Redux](https://redux.js.org/)
