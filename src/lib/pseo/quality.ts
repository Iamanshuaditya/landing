/**
 * PSEO Quality Contract
 * Enforces minimum content quality requirements
 */

import type { PSEOPage, QualityCheckResult, QualityFailure, QualityRules } from './types';

// ============================================================================
// Quality Rules Configuration
// ============================================================================

const defaultQualityRules: QualityRules = {
    minSections: 4,
    minSectionLength: 100,
    minTotalLength: 800,
    requireUniqueContent: true,
    forbiddenPhrases: [
        'lorem ipsum',
        'coming soon',
        'to be determined',
        'placeholder',
        'insert text here',
        'example content',
        'TODO',
        'FIXME',
        'sample text',
        'click here to learn more',
        'contact us for more information',
    ],
};

// ============================================================================
// Quality Check Implementation
// ============================================================================

export function checkPageQuality(
    page: PSEOPage,
    rules: QualityRules = defaultQualityRules
): QualityCheckResult {
    const failures: QualityFailure[] = [];
    let score = 100;

    // Check 1: Minimum sections
    if (page.sections.length < rules.minSections) {
        failures.push({
            rule: 'MIN_SECTIONS',
            message: `Page has ${page.sections.length} sections, minimum is ${rules.minSections}`,
            severity: 'error',
        });
        score -= 25;
    }

    // Check 2: Section length requirements
    const shortSections = page.sections.filter(
        (s) => s.content.length < rules.minSectionLength
    );
    if (shortSections.length > 0) {
        failures.push({
            rule: 'SECTION_LENGTH',
            message: `${shortSections.length} sections below minimum length of ${rules.minSectionLength} chars`,
            severity: 'error',
        });
        score -= 20;
    }

    // Check 3: Total content length
    const totalLength = page.sections.reduce((sum, s) => sum + s.content.length, 0);
    if (totalLength < rules.minTotalLength) {
        failures.push({
            rule: 'TOTAL_LENGTH',
            message: `Total content ${totalLength} chars, minimum is ${rules.minTotalLength}`,
            severity: 'error',
        });
        score -= 25;
    }

    // Check 4: Forbidden phrases
    const allContent = page.sections.map((s) => s.content.toLowerCase()).join(' ');
    const foundForbidden = rules.forbiddenPhrases.filter((phrase) =>
        allContent.includes(phrase.toLowerCase())
    );
    if (foundForbidden.length > 0) {
        failures.push({
            rule: 'FORBIDDEN_PHRASES',
            message: `Found forbidden phrases: ${foundForbidden.join(', ')}`,
            severity: 'error',
        });
        score -= 30;
    }

    // Check 5: Empty sections
    const emptySections = page.sections.filter((s) => s.content.trim().length === 0);
    if (emptySections.length > 0) {
        failures.push({
            rule: 'EMPTY_SECTIONS',
            message: `${emptySections.length} sections are empty`,
            severity: 'error',
        });
        score -= 25;
    }

    // Check 6: Title quality
    if (page.title.length < 20 || page.title.length > 70) {
        failures.push({
            rule: 'TITLE_LENGTH',
            message: `Title length ${page.title.length} not optimal (20-70 chars)`,
            severity: 'warning',
        });
        score -= 5;
    }

    // Check 7: Description quality
    if (page.description.length < 100 || page.description.length > 160) {
        failures.push({
            rule: 'DESCRIPTION_LENGTH',
            message: `Description length ${page.description.length} not optimal (100-160 chars)`,
            severity: 'warning',
        });
        score -= 5;
    }

    // Check 8: Has related links
    if (page.relatedLinks.length === 0) {
        failures.push({
            rule: 'NO_INTERNAL_LINKS',
            message: 'Page has no internal links',
            severity: 'warning',
        });
        score -= 10;
    }

    // Ensure score doesn't go below 0
    score = Math.max(0, score);

    const hasErrors = failures.some((f) => f.severity === 'error');

    return {
        passed: !hasErrors && score >= 60,
        score,
        failures,
    };
}

// ============================================================================
// Quality Threshold Helpers
// ============================================================================

export function shouldExcludeFromSitemap(page: PSEOPage): boolean {
    const result = checkPageQuality(page);
    return !result.passed || page.qualityScore < 60;
}

export function shouldReturn404(page: PSEOPage | null): boolean {
    if (!page) return true;

    const result = checkPageQuality(page);
    // Return 404 only for severe quality failures
    return result.score < 40 || result.failures.some(
        (f) => f.severity === 'error' &&
            (f.rule === 'EMPTY_SECTIONS' || f.rule === 'FORBIDDEN_PHRASES')
    );
}

export function getQualityGrade(score: number): string {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
}

export { defaultQualityRules };
