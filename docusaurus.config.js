module.exports = {
  title: 'Proud America',
  tagline: 'Uncovering the Truth - The Most Valuable Information',
  url: 'https://www.proudamerica.us',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/proudamericaus.ico',
  organizationName: 'cichy',
  projectName: 'proudamerica',
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          path: './articles/temp',
          routeBasePath: '/articles-analysis',
          showReadingTime: true,
          blogTitle: 'Articles',
          blogDescription: 'Latest Articles & Analysis',
          blogSidebarTitle: 'Recent Articles',
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Proud America`,
          },
          include: ['**/*.md', '**/*.mdx'],
          exclude: [], // Explicitly include all
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'news',
        path: './news',
        routeBasePath: '/news',
        showReadingTime: true,
        blogTitle: 'News',
        blogDescription: 'Latest News Updates',
        blogSidebarTitle: 'Recent News',
        include: ['**/*.md', '**/*.mdx'],
        exclude: [],
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Proud America US',
      logo: {
        alt: 'Proud America US Logo',
        src: 'img/proudamericaus.png',
        srcDark: 'img/proudamericaus.png',
      },
      items: [
        {
          to: '/articles-analysis',
          label: 'Articles & Analysis',
          position: 'left',
        },
        {
          to: '/news',
          label: 'News',
          position: 'left',
        },
        {
          type: 'html',
          position: 'right',
          value: '<div id="navbar-realtime-clock"></div>',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'We are the media now',
              href: 'https://x.com/proudamericaus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Proud America US. Build with IanaIO`,
    },
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
    },
  },
};
