export default {
  base: '/tiny-lorem/',
  title: 'tiny-lorem',
  lastUpdated: true,
  description: '用于生成模拟数据的现代JavaScript工具库。A library of modern JavaScript tools for generating mock data.',
  themeConfig: {
    logo: '/logo.svg',
    head: [['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]],
    nav: [
      {
        text: 'v0.1.6',
        items: [
          {
            text: 'CHANGELOG',
            link: 'https://github.com/CiroLee/tiny-lorem/releases',
          },
        ],
      },
    ],
    sidebar: [
      {
        items: [{ text: '快速上手', link: '/guide/' }],
      },
      {
        text: 'API',
        collapsible: true,
        items: [
          { text: 'Texts', link: '/api/texts' },
          { text: 'Number', link: '/api/number' },
          { text: 'Date', link: '/api/date' },
          { text: 'Internet', link: '/api/internet' },
          { text: 'Develop', link: '/api/develop' },
          { text: 'Image', link: '/api/image' },
          { text: 'Color', link: '/api/color' },
          { text: 'Address', link: '/api/address' },
          { text: 'Unique', link: '/api/unique.md' },
          { text: 'Finance', link: '/api/finance.md' },
          { text: 'Helper', link: '/api/helper' },
        ],
      },
      {
        text: '进阶',
        collapsible: true,
        items: [{ text: '批量生成数据', link: '/advanced/multi' }],
      },
      {
        items: [{ text: 'CHANGELOG', link: '/changelog/' }],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/CiroLee/tiny-lorem' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Ciro Lee',
    },
  },
};
