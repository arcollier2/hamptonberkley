# Hampton Berkley repository instructions

## Purpose and architecture

This repository contains a wedding planning and organization website built with:

- Nuxt 4 and Vue 3
- TypeScript
- Nuxt Content and Nuxt UI
- Tailwind CSS 4
- Bun
- Cloudflare Workers, Static Assets, and D1

Do not introduce React, Next.js, or a second package manager.

## Working conventions

- Prefer Nuxt auto-imports and `<script setup lang="ts">`.
- Keep pages focused on composition and reusable presentation in components.
- Keep content in the typed collections defined by `content.config.ts`.
- Use shared UI tokens instead of scattered brand colors.
- Preserve SSR/static-generation compatibility and semantic HTML.
- Treat the visual styling as provisional until final design materials arrive.
- Never expose secrets through public runtime configuration or commit `.env` or
  `.dev.vars` files.
- Use generated Wrangler binding types and direct Cloudflare bindings.
- Validate user input on the Worker even when the browser validates it too.

## Package management and validation

Use Bun for installs and scripts. Before completion, run the applicable
`lint`, `typecheck`, `test`, `test:e2e`, and `generate` scripts. Do not weaken
checks to hide failures.

## Content and URLs

Keep public page routes durable. Gallery data belongs in `content/gallery/`;
editable prose pages belong in `content/pages/`. Add descriptive image alt text
and appropriate canonical and social metadata to public pages.
