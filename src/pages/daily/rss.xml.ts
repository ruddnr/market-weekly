import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const items = (await getCollection('daily', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: `${SITE.title} · 일간 마감`,
    description: '평일 장 마감 뒤 오늘의 숫자·재료·아이디어 노트',
    site: context.site!,
    items: items.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      link: `/daily/${p.id}/`,
    })),
    customData: '<language>ko</language>',
  });
}
