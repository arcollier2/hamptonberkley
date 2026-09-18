# Developer reference

## Stack

The site uses Nuxt 4, Nuxt Content, Nuxt UI, Tailwind CSS 4, Bun, and Cloudflare
Workers. `nuxt generate` creates the static site in `.output/public`; Wrangler
serves those assets and runs `workers/contact-api.ts` first for `/api/*`.

## Content

- `content/pages/*.md` contains prose pages served at root-level routes.
- `content/gallery/*.yml` contains gallery entries.
- `app/pages/gallery.vue` renders the gallery.
- `app/pages/[...slug].vue` renders prose pages.

Gallery entries require `title`, `description`, `image`, and `imageAlt`. Optional
fields are `location` and `services`; `order` controls display order.

## Contact form and D1

The contact form posts JSON to `/api/contact`. The Worker validates the payload
and stores accepted submissions in the `CONTACT_DB` D1 binding. The hidden
`website` field is a honeypot and is never persisted.

Before the first remote deployment:

```sh
bunx wrangler d1 create hampton-berkley-contact
```

Replace `replace-with-d1-database-id` in `wrangler.jsonc` with the returned ID,
then run:

```sh
bun run cf:types
bunx wrangler d1 migrations apply hampton-berkley-contact --remote
bun run cf:deploy:dry
```

For local D1 development:

```sh
bunx wrangler d1 migrations apply hampton-berkley-contact --local
bun run cf:dev
```

Do not hand-write Cloudflare binding interfaces. Regenerate
`worker-configuration.d.ts` after any Wrangler binding change.

## Deployment

CI validates pushes and pull requests to `main`. A successful push to `main`
fast-forwards `prod`, matching the source template's Git-connected Cloudflare
deployment flow. Configure the Cloudflare Worker build to watch `prod`, run
`bun run generate`, and deploy with `bunx wrangler deploy`.

Set `NUXT_PUBLIC_SITE_URL` in the Cloudflare build environment if the final
production origin differs from `https://hamptonberkley.com`.
