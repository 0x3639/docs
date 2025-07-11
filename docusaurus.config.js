// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Zenon Network Documentation',
  tagline: 'Network of Momentum Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.0x3639.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '0x3639', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl: 'https://github.com/0x3639/docs/edit/main',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/zenon-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Zenon Docs',
        logo: {
          alt: 'Zenon Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: 'Intro',
            position: 'left',
            to: '/intro/getting-started',
          },
          {
            label: 'API Playground',
            position: 'left',
            to: '/api-playground',
          },
          {
            href: 'https://github.com/zenon-network',
            label: 'GitHub',
            position: 'right',
          },
          {
            label: 'Explorer',
            position: 'left',
            items: [
              {
                label: 'Zenon Explorer',
                href: 'https://explorer.zenon.network',
                target: '_blank',
              },
              {
                label: 'ZenonHub Explorer',
                href: 'https://zenonhub.io/explorer',
                target: '_blank',
              },
            ],
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Intro',
                to: '/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Zenon Chat',
                href: 'https://zenon.chat',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/zenonnetwork',
              },
              {
                label: 'Discord',
                href: 'https://discord.com/invite/zenonnetwork',
              },
              {
                label: 'X',
                href: 'https://x.com/zenon_network',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/0x3639/docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Zenon Network. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: {
        appId: 'D9P80AGKM1',
        apiKey: 'c5526c83817b32a24be924bc79f65b1d',
        indexName: 'docs-0x3639',
        contextualSearch: true,
        searchPagePath: 'search',
      },
      metadata: [
        { name: 'description', content: 'Zenon Docs - The official documentation' },
        {
          property: 'og:image',
          content: 'https://docs.0x3639.com/img/zenon-social-card.jpg',
        },
        {
          property: 'og:title',
          content: 'Zenon Project – Network of Momentum Documentation',
        },
        {
          property: 'og:description',
          content: 'Learn about Zenon’s fast, feeless transactions and innovative architecture.',
        },
      ],
    }),
};

export default config;
