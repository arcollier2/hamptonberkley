import { expect, test } from "@playwright/test"
import { readdirSync, readFileSync } from "node:fs"
import { parse } from "yaml"

const vendorDirectory = new URL("../content/vendors/", import.meta.url)
const vendorNames = readdirSync(vendorDirectory)
  .filter((file) => file.endsWith(".yml") && file !== "aaa-categories.yml")
  .map((file) => {
    const vendor: unknown = parse(readFileSync(new URL(file, vendorDirectory), "utf8"))
    if (
      typeof vendor !== "object" ||
      vendor === null ||
      !("name" in vendor) ||
      typeof vendor.name !== "string" ||
      !vendor.name.trim()
    ) {
      throw new Error(`Missing vendor name in ${file}`)
    }
    return vendor.name
  })
  .sort()

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

test("vendors All view matches the current approved vendor files", async ({ page }) => {
  await page.goto("/vendors")

  await expect
    .poll(async () => (await page.locator("article h2").allTextContents()).sort())
    .toEqual(vendorNames)

  if (!vendorNames.length) {
    await expect(
      page.getByText("Vendor recommendations for this category are coming soon.")
    ).toBeVisible()
  }
})

test("header navigation exposes every primary route", async ({ page }) => {
  await page.goto("/")
  const nav = page.getByRole("navigation").first()

  for (const label of ["Services", "Vendors", "About"]) {
    await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible()
  }
})
