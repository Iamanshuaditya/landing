/**
 * AI Resources Hub Page
 * Landing page listing all topic categories
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { categories, topicClusters, getTotalPageCount } from '@/lib/pseo';
import type { Category, CategoryType } from '@/lib/pseo/types';

export const metadata: Metadata = {
    title: 'AI Resources & Guides | Smart Builds',
    description: 'Comprehensive AI resources covering machine learning, deep learning, NLP, computer vision, and practical applications. Expert guides for developers and business leaders.',
    openGraph: {
        title: 'AI Resources & Guides | Smart Builds',
        description: 'Comprehensive AI resources covering machine learning, deep learning, NLP, computer vision, and practical applications.',
        url: 'https://www.smartbuilds.in/ai',
        siteName: 'Smart Builds',
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.smartbuilds.in/ai',
    },
};

export default function AIHubPage() {
    const totalPages = getTotalPageCount();

    const categoriesByType = {
        technology: categories.filter((c) => c.type === 'technology'),
        industry: categories.filter((c) => c.type === 'industry'),
        concept: categories.filter((c) => c.type === 'concept'),
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* Header */}
            <header className="border-b border-neutral-800">
                <nav className="container mx-auto max-w-6xl px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-xl font-semibold">
                            Smart Builds
                        </Link>
                        <div className="text-sm text-neutral-400">
                            <span>{totalPages} articles</span>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Hero */}
            <section className="py-16 text-center">
                <div className="container mx-auto max-w-4xl px-4">
                    <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                        AI Resources & Guides
                    </h1>
                    <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto">
                        Comprehensive guides on artificial intelligence, machine learning,
                        and practical applications. From fundamentals to advanced implementation.
                    </p>
                </div>
            </section>

            <main className="container mx-auto max-w-6xl px-4 pb-16">
                {/* Technology Categories */}
                <CategorySection
                    title="AI Technologies"
                    description="Core technologies powering modern AI systems"
                    categories={categoriesByType.technology}
                    colorClass="from-blue-500/20 to-purple-500/20"
                />

                {/* Industry Categories */}
                <CategorySection
                    title="Industry Applications"
                    description="How AI transforms specific industries"
                    categories={categoriesByType.industry}
                    colorClass="from-green-500/20 to-teal-500/20"
                />

                {/* Concept Categories */}
                <CategorySection
                    title="AI Concepts & Strategy"
                    description="Foundational knowledge and strategic considerations"
                    categories={categoriesByType.concept}
                    colorClass="from-orange-500/20 to-red-500/20"
                />

                {/* Featured Articles */}
                <FeaturedArticles />
            </main>

            {/* Footer */}
            <footer className="border-t border-neutral-800 py-8">
                <div className="container mx-auto max-w-6xl px-4 text-center text-neutral-500">
                    <p>© {new Date().getFullYear()} Smart Builds. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

// ============================================================================
// Sub-components
// ============================================================================

interface CategorySectionProps {
    title: string;
    description: string;
    categories: readonly Category[];
    colorClass: string;
}

function CategorySection({ title, description, categories, colorClass }: CategorySectionProps) {
    return (
        <section className="mb-16">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="mt-2 text-neutral-400">{description}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => {
                    const clusters = topicClusters.filter((c) => c.categoryId === category.id);
                    const articleCount = clusters.reduce((sum, c) => sum + c.intents.length, 0);

                    return (
                        <Link
                            key={category.id}
                            href={`/ai/category/${category.id}`}
                            className={`group rounded-xl bg-gradient-to-br ${colorClass} p-6 transition-all hover:scale-[1.02] hover:shadow-lg`}
                        >
                            <h3 className="text-lg font-semibold group-hover:text-white transition-colors">
                                {category.name}
                            </h3>
                            <p className="mt-2 text-sm text-neutral-400 line-clamp-2">
                                {category.description}
                            </p>
                            <div className="mt-4 text-sm text-neutral-500">
                                {articleCount} articles
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

function FeaturedArticles() {
    // Get a sample of featured intents from different categories
    const featured = topicClusters
        .slice(0, 6)
        .map((cluster) => ({
            cluster,
            intent: cluster.intents[0],
        }));

    return (
        <section className="mt-20">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold">Featured Articles</h2>
                <p className="mt-2 text-neutral-400">Start with these popular guides</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featured.map(({ cluster, intent }) => (
                    <Link
                        key={intent.slug}
                        href={`/ai/${intent.slug}`}
                        className="group rounded-xl border border-neutral-800 p-6 transition-all hover:border-neutral-700 hover:bg-neutral-900"
                    >
                        <div className="text-sm text-neutral-500 mb-2">
                            {cluster.name}
                        </div>
                        <h3 className="font-medium group-hover:text-white transition-colors">
                            {intent.intent}
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {intent.keywords.slice(0, 2).map((keyword) => (
                                <span
                                    key={keyword}
                                    className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-400"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
