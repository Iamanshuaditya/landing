/**
 * Sitemap Index Route Handler
 * Returns proper sitemapindex XML referencing all sitemap files
 */

import { NextResponse } from 'next/server';
import { getTotalPageCount } from '@/lib/pseo';

const CHUNK_SIZE = 25000;
const BASE_URL = 'https://www.smartbuilds.in';

export async function GET() {
    const totalPages = getTotalPageCount();
    const numChunks = Math.ceil(totalPages / CHUNK_SIZE);
    const now = new Date().toISOString();

    // Build sitemap entries
    const sitemapEntries: string[] = [];

    // Static sitemap
    sitemapEntries.push(`  <sitemap>
    <loc>${BASE_URL}/sitemaps/static.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`);

    // Programmatic sitemaps (chunked)
    for (let i = 1; i <= numChunks; i++) {
        sitemapEntries.push(`  <sitemap>
    <loc>${BASE_URL}/sitemaps/programmatic/${i}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</sitemapindex>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
    });
}
