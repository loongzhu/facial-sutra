<script setup lang="ts" name="Title">
import { onMounted, ref, toRefs, withDefaults } from "vue";

type Props = {
  title?: string;
  about?: string[];
};

const props = withDefaults(defineProps<Props>(), {
  title: "Title",
  about: () => ["Hello", "World", "!"],
});

const { title, about } = toRefs(props);

const colors = ["#fd7664", "#feb000", "#95d384"];

const content = ref();

onMounted(() => {
  const { clientWidth: width, clientHeight: height } = content.value;
  const contentRect = content.value.getBoundingClientRect();

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", `${width}px`);
  svg.setAttribute("height", `${height}px`);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  content.value.appendChild(svg);

  const titleEl = content.value.querySelector(".title");

  const titleRect = titleEl.getBoundingClientRect();

  const { clientHeight: titleheight } = titleEl;

  const space = titleheight / (about.value.length + 1);

  const startTop = titleRect.top - contentRect.top;
  const startLeft = titleRect.left - contentRect.left + titleRect.width;

  const titles = content.value.querySelectorAll(".items");

  let maxWidth = 0;

  titles.forEach((element: HTMLElement) => {
    const { clientWidth: width } = element;
    if (width > maxWidth) {
      maxWidth = width;
    }
  });

  titles.forEach((element: HTMLElement, index: number) => {
    element.style.width = `${maxWidth}px`;

    const color = element.style.getPropertyValue("--color");

    const elementRect = element.getBoundingClientRect();
    const elementLeft = elementRect.left - contentRect.left;
    const elementTop = elementRect.top - contentRect.top;

    const { clientHeight: elementHeight } = element;
    const top = elementTop + elementHeight / 2 + 3;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.setAttribute(
      "d",
      `M ${startLeft} ${startTop + (index + 1) * space} ${elementLeft} ${top}`
    );
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-width", "3");
    path.setAttribute("fill", "none");

    svg.appendChild(path);
  });
});
</script>

<template>
  <div class="main">
    <div ref="content" class="content">
      <span class="title">{{ title }}</span>

      <div class="about">
        <span
          class="items"
          v-for="(item, index) in about"
          :key="item"
          :style="{ '--color': colors[index] }"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./title.scss";

.main {
  width: 100%;
  min-width: 600px;
  background-color: transparent;
  display: grid;
  place-items: center;
  user-select: none;
}

.content {
  width: 600px;
  height: 300px;
  display: grid;
  place-items: center;
  position: relative;
}

.title {
  @include default-box();
  font-size: 2rem;
  font-weight: 700;
  min-width: 320px;
  height: 84px;
  position: absolute;
  left: $space;
  .dark & {
    border-color: $darkBorderColor;
  }
}

.about {
  display: grid;
  place-items: center;
  position: absolute;
  right: $space;
  border: $borderWidth dashed #ff0000;
  border-radius: $borderRadius;
  padding: 10px;
}

.items {
  min-width: 115px;
  height: 50px;
  border: 1px solid #000;
  margin: 12px 0;
  @include default-box(var(--color));
}

.box {
  width: 100px;
  height: 100px;
  background-color: #f00;
  margin: 50px;
}
</style>
