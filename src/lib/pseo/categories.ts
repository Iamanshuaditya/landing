/**
 * PSEO Categories & Topic Clusters
 * Defines the taxonomy of AI knowledge topics
 */

import type { Category, CategoryType, TopicCluster, IntentUnit } from './types';

// ============================================================================
// Category Definitions
// ============================================================================

export const categories: readonly Category[] = [
    // Technology Categories
    {
        id: 'machine-learning',
        name: 'Machine Learning',
        type: 'technology',
        description: 'Core ML algorithms, training methods, and model architectures',
    },
    {
        id: 'deep-learning',
        name: 'Deep Learning',
        type: 'technology',
        description: 'Neural networks, architectures, and deep learning frameworks',
        parentId: 'machine-learning',
    },
    {
        id: 'nlp',
        name: 'Natural Language Processing',
        type: 'technology',
        description: 'Text analysis, language models, and conversational AI',
    },
    {
        id: 'computer-vision',
        name: 'Computer Vision',
        type: 'technology',
        description: 'Image recognition, object detection, and visual AI',
    },
    {
        id: 'generative-ai',
        name: 'Generative AI',
        type: 'technology',
        description: 'LLMs, image generation, and creative AI systems',
    },
    {
        id: 'mlops',
        name: 'MLOps',
        type: 'technology',
        description: 'ML deployment, monitoring, and production systems',
    },

    // Industry Categories
    {
        id: 'healthcare-ai',
        name: 'AI in Healthcare',
        type: 'industry',
        description: 'Medical diagnosis, drug discovery, and health tech applications',
    },
    {
        id: 'finance-ai',
        name: 'AI in Finance',
        type: 'industry',
        description: 'Trading algorithms, fraud detection, and fintech solutions',
    },
    {
        id: 'retail-ai',
        name: 'AI in Retail',
        type: 'industry',
        description: 'Recommendation systems, inventory optimization, and e-commerce AI',
    },
    {
        id: 'manufacturing-ai',
        name: 'AI in Manufacturing',
        type: 'industry',
        description: 'Predictive maintenance, quality control, and industrial automation',
    },
    {
        id: 'marketing-ai',
        name: 'AI in Marketing',
        type: 'industry',
        description: 'Personalization, content optimization, and customer analytics',
    },

    // Concept Categories
    {
        id: 'ai-fundamentals',
        name: 'AI Fundamentals',
        type: 'concept',
        description: 'Core AI concepts, terminology, and foundational knowledge',
    },
    {
        id: 'ai-ethics',
        name: 'AI Ethics',
        type: 'concept',
        description: 'Responsible AI, bias, fairness, and governance',
    },
    {
        id: 'ai-strategy',
        name: 'AI Strategy',
        type: 'concept',
        description: 'Business strategy, ROI, and organizational adoption',
    },
] as const;

// ============================================================================
// Topic Clusters with Intent Units
// ============================================================================

