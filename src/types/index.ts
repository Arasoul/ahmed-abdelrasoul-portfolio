export interface Project {
  id: string
  title: string
  category: 'ai-ml' | 'computer-vision-nlp' | 'data-science' | 'python-libraries' | 'software-engineering' | 'networking-cybersecurity' | 'algorithms' | 'game-development' | 'web-applications'
  type?: string
  featured?: boolean
  overview: string
  problem?: string
  approach?: string
  challenges?: string
  solution?: string
  impact?: string
  results?: string
  primaryTechnologies: string[]
  secondaryTechnologies?: string[]
  technologies: string[]
  features?: string[]
  gallery?: string[]
  demo?: string
  docs?: string
  github?: string
  live?: string
  timeline?: string
  role?: string
  skills?: string[]
  status?: 'complete' | 'in-progress' | 'maintained'
  relatedProjects?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  projectType?: 'library' | 'application' | 'research' | 'tool' | 'game' | 'api'
}

export interface JourneyMilestone {
  year: string
  title: string
  subtitle?: string
  description?: string
  details?: string[]
  tags?: string[]
  icon?: string
  type?: 'education' | 'work' | 'achievement' | 'future'
}

export interface Experience {
  id: string
  company: string
  role: string
  type: 'full-time' | 'internship' | 'co-founder'
  period: string
  current?: boolean
  overview?: string
  responsibilities?: string[]
  achievements?: string[]
  highlights?: string[]
  technologies?: string[]
  skills?: string[]
  projects?: ExperienceProject[]
  logo?: string
}

export interface ExperienceProject {
  name: string
  description: string
  technologies: string[]
  link?: string
}

export interface Skill {
  name: string
}

export interface SkillGroup {
  title: string
  skills: Skill[]
}

export interface Certification {
  id: string
  title: string
  issuer: string
  description: string
  date: string
  credentialId?: string
  skills: string[]
  link?: string
  image?: string
  gallery?: string[]
}

export interface Highlight {
  title: string
  value: string
  icon: string
  description: string
}

export interface ResearchInterest {
  area: string
  description: string
}

export interface Education {
  degree: string
  institution: string
  period?: string
}

export interface LearningItem {
  topic: string
  status: 'completed' | 'learning' | 'planned'
  description?: string
}

export interface NavLink {
  label: string
  href: string
}

export interface PersonalInfo {
  name: string
  title: string
  titles: string[]
  motto: string
  email: string
  location: string
  linkedin: string
  github: string
  website: string
  avatar?: string
  resumeUrl?: string
  summary: string
  careerObjective: string
  philosophy: string
  currentInterests: string[]
  futureInterests: string[]
  education: Education[]
  availability: string[]
  researchInterests: ResearchInterest[]
  learningRoadmap: LearningItem[]
}
