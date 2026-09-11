import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin, FiCheck, FiDownload, FiLoader, FiAlertCircle } from 'react-icons/fi'
import { personalInfo } from '../../data/personal'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { CONTACT_ACCESS_KEY, CONTACT_ENDPOINT, CONTACT_EMAIL } from '../../config/contact'
import { chapterNumber } from '../../data/chapters'

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const { ref, revealed } = useScrollReveal<HTMLElement>({ threshold: 0.05 })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const message = data.get('message') as string
    if (!name || !email || !message) return

    const subject = (data.get('subject') as string) || 'Portfolio contact'
    const payload = {
      access_key: CONTACT_ACCESS_KEY,
      name,
      email,
      subject,
      message,
      from_name: name,
      reply_to: email,
    }

    if (!CONTACT_ACCESS_KEY) {
      // No access key — open mailto fallback
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`
      window.location.href = mailto
      setStatus('sent')
      setTimeout(() => setStatus('idle'), 8000)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
        setTimeout(() => setStatus('idle'), 8000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 10000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 10000)
    }
  }

  return (
    <>
      <section id="connect" ref={ref} className="section">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="section-head"
          >
            <span className="section-index">{chapterNumber('connect')}</span>
            <h2 className="section-title-left">Connect</h2>
            <div className="section-rule" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-10 max-w-2xl"
          >
            <span className="term-label-accent mb-2 block">GET IN TOUCH</span>
            <p className="text-sm leading-relaxed text-secondary">
              Have a system to build? Let's build something intelligent together.
            </p>
          </motion.div>

          <div className="grid gap-10 md:grid-cols-5">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={revealed ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }} className="space-y-6 md:col-span-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl text-accent"
                  style={{ backgroundColor: 'var(--accent-primary-10)' }}>
                  <FiMail size={16} />
                </div>
                <div>
                  <div className="text-xs font-medium text-muted">Email</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-primary transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl text-accent"
                  style={{ backgroundColor: 'var(--accent-primary-10)' }}>
                  <FiMapPin size={16} />
                </div>
                <div>
                  <div className="text-xs font-medium text-muted">Location</div>
                  <div className="text-sm font-semibold text-primary">{personalInfo.location}</div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  className="btn btn-secondary w-full justify-center">
                  <FiLinkedin size={15} /> LinkedIn
                </a>
                <a href={`mailto:${personalInfo.email}`} className="btn btn-secondary w-full justify-center">
                  <FiMail size={15} /> Email
                </a>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                  className="btn btn-secondary w-full justify-center">
                  <FiGithub size={15} /> GitHub
                </a>
              </div>

              <div className="rounded-2xl border p-4"
                style={{ borderColor: 'var(--border-accent)', background: 'linear-gradient(135deg, var(--accent-primary-5), var(--accent-highlight-5))' }}
              >
                <h4 className="mb-2 text-sm font-semibold text-accent">Open To</h4>
                <div className="flex flex-wrap gap-1.5">
                  {personalInfo.availability.map((a) => (
                    <span key={a} className="badge badge-accent">{a}</span>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="rounded-2xl border p-4"
                style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
              >
                <h4 className="mb-2 text-xs font-semibold text-primary">Quick Links</h4>
                <div className="flex flex-col gap-1.5">
                  <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] text-secondary transition-colors hover:text-accent">
                    <FiDownload size={12} /> Download CV
                  </a>
                  <a href="https://github.com/Arasoul" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] text-secondary transition-colors hover:text-accent">
                    <FiGithub size={12} /> GitHub Profile
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={revealed ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }} className="md:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input type="text" name="name" placeholder="Your Name" required aria-label="Your name" className="input" />
                  <input type="email" name="email" placeholder="Your Email" required aria-label="Your email" className="input" />
                </div>
                <input type="text" name="subject" placeholder="Subject" aria-label="Subject" className="input" />
                <textarea name="message" placeholder="Describe the problem you want to solve..." required rows={5} aria-label="Message" className="input resize-none" />

                {CONTACT_ACCESS_KEY ? (
                  <p className="text-[11px] text-muted">
                    Message is sent directly to {CONTACT_EMAIL} — you'll receive a confirmation when it arrives.
                  </p>
                ) : (
                  <p className="text-[11px] text-muted">
                    Opens a draft email to {CONTACT_EMAIL} with your message — messages are sent from your own mail client.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  className="btn btn-primary w-full justify-center md:w-auto"
                >
                  {status === 'sending' && (
                    <><FiLoader size={16} className="animate-spin" /> Sending...</>
                  )}
                  {status === 'sent' && (
                    <><FiCheck size={16} /> Message sent</>
                  )}
                  {status === 'error' && (
                    <><FiAlertCircle size={16} /> Failed — try again</>
                  )}
                  {status === 'idle' && (
                    <><FiSend size={16} /> Send Message</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8 md:px-8" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="section-container flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
            <div className="text-xs font-semibold text-primary">{personalInfo.name}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent">AI &amp; Data Engineer</div>
            <div className="text-[10px] text-muted">&copy; {new Date().getFullYear()}. Built with React, TypeScript &amp; Tailwind CSS.</div>
          </div>

          <div className="flex items-center gap-3">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
              <FiLinkedin size={14} />
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
              <FiGithub size={14} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="btn-icon" aria-label="Email">
              <FiMail size={14} />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