export const topicClusters: readonly TopicCluster[] = [
    // Machine Learning Clusters
    {
        id: 'ml-supervised',
        categoryId: 'machine-learning',
        name: 'Supervised Learning',
        intents: [
            {
                slug: 'what-is-supervised-learning',
                intent: 'What is supervised learning and how does it work?',
                intentType: 'concept',
                keywords: ['supervised learning', 'labeled data', 'training'],
            },
            {
                slug: 'supervised-vs-unsupervised-learning',
                intent: 'How does supervised learning differ from unsupervised?',
                intentType: 'comparison',
                keywords: ['supervised', 'unsupervised', 'comparison'],
            },
            {
                slug: 'supervised-learning-for-classification',
                intent: 'Using supervised learning for classification tasks',
                intentType: 'use-case',
                keywords: ['classification', 'supervised', 'categories'],
            },
            {
                slug: 'best-supervised-learning-algorithms',
                intent: 'Which supervised learning algorithms perform best?',
                intentType: 'evaluation',
                keywords: ['algorithms', 'performance', 'accuracy'],
            },
        ],
    },
    {
        id: 'ml-regression',
        categoryId: 'machine-learning',
        name: 'Regression Models',
        intents: [
            {
                slug: 'linear-regression-explained',
                intent: 'Understanding linear regression fundamentals',
                intentType: 'concept',
                keywords: ['linear regression', 'prediction', 'continuous'],
            },
            {
                slug: 'linear-vs-logistic-regression',
                intent: 'Linear regression vs logistic regression',
                intentType: 'comparison',
                keywords: ['linear', 'logistic', 'when to use'],
            },
            {
                slug: 'regression-for-sales-forecasting',
                intent: 'Applying regression to sales forecasting',
                intentType: 'use-case',
                keywords: ['sales', 'forecast', 'prediction'],
            },
        ],
    },
    {
        id: 'ml-decision-trees',
        categoryId: 'machine-learning',
        name: 'Decision Trees & Ensembles',
        intents: [
            {
                slug: 'decision-trees-explained',
                intent: 'How decision trees make predictions',
                intentType: 'concept',
                keywords: ['decision tree', 'splits', 'nodes'],
            },
            {
                slug: 'random-forest-vs-gradient-boosting',
                intent: 'Random Forest vs Gradient Boosting comparison',
                intentType: 'comparison',
                keywords: ['random forest', 'xgboost', 'ensemble'],
            },
            {
                slug: 'xgboost-for-tabular-data',
                intent: 'Why XGBoost dominates tabular data competitions',
                intentType: 'evaluation',
                keywords: ['xgboost', 'kaggle', 'tabular'],
            },
        ],
    },

    // Deep Learning Clusters
    {
        id: 'dl-neural-networks',
        categoryId: 'deep-learning',
        name: 'Neural Network Fundamentals',
        intents: [
            {
                slug: 'neural-networks-explained',
                intent: 'How neural networks learn from data',
                intentType: 'concept',
                keywords: ['neural network', 'layers', 'neurons'],
            },
            {
                slug: 'backpropagation-explained',
                intent: 'Understanding backpropagation in neural networks',
                intentType: 'concept',
                keywords: ['backpropagation', 'gradient', 'training'],
            },
            {
                slug: 'activation-functions-compared',
                intent: 'Comparing ReLU, sigmoid, and other activations',
                intentType: 'comparison',
                keywords: ['relu', 'sigmoid', 'tanh', 'activation'],
            },
        ],
    },
    {
        id: 'dl-transformers',
        categoryId: 'deep-learning',
        name: 'Transformer Architecture',
        intents: [
            {
                slug: 'transformer-architecture-explained',
                intent: 'Understanding the transformer architecture',
                intentType: 'concept',
                keywords: ['transformer', 'attention', 'architecture'],
            },
            {
                slug: 'self-attention-mechanism',
                intent: 'How self-attention works in transformers',
                intentType: 'concept',
                keywords: ['self-attention', 'query', 'key', 'value'],
            },
            {
                slug: 'transformers-vs-rnns',
                intent: 'Why transformers replaced RNNs for sequences',
                intentType: 'comparison',
                keywords: ['transformer', 'rnn', 'lstm', 'sequence'],
            },
        ],
    },
    {
        id: 'dl-cnns',
        categoryId: 'deep-learning',
        name: 'Convolutional Networks',
        intents: [
            {
                slug: 'convolutional-neural-networks-explained',
                intent: 'How CNNs process visual information',
                intentType: 'concept',
                keywords: ['cnn', 'convolution', 'pooling'],
            },
            {
                slug: 'resnet-vs-efficientnet',
                intent: 'ResNet vs EfficientNet architecture comparison',
                intentType: 'comparison',
                keywords: ['resnet', 'efficientnet', 'image classification'],
            },
        ],
    },

    // NLP Clusters
    {
        id: 'nlp-fundamentals',
        categoryId: 'nlp',
        name: 'NLP Fundamentals',
        intents: [
            {
                slug: 'natural-language-processing-explained',
                intent: 'What is NLP and how does it work?',
                intentType: 'concept',
                keywords: ['nlp', 'natural language', 'text processing'],
            },
            {
                slug: 'tokenization-in-nlp',
                intent: 'Understanding tokenization for text processing',
                intentType: 'concept',
                keywords: ['tokenization', 'tokens', 'text'],
            },
            {
                slug: 'word-embeddings-explained',
                intent: 'How word embeddings represent meaning',
                intentType: 'concept',
                keywords: ['embeddings', 'word2vec', 'vectors'],
            },
        ],
    },
    {
        id: 'nlp-sentiment',
        categoryId: 'nlp',
        name: 'Sentiment Analysis',
        intents: [
            {
                slug: 'sentiment-analysis-explained',
                intent: 'How sentiment analysis detects emotions in text',
                intentType: 'concept',
                keywords: ['sentiment', 'emotion', 'opinion mining'],
            },
            {
                slug: 'sentiment-analysis-for-social-media',
                intent: 'Analyzing brand sentiment on social media',
                intentType: 'use-case',
                keywords: ['social media', 'brand monitoring', 'twitter'],
            },
            {
                slug: 'vader-vs-bert-sentiment',
                intent: 'VADER vs BERT for sentiment analysis',
                intentType: 'comparison',
                keywords: ['vader', 'bert', 'sentiment accuracy'],
            },
        ],
    },
    {
        id: 'nlp-llms',
        categoryId: 'nlp',
        name: 'Large Language Models',
        intents: [
            {
                slug: 'large-language-models-explained',
                intent: 'What are large language models and how do they work?',
                intentType: 'concept',
                keywords: ['llm', 'gpt', 'language model'],
            },
            {
                slug: 'fine-tuning-llms-guide',
                intent: 'How to fine-tune LLMs for specific tasks',
                intentType: 'use-case',
                keywords: ['fine-tuning', 'custom llm', 'training'],
            },
            {
                slug: 'gpt-vs-claude-vs-gemini',
                intent: 'Comparing GPT, Claude, and Gemini capabilities',
                intentType: 'comparison',
                keywords: ['gpt', 'claude', 'gemini', 'comparison'],
            },
            {
                slug: 'rag-retrieval-augmented-generation',
                intent: 'Building RAG systems for accurate LLM responses',
                intentType: 'use-case',
                keywords: ['rag', 'retrieval', 'knowledge base'],
            },
        ],
    },

    // Computer Vision Clusters
    {
        id: 'cv-object-detection',
        categoryId: 'computer-vision',
        name: 'Object Detection',
        intents: [
            {
                slug: 'object-detection-explained',
                intent: 'How object detection locates items in images',
                intentType: 'concept',
                keywords: ['object detection', 'bounding box', 'localization'],
            },
            {
                slug: 'yolo-vs-faster-rcnn',
                intent: 'YOLO vs Faster R-CNN performance comparison',
                intentType: 'comparison',
                keywords: ['yolo', 'faster rcnn', 'speed', 'accuracy'],
            },
            {
                slug: 'object-detection-for-retail-inventory',
                intent: 'Using object detection for inventory management',
                intentType: 'use-case',
                keywords: ['inventory', 'retail', 'shelf monitoring'],
            },
        ],
    },
    {
        id: 'cv-image-classification',
        categoryId: 'computer-vision',
        name: 'Image Classification',
        intents: [
            {
                slug: 'image-classification-explained',
                intent: 'How image classification categorizes visual content',
                intentType: 'concept',
                keywords: ['classification', 'categories', 'labels'],
            },
            {
                slug: 'transfer-learning-for-image-classification',
                intent: 'Using transfer learning for custom image classification',
                intentType: 'use-case',
                keywords: ['transfer learning', 'pretrained', 'custom'],
            },
        ],
    },
    {
        id: 'cv-segmentation',
        categoryId: 'computer-vision',
        name: 'Image Segmentation',
        intents: [
            {
                slug: 'semantic-segmentation-explained',
                intent: 'Understanding semantic segmentation in images',
                intentType: 'concept',
                keywords: ['segmentation', 'pixel', 'mask'],
            },
            {
                slug: 'instance-vs-semantic-segmentation',
                intent: 'Instance segmentation vs semantic segmentation',
                intentType: 'comparison',
                keywords: ['instance', 'semantic', 'objects'],
            },
        ],
    },

    // Generative AI Clusters
    {
        id: 'genai-image',
        categoryId: 'generative-ai',
        name: 'Image Generation',
        intents: [
            {
                slug: 'diffusion-models-explained',
                intent: 'How diffusion models generate images',
                intentType: 'concept',
                keywords: ['diffusion', 'stable diffusion', 'generation'],
            },
            {
                slug: 'stable-diffusion-vs-dalle-vs-midjourney',
                intent: 'Stable Diffusion vs DALL-E vs Midjourney comparison',
                intentType: 'comparison',
                keywords: ['stable diffusion', 'dalle', 'midjourney'],
            },
            {
                slug: 'ai-image-generation-for-marketing',
                intent: 'Using AI image generation for marketing assets',
                intentType: 'use-case',
                keywords: ['marketing', 'creative', 'assets'],
            },
        ],
    },
    {
        id: 'genai-text',
        categoryId: 'generative-ai',
        name: 'Text Generation',
        intents: [
            {
                slug: 'ai-content-generation-guide',
                intent: 'Building AI-powered content generation systems',
                intentType: 'use-case',
                keywords: ['content', 'writing', 'automation'],
            },
            {
                slug: 'prompt-engineering-best-practices',
                intent: 'Mastering prompt engineering for better results',
                intentType: 'concept',
                keywords: ['prompt', 'engineering', 'techniques'],
            },
        ],
    },

    // MLOps Clusters
    {
        id: 'mlops-deployment',
        categoryId: 'mlops',
        name: 'Model Deployment',
        intents: [
            {
                slug: 'ml-model-deployment-guide',
                intent: 'Deploying ML models to production',
                intentType: 'use-case',
                keywords: ['deployment', 'production', 'serving'],
            },
            {
                slug: 'model-serving-options-compared',
                intent: 'Comparing model serving options and frameworks',
                intentType: 'comparison',
                keywords: ['tensorflow serving', 'torchserve', 'triton'],
            },
        ],
    },
    {
        id: 'mlops-monitoring',
        categoryId: 'mlops',
        name: 'Model Monitoring',
        intents: [
            {
                slug: 'ml-model-monitoring-explained',
                intent: 'Monitoring ML models in production',
                intentType: 'concept',
                keywords: ['monitoring', 'drift', 'performance'],
            },
            {
                slug: 'detecting-model-drift',
                intent: 'Detecting and handling model drift',
                intentType: 'use-case',
                keywords: ['drift', 'data drift', 'concept drift'],
            },
        ],
    },

    // Healthcare AI Clusters
    {
        id: 'healthcare-diagnosis',
        categoryId: 'healthcare-ai',
        name: 'Medical Diagnosis',
        intents: [
            {
                slug: 'ai-medical-diagnosis-explained',
                intent: 'How AI assists in medical diagnosis',
                intentType: 'concept',
                keywords: ['diagnosis', 'medical imaging', 'detection'],
            },
            {
                slug: 'ai-for-radiology-imaging',
                intent: 'AI applications in radiology and medical imaging',
                intentType: 'use-case',
                keywords: ['radiology', 'xray', 'ct scan', 'mri'],
            },
            {
                slug: 'ai-vs-radiologists-accuracy',
                intent: 'AI vs radiologist accuracy in image analysis',
                intentType: 'comparison',
                keywords: ['accuracy', 'radiologist', 'performance'],
            },
        ],
    },
    {
        id: 'healthcare-drug',
        categoryId: 'healthcare-ai',
        name: 'Drug Discovery',
        intents: [
            {
                slug: 'ai-drug-discovery-explained',
                intent: 'How AI accelerates drug discovery',
                intentType: 'concept',
                keywords: ['drug discovery', 'molecules', 'pharma'],
            },
            {
                slug: 'alphafold-protein-structure-impact',
                intent: 'AlphaFold impact on protein structure prediction',
                intentType: 'evaluation',
                keywords: ['alphafold', 'protein', 'structure'],
            },
        ],
    },

    // Finance AI Clusters
    {
        id: 'finance-trading',
        categoryId: 'finance-ai',
        name: 'Algorithmic Trading',
        intents: [
            {
                slug: 'algorithmic-trading-explained',
                intent: 'How AI powers algorithmic trading',
                intentType: 'concept',
                keywords: ['algorithmic trading', 'quant', 'strategies'],
            },
            {
                slug: 'ml-for-stock-prediction',
                intent: 'Using machine learning for stock prediction',
                intentType: 'use-case',
                keywords: ['stock', 'prediction', 'trading'],
            },
        ],
    },
    {
        id: 'finance-fraud',
        categoryId: 'finance-ai',
        name: 'Fraud Detection',
        intents: [
            {
                slug: 'ai-fraud-detection-explained',
                intent: 'How AI detects financial fraud',
                intentType: 'concept',
                keywords: ['fraud', 'detection', 'anomaly'],
            },
            {
                slug: 'real-time-fraud-detection-systems',
                intent: 'Building real-time fraud detection systems',
                intentType: 'use-case',
                keywords: ['real-time', 'streaming', 'detection'],
            },
        ],
    },

    // Retail AI Clusters
    {
        id: 'retail-recommendations',
        categoryId: 'retail-ai',
        name: 'Recommendation Systems',
        intents: [
            {
                slug: 'recommendation-systems-explained',
                intent: 'How recommendation systems personalize shopping',
                intentType: 'concept',
                keywords: ['recommendations', 'personalization', 'suggestions'],
            },
            {
                slug: 'collaborative-vs-content-filtering',
                intent: 'Collaborative filtering vs content-based filtering',
                intentType: 'comparison',
                keywords: ['collaborative', 'content-based', 'filtering'],
            },
            {
                slug: 'building-ecommerce-recommendations',
                intent: 'Building recommendation systems for e-commerce',
                intentType: 'use-case',
                keywords: ['ecommerce', 'product', 'recommendations'],
            },
        ],
    },

    // Manufacturing AI Clusters
    {
        id: 'manufacturing-predictive',
        categoryId: 'manufacturing-ai',
        name: 'Predictive Maintenance',
        intents: [
            {
                slug: 'predictive-maintenance-explained',
                intent: 'How predictive maintenance prevents equipment failure',
                intentType: 'concept',
                keywords: ['predictive maintenance', 'failure', 'sensors'],
            },
            {
                slug: 'predictive-vs-preventive-maintenance',
                intent: 'Predictive maintenance vs preventive maintenance ROI',
                intentType: 'comparison',
                keywords: ['predictive', 'preventive', 'roi'],
            },
            {
                slug: 'iot-sensors-for-predictive-maintenance',
                intent: 'Implementing IoT sensors for predictive maintenance',
                intentType: 'use-case',
                keywords: ['iot', 'sensors', 'data collection'],
            },
        ],
    },
    {
        id: 'manufacturing-quality',
        categoryId: 'manufacturing-ai',
        name: 'Quality Control',
        intents: [
            {
                slug: 'ai-visual-inspection-explained',
                intent: 'AI-powered visual inspection for quality control',
                intentType: 'concept',
                keywords: ['visual inspection', 'defects', 'quality'],
            },
            {
                slug: 'ai-quality-control-implementation',
                intent: 'Implementing AI quality control on production lines',
                intentType: 'use-case',
                keywords: ['production', 'defect detection', 'automation'],
            },
        ],
    },

    // Marketing AI Clusters
    {
        id: 'marketing-personalization',
        categoryId: 'marketing-ai',
        name: 'Marketing Personalization',
        intents: [
            {
                slug: 'ai-marketing-personalization-explained',
                intent: 'How AI enables marketing personalization at scale',
                intentType: 'concept',
                keywords: ['personalization', 'targeting', 'segments'],
            },
            {
                slug: 'ai-for-email-marketing',
                intent: 'Using AI to optimize email marketing campaigns',
                intentType: 'use-case',
                keywords: ['email', 'campaigns', 'optimization'],
            },
        ],
    },

    // AI Fundamentals Clusters
    {
        id: 'fundamentals-types',
        categoryId: 'ai-fundamentals',
        name: 'Types of AI',
        intents: [
            {
                slug: 'artificial-intelligence-explained',
                intent: 'What is artificial intelligence?',
                intentType: 'concept',
                keywords: ['artificial intelligence', 'ai', 'definition'],
            },
            {
                slug: 'narrow-vs-general-ai',
                intent: 'Narrow AI vs General AI explained',
                intentType: 'comparison',
                keywords: ['narrow ai', 'general ai', 'agi'],
            },
            {
                slug: 'ai-vs-ml-vs-deep-learning',
                intent: 'AI vs ML vs Deep Learning differences',
                intentType: 'comparison',
                keywords: ['ai', 'ml', 'deep learning', 'differences'],
            },
        ],
    },

    // AI Ethics Clusters
    {
        id: 'ethics-bias',
        categoryId: 'ai-ethics',
        name: 'AI Bias & Fairness',
        intents: [
            {
                slug: 'ai-bias-explained',
                intent: 'Understanding bias in AI systems',
                intentType: 'concept',
                keywords: ['bias', 'fairness', 'discrimination'],
            },
            {
                slug: 'detecting-bias-in-ml-models',
                intent: 'How to detect and mitigate bias in ML models',
                intentType: 'use-case',
                keywords: ['detection', 'mitigation', 'fairness'],
            },
        ],
    },

    // AI Strategy Clusters
    {
        id: 'strategy-adoption',
        categoryId: 'ai-strategy',
        name: 'AI Adoption',
        intents: [
            {
                slug: 'ai-adoption-roadmap',
                intent: 'Creating an AI adoption roadmap for enterprises',
                intentType: 'use-case',
                keywords: ['adoption', 'roadmap', 'enterprise'],
            },
            {
                slug: 'ai-roi-calculation',
                intent: 'Calculating ROI for AI investments',
                intentType: 'concept',
                keywords: ['roi', 'investment', 'value'],
            },
            {
                slug: 'build-vs-buy-ai-solutions',
                intent: 'Build vs buy decision for AI solutions',
                intentType: 'comparison',
                keywords: ['build', 'buy', 'vendor'],
            },
        ],
    },
] as const;

// ============================================================================
// Helper Functions
// ============================================================================

export function getCategoryById(id: string): Category | undefined {
    return categories.find((c) => c.id === id);
}

export function getCategoryByType(type: CategoryType): readonly Category[] {
    return categories.filter((c) => c.type === type);
}

export function getClustersByCategory(categoryId: string): readonly TopicCluster[] {
    return topicClusters.filter((c) => c.categoryId === categoryId);
}

export function getIntentBySlug(slug: string): IntentUnit | undefined {
    for (const cluster of topicClusters) {
        const intent = cluster.intents.find((i) => i.slug === slug);
        if (intent) return intent;
    }
    return undefined;
}

export function getClusterForSlug(slug: string): TopicCluster | undefined {
    return topicClusters.find((cluster) =>
        cluster.intents.some((intent) => intent.slug === slug)
    );
}

export function getAllSlugs(): readonly string[] {
    return topicClusters.flatMap((cluster) =>
        cluster.intents.map((intent) => intent.slug)
    );
}

export function getTotalPageCount(): number {
    return topicClusters.reduce(
        (total, cluster) => total + cluster.intents.length,
        0
    );
}
