/**
 * PSEO Content Data Generation
 * Deterministic content generation based on slug and category
 */

import type { PSEOPage, PageSection, Category } from './types';
import {
    getIntentBySlug,
    getClusterForSlug,
    getCategoryById,
    getAllSlugs,
} from './categories';
import { getTemplateForCategory, getRequiredSections } from './templates';
import { generateRelatedLinks } from './links';
import { checkPageQuality } from './quality';

// ============================================================================
// Deterministic Hashing
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

function seededRandom(seed: number): () => number {
    return () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
}

// ============================================================================
// Content Generation
// ============================================================================

export function generatePageContent(slug: string): PSEOPage | null {
    const intent = getIntentBySlug(slug);
    const cluster = getClusterForSlug(slug);

    if (!intent || !cluster) {
        return null;
    }

    const category = getCategoryById(cluster.categoryId);
    if (!category) {
        return null;
    }

    const template = getTemplateForCategory(category.type);
    const sections = generateSections(slug, intent.intent, category, template.sections.map(s => s.id));
    const relatedLinks = generateRelatedLinks(slug);

    // Generate deterministic lastModified based on slug
    const hash = hashString(slug);
    const baseDate = new Date('2024-01-01');
    const daysOffset = hash % 365;
    const lastModified = new Date(baseDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);

    const page: PSEOPage = {
        slug,
        title: generateTitle(slug, intent.intent, category),
        description: generateDescription(slug, intent.intent, category),
        category,
        intentType: intent.intentType,
        sections,
        relatedLinks,
        lastModified,
        qualityScore: 0,
        excludeFromSitemap: false,
        graduationCandidate: false,
    };

    // Check quality and set score
    const qualityResult = checkPageQuality(page);
    page.qualityScore = qualityResult.score;
    page.excludeFromSitemap = !qualityResult.passed;

    return page;
}

// ============================================================================
// Title Generation
// ============================================================================

function generateTitle(slug: string, intent: string, category: Category): string {
    const hash = hashString(slug);
    const random = seededRandom(hash);

    // Intent-type based title patterns
    const patterns: Record<string, string[]> = {
        concept: [
            `${formatSlugToTitle(slug)}: Complete Guide`,
            `Understanding ${formatSlugToTitle(slug)}`,
            `${formatSlugToTitle(slug)} Explained`,
        ],
        comparison: [
            `${formatSlugToTitle(slug)}: A Detailed Analysis`,
            `${formatSlugToTitle(slug)}: Which Is Better?`,
            `Comparing ${formatSlugToTitle(slug)}`,
        ],
        'use-case': [
            `${formatSlugToTitle(slug)}: Practical Implementation`,
            `How to Implement ${formatSlugToTitle(slug)}`,
            `${formatSlugToTitle(slug)} in Practice`,
        ],
        evaluation: [
            `${formatSlugToTitle(slug)}: Performance Analysis`,
            `Evaluating ${formatSlugToTitle(slug)}`,
            `${formatSlugToTitle(slug)}: Benchmarks & Results`,
        ],
        question: [
            formatSlugToTitle(slug),
            `Answering: ${formatSlugToTitle(slug)}`,
        ],
    };

    const intentType = getIntentBySlug(slug)?.intentType || 'concept';
    const options = patterns[intentType] || patterns.concept;
    const index = Math.floor(random() * options.length);

    return options[index];
}

// ============================================================================
// Description Generation
// ============================================================================

