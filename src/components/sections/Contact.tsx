import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin, FiCheck } from 'react-icons/fi'
import { personalInfo } from '../../data/personal'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const { ref, revealed } = useScrollReveal<HTMLElement>({ threshold: 0.05 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contact" ref={ref} className="section">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Get In <span className="gradient-text">Touch</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="section-subtitle"
        >
          Open to AI/ML engineering, data, software, and research collaboration opportunities.
        </motion.p>

        <div className="grid gap-10 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={revealed ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6 md:col-span-2"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl text-accent"
                style={{ backgroundColor: 'var(--accent-primary-10)' }}>
                <FiMail size={16} />
              </div>
              <div>
                <div className="text-xs font-medium text-muted">Email</div>
                <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold transition-colors text-primary">
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

            <div className="flex gap-2">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all"
                style={{
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                <FiLinkedin size={16} />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all"
                style={{
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                <FiGithub size={16} />
              </a>
            </div>

            <div className="rounded-2xl border p-4"
              style={{
                borderColor: 'var(--border-subtle)',
                background: 'linear-gradient(135deg, var(--accent-primary-5), var(--accent-highlight-5))',
              }}
            >
              <h4 className="mb-2 text-sm font-semibold text-accent">Current Status</h4>
              <div className="flex flex-wrap gap-1.5">
                {personalInfo.availability.map((a) => (
                  <span key={a} className="badge badge-accent">{a}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={revealed ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="md:col-span-3"
          >
            <form
              action="https://formspree.io/f/xovaejop"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <input type="text" name="name" placeholder="Your Name" required className="input" />
                <input type="email" name="email" placeholder="Your Email" required className="input" />
              </div>
              <input type="text" name="subject" placeholder="Subject" className="input" />
              <textarea name="message" placeholder="Your Message" required rows={5} className="input resize-none" />
              <button type="submit" disabled={sent} className="btn btn-primary">
                {sent ? (
                  <><FiCheck size={16} /> Sent!</>
                ) : (
                  <><FiSend size={16} /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
