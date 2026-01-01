/**
 * PSEO Internal Linking
 * Intent-aware linking strategy for topical clusters
 */

import type { RelatedLink, IntentUnit } from './types';
import {
    getIntentBySlug,
    getClusterForSlug,
    getCategoryById,
    topicClusters,
    categories,
} from './categories';

// ============================================================================
// Link Configuration
// ============================================================================

const LINK_LIMITS = {
    parentHub: 1,
    siblings: 5,
    crossCluster: 3,
    depth: 2,
    maxTotal: 15,
} as const;

// ============================================================================
// Deterministic Hash for Consistent Linking
// ============================================================================

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

// ============================================================================
// Link Generation
// ============================================================================

export function generateRelatedLinks(slug: string): RelatedLink[] {
    const links: RelatedLink[] = [];
    const currentIntent = getIntentBySlug(slug);
    const currentCluster = getClusterForSlug(slug);

    if (!currentIntent || !currentCluster) {
        return [];
    }

    const category = getCategoryById(currentCluster.categoryId);
    if (!category) return [];

    // 1. Parent Hub Link (always include category hub)
    links.push({
        slug: `category/${category.id}`,
        title: category.name,
        linkType: 'parent-hub',
    });

    // 2. Sibling Links (same cluster, different intent)
    const siblingIntents = currentCluster.intents.filter((i) => i.slug !== slug);
    const siblingCount = Math.min(siblingIntents.length, LINK_LIMITS.siblings);

    // Use deterministic selection based on slug hash
    const hash = hashString(slug);
    const shuffledSiblings = [...siblingIntents].sort(
        (a, b) => hashString(a.slug + slug) - hashString(b.slug + slug)
    );

    for (let i = 0; i < siblingCount; i++) {
        const sibling = shuffledSiblings[i];
        links.push({
            slug: sibling.slug,
            title: formatIntentTitle(sibling),
            linkType: 'sibling',
        });
    }

    // 3. Cross-Cluster Links (related categories)
    const relatedCategories = getRelatedCategories(category.id);
    let crossClusterCount = 0;

    for (const relatedCatId of relatedCategories) {
        if (crossClusterCount >= LINK_LIMITS.crossCluster) break;

        const relatedClusters = topicClusters.filter(
            (c) => c.categoryId === relatedCatId
        );

        for (const cluster of relatedClusters) {
            if (crossClusterCount >= LINK_LIMITS.crossCluster) break;

            // Pick one intent from related cluster deterministically
            const intentIndex = hash % cluster.intents.length;
            const intent = cluster.intents[intentIndex];

            links.push({
                slug: intent.slug,
                title: formatIntentTitle(intent),
                linkType: 'cross-cluster',
            });
            crossClusterCount++;
            break;
        }
    }

    // 4. Depth Links (subtopics if available)
    const depthLinks = findDepthLinks(currentIntent, currentCluster.categoryId);
    for (let i = 0; i < Math.min(depthLinks.length, LINK_LIMITS.depth); i++) {
        links.push(depthLinks[i]);
    }

    // Enforce total limit
    return links.slice(0, LINK_LIMITS.maxTotal);
}

// ============================================================================
// Related Categories Mapping
// ============================================================================

const categoryRelations: Record<string, string[]> = {
    'machine-learning': ['deep-learning', 'mlops', 'ai-fundamentals'],
    'deep-learning': ['machine-learning', 'nlp', 'computer-vision'],
    'nlp': ['deep-learning', 'generative-ai', 'marketing-ai'],
    'computer-vision': ['deep-learning', 'manufacturing-ai', 'retail-ai'],
    'generative-ai': ['nlp', 'marketing-ai', 'ai-ethics'],
    'mlops': ['machine-learning', 'ai-strategy'],
    'healthcare-ai': ['machine-learning', 'computer-vision', 'ai-ethics'],
    'finance-ai': ['machine-learning', 'ai-strategy', 'ai-ethics'],
    'retail-ai': ['computer-vision', 'nlp', 'marketing-ai'],
    'manufacturing-ai': ['computer-vision', 'mlops'],
    'marketing-ai': ['nlp', 'generative-ai', 'retail-ai'],
    'ai-fundamentals': ['machine-learning', 'ai-strategy'],
    'ai-ethics': ['ai-fundamentals', 'ai-strategy', 'healthcare-ai'],
    'ai-strategy': ['ai-fundamentals', 'mlops', 'finance-ai'],
};

function getRelatedCategories(categoryId: string): string[] {
    return categoryRelations[categoryId] || [];
}

// ============================================================================
// Helper Functions
// ============================================================================

function formatIntentTitle(intent: IntentUnit): string {
    // Convert slug to readable title
    const words = intent.slug.split('-');
    return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

function findDepthLinks(
    currentIntent: IntentUnit,
    categoryId: string
): RelatedLink[] {
    const links: RelatedLink[] = [];

    // Find intents that go deeper into the same topic
    const allClusters = topicClusters.filter((c) => c.categoryId === categoryId);

    for (const cluster of allClusters) {
        for (const intent of cluster.intents) {
            // Skip self
            if (intent.slug === currentIntent.slug) continue;

            // Check if this intent is a "deeper" version (more specific)
            const currentWords = new Set(currentIntent.slug.split('-'));
            const intentWords = intent.slug.split('-');

            // If intent contains current topic words plus more, it's deeper
            const overlap = intentWords.filter((w) => currentWords.has(w)).length;
            if (overlap >= 1 && intentWords.length > currentIntent.slug.split('-').length) {
                links.push({
                    slug: intent.slug,
                    title: formatIntentTitle(intent),
                    linkType: 'depth',
                });
            }
        }
    }

    return links;
}

// ============================================================================
// Link Validation
// ============================================================================

export function validateLinkGraph(slugs: string[]): {
    orphaned: string[];
    circularChains: string[][];
} {
    const linkMap = new Map<string, string[]>();

    // Build adjacency list
    for (const slug of slugs) {
        const links = generateRelatedLinks(slug);
        linkMap.set(slug, links.map((l) => l.slug).filter((s) => slugs.includes(s)));
    }

    // Find orphaned pages (no incoming links)
    const hasIncoming = new Set<string>();
    for (const outLinks of linkMap.values()) {
        for (const link of outLinks) {
            hasIncoming.add(link);
        }
    }
    const orphaned = slugs.filter((s) => !hasIncoming.has(s));

    // Find circular chains (simplified: just detect immediate cycles)
    const circularChains: string[][] = [];
    for (const [slug, outLinks] of linkMap) {
        for (const outLink of outLinks) {
            const theirLinks = linkMap.get(outLink) || [];
            if (theirLinks.includes(slug)) {
                // Check if we already recorded this pair
                const exists = circularChains.some(
                    (chain) => chain.includes(slug) && chain.includes(outLink)
                );
                if (!exists) {
                    circularChains.push([slug, outLink]);
                }
            }
        }
    }

    return { orphaned, circularChains };
}
