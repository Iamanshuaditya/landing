/**
 * PSEO Analytics & Graduation
 * Performance tracking and editorial promotion system
 */

import type { PagePerformance, GraduationCriteria } from './types';

// ============================================================================
// Graduation Criteria Configuration
// ============================================================================

export const defaultGraduationCriteria: GraduationCriteria = {
    minImpressions: 1000,
    minCtr: 0.03, // 3%
    minSessionDuration: 60, // seconds
    periodDays: 30,
};

// ============================================================================
// Performance Tracking Interface
// ============================================================================

/**
 * Interface for analytics providers.
 * Implement this to integrate with Vercel Analytics, Plausible, Google Search Console, etc.
 */
export interface AnalyticsProvider {
    getPagePerformance(slug: string, periodDays: number): Promise<PagePerformance | null>;
    getAllPagePerformance(periodDays: number): Promise<PagePerformance[]>;
}

// ============================================================================
// Mock Analytics Provider (Development)
// ============================================================================

/**
 * Mock provider for development. Replace with real implementation.
 */
export class MockAnalyticsProvider implements AnalyticsProvider {
    async getPagePerformance(slug: string, periodDays: number): Promise<PagePerformance | null> {
        // Generate deterministic mock data based on slug
        const hash = this.hashString(slug);
        const impressions = (hash % 5000) + 100;
        const clicks = Math.floor(impressions * (0.01 + (hash % 10) / 100));

        return {
            slug,
            impressions,
            clicks,
            ctr: clicks / impressions,
            avgSessionDuration: 30 + (hash % 120),
            lastUpdated: new Date(),
        };
    }

    async getAllPagePerformance(periodDays: number): Promise<PagePerformance[]> {
        // In production, this would fetch all tracked pages
        return [];
    }

    private hashString(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }
}

// ============================================================================
// Graduation Logic
// ============================================================================

export function meetsGraduationCriteria(
    performance: PagePerformance,
    criteria: GraduationCriteria = defaultGraduationCriteria
): boolean {
    return (
        performance.impressions >= criteria.minImpressions &&
        performance.ctr >= criteria.minCtr &&
        performance.avgSessionDuration >= criteria.minSessionDuration
    );
}

export async function identifyGraduationCandidates(
    provider: AnalyticsProvider,
    criteria: GraduationCriteria = defaultGraduationCriteria
): Promise<string[]> {
    const allPerformance = await provider.getAllPagePerformance(criteria.periodDays);

    return allPerformance
        .filter((p) => meetsGraduationCriteria(p, criteria))
        .sort((a, b) => b.impressions - a.impressions)
        .map((p) => p.slug);
}

export interface GraduationReport {
    slug: string;
    performance: PagePerformance;
    recommendation: 'promote' | 'monitor' | 'maintain';
    reason: string;
}

export async function generateGraduationReport(
    provider: AnalyticsProvider,
    slug: string,
    criteria: GraduationCriteria = defaultGraduationCriteria
): Promise<GraduationReport | null> {
    const performance = await provider.getPagePerformance(slug, criteria.periodDays);

    if (!performance) {
        return null;
    }

    const meetsAll = meetsGraduationCriteria(performance, criteria);
    const meetsImpressions = performance.impressions >= criteria.minImpressions;
    const meetsCtr = performance.ctr >= criteria.minCtr;
    const meetsDuration = performance.avgSessionDuration >= criteria.minSessionDuration;

    let recommendation: GraduationReport['recommendation'];
    let reason: string;

    if (meetsAll) {
        recommendation = 'promote';
        reason = `Page exceeds all criteria: ${performance.impressions} impressions, ${(performance.ctr * 100).toFixed(1)}% CTR, ${performance.avgSessionDuration}s avg session`;
    } else if (meetsImpressions || meetsCtr) {
        recommendation = 'monitor';
        const missing = [];
        if (!meetsImpressions) missing.push('impressions');
        if (!meetsCtr) missing.push('CTR');
        if (!meetsDuration) missing.push('session duration');
        reason = `Shows promise but needs improvement in: ${missing.join(', ')}`;
    } else {
        recommendation = 'maintain';
        reason = 'Insufficient performance data for promotion consideration';
    }

    return {
        slug,
        performance,
        recommendation,
        reason,
    };
}

// ============================================================================
// Editorial Promotion Actions
// ============================================================================

export interface PromotionAction {
    slug: string;
    action: 'expand_content' | 'add_visuals' | 'add_examples' | 'create_series';
    priority: 'high' | 'medium' | 'low';
    notes: string;
}

export function suggestPromotionActions(report: GraduationReport): PromotionAction[] {
    if (report.recommendation !== 'promote') {
        return [];
    }

    const actions: PromotionAction[] = [];
    const { performance } = report;

    // High CTR + High impressions = expand content depth
    if (performance.ctr >= 0.05 && performance.impressions >= 2000) {
        actions.push({
            slug: report.slug,
            action: 'expand_content',
            priority: 'high',
            notes: 'High engagement indicates strong topic interest. Add detailed sections, examples, and expert insights.',
        });
    }

    // High duration = readers want more
    if (performance.avgSessionDuration >= 120) {
        actions.push({
            slug: report.slug,
            action: 'add_visuals',
            priority: 'medium',
            notes: 'Long session times suggest deep engagement. Add diagrams, charts, or interactive elements.',
        });
    }

    // Good overall performance = create related content
    if (performance.impressions >= 3000) {
        actions.push({
            slug: report.slug,
            action: 'create_series',
            priority: 'medium',
            notes: 'Strong visibility makes this a good foundation for a content series.',
        });
    }

    // Default action for all promoted pages
    if (actions.length === 0) {
        actions.push({
            slug: report.slug,
            action: 'add_examples',
            priority: 'low',
            notes: 'Add real-world examples and case studies to increase value.',
        });
    }

    return actions;
}
