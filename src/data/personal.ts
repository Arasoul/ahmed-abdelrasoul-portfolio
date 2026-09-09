import type { PersonalInfo, NavLink } from '../types'
import { withBase } from '../utils/assetPath'
import { chapters } from './chapters'

export const personalInfo: PersonalInfo = {
  name: 'Ahmed Abdelrasoul',
  title: 'AI & Data Engineer',
  titles: [
    'AI & Data Engineer',
    'Intelligent Systems Engineer',
    'AI Automation Engineer',
    'Data Intelligence Engineer',
    'Product Engineer',
  ],
  motto:
    'Building intelligent systems from raw data to decisions.',
  email: 'ahmedmrasoul@gmail.com',
  location: 'Cairo, Egypt',
  linkedin: 'https://www.linkedin.com/in/ahmed-abdelrasoul-ai/',
  github: 'https://github.com/Arasoul',
  website: 'https://arasoul.dev',
  resumeUrl: withBase('/Ahmed-CV.pdf'),
  summary:
    'AI, data and automation systems engineered for real use — complete, validated, product-ready.',
  careerObjective:
    'To build intelligent decision systems that work outside the lab — combining AI, data engineering, and product thinking into systems that deliver measurable value.',
  philosophy:
    'A model is only as good as the pipeline that feeds it, the validation that proves it, and the product that puts it to work. Clean engineering turns intelligence into outcomes.',
  currentInterests: [
    'AI & ML Systems',
    'Data Intelligence',
    'AI Automation',
    'AI Agents',
    'Anchoring & Workflow Engineering',
    'Computer Vision',
    'Analytics',
  ],
  futureInterests: [
    'AI Productization',
    'Automation Systems',
    'Intelligent Decision Systems',
    'AI Agents at Scale',
  ],
  education: [
    {
      degree: 'B.Sc. Computer Science (Dual Degree)',
      institution: 'MSA University & University of Greenwich',
      period: '2021 - 2026',
    },
  ],
  availability: [
    'AI Engineering',
    'Data Engineering',
    'Intelligent Systems',
    'AI Automation',
    'Analytics',
  ],
  researchInterests: [
    { area: 'Data Intelligence', description: 'Turning raw data into decision-ready systems — semantic understanding, measures, and adaptive reporting' },
    { area: 'AI Automation', description: 'n8n workflows, intelligent agents, and automation systems that connect tools and reduce manual work' },
    { area: 'Computer Vision', description: 'Multi-stage vision systems for real-world data — detection, segmentation, classification, and interpretation' },
    { area: 'Decision Systems', description: 'Optimization and predictive intelligence that guide consequential business decisions' },
    { area: 'AI Productization', description: 'Turning validated engineering into usable, polished products people can actually adopt' },
  ],
  learningRoadmap: [
    { topic: 'FOUNDATION', status: 'completed', description: '' },
    { topic: 'Machine Learning', status: 'completed', description: 'Supervised, unsupervised, and deep learning' },
    { topic: 'Computer Vision', status: 'completed', description: 'Detection, segmentation, classification, and image processing' },
    { topic: 'Data Science', status: 'completed', description: 'EDA, statistics, visualization, and business intelligence' },
    { topic: 'ENGINEERING', status: 'completed', description: '' },
    { topic: 'Software Engineering', status: 'completed', description: 'OOP, design patterns, testing, and maintainable architecture' },
    { topic: 'System Building', status: 'completed', description: 'From individual projects to complete, validated engineering systems' },
    { topic: 'Validation', status: 'completed', description: 'Automated tests, statistical validation, and measurable baselines' },
    { topic: 'CURRENT FOCUS', status: 'learning', description: '' },
    { topic: 'AI Automation with n8n', status: 'learning', description: 'Workflow automation, AI agents, API orchestration, and AI-powered workflows' },
    { topic: 'AI Agents', status: 'learning', description: 'Agent patterns, orchestration, memory, and real multi-step workflows' },
    { topic: 'Productization', status: 'learning', description: 'Turning completed engineering systems into polished, usable products' },
    { topic: 'NEXT', status: 'planned', description: '' },
    { topic: 'Production AI', status: 'planned', description: 'Operational safety, governance, and responsible deployment' },
    { topic: 'Generative AI Products', status: 'planned', description: 'Applying generative models to practical workflows and internal tools' },
  ],
}

export const navLinks: NavLink[] = chapters.map((ch) => ({
  label: ch.shortLabel,
  href: ch.hash,
}))
