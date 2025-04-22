/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  docs: [
    {
      type: 'html',
      value: `
        <a href="https://en.wikipedia.org/wiki/Doomsday_Clock" target="_blank" rel="noopener noreferrer">
          <img src="/img/proudamerica.webp" alt="Doomsday Clock" style="width: 100%; max-width: 150px; margin: 10px 0;" />
        </a>
      `,
      defaultStyle: true,
    },
    {
      type: 'category',
      label: 'Documentation',
      items: [
        {
          type: 'doc',
          id: 'getting-started', // Updated to match the existing file
          label: 'Getting Started',
        },
      ],
    },
  ],
};