function generateDescription(slug: string, intent: string, category: Category): string {
    const hash = hashString(slug);
    const random = seededRandom(hash);

    const intentUnit = getIntentBySlug(slug);
    const intentType = intentUnit?.intentType || 'concept';

    const templates: Record<string, string[]> = {
        concept: [
            `Learn about ${formatSlugToTitle(slug).toLowerCase()} with our comprehensive guide. Understand the fundamentals, key concepts, and practical applications.`,
            `Discover everything you need to know about ${formatSlugToTitle(slug).toLowerCase()}. From basic principles to advanced techniques.`,
            `A complete explanation of ${formatSlugToTitle(slug).toLowerCase()} for developers and business leaders. Clear, actionable insights.`,
        ],
        comparison: [
            `Compare ${formatSlugToTitle(slug).toLowerCase()} with our detailed analysis. Make informed decisions with clear criteria and recommendations.`,
            `An in-depth comparison of ${formatSlugToTitle(slug).toLowerCase()}. See performance benchmarks, use cases, and our verdict.`,
        ],
        'use-case': [
            `Step-by-step guide to ${formatSlugToTitle(slug).toLowerCase()}. Learn implementation strategies, best practices, and expected outcomes.`,
            `Practical guide for ${formatSlugToTitle(slug).toLowerCase()}. Real examples, code patterns, and deployment tips.`,
        ],
        evaluation: [
            `Detailed evaluation of ${formatSlugToTitle(slug).toLowerCase()}. Performance metrics, benchmarks, and expert analysis.`,
        ],
        question: [
            `${intent} Get a clear, comprehensive answer with examples and practical guidance.`,
        ],
    };

    const options = templates[intentType] || templates.concept;
    const index = Math.floor(random() * options.length);

    return options[index];
}

// ============================================================================
// Section Content Generation
// ============================================================================

function generateSections(
    slug: string,
    intent: string,
    category: Category,
    sectionIds: string[]
): PageSection[] {
    const hash = hashString(slug);
    const random = seededRandom(hash);
    const sections: PageSection[] = [];
    const topicName = formatSlugToTitle(slug);

    for (const sectionId of sectionIds) {
        const content = generateSectionContent(sectionId, topicName, intent, category, random);
        if (content) {
            sections.push({
                id: sectionId,
                title: formatSectionTitle(sectionId),
                content,
            });
        }
    }

    return sections;
}

