interface Props {
  className?: string
}

export default function NeuralCircuitBackground({ className = '' }: Props) {
  return (
    <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ background: 'var(--glow-blue)' }} />
      <div className="absolute inset-0" style={{ background: 'var(--glow-cyan)' }} />
      <div className="absolute inset-0" style={{ background: 'var(--glow-purple)' }} />

      <svg
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 'var(--bg-pattern-opacity)' }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="circuitGrad" x1="50%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-secondary)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--accent-highlight)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Layer 2: Neural network nodes - left side */}
        {[
          { x: 80, y: 200, r: 3.5 }, { x: 150, y: 120, r: 2.5 }, { x: 200, y: 280, r: 3 },
          { x: 120, y: 400, r: 2.5 }, { x: 180, y: 500, r: 3.5 }, { x: 90, y: 600, r: 2.5 },
          { x: 220, y: 180, r: 2.5 }, { x: 260, y: 350, r: 3 }, { x: 160, y: 700, r: 2.5 },
          { x: 100, y: 800, r: 3 }, { x: 280, y: 450, r: 2.5 }, { x: 320, y: 220, r: 2.5 },
          { x: 50, y: 320, r: 2 }, { x: 300, y: 120, r: 2 },
        ].map((n, i) => (
          <circle key={`nn-${i}`} cx={n.x} cy={n.y} r={n.r}
            fill="var(--accent)" className="neural-node"
            style={{ animationDelay: `${i * 0.3}s`, animationDuration: `${2 + (i % 3) * 0.5}s` }}
          />
        ))}

        {/* Neural connections - organic lines */}
        {[
          [80, 200, 150, 120], [80, 200, 200, 280], [150, 120, 220, 180],
          [200, 280, 260, 350], [120, 400, 180, 500], [180, 500, 160, 700],
          [90, 600, 160, 700], [220, 180, 320, 220], [260, 350, 280, 450],
          [80, 200, 120, 400], [150, 120, 200, 280], [160, 700, 100, 800],
          [320, 220, 280, 450], [50, 320, 120, 400], [300, 120, 220, 180],
        ].map((line, i) => (
          <line key={`nl-${i}`} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]}
            stroke="url(#neuralGrad)" strokeWidth={0.6} opacity={0.35}
          />
        ))}

        {/* Data pulses */}
        {[[80, 200, 150, 120], [200, 280, 260, 350], [120, 400, 180, 500], [160, 700, 100, 800]].map((p, i) => (
          <circle key={`pulse-${i}`} r={2} fill="var(--accent)" opacity={0.5}>
            <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite" path={`M${p[0]},${p[1]} L${p[2]},${p[3]}`} />
          </circle>
        ))}

        {/* Center transition zone */}
        {[
          { x: 380, y: 150 }, { x: 420, y: 300 }, { x: 450, y: 500 },
          { x: 400, y: 650 }, { x: 480, y: 250 }, { x: 500, y: 400 },
          { x: 440, y: 750 }, { x: 520, y: 550 }, { x: 360, y: 450 },
        ].map((n, i) => (
          <circle key={`trans-${i}`} cx={n.x} cy={n.y} r={2.5}
            fill={i < 4 ? 'var(--accent)' : 'var(--accent-secondary)'}
            className="neural-node" style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}

        {[
          [380, 150, 420, 300], [420, 300, 450, 500], [450, 500, 440, 750],
          [420, 300, 480, 250], [450, 500, 520, 550], [380, 150, 480, 250],
          [520, 550, 440, 750], [360, 450, 420, 300], [360, 450, 500, 400],
        ].map((line, i) => (
          <line key={`tl-${i}`} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]}
            stroke={i < 4 ? 'var(--accent)' : 'var(--accent-secondary)'}
            strokeWidth={0.5} opacity={0.25}
          />
        ))}

        {/* Right: Enhanced PCB traces */}
        {[
          [580, 180, 780, 180], [600, 300, 920, 300], [550, 420, 850, 420],
          [620, 540, 920, 540], [580, 660, 880, 660], [600, 780, 900, 780],
          [650, 150, 750, 150], [590, 230, 820, 230], [610, 350, 860, 350],
          [560, 480, 840, 480], [630, 600, 890, 600], [590, 700, 850, 700],
          [680, 100, 680, 280], [750, 220, 750, 400], [800, 350, 800, 550],
          [650, 450, 650, 620], [720, 550, 720, 750], [780, 600, 780, 800],
          [850, 200, 850, 380], [680, 300, 680, 500],
        ].map((trace, i) => (
          <line key={`trace-${i}`} x1={trace[0]} y1={trace[1]} x2={trace[2]} y2={trace[3]}
            stroke={i < 12 ? 'url(#circuitGrad)' : 'url(#circuitGrad)'}
            strokeWidth={0.6} opacity={0.25}
          />
        ))}

        {/* Via holes */}
        {[
          { x: 580, y: 180 }, { x: 700, y: 180 }, { x: 780, y: 180 },
          { x: 600, y: 300 }, { x: 750, y: 300 }, { x: 920, y: 300 },
          { x: 550, y: 420 }, { x: 800, y: 420 }, { x: 850, y: 420 },
          { x: 620, y: 540 }, { x: 720, y: 540 }, { x: 920, y: 540 },
          { x: 580, y: 660 }, { x: 780, y: 660 }, { x: 880, y: 660 },
          { x: 600, y: 780 }, { x: 720, y: 780 }, { x: 900, y: 780 },
          { x: 680, y: 100 }, { x: 650, y: 450 },
        ].map((v, i) => (
          <circle key={`via-${i}`} cx={v.x} cy={v.y} r={2.5}
            fill="none" stroke="var(--accent-highlight)" strokeWidth={0.6} opacity={0.15}
          />
        ))}

        {/* Junction nodes */}
        {[
          { x: 700, y: 180 }, { x: 750, y: 300 }, { x: 800, y: 420 },
          { x: 720, y: 540 }, { x: 780, y: 660 }, { x: 720, y: 780 },
        ].map((j, i) => (
          <circle key={`junc-${i}`} cx={j.x} cy={j.y} r={2}
            fill="var(--accent-highlight)" opacity={0.2}
          />
        ))}

        {/* Layer 3: Floating particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <circle key={`p-${i}`} r={0.6 + (i % 3) * 0.4}
            fill={i < 14 ? 'var(--accent)' : i < 28 ? 'var(--accent-secondary)' : 'var(--accent-highlight)'}
            opacity={0.12}
          >
            <animate attributeName="cx" values={`${(i * 37) % 1440};${(i * 53 + 200) % 1440}`}
              dur={`${12 + (i % 10) * 2}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${(i * 29) % 900};${(i * 41 + 150) % 900}`}
              dur={`${14 + (i % 8) * 2}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.18;0"
              dur={`${4 + (i % 6) * 1.5}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Larger glowing nodes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <circle key={`gn-${i}`} r={1.5 + i * 0.3}
            fill={i < 2 ? 'var(--accent)' : i < 4 ? 'var(--accent-secondary)' : 'var(--accent-highlight)'}
            opacity={0.08}
          >
            <animate attributeName="cx" values={`${200 + i * 180};${300 + i * 160}`}
              dur={`${8 + i * 2}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${150 + i * 100};${250 + i * 80}`}
              dur={`${10 + i * 2}s`} repeatCount="indefinite" />
            <animate attributeName="r" values={`${1.5 + i * 0.3};${2.5 + i * 0.5};${1.5 + i * 0.3}`}
              dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.05;0.15;0.05"
              dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Layer 4: Engineering grid */}
        <pattern id="bg-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--accent)" strokeWidth={0.2} opacity={0.12} />
        </pattern>
        <rect x="0" y="0" width="1440" height="900" fill="url(#bg-grid)" opacity={0.25} />

        {/* Circuit flow pulse */}
        <circle r={2.5} fill="var(--accent-secondary)" opacity={0.3}>
          <animateMotion dur="14s" repeatCount="indefinite"
            path="M580,180 L780,180 L750,300 L920,300 L850,420 L550,420 L620,540 L920,540 L880,660 L580,660 L600,780 L900,780 L720,780 L720,540 L800,420 L750,300 L700,180 L580,180" />
        </circle>
      </svg>
    </div>
  )
}
