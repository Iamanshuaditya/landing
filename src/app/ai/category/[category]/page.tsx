/**
 * Category Landing Page
 * Lists all articles within a specific category
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryById, getClustersByCategory, categories } from '@/lib/pseo';

interface PageProps {
    params: Promise<{ category: string }>;
}

export const revalidate = 86400;

export async function generateStaticParams() {
    return categories.map((category) => ({
        category: category.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categoryId } = await params;
    const category = getCategoryById(categoryId);

    if (!category) {
        return {
            title: 'Category Not Found | NeuronAI',
        };
    }

    return {
        title: `${category.name} Resources | NeuronAI`,
        description: category.description,
        openGraph: {
            title: `${category.name} Resources | NeuronAI`,
            description: category.description,
            url: `https://neuronai.com/ai/category/${categoryId}`,
            siteName: 'NeuronAI',
            type: 'website',
        },
        alternates: {
            canonical: `https://neuronai.com/ai/category/${categoryId}`,
        },
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category: categoryId } = await params;
    const category = getCategoryById(categoryId);

    if (!category) {
        notFound();
    }

    const clusters = getClustersByCategory(categoryId);
    const totalArticles = clusters.reduce((sum, c) => sum + c.intents.length, 0);

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* Header */}
            <header className="border-b border-neutral-800">
                <nav className="container mx-auto max-w-5xl px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Link href="/" className="hover:text-white">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/ai" className="hover:text-white">
                            AI Resources
                        </Link>
                        <span>/</span>
                        <span className="text-white">{category.name}</span>
                    </div>
                </nav>
            </header>

            {/* Hero */}
            <section className="py-12 border-b border-neutral-800">
                <div className="container mx-auto max-w-5xl px-4">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wide rounded-full bg-neutral-800 text-neutral-400">
                        {category.type}
                    </div>
                    <h1 className="text-4xl font-bold md:text-5xl">
                        {category.name}
                    </h1>
                    <p className="mt-4 text-lg text-neutral-300 max-w-2xl">
                        {category.description}
                    </p>
                    <div className="mt-6 text-sm text-neutral-500">
                        {totalArticles} articles in {clusters.length} topic clusters
                    </div>
                </div>
            </section>

            {/* Topic Clusters */}
            <main className="container mx-auto max-w-5xl px-4 py-12">
                <div className="space-y-12">
                    {clusters.map((cluster) => (
                        <section key={cluster.id}>
                            <h2 className="text-xl font-semibold mb-4">{cluster.name}</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                {cluster.intents.map((intent) => (
                                    <Link
                                        key={intent.slug}
                                        href={`/ai/${intent.slug}`}
                                        className="group rounded-lg border border-neutral-800 p-5 transition-all hover:border-neutral-700 hover:bg-neutral-900"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <span className="text-xs font-medium uppercase tracking-wide text-neutral-500 mb-1 block">
                                                    {intent.intentType.replace('-', ' ')}
                                                </span>
                                                <h3 className="font-medium group-hover:text-white transition-colors">
                                                    {intent.intent}
                                                </h3>
                                            </div>
                                            <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                                                →
                                            </span>
                                        </div>
                                        <div className="mt-3 flex flex-wrap gap-1">
                                            {intent.keywords.slice(0, 3).map((keyword) => (
                                                <span
                                                    key={keyword}
                                                    className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-500"
                                                >
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Back to Hub */}
                <div className="mt-16 pt-8 border-t border-neutral-800">
                    <Link
                        href="/ai"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                    >
                        ← Back to AI Resources
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-neutral-800 py-8">
                <div className="container mx-auto max-w-5xl px-4 text-center text-neutral-500">
                    <p>© {new Date().getFullYear()} NeuronAI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
