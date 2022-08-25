export default {
  base: '/tiny-lorem/',
  title: 'tiny-lorem',
  lastUpdated: true,
  description: 'A library of modern JavaScript tools for generating mock data',
  themeConfig: {
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
        ],
      },
    ],
  },
};
