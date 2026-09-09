import { projects } from '../data/projects'

export interface ProjectTopic {
  id: string
  label: string
  projectIds: string[]
  hint?: string
}

export const projectTopics: ProjectTopic[] = [
  {
    id: 'ai-ml',
    label: 'AI / ML',
    projectIds: ['ai-pharaoh', 'auto-bi', 'face-recognition', 'healthcare-ml-api', 'movie-recommendation', 'meridian-wings'],
    hint: 'Models, training, and ML-driven systems.',
  },
  {
    id: 'data',
    label: 'Data',
    projectIds: ['auto-bi', 'auto-eda', 'auto-analytics', 'data-prep-toolkit', 'web-scraping-toolkit'],
    hint: 'Preparation, understanding, and intelligence over tabular data.',
  },
  {
    id: 'automation',
    label: 'Automation',
    projectIds: ['web-scraping-toolkit', 'data-prep-toolkit', 'healthcare-ml-api'],
    hint: 'Automated pipelines, CI/CD, and workflow engineering (incl. current DEPI work).',
  },
  {
    id: 'computer-vision',
    label: 'Computer Vision',
    projectIds: ['ai-pharaoh', 'face-recognition', 'image-processing', 'hieroglyphics-lab'],
    hint: 'Detection, segmentation, recognition, and image processing.',
  },
  {
    id: 'optimization',
    label: 'Optimization',
    projectIds: ['meridian-wings'],
    hint: 'Mathematical programming and decision optimization.',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    projectIds: ['auto-eda', 'auto-analytics', 'auto-bi', 'data-prep-toolkit'],
    hint: 'EDA, statistics, dashboards, and reporting.',
  },
]

export function topicById(id: string): ProjectTopic | undefined {
  return projectTopics.find((t) => t.id === id)
}

export function topicProjects(topicId: string) {
  const topic = topicById(topicId)
  if (!topic) return []
  return topic.projectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
}

export function projectsForTopics(topicIds: string[]) {
  const ids = new Set<string>()
  topicIds.forEach((t) => topicById(t)?.projectIds.forEach((id) => ids.add(id)))
  return projects.filter((p) => ids.has(p.id))
}