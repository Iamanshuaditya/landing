/**
 * Static Sitemap
 * Lists core pages that don't change frequently
 */

import { NextResponse } from 'next/server';
import { categories } from '@/lib/pseo';

const BASE_URL = 'https://neuronai.com';

export async function GET() {
    const staticPages = [
        { url: '/', priority: 1.0, changefreq: 'daily' },
        { url: '/ai', priority: 0.9, changefreq: 'daily' },
    ];

    // Add category pages
    const categoryPages = categories.map((category) => ({
        url: `/ai/category/${category.id}`,
        priority: 0.8,
        changefreq: 'weekly' as const,
    }));

    const allPages = [...staticPages, ...categoryPages];
    const now = new Date().toISOString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
            .map(
                (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
    });
}
