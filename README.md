# Ahmed Abdelrasoul — Portfolio

Personal portfolio and case-study archive for **Ahmed Abdelrasoul (Arasoul)**, an AI & Data Engineer building intelligent systems from raw data to decisions.

Live site: [https://arasoul.dev](https://arasoul.dev)

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS 4** + custom design tokens
- **React Router 7** (client-side routes + hash chapter navigation)
- **Framer Motion** (scroll reveals, micro-interactions)
- **React Icons** (Feather icon set)
- **Vitest** (unit tests for data integrity + assistant retrieval)
- **Web3Forms** (contact form delivery)

## Features

- Seven-chapter information architecture (Origin, Map, Systems, Engineering, Experience, Now, Connect)
- Project case-study routes (`/projects/:id`) for every system
- **Portfolio Intelligence** assistant with local retrieval fallback (optional OpenAI-compatible LLM)
- Command palette (`Ctrl+K`), theme toggle, floor-rail navigation, scroll progress
- Google Fonts (Inter, JetBrains Mono, Space Grotesk), OpenGraph/Twitter/metadata, structured data

## Local development

Node 20+ is recommended.

```bash
npm install
npm run dev
```

### Environment variables

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

| Variable | Purpose |
| --- | --- |
| `VITE_WEB3FORMS_ACCESS_KEY` | Access key for the Web3Forms contact form (get it at [web3forms.com](https://web3forms.com)). When empty, the form falls back to a `mailto:` draft. |
| `VITE_LLM_ENDPOINT` *(optional)* | OpenAI-compatible chat-completions endpoint for the assistant. When missing, the assistant uses local structured retrieval only. |
| `VITE_LLM_API_KEY` *(optional)* | API key for the LLM endpoint. |

`.env` files are git-ignored. On hosting platforms (e.g. Vercel), set `VITE_WEB3FORMS_ACCESS_KEY` in the dashboard environment variables.

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # typecheck (tsc -b) + production build
npm run lint     # oxlint
npm test         # vitest (unit tests)
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/
    sections/      # the 7 chapter sections (Hero, Map, Systems, Engineering, Experience, Now, Connect)
    ui/            # Navbar, FloorRail, StickyContext, CommandPalette, PortfolioAssistant, ThemeToggle
    visuals/       # interactive project visualizations (AutoBI, Meridian, AI Pharaoh)
  config/          # contact/Web3Forms configuration
  context/         # React context (portfolio provider)
  data/            # structured portfolio data (projects, experience, certifications, skills, chapters)
  hooks/           # theme, scroll-reveal, command palette, portfolio context hooks
  pages/           # HomePage + ProjectCaseStudyPage
  utils/           # assistant retrieval, LLM transport, project topics, scroll helpers
public/
  images/          # project, certification, and portrait assets
  Ahmed-CV.pdf     # downloadable CV
```

## Deployment

Deploys to **Vercel** (`arasoul.dev`) via connection to the repository. Vercel's rewrite rules make deep project routes work on direct navigation.

The repository also ships a **GitHub Pages** workflow (`.github/workflows/deploy.yml`) that validates lint, tests, typecheck, and build, then publishes `dist/`. The build derives the Vite base path from the repository name automatically, and a `404.html` fallback is generated so project routes work on direct load. To use it:

1. Set **Settings → Pages → Source** to *GitHub Actions*.
2. Push to `main` — the workflow handles the rest.

## License

No license is applied. All rights reserved by the author.