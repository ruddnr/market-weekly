import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  // generateId: 폴더명만 id로 쓴다 (기본값은 '…/index'까지 붙어 URL이 틀어짐)
  loader: glob({
    pattern: '**/index.mdx',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/\/index\.mdx$/, ''),
  }),
  schema: z.object({
    title: z.string().min(1),
    issue: z.number().int().nonnegative(),        // 호수 (창간 예고는 0)
    date: z.coerce.date(),                         // 발행일
    dataAsOf: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // 데이터 기준일
    summary: z.string().min(1).max(300),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
