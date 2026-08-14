export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/in/ahmed-abdelrasoul-3271a917b',
  github: 'https://github.com/Arasoul',
  email: 'ahmedmrasoul@gmail.com',
} as const

export const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'service_default',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_default',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
} as const

export const GITHUB_USERNAME = 'Arasoul'
