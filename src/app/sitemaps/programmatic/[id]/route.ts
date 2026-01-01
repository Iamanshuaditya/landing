/**
 * Chunked Programmatic Sitemap
 * Generates paginated sitemaps for PSEO pages
 */

import { NextRequest, NextResponse } from 'next/server';
import { getQualifiedPages } from '@/lib/pseo';

const CHUNK_SIZE = 25000;
const BASE_URL = 'https://www.smartbuilds.in';

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id: rawId } = await params;
    // Strip .xml extension if present (e.g., "1.xml" -> "1")
    const cleanId = rawId.replace(/\.xml$/, '');
    const chunkId = parseInt(cleanId, 10);

    if (isNaN(chunkId) || chunkId < 1) {
        return new NextResponse('Invalid sitemap ID', { status: 400 });
    }

    // Get only quality-passing pages
    const allPages = getQualifiedPages();

    // Calculate chunk boundaries
    const startIndex = (chunkId - 1) * CHUNK_SIZE;
    const endIndex = startIndex + CHUNK_SIZE;

    if (startIndex >= allPages.length) {
        return new NextResponse('Sitemap chunk not found', { status: 404 });
    }

    const chunkPages = allPages.slice(startIndex, endIndex);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunkPages
            .map(
                (page) => `  <url>
    <loc>${BASE_URL}/ai/${page.slug}</loc>
    <lastmod>${page.lastModified.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
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
