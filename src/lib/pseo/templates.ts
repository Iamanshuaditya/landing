/**
 * PSEO Content Templates
 * Category-specific section schemas for content generation
 */

import type { CategoryType, CategoryTemplate, SectionSchema } from './types';

// ============================================================================
// Section Definitions
// ============================================================================

const commonSections = {
    introduction: {
        id: 'introduction',
        title: 'Introduction',
        required: true,
        minLength: 150,
        description: 'Clear, concise introduction establishing the topic and reader value',
    },
    keyTakeaways: {
        id: 'key-takeaways',
        title: 'Key Takeaways',
        required: true,
        minLength: 100,
        description: 'Bullet points summarizing the most important insights',
    },
    relatedTopics: {
        id: 'related-topics',
        title: 'Related Topics',
        required: true,
        minLength: 50,
        description: 'Internal links to related content for further exploration',
    },
} as const;

// ============================================================================
// Technology Template
// ============================================================================

const technologyTemplate: CategoryTemplate = {
    categoryType: 'technology',
    sections: [
        commonSections.introduction,
        {
            id: 'how-it-works',
            title: 'How It Works',
            required: true,
            minLength: 300,
            description: 'Technical explanation of the underlying mechanism or architecture',
        },
        {
            id: 'architecture',
            title: 'Architecture Overview',
            required: false,
            minLength: 200,
            description: 'Visual or textual breakdown of system components',
        },
        {
            id: 'implementation-steps',
            title: 'Implementation Steps',
            required: false,
            minLength: 200,
            description: 'Practical workflow for applying the technology',
        },
        {
            id: 'limitations',
            title: 'Limitations & Challenges',
            required: true,
            minLength: 150,
            description: 'Honest assessment of constraints and edge cases',
        },
        {
            id: 'alternatives',
            title: 'Alternatives to Consider',
            required: false,
            minLength: 100,
            description: 'Other technologies or approaches that may fit better',
        },
        commonSections.keyTakeaways,
        commonSections.relatedTopics,
    ],
    forbiddenPatterns: [
        'generic "what is X" intro without depth',
        'copied documentation without context',
        'placeholder code examples',
    ],
};

// ============================================================================
// Industry Template
// ============================================================================

const industryTemplate: CategoryTemplate = {
    categoryType: 'industry',
    sections: [
        commonSections.introduction,
        {
            id: 'problem-context',
            title: 'The Problem',
            required: true,
            minLength: 200,
            description: 'Industry-specific challenges this technology addresses',
        },
        {
            id: 'adoption-patterns',
            title: 'Adoption Patterns',
            required: true,
            minLength: 200,
            description: 'How organizations typically implement this solution',
        },
        {
            id: 'case-examples',
            title: 'Real-World Examples',
            required: true,
            minLength: 250,
            description: 'Specific implementations or case studies with outcomes',
        },
        {
            id: 'roi-signals',
            title: 'ROI & Business Impact',
            required: false,
            minLength: 150,
            description: 'Measurable business value and success metrics',
        },
        {
            id: 'getting-started',
            title: 'Getting Started',
            required: false,
            minLength: 150,
            description: 'First steps for organizations exploring this solution',
        },
        commonSections.keyTakeaways,
        commonSections.relatedTopics,
    ],
    forbiddenPatterns: [
        'vague industry buzzwords without substance',
        '"contact us" as primary content',
        'unsubstantiated claims without examples',
    ],
};

// ============================================================================
// Concept Template
// ============================================================================

