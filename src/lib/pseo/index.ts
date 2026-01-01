/**
 * PSEO Library Index
 * Central export point for all PSEO modules
 */

// Types
export type {
    Category,
    CategoryType,
    TopicCluster,
    IntentUnit,
    SectionSchema,
    CategoryTemplate,
    PageSection,
    PSEOPage,
    RelatedLink,
    QualityCheckResult,
    QualityFailure,
    QualityRules,
    SitemapEntry,
    SitemapChunk,
    PagePerformance,
    GraduationCriteria,
} from './types';

// Categories
export {
    categories,
    topicClusters,
    getCategoryById,
    getCategoryByType,
    getClustersByCategory,
    getIntentBySlug,
    getClusterForSlug,
    getAllSlugs,
    getTotalPageCount,
} from './categories';

// Templates
export {
    getTemplateForCategory,
    getRequiredSections,
    getAllTemplates,
    templateRegistry,
} from './templates';

// Quality
export {
    checkPageQuality,
    shouldExcludeFromSitemap,
    shouldReturn404,
    getQualityGrade,
    defaultQualityRules,
} from './quality';

// Links
export {
    generateRelatedLinks,
    validateLinkGraph,
} from './links';

// Data
export {
    generatePageContent,
    getPageBySlug,
    getAllPages,
    getQualifiedPages,
    getPageCount,
} from './data';

// Analytics
export {
    defaultGraduationCriteria,
    MockAnalyticsProvider,
    meetsGraduationCriteria,
    identifyGraduationCandidates,
    generateGraduationReport,
    suggestPromotionActions,
} from './analytics';
export type { AnalyticsProvider, GraduationReport, PromotionAction } from './analytics';
