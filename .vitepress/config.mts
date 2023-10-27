import { defineConfig, type DefaultTheme } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  title: "Facial Sutra",
  titleTemplate: true,
  description:
    "Not just some interview questions and common knowledge I collected",

  base: "/facial-sutra/",
  cleanUrls: true,
  srcExclude: ["**/README.md"],
  lastUpdated: true,

  markdown: {
    math: true,
  },

  head: [
    [
      "link",
      {
        rel: "icon",
        // href: "https://raw.githubusercontent.com/Jokerzhzh/image-repo/main/facial-sutra/facial-sutra_32.ico",
        // href: https://raw.githubusercontent.com/Jokerzhzh/image-repo/d7801a8f660736e0cd6608daf85b41260599db4c/facial-sutra/facialsutra-logo.svg
        href: "/facial-sutra/facialsutra-logo.svg",
      },
    ],
  ],

  rewrites: {
    "category/([^/]+)/:page": "category/:page",
  },

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
      pattern: "https://github.com/Jokerzhzh/facial-sutra/blob/main/:path",
      text: "Edit this page on GitHub",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Jokerzhzh/facial-sutra" },
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
        { text: "CSS", items: cssSidebar() },
        { text: "Vue", items: vueSidebar() },
        { text: "Node.js", items: nodejsSidebar() },
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
    { text: "Node.js", link: "nodejs" },
    { text: "Buffer", link: "Buffer" },
    { text: "event loop", link: "event_loop" },
    { text: "EventEmitter", link: "EventEmitter" },
    { text: "fs", link: "fs" },
    { text: "global", link: "global" },
    { text: "process", link: "process" },
    { text: "Stream", link: "Stream" },
    { text: "Middleware", link: "Middleware" },
    { text: "require order", link: "require_order" },
    { text: "file upload", link: "file_upload" },
    { text: "JSON Web Token", link: "jwt" },
    { text: "Performance optimization", link: "performance" },
  ];
}

function cssSidebar(): DefaultTheme.SidebarItem[] {
  return [
    { text: "Box model", link: "box_model" },
    { text: "BFC", link: "BFC" },
    { text: "CSS selectors", link: "css_selectors" },
    { text: "Responsive Design", link: "responsive_design" },
    { text: "Center element", link: "center" },
    { text: "multi-column layout", link: "column_layout" },
  ];
}

function vueSidebar(): DefaultTheme.SidebarItem[] {
  return [{ text: "Vuex vs Pinia", link: "vuex_vs_pinia" }];
}
