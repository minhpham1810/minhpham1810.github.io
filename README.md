# minhpham1810.github.io

Personal portfolio of Khoa Minh Pham, built with Next.js 14, TypeScript, and Tailwind CSS and deployed to GitHub Pages as a static export.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # static site in ./out
```

## Editing content

- **Home page sections** (open-source pull requests, experience, toolkit, links): `lib/site.ts`
- **Case studies**: one markdown string per file in `content/projects/`, registered in `lib/projects.ts`
- **Colors and fonts**: `tailwind.config.ts` and `app/layout.tsx`
- **Résumé, images, and videos**: `public/assets/`

Pushing to `main` deploys the site to <https://minhpham1810.github.io>.
