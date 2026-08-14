# Portfolio v3

Personal portfolio built with React, TypeScript, and Vite.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## GitHub Pages Deployment

This repository is prepared for GitHub Pages with:

- a Pages workflow at `.github/workflows/deploy.yml`
- base-path aware assets for repository deployments
- automatic Vite base path when the workflow runs

### One-time setup on GitHub

1. Push this repository to GitHub.
2. Open repository **Settings -> Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Ensure your default branch is `main` or `master`.

### Deploy

Every push to `main` or `master` will build and deploy automatically.

Your URL will be:

- `https://<username>.github.io/<repository>/` for project repositories
- `https://<username>.github.io/` if the repository name is `<username>.github.io`

## Notes

- If you rename the repository, deploy still works because the workflow resolves base path from `GITHUB_REPOSITORY`.
- The build may show a chunk-size warning; this does not block deployment.
