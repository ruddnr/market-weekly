import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: SITE.title,
    description: SITE.subtitle,
    site: context.site!,
    items: posts.map(p => ({
      title: `제${p.data.issue}호 — ${p.data.title}`,
      pubDate: p.data.date,
      description: p.data.summary,
      link: `/posts/${p.id}/`,
    })),
    customData: '<language>ko</language>',
  });
}
