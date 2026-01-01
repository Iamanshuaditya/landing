/**
 * Sitemap Index
 * References static and programmatic sitemaps
 */

import { MetadataRoute } from 'next';
import { getTotalPageCount } from '@/lib/pseo';

const CHUNK_SIZE = 25000;
const BASE_URL = 'https://neuronai.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const totalPages = getTotalPageCount();
    const numChunks = Math.ceil(totalPages / CHUNK_SIZE);

    // Sitemap index entries
    const sitemaps: MetadataRoute.Sitemap = [];

    // Static sitemap
    sitemaps.push({
        url: `${BASE_URL}/sitemaps/static.xml`,
        lastModified: new Date(),
    });

    // Programmatic sitemaps (chunked)
    for (let i = 1; i <= numChunks; i++) {
        sitemaps.push({
            url: `${BASE_URL}/sitemaps/programmatic/${i}`,
            lastModified: new Date(),
        });
    }

    return sitemaps;
}