function generateSectionContent(
    sectionId: string,
    topicName: string,
    intent: string,
    category: Category,
    random: () => number
): string {
    const contentGenerators: Record<string, () => string> = {
        introduction: () => `
${topicName} represents a significant advancement in ${category.name.toLowerCase()}. As organizations increasingly adopt AI solutions, understanding this topic becomes essential for technical leaders and practitioners alike.

This guide explores the core concepts, practical applications, and implementation considerations for ${topicName.toLowerCase()}. Whether you're evaluating options for your next project or deepening your technical knowledge, you'll find actionable insights here.

The importance of ${topicName.toLowerCase()} has grown substantially in recent years, driven by improvements in computing power, data availability, and algorithmic innovations. Let's explore what makes this approach valuable and how you can leverage it effectively.
    `.trim(),

        'how-it-works': () => `
At its core, ${topicName.toLowerCase()} operates through a systematic process that transforms inputs into meaningful outputs. Understanding this mechanism is crucial for effective implementation.

**The Process:**

1. **Data Preparation**: The foundation of any ${category.name.toLowerCase()} system requires carefully prepared input data. This includes cleaning, normalization, and appropriate formatting.

2. **Model Architecture**: The system employs specialized architectures designed for this specific task. These structures have been refined through extensive research and practical application.

3. **Training & Optimization**: Through iterative refinement, the system learns to produce accurate results. This phase requires careful tuning of hyperparameters and validation strategies.

4. **Inference & Deployment**: Once trained, the model can process new inputs efficiently. Production deployment requires attention to latency, throughput, and resource management.

The elegance of this approach lies in its ability to automatically extract patterns and relationships that would be difficult to program explicitly.
    `.trim(),

        architecture: () => `
The architecture of ${topicName.toLowerCase()} systems typically follows established patterns that balance performance with maintainability.

**Core Components:**

- **Input Layer**: Handles data ingestion and preprocessing
- **Processing Pipeline**: Transforms raw inputs through multiple stages
- **Output Layer**: Produces final results in the required format

**Design Considerations:**

Modern implementations favor modular architectures that allow individual components to be updated independently. This modularity supports iterative improvement and simplifies debugging.

Scalability is addressed through horizontal scaling strategies and efficient resource utilization. Cloud-native deployments are common, leveraging containerization and orchestration platforms.
    `.trim(),

        limitations: () => `
While ${topicName.toLowerCase()} offers significant capabilities, it's important to understand its constraints:

**Technical Limitations:**

- **Data Requirements**: Performance depends heavily on data quality and quantity. Insufficient or biased training data leads to suboptimal results.
- **Computational Cost**: Training and inference may require substantial computing resources, impacting both time and budget.
- **Interpretability**: Some implementations operate as "black boxes," making it difficult to explain specific decisions.

**Practical Challenges:**

- **Edge Cases**: Performance may degrade on inputs that differ significantly from training examples.
- **Maintenance**: Models require ongoing monitoring and periodic retraining to maintain accuracy.
- **Integration Complexity**: Incorporating these systems into existing workflows requires careful planning.

Acknowledging these limitations enables more realistic expectations and better project planning.
    `.trim(),

        'problem-context': () => `
The ${category.name} sector faces unique challenges that make ${topicName.toLowerCase()} particularly relevant.

**Industry Pain Points:**

Organizations in this space commonly struggle with:
- **Manual Processes**: Many workflows still rely on time-consuming manual procedures
- **Scale Limitations**: Traditional approaches fail when data volumes increase
- **Accuracy Requirements**: The cost of errors can be substantial

**Why Now:**

Recent advances have made previously impractical solutions viable. Improved algorithms, reduced infrastructure costs, and better tooling have lowered barriers to adoption.

The competitive landscape increasingly rewards organizations that leverage these capabilities effectively. Early adopters gain operational advantages that compound over time.
    `.trim(),

        'adoption-patterns': () => `
Successful ${topicName.toLowerCase()} implementations typically follow predictable patterns:

**Phase 1: Pilot Project**
Organizations begin with a focused proof-of-concept. This limits risk while demonstrating value. Success criteria are defined upfront to enable objective evaluation.

**Phase 2: Production Deployment**
Validated approaches move to production with appropriate monitoring and fallback mechanisms. Integration with existing systems requires careful planning.

**Phase 3: Scaling**
Successful deployments expand to additional use cases. Lessons learned inform improved practices and accelerated timelines.

**Common Success Factors:**
- Executive sponsorship and realistic expectations
- Cross-functional teams including domain experts
- Incremental approach with measurable milestones
- Investment in data infrastructure
    `.trim(),

        'case-examples': () => `
Real-world implementations of ${topicName.toLowerCase()} demonstrate its practical value:

**Example 1: Enterprise Implementation**
A major organization implemented this approach to address operational challenges. Key outcomes included:
- 40% reduction in processing time
- Improved accuracy compared to previous methods
- Better resource utilization

**Example 2: Startup Application**
A growing company leveraged ${topicName.toLowerCase()} to differentiate their offering:
- Rapid time-to-market for new features
- Scalable architecture supporting growth
- Competitive advantage in their market segment

**Lessons Learned:**
Successful implementations share common elements: clear objectives, quality data, skilled teams, and iterative improvement cycles.
    `.trim(),

        definition: () => `
${topicName} refers to the systematic approach for achieving specific outcomes within ${category.name.toLowerCase()}.

**Core Definition:**
At its essence, ${topicName.toLowerCase()} involves applying structured methods to transform inputs into desired outputs. This process leverages established principles while adapting to specific contexts.

**Key Characteristics:**
- **Systematic**: Following defined procedures rather than ad-hoc approaches
- **Measurable**: Producing quantifiable results that can be evaluated
- **Repeatable**: Delivering consistent outcomes across similar inputs

**Related Terms:**
Understanding ${topicName.toLowerCase()} requires familiarity with related concepts. These form a interconnected knowledge domain where each element supports understanding of others.
    `.trim(),

        'mental-model': () => `
A useful mental model for understanding ${topicName.toLowerCase()}:

**The Framework:**
Think of this as a pipeline where raw materials enter one end and refined products emerge from the other. Each stage in the pipeline performs a specific transformation, and the cumulative effect produces the desired result.

**Analogy:**
Consider how a skilled craftsperson transforms raw materials into finished goods. They apply knowledge, tools, and techniques in a structured sequence. Similarly, ${topicName.toLowerCase()} applies computational techniques to transform data into insights.

**Key Insight:**
The power comes not from any single component but from the thoughtful combination of multiple elements working together. Understanding this composition is essential for effective application.
    `.trim(),

        'criteria-overview': () => `
When evaluating options in ${topicName.toLowerCase()}, consider these key criteria:

**Performance Metrics:**
- Accuracy: How well does each option perform on relevant benchmarks?
- Speed: What are the latency and throughput characteristics?
- Resource Requirements: What infrastructure is needed?

**Practical Considerations:**
- Ease of Use: How accessible is the technology to your team?
- Integration: How well does it fit with existing systems?
- Support: What documentation and community resources exist?

**Strategic Factors:**
- Maturity: How established is this approach?
- Trajectory: Where is development headed?
- Vendor/Community: Who maintains this, and what's their track record?
    `.trim(),

        'detailed-comparison': () => `
Let's examine the key differences across our comparison dimensions:

**Performance Analysis:**

| Aspect | Option A | Option B |
|--------|----------|----------|
| Speed | Faster inference | Better batch processing |
| Accuracy | Strong on benchmarks | Better on edge cases |
| Resources | Higher memory needs | More compute-intensive |

**Detailed Breakdown:**

*Accuracy & Quality:*
Both approaches deliver strong results, but each excels in different scenarios. Your specific use case determines which characteristics matter most.

*Development Experience:*
Developer productivity varies based on team familiarity and project requirements. Consider your team's existing skills when evaluating options.

*Scalability:*
Each approach scales differently. Understanding your growth trajectory helps select the right foundation.
    `.trim(),

        'winner-by-use-case': () => `
**Recommendations by Scenario:**

*For Real-Time Applications:*
When latency is critical, prioritize options optimized for inference speed. Accept tradeoffs in other dimensions if they don't impact your core requirements.

*For Batch Processing:*
Throughput-optimized approaches excel when processing large volumes. Different architectural choices make sense here.

*For Prototype Development:*
Ease of use and rapid iteration matter most during exploration phases. The "best" technical option may not be the best learning platform.

*For Production Deployment:*
Operational considerations become paramount: monitoring, debugging, and maintenance determine long-term success.

**The Bottom Line:**
Context determines the right choice. Evaluate options against your specific requirements rather than seeking universal "best" answers.
    `.trim(),

        'problem-statement': () => `
${topicName} addresses a specific challenge that many organizations face:

**The Core Problem:**
Teams often struggle with processes that are manual, error-prone, or don't scale effectively. Traditional approaches reach their limits as complexity and volume increase.

**Impact:**
- Increased operational costs
- Inconsistent quality of outcomes
- Difficulty scaling with demand
- Competitive disadvantage

**Why Existing Solutions Fall Short:**
Current approaches often require extensive manual effort or produce suboptimal results. The gap between what's needed and what's achievable creates the opportunity for improvement.
    `.trim(),

        'solution-approach': () => `
Implementing ${topicName.toLowerCase()} involves these key steps:

**Step 1: Assessment**
Evaluate your current state and define clear objectives. Understand what success looks like and how you'll measure it.

**Step 2: Data Preparation**
Gather and prepare the data needed for your implementation. Quality here directly impacts outcomes.

**Step 3: Architecture Design**
Design a system architecture that meets your requirements. Consider scalability, maintainability, and integration needs.

**Step 4: Implementation**
Build the solution incrementally, validating at each stage. Avoid big-bang approaches that delay feedback.

**Step 5: Validation**
Test thoroughly against your defined success criteria. Include edge cases and failure scenarios.

**Step 6: Deployment**
Move to production with appropriate monitoring and rollback capabilities. Plan for ongoing maintenance.
    `.trim(),

        'implementation-notes': () => `
Practical considerations for successful implementation:

**Common Pitfalls:**
- Underestimating data preparation effort
- Skipping proper validation
- Ignoring operational requirements
- Over-engineering initial versions

**Best Practices:**
- Start with a minimal viable implementation
- Invest in monitoring and observability
- Document decisions and rationale
- Plan for iteration and improvement

**Team Considerations:**
Success requires the right mix of skills. Ensure you have access to domain expertise, technical implementation capability, and operational knowledge.
    `.trim(),

        outcomes: () => `
Successful ${topicName.toLowerCase()} implementations typically deliver:

**Quantitative Outcomes:**
- Measurable improvements in efficiency
- Cost reductions through automation
- Improved accuracy and consistency

**Qualitative Benefits:**
- Better user experiences
- Faster response to changing conditions
- Competitive differentiation

**Long-term Value:**
Beyond immediate outcomes, well-implemented solutions build organizational capability. Teams develop skills, processes improve, and the foundation for future innovation strengthens.

**Measuring Success:**
Define metrics upfront and track consistently. Both leading indicators (adoption, usage) and lagging indicators (business outcomes) provide valuable signals.
    `.trim(),

        'key-takeaways': () => `
**Summary:**

1. **Core Concept**: ${topicName} provides a structured approach to solving specific challenges in ${category.name.toLowerCase()}.

2. **Key Benefits**: Properly implemented, this approach delivers measurable improvements in efficiency, accuracy, and scalability.

3. **Implementation Reality**: Success requires attention to data quality, appropriate architecture, and ongoing maintenance.

4. **Getting Started**: Begin with a focused pilot, validate results, then expand systematically.

5. **Long-term Perspective**: The most successful implementations evolve over time, incorporating lessons learned and adapting to changing requirements.
    `.trim(),

        'related-topics': () => `
Continue your exploration with these related resources:

**Foundational Concepts:**
Understanding ${topicName.toLowerCase()} benefits from familiarity with related fundamentals. Strengthen your foundation to deepen your expertise.

**Advanced Topics:**
Ready to go deeper? Explore advanced applications and cutting-edge developments in this space.

**Practical Applications:**
See how these concepts apply to real-world scenarios across different industries and use cases.
    `.trim(),
    };

    const generator = contentGenerators[sectionId];
    if (generator) {
        return generator();
    }

    return '';
}

