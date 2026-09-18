import { expect, test } from "@playwright/test"

const pages = [
  { path: "/", heading: "A celebration that feels entirely like you." },
  { path: "/services", heading: "Support shaped around your celebration" },
  { path: "/gallery", heading: "The gallery" },
  { path: "/about", heading: "Planning with purpose" },
  { path: "/contact", heading: "Let’s begin with your story." },
]

for (const entry of pages) {
  test(`${entry.path} renders`, async ({ page }) => {
    const response = await page.goto(entry.path)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole("heading", { name: entry.heading })).toBeVisible()
  })
}

test("header navigation exposes every primary route", async ({ page }) => {
  await page.goto("/")
  const nav = page.getByRole("navigation").first()

  for (const label of ["Services", "Gallery", "About", "Contact"]) {
    await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible()
  }
})
