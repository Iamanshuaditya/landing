/**
 * PSEO Type Definitions
 * Core types for the programmatic SEO system
 */

// ============================================================================
// Categories & Topics
// ============================================================================

export type CategoryType =
    | 'technology'
    | 'industry'
    | 'concept'
    | 'use-case'
    | 'comparison';

export interface Category {
    id: string;
    name: string;
    type: CategoryType;
    description: string;
    parentId?: string;
}

export interface TopicCluster {
    id: string;
    categoryId: string;
    name: string;
    intents: IntentUnit[];
}

export interface IntentUnit {
    slug: string;
    intent: string;
    intentType: 'question' | 'concept' | 'use-case' | 'comparison' | 'evaluation';
    keywords: readonly string[];
}

// ============================================================================
// Content Templates
// ============================================================================

export interface SectionSchema {
    id: string;
    title: string;
    required: boolean;
    minLength: number;
    description: string;
}

export interface CategoryTemplate {
    categoryType: CategoryType;
    sections: SectionSchema[];
    forbiddenPatterns: string[];
}

// ============================================================================
// Page Content
// ============================================================================

export interface PageSection {
    id: string;
    title: string;
    content: string;
}

export interface PSEOPage {
    slug: string;
    title: string;
    description: string;
    category: Category;
    intentType: IntentUnit['intentType'];
    sections: PageSection[];
    relatedLinks: RelatedLink[];
    lastModified: Date;
    qualityScore: number;
    excludeFromSitemap: boolean;
    graduationCandidate: boolean;
}

export interface RelatedLink {
    slug: string;
    title: string;
    linkType: 'parent-hub' | 'sibling' | 'cross-cluster' | 'depth';
}

// ============================================================================
// Quality Contract
// ============================================================================

export interface QualityCheckResult {
    passed: boolean;
    score: number;
    failures: QualityFailure[];
}

export interface QualityFailure {
    rule: string;
    message: string;
    severity: 'error' | 'warning';
}

export interface QualityRules {
    minSections: number;
    minSectionLength: number;
    minTotalLength: number;
    requireUniqueContent: boolean;
    forbiddenPhrases: readonly string[];
}

// ============================================================================
// Sitemap
// ============================================================================

export interface SitemapEntry {
    loc: string;
    lastmod: string;
    changefreq?: 'daily' | 'weekly' | 'monthly';
    priority?: number;
}

export interface SitemapChunk {
    id: number;
    entries: SitemapEntry[];
    totalPages: number;
}

// ============================================================================
// Analytics & Graduation
// ============================================================================

export interface PagePerformance {
    slug: string;
    impressions: number;
    clicks: number;
    ctr: number;
    avgSessionDuration: number;
    lastUpdated: Date;
}

export interface GraduationCriteria {
    minImpressions: number;
    minCtr: number;
    minSessionDuration: number;
    periodDays: number;
}
