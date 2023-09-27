import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Facial Sutra",
  description: "A VitePress Site",
  srcDir: "./src", // https://vitepress.dev/reference/site-config#srcdir
  outDir: "./docs", // https://vitepress.dev/reference/site-config#outdir
  base: "/facial-sutra/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "About",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
          { text: "Html", link: "/Html/" },
          { text: "JavaScript", link: "/JavaScript/" },
          { text: "Node", link: "/Node/" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/MrZhuA00/facial-sutra" },
    ],
  },
});
