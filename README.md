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

- Seven-chapter information architecture (Origin, Map, Systems, Experience, Engineering, Now, Connect)
- Project case-study routes (`/projects/:id`) for every system
- **Portfolio Intelligence** assistant with local retrieval fallback (optional OpenAI-compatible LLM via a serverless function)
- Command palette (`Ctrl+K`), theme toggle, floor-rail navigation, scroll progress
- Self-hosted variable fonts (Inter, JetBrains Mono, Space Grotesk — latin subsets), OpenGraph/Twitter/metadata, per-route titles + canonical URLs, structured data

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
| `VITE_LLM_ENABLED` | Public flag (`true`/`false`) that switches the assistant between "LLM" and "local retrieval" modes. **Not a secret** — it is compiled into the client bundle. |

`.env` files are git-ignored.

### Portfolio Intelligence (LLM)

The client bundle contains **no API key**. The assistant posts to `/api/portfolio-ai`, a small serverless function (Vercel Function) that holds the credentials server-side, streams the completion back, and enforces origin + message-size limits.

Set these **server-side** (e.g. Vercel Environment Variables — the function reads them without the `VITE_` prefix):

| Variable | Purpose |
| --- | --- |
| `LLM_ENDPOINT` | OpenAI-compatible chat-completions endpoint. When missing the assistant stays in local-retrieval mode. |
| `LLM_API_KEY` | API key for the LLM endpoint. |
| `LLM_MODEL` *(optional)* | Model name, defaults to `gpt-4o-mini`. |
| `ALLOWED_ORIGINS` *(optional)* | Extra comma-separated origins allowed to call the function (the live site and `http://localhost:5173` are allowed by default). |

For LLM responses in local development, run the app through `vercel dev`; on a plain `vite` server the `/api` call is not proxied and the assistant degrades gracefully to local retrieval.

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
    sections/      # the 7 chapter sections (Hero/Origin, Map, Systems, Experience, Engineering, Now, Connect)
    ui/            # Navbar, FloorRail, StickyContext, CommandPalette, PortfolioAssistant, ThemeToggle
    visuals/       # interactive project visualizations (AutoBI, Meridian, AI Pharaoh)
  config/          # contact/Web3Forms configuration
  context/         # React context (portfolio provider)
  data/            # structured portfolio data (projects, experience, certifications, skills, chapters)
  hooks/           # theme, scroll-reveal, command palette, scroll-spy, focus trap, motion
  pages/           # HomePage + ProjectCaseStudyPage
  utils/           # assistant retrieval, LLM transport, project topics, scroll helpers
api/               # serverless Portfolio Intelligence function (LLM proxy)
public/
  images/          # project, certification, and portrait assets
  Ahmed-CV.pdf     # downloadable CV
```

## Deployment

**Vercel** (`arasoul.dev`) is the production host. It runs the `/api/portfolio-ai` serverless function, so the LLM-enhanced assistant works there. `vercel.json` rewrites non-`/api` routes to `/index.html` so deep project routes work on direct navigation. Deployment is triggered automatically by pushes to `main`.

## License

No license is applied. All rights reserved by the author.