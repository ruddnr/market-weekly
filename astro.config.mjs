import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://market-weekly.pages.dev',
  integrations: [mdx()],
});
