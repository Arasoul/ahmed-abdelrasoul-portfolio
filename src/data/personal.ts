import type { PersonalInfo, NavLink, Highlight } from '../types'

export const personalInfo: PersonalInfo = {
  name: 'Ahmed Abdelrasoul',
  title: 'AI Engineer • Data Scientist • Automation Specialist',
  titles: [
    'AI Engineer',
    'Data Scientist',
    'AI Automation Engineer',
    'Machine Learning Engineer',
    'Automation Specialist',
    'Research + Product Builder',
  ],
  motto:
    'I build AI systems, automate decision-heavy workflows, and turn complex data into products, processes, and business outcomes.',
  email: 'ahmedmrasoul@gmail.com',
  location: 'Cairo, Egypt',
  linkedin: 'https://www.linkedin.com/in/ahmed-abdelrasoul-ai/',
  github: 'https://github.com/Arasoul',
  website: 'https://arasoul.dev',
  summary:
    'AI engineer and data scientist focused on building complete systems from data to deployment. I design pipelines, analyze complex datasets, train and ship ML models, and build workflow automations that turn ideas into operational value. My work spans computer vision, NLP, analytics, AI automation, and software engineering — with a growing focus on agentic AI and scalable intelligent workflows.',
  careerObjective:
    'To build intelligent systems that solve real problems — combining AI, software engineering, and thoughtful design into products that work outside the lab.',
  philosophy:
    'Clean architecture makes intelligent systems maintainable. A model is only as good as the pipeline that feeds it, the API that serves it, and the tests that validate it.',
  currentInterests: [
    'AI & ML Systems',
    'Data Science & Analytics',
    'AI Automation',
    'AI Agents',
    'Agentic Workflows',
    'Computer Vision',
    'Natural Language Processing',
    'MLOps',
  ],
  futureInterests: [
    'Agentic AI',
    'AI Productization',
    'Automation Systems',
    'Game AI',
    'Interactive Systems',
  ],
  education: [
    {
      degree: 'B.Sc. Computer Science (Dual Degree)',
      institution: 'MSA University & University of Greenwich',
      period: '2021 - 2026',
    },
  ],
  availability: [
    'Full-time AI/ML Engineering',
    'Data Science',
    'Software Engineering',
    'Open Source',
    'Research Collaboration',
  ],
  researchInterests: [
    { area: 'Computer Vision', description: 'Object detection, segmentation, face recognition — building vision systems that work on real-world data' },
    { area: 'AI Automation', description: 'n8n workflows, intelligent agents, and automation systems that reduce manual work and connect tools across teams' },
    { area: 'Game AI', description: 'Behavior trees, pathfinding, decision-making systems for interactive experiences' },
    { area: 'Generative AI', description: 'Procedural content generation, creative AI tools, synthetic data for training' },
    { area: 'Interactive Systems', description: 'Real-time applications where AI and user input shape the experience together' },
  ],
  learningRoadmap: [
    { topic: 'FOUNDATION', status: 'completed', description: '' },
    { topic: 'Machine Learning', status: 'completed', description: 'Supervised, unsupervised, reinforcement learning' },
    { topic: 'Deep Learning', status: 'completed', description: 'CNNs, RNNs, Transformers — implemented from scratch and with frameworks' },
    { topic: 'Computer Vision', status: 'completed', description: 'Object detection, segmentation, face recognition, image processing' },
    { topic: 'Natural Language Processing', status: 'completed', description: 'Text classification, NER, sentiment analysis, LLM fine-tuning' },
    { topic: 'ENGINEERING', status: 'completed', description: '' },
    { topic: 'Software Engineering', status: 'completed', description: 'OOP, design patterns, testing, maintainable architecture' },
    { topic: 'Python Packaging', status: 'completed', description: 'Package development, PyPI publishing, documentation' },
    { topic: 'MLOps', status: 'completed', description: 'Docker, Kubernetes, CI/CD, model serving, API design' },
    { topic: 'CURRENT FOCUS', status: 'learning', description: '' },
    { topic: 'AI Fundamentals & Generative AI', status: 'learning', description: 'Core GenAI concepts, foundations, and modern AI mental models' },
    { topic: 'ML Literacy for Non-Engineers', status: 'learning', description: 'Practical understanding of ML value, limitations, and problem framing' },
    { topic: 'Advanced Prompting', status: 'learning', description: 'Prompt design for structured, reliable, and high-context AI interactions' },
    { topic: 'AI Agents: Concepts to First Prototype', status: 'learning', description: 'Agent patterns, orchestration, memory, and first working prototypes' },
    { topic: 'Automation Foundations with n8n', status: 'learning', description: 'Workflow automation, API orchestration, and no-code/low-code automation flows' },
    { topic: 'Advanced AI Automation with n8n', status: 'learning', description: 'Connecting LLMs, tools, services, and business processes into real workflows' },
    { topic: 'Agents at Scale', status: 'learning', description: 'Slack, email, web, and multi-step workflows for production use' },
    { topic: 'Production, Security, Governance & Ethics', status: 'learning', description: 'Responsible deployment, controls, governance, and operational safety' },
    { topic: 'Applied Reference Workflows & Selling AI Internally', status: 'learning', description: 'Turning AI ideas into usable business workflows and internal adoption' },
    { topic: 'NEXT', status: 'planned', description: '' },
    { topic: 'Unity', status: 'planned', description: 'C# scripting, scene management, physics, UI systems' },
    { topic: 'Game AI', status: 'planned', description: 'Behavior trees, pathfinding, decision-making systems' },
    { topic: 'Generative AI Products', status: 'planned', description: 'Applying generative models to practical workflows and internal tools' },
  ],
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#profile' },
  { label: 'Capabilities', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Journey', href: '#journey' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export const highlights: Highlight[] = [
  { title: 'Computer Science', value: 'B.Sc.', icon: '🎓', description: 'Graduate' },
  { title: 'Professional Projects', value: '11+', icon: '💻', description: 'Across AI, Data, & SWE' },
  { title: 'Certifications', value: '10+', icon: '📜', description: 'Professional Credentials' },
  { title: 'Open Source', value: '16+', icon: '📦', description: 'Public Repositories' },
  { title: 'Co-Founder', value: 'VoidSpark', icon: '🚀', description: 'Game Studio' },
]
