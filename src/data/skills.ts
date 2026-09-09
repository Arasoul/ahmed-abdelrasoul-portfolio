import type { SkillGroup } from '../types'

export const capabilityGroups: SkillGroup[] = [
  {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'Python' },
      { name: 'PyTorch' },
      { name: 'TensorFlow' },
      { name: 'scikit-learn' },
      { name: 'Deep Learning' },
      { name: 'Machine Learning' },
      { name: 'Computer Vision' },
      { name: 'NLP' },
    ],
  },
  {
    title: 'Data & Analytics',
    skills: [
      { name: 'Pandas' },
      { name: 'NumPy' },
      { name: 'SQL' },
      { name: 'Power BI' },
      { name: 'Excel' },
      { name: 'EDA' },
      { name: 'Statistical Analysis' },
      { name: 'Data Visualization' },
    ],
  },
  {
    title: 'Intelligent Systems',
    skills: [
      { name: 'AI Agents' },
      { name: 'RAG' },
      { name: 'Prompt Engineering' },
      { name: 'LLM Workflows' },
      { name: 'Semantic Data Understanding' },
      { name: 'Decision Systems' },
    ],
  },
  {
    title: 'Automation & Engineering',
    skills: [
      { name: 'n8n' },
      { name: 'APIs' },
      { name: 'Workflow Automation' },
      { name: 'Docker' },
      { name: 'Streamlit' },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Testing' },
      { name: 'Validation' },
    ],
  },
]

export const skillGroups = capabilityGroups
