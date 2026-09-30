import { expect, test } from "@playwright/test"

const pages = [
  { path: "/", heading: "Intentional Gatherings, Genuinely Made" },
  { path: "/services", heading: "Wedding and event planning services" },
  { path: "/service/wedding-coordination", heading: "Wedding Coordination" },
  { path: "/about", heading: "Where it Began" },
  { path: "/vendors", heading: "Trusted Creatives for Meaningful Moments" },
  { path: "/contact", heading: "Let’s begin with your story." },
]

for (const entry of pages) {
  test(`${entry.path} renders`, async ({ page }) => {
    const response = await page.goto(entry.path)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole("heading", { name: entry.heading })).toBeVisible()
    await expect(page.locator('a[href^="/gallery"]')).toHaveCount(0)
  })
}

for (const path of [
  "/gallery",
  "/gallery/",
  "/gallery?preview=true",
  "/gallery.html",
]) {
  test(`${path} is unavailable`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(404)
    await expect(
      page.getByRole("heading", { name: "The gallery", exact: true })
    ).toHaveCount(0)
  })
}

test("mobile navigation omits the gallery", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  await page.getByRole("button", { name: "Open menu" }).click()

  const menu = page.getByRole("dialog")
  await expect(menu.getByRole("link", { name: "Services", exact: true })).toBeVisible()
  await expect(menu.locator('a[href^="/gallery"]')).toHaveCount(0)
  await expect(menu.getByRole("link", { name: "Gallery", exact: true })).toHaveCount(0)
})

test("vendors All view includes an approved vendor", async ({ page }) => {
  await page.goto("/vendors")

  await expect(page.getByRole("heading", { name: "The Petal Theory" })).toBeVisible()
  await expect(page.getByText("Florists", { exact: true }).last()).toBeVisible()
})

test("header navigation exposes every primary route", async ({ page }) => {
  await page.goto("/")
  const nav = page.getByRole("navigation").first()

  for (const label of ["Services", "Vendors", "About"]) {
    await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible()
  }
})
