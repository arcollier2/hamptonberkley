# Agent guide

Read `.github/copilot-instructions.md` before making changes.

## Project

Hampton Berkley is a Nuxt 4 wedding planning and organization website deployed
to Cloudflare Workers with static assets and a small API Worker.

## Start here

Before editing:

1. Read `package.json`, `nuxt.config.ts`, and `content.config.ts`.
2. Inspect `app/app.config.ts` and `app/assets/css/main.css`.
3. Read `DEVELOPER.md` before changing content, gallery entries, or Cloudflare
   bindings.
4. Check the current scripts before choosing validation commands.

## Commands

Use Bun. Do not create another package-manager lockfile.

```sh
bun install
bun run dev
bun run lint
bun run typecheck
bun run test
bun run test:e2e
bun run generate
```

## Architecture rules

- Use Nuxt 4, Vue 3, TypeScript, and `<script setup lang="ts">`.
- Prefer Nuxt UI components and shared theme tokens.
- Keep editable page and gallery content in typed Nuxt Content collections.
- Preserve static-generation and Cloudflare Workers compatibility.
- Access Cloudflare services through generated bindings, never hand-written
  environment interfaces.
- Keep the site accessible, responsive, and compatible with light and dark modes.

## Completion

Run applicable lint, typecheck, unit, e2e, and build commands. Update
`DEVELOPER.md` whenever content schemas or deployment setup changes.
