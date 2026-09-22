# Developer reference

## Stack

The site uses Nuxt 4, Nuxt Content, Nuxt UI, Tailwind CSS 4, Bun, and Cloudflare
Workers. `nuxt generate` creates the static site in `.output/public`; Wrangler
serves those assets and runs `workers/contact-api.ts` first for `/api/*`.

## Content

- `content/pages/*.md` contains prose pages served at root-level routes.
- `content/gallery/*.yml` contains gallery entries.
- `content/vendors/aaa-categories.yml` defines vendor categories and display order.
- Other `content/vendors/*.yml` files contain one approved vendor each.
- `app/pages/gallery.vue` renders the gallery.
- `app/pages/vendors.vue` renders and filters approved vendors.
- `app/pages/[...slug].vue` renders prose pages.

Gallery entries require `title`, `description`, `image`, and `imageAlt`. Optional
fields are `location` and `services`; `order` controls display order.

### Approved vendors

Vendor files require `name` and a `categories` list. Categories must use IDs
defined in `content/vendors/aaa-categories.yml`. The optional fields are
`tagline`, `instagram`, `website`, `email`, and `featured`.

Use a YAML list when a vendor belongs to multiple categories:

```yaml
name: Example Vendor
categories:
  - florists
  - rentals
tagline: Optional short description.
instagram: examplevendor
website: https://example.com
email: hello@example.com
featured: false
```

Enter an Instagram handle without `@` or a URL. Website values must include
`https://`. Missing optional fields are not rendered. Featured vendors appear
first; all other vendors are sorted alphabetically, so no manual order values
are required.

To add a vendor through GitHub:

1. Open `content/vendors` and duplicate an existing vendor file.
2. Rename it with lowercase words separated by hyphens.
3. Update its values and choose category IDs from `aaa-categories.yml`.
4. Commit the file to `main`.

CI checks YAML formatting, validates the typed Nuxt Content schema, generates
the static site, and runs browser smoke tests before `main` can be promoted to
`prod`. Run `bun run lint:yaml` locally to check vendor YAML formatting.

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
