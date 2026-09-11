import type { Experience } from '../types'

export const currentExperienceOrder = ['depi', 'ecu']
export const pastExperienceOrder = ['dolab', 'fuzetek', 'amit']

export const experiences: Experience[] = [
  {
    id: 'depi',
    company: 'Digital Egypt Pioneers Initiative (DEPI)',
    role: 'AI Automation Trainee',
    type: 'internship',
    period: 'Aug 2026 — Present',
    current: true,
    location: 'Cairo, Egypt · Remote',
    overview:
      'Training and building practical solutions in AI-powered workflow automation — connecting intelligent AI capabilities with real workflows, APIs, and external applications.',
    focus: [
      { title: 'AI-Powered Workflows', description: 'Designing automated workflows using n8n.' },
      { title: 'AI & API Integration', description: 'Connecting AI services, APIs, and external applications into automated systems.' },
      { title: 'Intelligent Automation', description: 'Exploring practical applications of AI agents and intelligent workflow design.' },
      { title: 'Prompt Engineering', description: 'Applying prompt engineering approaches within AI-driven automation workflows.' },
    ],
    responsibilities: [
      'Designed AI-powered workflow automations in n8n connecting LLMs, tools, and services',
      'Built AI agents that orchestrate multi-step business processes',
      'Engineered API integrations and prompt patterns for reliable automation',
      'Applied workflow engineering to reduce manual effort and increase consistency',
    ],
    achievements: [
      'Completed AI Automation and AI agents training within the national skills initiative',
      'Built reusable automation workflows validated across real business processes',
    ],
    technologies: ['n8n', 'AI Agents', 'APIs', 'Prompt Engineering', 'Workflow Automation'],
    skills: ['AI Automation', 'n8n', 'AI Agents', 'API Integration', 'Prompt Engineering', 'Workflow Engineering'],
  },
  {
    id: 'ecu',
    company: 'Egyptian Chinese University',
    role: 'Teaching Assistant',
    type: 'full-time',
    period: 'Aug 2026 — Present',
    current: true,
    location: 'Nasr City, Egypt · On-site',
    overview:
      'Supporting students in developing their technical understanding through practical guidance, explanation, and hands-on learning.',
    focus: [
      { title: 'Technical Communication', description: 'Breaking down technical concepts into clear, understandable explanations.' },
      { title: 'Practical Guidance', description: 'Supporting hands-on learning and technical problem-solving.' },
      { title: 'Knowledge Sharing', description: 'Helping students connect theoretical concepts with practical application.' },
      { title: 'Academic Support', description: 'Contributing to an active technical learning environment.' },
    ],
    skills: ['Technical Communication', 'Practical Guidance', 'Knowledge Sharing', 'Academic Support'],
  },
  {
    id: 'amit',
    company: 'AMIT Learning',
    role: 'AI & Machine Learning Intern',
    type: 'internship',
    period: 'July 2023 - March 2024',
    current: false,
    overview:
      'Completed an intensive AI program covering supervised and unsupervised learning, computer vision, and NLP. The program emphasized hands-on implementation — building models from scratch, training pipelines, and evaluating on real datasets rather than relying on high-level abstractions.',
    responsibilities: [
      'Designed and trained supervised models for classification and regression tasks using scikit-learn and PyTorch',
      'Built computer vision pipelines for image classification and object detection with OpenCV and deep learning architectures',
      'Developed end-to-end NLP pipelines — tokenization, vectorization, model training, and evaluation — using spaCy and custom implementations',
      'Documented experimental methodology and model performance, iterating on feature engineering and hyperparameter tuning based on validation metrics',
    ],
    achievements: [
      'Solidified foundation in deep learning frameworks — PyTorch for research-style experimentation, TensorFlow for production-oriented workflows',
      'Developed the initial prototype of AI Pharaoh (CV + NLP pipeline) as a capstone project, later evolved into a full graduation project',
    ],
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'spaCy'],
    skills: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing', 'Model Evaluation'],
    projects: [
      {
        name: 'AI Pharaoh',
        description: 'Capstone project — an interactive system combining computer vision and NLP to analyze and classify Egyptian artifacts and hieroglyphic symbols.',
        technologies: ['Python', 'PyTorch', 'OpenCV'],
        link: 'https://github.com/Arasoul/AI-Pharaoh',
      },
    ],
  },
  {
    id: 'fuzetek',
    company: 'Fuzetek',
    role: 'Software Engineering Trainee',
    type: 'internship',
    period: 'July 2025 - September 2025',
    current: false,
    overview:
      'Developed core software engineering skills through hands-on projects in C++ and Python. The internship emphasized writing maintainable code, following OOP principles, implementing data structures from scratch, and practicing disciplined testing and debugging.',
    responsibilities: [
      'Designed and implemented OOP-based systems — a hospital management system, a chat application, and a BigInt arithmetic library — each demonstrating different aspects of software architecture',
      'Participated in code reviews focused on design decisions, edge case handling, and code clarity rather than just correctness',
      'Documented technical specifications and design rationale for each project',
    ],
    achievements: [
      'Designed a hospital management system with modular architecture separating patient management, appointment scheduling, and emergency handling into independent subsystems',
      'Built a WhatsApp-inspired chat application with user management, private/group messaging, message search, and admin controls — implementing the full data flow from user input to persistent state',
      'Created an arbitrary-precision integer arithmetic library (BigInt) with Karatsuba multiplication and full operator overloading, demonstrating algorithmic depth beyond standard coursework',
    ],
    technologies: ['C++', 'Python', 'OOP', 'Data Structures', 'Git', 'Testing'],
    skills: ['Software Engineering', 'Object-Oriented Programming', 'Data Structures', 'Algorithms', 'Testing', 'System Design'],
    projects: [
      {
        name: 'Hospital Management System',
        description: 'OOP design project — modular C++ system separating patient management, appointment booking, and emergency handling into independent subsystems with a shared data layer.',
        technologies: ['C++', 'OOP'],
        link: 'https://github.com/Arasoul/Hospital-managment-system',
      },
      {
        name: 'Chat App',
        description: 'OOP design project — C++ chat application implementing user sessions, private/group messaging, message search, and admin controls with persistent storage.',
        technologies: ['C++', 'OOP'],
        link: 'https://github.com/Arasoul/chat--app',
      },
      {
        name: 'BigInt C++ Library',
        description: 'Algorithm design project — arbitrary-precision integer library with Karatsuba multiplication, full operator overloading, and comprehensive edge case handling.',
        technologies: ['C++', 'Algorithms'],
        link: 'https://github.com/Arasoul/BigIntProject',
      },
      {
        name: 'Image Processing Project',
        description: 'Self-directed project — PPM image manipulation library implementing filters, transformations, and color adjustments as raw matrix operations without external image processing libraries.',
        technologies: ['C++', 'Algorithms'],
        link: 'https://github.com/Arasoul/Image-Processing-Project',
      },
      {
        name: 'Trie Data Structure',
        description: 'Self-directed project — comprehensive Trie implementation with hybrid child storage, frequency-tracking autocomplete, and safe memory management.',
        technologies: ['C++', 'Data Structures'],
        link: 'https://github.com/Arasoul/TrieDataStructure',
      },
    ],
  },
  {
    id: 'dolab',
    company: 'DoLab Academy',
    role: 'Data Analysis Trainee',
    type: 'internship',
    period: 'January 2026 - April 2026',
    current: false,
    overview:
      'Focused on practical data analytics — cleaning, transforming, analyzing, and visualizing datasets to generate actionable business insights using SQL, Power BI, and Python.',
    responsibilities: [
      'Built automated data cleaning pipelines in Python that standardized raw datasets into analysis-ready formats, reducing manual processing time',
      'Designed Power BI dashboards translating raw data into clear business KPIs with interactive filters and drill-down capabilities',
      'Wrote SQL queries for data extraction, transformation, and aggregation across relational databases',
      'Presented analytical findings to stakeholders, translating technical results into business recommendations',
    ],
    achievements: [
      'Reduced manual data preparation time by automating cleaning and transformation steps',
      'Created dashboards adopted by the team for ongoing reporting',
    ],
    technologies: ['Power BI', 'SQL', 'Excel', 'Python'],
    skills: ['Data Cleaning', 'Data Preparation', 'Exploratory Data Analysis', 'SQL', 'Power BI', 'Data Visualization', 'Business Insights'],
  },
]

const byId = (id: string): Experience | undefined => experiences.find((e) => e.id === id)

export const currentExperiences: Experience[] = currentExperienceOrder
  .map(byId)
  .filter((e): e is Experience => Boolean(e))

export const pastExperiences: Experience[] = pastExperienceOrder
  .map(byId)
  .filter((e): e is Experience => Boolean(e))
