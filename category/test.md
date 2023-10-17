---
outline: deep
pageClass: test-page
---

# About test

About test

<script setup lang="ts">
import { ref } from 'vue'
import ModalDemo from '../components/ModalDemo.vue'

const count: number = ref(0)

function hello() {
  console.log("hello");
}
</script>

## Markdown Content <button :class="$style.button" @click="count++">Increment</button>

The count is: {{ count }}

::: v-pre
{{ This will be displayed as-is }}
:::

<button :class="$style.button" @click="count++">Increment</button>

```js
hello();
```

```js-vue
Hello {{ 1 + 1 }}
console.log(Number.MAX_SAFE_INTEGER)
// {{ Number.MAX_SAFE_INTEGER }}
{{hello()}}
console.log(Number.MIN_SAFE_INTEGER)
// {{ Number.MIN_SAFE_INTEGER }}
```

```html

```

<ModalDemo />
::: details
<<< @/components/ModalDemo.vue
:::

<style module lang="sass">
.button
  color: red
  font-weight: bold
  &:hover
    color: blue

</style>
