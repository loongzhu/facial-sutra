import { defineConfig, type DefaultTheme } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Facial Sutra",
  description: "A VitePress Site",
  outDir: "./docs",
  base: "/facial-sutra/",

  head: [
    [
      "link",
      {
        rel: "icon",
        // href: "https://raw.githubusercontent.com/MrZhuA00/image-repo/main/facial-sutra/facial-sutra_32.ico",
        // href: https://raw.githubusercontent.com/MrZhuA00/image-repo/d7801a8f660736e0cd6608daf85b41260599db4c/facial-sutra/facialsutra-logo.svg
        href: "/facial-sutra/facialsutra-logo.svg",
      },
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: "/facialsutra-logo.svg", width: 24, height: 24 },

    nav: [
      { text: "Home", link: "/" },
      {
        text: "Category",
        link: "/category/markdown-examples",
        activeMatch: "/category/",
      },
    ],

    sidebar: {
      "/category/": { base: "/category/", items: sidebarContent() },
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/MrZhuA00/facial-sutra" },
    ],
  },
});

function sidebarContent(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "category",
      items: [
        { text: "Markdown Examples", link: "markdown-examples" },
        { text: "API Examples", link: "api-examples" },
        { text: "Html", link: "Html" },
        { text: "JavaScript", link: "JavaScript" },
        { text: "Node", link: "Node" },
        { text: "Html", link: "/Html/" },
        { text: "JavaScript", link: "/JavaScript/" },
        { text: "Node", link: "/Node/" },
        {
          text: "category1",
          base: "/category/examples-",
          items: sidebarExample(),
        },
      ],
    },
    {
      text: "category2",
      base: "/category/",
      collapsed: false,
      items: [
        { text: "example1", link: "example1" },
        { text: "example2", link: "example2" },
        {
          text: "examples",
          base: "/category/examples-",
          items: sidebarExample(),
        },
      ],
    },
  ];
}

function sidebarExample() {
  return [
    { text: "examples1", link: "1" },
    { text: "examples2", link: "2" },
  ];
}
