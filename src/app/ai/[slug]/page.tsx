/**
 * Dynamic PSEO Page Route
 * Renders programmatic SEO pages with ISR
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, getAllSlugs, shouldReturn404 } from '@/lib/pseo';
import { PSEOPageLayout } from '@/components/pseo/PSEOPageLayout';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

// Dynamic segments not in generateStaticParams will be generated on-demand
export const dynamicParams = true;

/**
 * Generate static params for a subset of pages (optional pre-rendering)
 * We only pre-render high-priority pages; rest are generated on-demand
 */
export async function generateStaticParams() {
    // Pre-render first 100 pages at build time (optional optimization)
    const allSlugs = getAllSlugs();
    const prioritySlugs = allSlugs.slice(0, 100);

    return prioritySlugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = getPageBySlug(slug);

    if (!page || shouldReturn404(page)) {
        return {
            title: 'Not Found | NeuronAI',
            description: 'The requested page could not be found.',
        };
    }

    const canonicalUrl = `https://neuronai.com/ai/${slug}`;

    return {
        title: page.title,
        description: page.description,
        keywords: page.category.name,
        authors: [{ name: 'NeuronAI' }],
        openGraph: {
            title: page.title,
            description: page.description,
            url: canonicalUrl,
            siteName: 'NeuronAI',
            type: 'article',
            publishedTime: page.lastModified.toISOString(),
            modifiedTime: page.lastModified.toISOString(),
            section: page.category.name,
        },
        twitter: {
            card: 'summary_large_image',
            title: page.title,
            description: page.description,
        },
        alternates: {
            canonical: canonicalUrl,
        },
        robots: page.excludeFromSitemap
            ? { index: false, follow: true }
            : { index: true, follow: true },
    };
}

/**
 * Page Component
 */
export default async function PSEOPage({ params }: PageProps) {
    const { slug } = await params;
    const page = getPageBySlug(slug);

    // Return 404 for invalid slugs or quality-failing pages
    if (!page || shouldReturn404(page)) {
        notFound();
    }

    return <PSEOPageLayout page={page} />;
}
