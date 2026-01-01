/**
 * PSEO Page Layout Component
 * Template-aware layout for all programmatic SEO pages
 */

import Link from 'next/link';
import type { PSEOPage, RelatedLink } from '@/lib/pseo/types';

interface PSEOPageLayoutProps {
    page: PSEOPage;
}

export function PSEOPageLayout({ page }: PSEOPageLayoutProps) {
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* Header */}
            <header className="border-b border-neutral-800">
                <nav className="container mx-auto max-w-4xl px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-xl font-semibold">
                            Smart Builds
                        </Link>
                        <Breadcrumbs page={page} />
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto max-w-4xl px-4 py-12">
                {/* Title Section */}
                <div className="mb-10">
                    <div className="mb-4 flex items-center gap-2 text-sm text-neutral-400">
                        <Link
                            href={`/ai/category/${page.category.id}`}
                            className="hover:text-white transition-colors"
                        >
                            {page.category.name}
                        </Link>
                        <span>·</span>
                        <span className="capitalize">{page.intentType.replace('-', ' ')}</span>
                    </div>
                    <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                        {page.title}
                    </h1>
                    <p className="mt-4 text-lg text-neutral-300">
                        {page.description}
                    </p>
                    <div className="mt-6 text-sm text-neutral-500">
                        Last updated: {page.lastModified.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </div>
                </div>

                {/* Table of Contents */}
                <TableOfContents sections={page.sections} />

                {/* Content Sections */}
                <article className="prose prose-invert prose-lg max-w-none">
                    {page.sections.map((section) => (
                        <section key={section.id} id={section.id} className="mb-12">
                            <h2 className="text-2xl font-semibold mb-4 scroll-mt-20">
                                {section.title}
                            </h2>
                            <div
                                className="text-neutral-300 leading-relaxed whitespace-pre-line"
                            >
                                {section.content}
                            </div>
                        </section>
                    ))}
                </article>

                {/* Related Links */}
                <RelatedLinksSection links={page.relatedLinks} />

                {/* CTA Section */}
                <CallToAction />
            </main>

            {/* Footer */}
            <footer className="border-t border-neutral-800 py-8">
                <div className="container mx-auto max-w-4xl px-4 text-center text-neutral-500">
                    <p>© {new Date().getFullYear()} Smart Builds. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

// ============================================================================
// Sub-components
// ============================================================================

function Breadcrumbs({ page }: { page: PSEOPage }) {
    return (
        <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">
                Home
            </Link>
            <span>/</span>
            <Link href="/ai" className="hover:text-white transition-colors">
                AI Resources
            </Link>
            <span>/</span>
            <Link
                href={`/ai/category/${page.category.id}`}
                className="hover:text-white transition-colors"
            >
                {page.category.name}
            </Link>
        </div>
    );
}

function TableOfContents({ sections }: { sections: PSEOPage['sections'] }) {
    return (
        <nav className="mb-12 rounded-xl bg-neutral-900 p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">
                In This Article
            </h3>
            <ul className="space-y-2">
                {sections.map((section) => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            className="text-neutral-300 hover:text-white transition-colors"
                        >
                            {section.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

function RelatedLinksSection({ links }: { links: RelatedLink[] }) {
    const groupedLinks = {
        'parent-hub': links.filter((l) => l.linkType === 'parent-hub'),
        sibling: links.filter((l) => l.linkType === 'sibling'),
        'cross-cluster': links.filter((l) => l.linkType === 'cross-cluster'),
        depth: links.filter((l) => l.linkType === 'depth'),
    };

    return (
        <nav className="mt-16 rounded-xl bg-neutral-900 p-8">
            <h3 className="mb-6 text-xl font-semibold">Continue Learning</h3>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Related in Same Category */}
                {groupedLinks.sibling.length > 0 && (
                    <div>
                        <h4 className="mb-3 text-sm font-medium uppercase tracking-wide text-neutral-400">
                            Related Topics
                        </h4>
                        <ul className="space-y-2">
                            {groupedLinks.sibling.map((link) => (
                                <li key={link.slug}>
                                    <Link
                                        href={`/ai/${link.slug}`}
                                        className="text-neutral-300 hover:text-white transition-colors"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Cross-Cluster Links */}
                {groupedLinks['cross-cluster'].length > 0 && (
                    <div>
                        <h4 className="mb-3 text-sm font-medium uppercase tracking-wide text-neutral-400">
                            Explore Further
                        </h4>
                        <ul className="space-y-2">
                            {groupedLinks['cross-cluster'].map((link) => (
                                <li key={link.slug}>
                                    <Link
                                        href={`/ai/${link.slug}`}
                                        className="text-neutral-300 hover:text-white transition-colors"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Hub Link */}
            {groupedLinks['parent-hub'].length > 0 && (
                <div className="mt-6 pt-6 border-t border-neutral-800">
                    <Link
                        href={`/ai/${groupedLinks['parent-hub'][0].slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                    >
                        ← Back to {groupedLinks['parent-hub'][0].title}
                    </Link>
                </div>
            )}
        </nav>
    );
}

function CallToAction() {
    return (
        <div className="mt-16 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 text-center">
            <h3 className="text-2xl font-semibold mb-3">
                Ready to Build Your AI Solution?
            </h3>
            <p className="text-neutral-300 mb-6 max-w-xl mx-auto">
                Transform your business with custom AI solutions. Our team delivers
                intelligent systems tailored to your specific needs.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
                Get Started
                <span>→</span>
            </Link>
        </div>
    );
}
