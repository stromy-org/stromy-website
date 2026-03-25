import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  const siteUrl = site?.toString() ?? 'https://stromy.com.au';

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <description><![CDATA[${post.data.description}]]></description>
      <link>${siteUrl}/blog/${post.id}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.id}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <author>${post.data.author}</author>
      ${post.data.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`,
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Stromy Insights</title>
    <description>Analysis and perspectives on AI, government relations, and strategic communications.</description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-au</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