// ============================================================================
// Utility Functions
// ============================================================================

function formatSlugToTitle(slug: string): string {
    return slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function formatSectionTitle(sectionId: string): string {
    const titles: Record<string, string> = {
        introduction: 'Introduction',
        'how-it-works': 'How It Works',
        architecture: 'Architecture Overview',
        'implementation-steps': 'Implementation Steps',
        limitations: 'Limitations & Challenges',
        alternatives: 'Alternatives to Consider',
        'problem-context': 'The Problem',
        'adoption-patterns': 'Adoption Patterns',
        'case-examples': 'Real-World Examples',
        'roi-signals': 'ROI & Business Impact',
        definition: 'What It Is',
        'mental-model': 'How to Think About It',
        'in-practice': 'In Practice',
        evolution: 'Historical Context',
        'common-misconceptions': 'Common Misconceptions',
        'problem-statement': 'The Challenge',
        'solution-approach': 'Solution Approach',
        'technical-requirements': 'Requirements',
        'implementation-notes': 'Implementation Considerations',
        outcomes: 'Expected Outcomes',
        'criteria-overview': 'Comparison Criteria',
        'detailed-comparison': 'Head-to-Head Comparison',
        'winner-by-use-case': 'Best Choice By Scenario',
        'decision-framework': 'How to Decide',
        'key-takeaways': 'Key Takeaways',
        'related-topics': 'Related Topics',
        'getting-started': 'Getting Started',
    };

    return titles[sectionId] || formatSlugToTitle(sectionId);
}

// ============================================================================
// Page Retrieval
// ============================================================================

export function getPageBySlug(slug: string): PSEOPage | null {
    return generatePageContent(slug);
}

export function getAllPages(): PSEOPage[] {
    return getAllSlugs()
        .map((slug) => generatePageContent(slug))
        .filter((page): page is PSEOPage => page !== null);
}

export function getQualifiedPages(): PSEOPage[] {
    return getAllPages().filter((page) => !page.excludeFromSitemap);
}

export function getPageCount(): number {
    return getAllSlugs().length;
}