const conceptTemplate: CategoryTemplate = {
    categoryType: 'concept',
    sections: [
        commonSections.introduction,
        {
            id: 'definition',
            title: 'What It Is',
            required: true,
            minLength: 200,
            description: 'Clear, accessible definition avoiding circular explanations',
        },
        {
            id: 'mental-model',
            title: 'How to Think About It',
            required: true,
            minLength: 200,
            description: 'Analogies or frameworks that aid understanding',
        },
        {
            id: 'in-practice',
            title: 'In Practice',
            required: false,
            minLength: 150,
            description: 'How this concept manifests in real applications',
        },
        {
            id: 'evolution',
            title: 'Historical Context',
            required: false,
            minLength: 150,
            description: 'How this concept developed and where it\'s heading',
        },
        {
            id: 'common-misconceptions',
            title: 'Common Misconceptions',
            required: false,
            minLength: 100,
            description: 'Frequent misunderstandings to avoid',
        },
        commonSections.keyTakeaways,
        commonSections.relatedTopics,
    ],
    forbiddenPatterns: [
        'circular definitions',
        'dictionary-style entries without depth',
        'academic jargon without explanation',
    ],
};

// ============================================================================
// Use Case Template
// ============================================================================

const useCaseTemplate: CategoryTemplate = {
    categoryType: 'use-case',
    sections: [
        commonSections.introduction,
        {
            id: 'problem-statement',
            title: 'The Challenge',
            required: true,
            minLength: 200,
            description: 'Specific problem this use case solves',
        },
        {
            id: 'solution-approach',
            title: 'Solution Approach',
            required: true,
            minLength: 300,
            description: 'How to implement the solution step by step',
        },
        {
            id: 'technical-requirements',
            title: 'Requirements',
            required: false,
            minLength: 150,
            description: 'Technical prerequisites and dependencies',
        },
        {
            id: 'implementation-notes',
            title: 'Implementation Considerations',
            required: true,
            minLength: 200,
            description: 'Practical tips, gotchas, and best practices',
        },
        {
            id: 'outcomes',
            title: 'Expected Outcomes',
            required: true,
            minLength: 150,
            description: 'Measurable results and success indicators',
        },
        commonSections.keyTakeaways,
        commonSections.relatedTopics,
    ],
    forbiddenPatterns: [
        '"contact us" as primary CTA',
        'vague "we can help" language',
        'lack of specific implementation details',
    ],
};

// ============================================================================
// Comparison Template
// ============================================================================

const comparisonTemplate: CategoryTemplate = {
    categoryType: 'comparison',
    sections: [
        commonSections.introduction,
        {
            id: 'criteria-overview',
            title: 'Comparison Criteria',
            required: true,
            minLength: 150,
            description: 'Dimensions along which we compare the options',
        },
        {
            id: 'detailed-comparison',
            title: 'Head-to-Head Comparison',
            required: true,
            minLength: 400,
            description: 'Detailed analysis of each option across criteria',
        },
        {
            id: 'winner-by-use-case',
            title: 'Best Choice By Scenario',
            required: true,
            minLength: 200,
            description: 'Clear recommendations based on specific needs',
        },
        {
            id: 'decision-framework',
            title: 'How to Decide',
            required: false,
            minLength: 150,
            description: 'Framework for making the right choice',
        },
        commonSections.keyTakeaways,
        commonSections.relatedTopics,
    ],
    forbiddenPatterns: [
        'tie results with no guidance',
        'bias toward one option without justification',
        'superficial comparisons without depth',
    ],
};

// ============================================================================
// Template Registry
// ============================================================================

const templateRegistry: Record<CategoryType, CategoryTemplate> = {
    technology: technologyTemplate,
    industry: industryTemplate,
    concept: conceptTemplate,
    'use-case': useCaseTemplate,
    comparison: comparisonTemplate,
};

// ============================================================================
// Exports
// ============================================================================

export function getTemplateForCategory(categoryType: CategoryType): CategoryTemplate {
    return templateRegistry[categoryType];
}

export function getRequiredSections(categoryType: CategoryType): SectionSchema[] {
    const template = getTemplateForCategory(categoryType);
    return template.sections.filter((s) => s.required);
}

export function getAllTemplates(): CategoryTemplate[] {
    return Object.values(templateRegistry);
}

export { templateRegistry };
