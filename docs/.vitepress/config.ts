export default {
  base: '/tiny-lorem/',
  title: 'tiny-lorem',
  lastUpdated: true,
  description: '用于生成模拟数据的现代JavaScript工具库。A library of modern JavaScript tools for generating mock data.',
  themeConfig: {
    logo: '/logo.svg',
    head: [['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]],
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
          { text: 'Image', link: '/api/image' },
          { text: 'Color', link: '/api/color' },
          { text: 'Address', link: '/api/address' },
          { text: 'Helper', link: '/api/helper' },
        ],
      },
      {
        items: [{ text: 'CHANGELOG', link: '/changelog/' }],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/CiroLee/tiny-lorem' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Ciro Lee',
    },
  },
};
