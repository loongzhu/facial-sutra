---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Facial Sutra
  text: Experience & Knowledge
  tagline: Not just some interview questions and common knowledge I collected
  actions:
    - theme: brand
      text: Markdown Examples
      link: /category/markdown-examples
    - theme: alt
      text: API Examples
      link: /category/api-examples
  image:
    src: /logo.png
    alt: FacialSutra

features:
  - title: Html
    icon:
      {
        src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjl6aDA5ZjBhb29iY3dzcTBtNzF6bHhsbTUxdjJ4eG5kdDRnaTd6eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/XAxylRMCdpbEWUAvr8/giphy.gif",
        alt: "Html",
        height: 48,
        width: 48,
      }
    details: Some interview questions about Html
    link: /category/Html

  - title: Javascript
    icon:
      {
        src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2d4dmhlNWN0Nzdpa2tjaXd2NnRsOXczdXMyNzk1cjVubm91NW53aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ln7z2eWriiQAllfVcn/giphy.gif",
        alt: "Javascript",
        height: 48,
        width: 48,
      }
    details: Some interview questions about Javascript
    link: /category/JavaScript

  - title: Node
    icon:
      {
        src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmhoMjF4MGR1N3B3OG1kemxrZG4wNGF0MWtxZnJmdnVxbDg4eWQzaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/kdFc8fubgS31b8DsVu/giphy.gif",
        alt: "Node",
        height: 48,
        width: 48,
      }
    details: Some interview questions about Node
  - title: Vue
    icon:
      {
        src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanpnbXg0bjd0M3VvdGxjemlvbWc2aGhqajgxamozMnNnMXN2dXIzeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VgGthkhUvGgOit7Y9i/giphy.gif",
        alt: "Vue",
        height: 48,
        width: 48,
      }
    details: Some interview questions about Vue
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-30deg, #bd34fe 30%, #41d1ff);
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
</style>
