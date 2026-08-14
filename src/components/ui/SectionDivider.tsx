interface Props {
  variant?: 'neural' | 'circuit' | 'gradient'
}

export default function SectionDivider({ variant = 'gradient' }: Props) {
  return (
    <div className="relative mx-auto max-w-5xl px-4 md:px-8">
      <div className="section-divider">
        <div className="section-divider-line" />
      </div>
      <div className="mt-6 flex justify-center gap-8">
        {variant === 'gradient' && (
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full opacity-40" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="h-1.5 w-1.5 rounded-full opacity-40" style={{ backgroundColor: 'var(--accent-secondary)' }} />
            <span className="h-1.5 w-1.5 rounded-full opacity-40" style={{ backgroundColor: 'var(--accent-highlight)' }} />
          </div>
        )}
        {variant === 'neural' && (
          <svg width="40" height="12" viewBox="0 0 40 12" className="opacity-30">
            <circle cx="8" cy="6" r="2.5" fill="var(--accent)" />
            <line x1="10.5" y1="6" x2="18" y2="6" stroke="var(--accent)" strokeWidth="0.5" />
            <circle cx="20" cy="6" r="1.5" fill="var(--accent-secondary)" />
            <line x1="21.5" y1="6" x2="29" y2="6" stroke="var(--accent-secondary)" strokeWidth="0.5" />
            <circle cx="32" cy="6" r="2" fill="var(--accent-highlight)" />
          </svg>
        )}
        {variant === 'circuit' && (
          <svg width="40" height="12" viewBox="0 0 40 12" className="opacity-30">
            <line x1="0" y1="6" x2="10" y2="6" stroke="var(--accent-highlight)" strokeWidth="0.8" />
            <circle cx="10" cy="6" r="1.5" fill="none" stroke="var(--accent-highlight)" strokeWidth="0.5" />
            <line x1="11.5" y1="6" x2="20" y2="6" stroke="var(--accent-secondary)" strokeWidth="0.8" />
            <line x1="20" y1="3" x2="20" y2="9" stroke="var(--accent-secondary)" strokeWidth="0.5" />
            <line x1="20" y1="6" x2="30" y2="6" stroke="var(--accent)" strokeWidth="0.8" />
            <circle cx="30" cy="6" r="1.5" fill="none" stroke="var(--accent)" strokeWidth="0.5" />
            <line x1="31.5" y1="6" x2="40" y2="6" stroke="var(--accent)" strokeWidth="0.8" />
          </svg>
        )}
      </div>
    </div>
  )
}
