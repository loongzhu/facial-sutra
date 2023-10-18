import { defineConfig, type DefaultTheme } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  title: "Facial Sutra",
  description:
    "Not just some interview questions and common knowledge I collected",

  base: "/facial-sutra/",

  lastUpdated: true,
  cleanUrls: true,

  markdown: {
    math: true,
  },

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

    editLink: {
      pattern: "https://github.com/MrZhuA00/facial-sutra/blob/main/:path",
      text: "Edit this page on GitHub",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/MrZhuA00/facial-sutra" },
    ],
  },
});

function sidebarContent(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Category",
      items: [
        { text: "Markdown Examples", link: "markdown-examples" },
        { text: "API Examples", link: "api-examples" },
        { text: "CSS", link: "CSS" },
        { text: "Html", link: "Html" },
        { text: "JavaScript", link: "JavaScript" },
        {
          text: "Node.js",
          base: "/category/nodejs/",
          items: nodejsSidebar(),
        },
        { text: "Git", link: "Git" },
        { text: "test", link: "test" },
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

function sidebarExample(): DefaultTheme.SidebarItem[] {
  return [
    { text: "examples1", link: "1" },
    { text: "examples2", link: "2" },
  ];
}

function nodejsSidebar(): DefaultTheme.SidebarItem[] {
  return [
    { text: "Buffer", link: "Buffer" },
    { text: "event_loop", link: "event_loop" },
    { text: "EventEmitter", link: "EventEmitter" },
    { text: "fs", link: "fs" },
    { text: "Stream", link: "Stream" },
    { text: "file_upload", link: "file_upload" },
  ];
}
