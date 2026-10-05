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
  "/",
  "/services",
  "/about",
  "/vendors",
  "/service/wedding-coordination",
]) {
  test(`${path} uses the shared centered planning CTA`, async ({ page }, testInfo) => {
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(path)
      const cta = page.locator("section.scalloped-paper")
      await expect(cta).toHaveCount(1)
      await expect(
        cta.getByText("Let’s create something meaningful", { exact: true })
      ).toBeVisible()
      await expect(
        cta.getByRole("heading", { name: "Ready to Start Planning?", exact: true })
      ).toBeVisible()
      const description = cta.getByText(
        "We’d love to learn more about your event and how we can bring your vision to life.",
        { exact: true }
      )
      await expect(description).toBeVisible()
      const button = cta.getByRole("link", { name: "Inquire now", exact: true })
      await expect(button).toHaveAttribute("href", "/contact")
      await expect(cta.locator(".scalloped-paper__fill")).toHaveClass(/bg-hblue-500/)
      await cta.scrollIntoViewIfNeeded()
      const descriptionBounds = await description.boundingBox()
      const buttonBounds = await button.boundingBox()
      const ctaBounds = await cta.boundingBox()
      if (!descriptionBounds || !buttonBounds || !ctaBounds) {
        throw new Error("Missing planning CTA layout bounds")
      }
      expect(buttonBounds.y).toBeGreaterThan(
        descriptionBounds.y + descriptionBounds.height
      )
      expect(
        Math.abs(
          buttonBounds.x + buttonBounds.width / 2 - (ctaBounds.x + ctaBounds.width / 2)
        )
      ).toBeLessThan(2)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
        width
      )
      if (path === "/services") {
        await cta.screenshot({ path: testInfo.outputPath(`planning-cta-${width}.png`) })
      }
    }
  })
}

test("wedding coordination omits optional add-ons and retains its sections", async ({
  page,
}) => {
  await page.goto("/service/wedding-coordination")

  await expect(page.locator('img[src*="gallery-placeholder-"]')).toHaveCount(0)
  await expect(page.getByText("Optional add-ons", { exact: true })).toHaveCount(0)
  for (const label of [
    "Rehearsal coordination",
    "Additional planning meetings",
    "Travel support",
    "Additional coordinator",
  ]) {
    await expect(page.getByText(label, { exact: true })).toHaveCount(0)
  }
  await expect(page.locator("section.bg-hblue-100")).toHaveCount(0)
  for (const heading of [
    "Intimate Celebrations",
    "Classic Celebrations",
    "Grand Celebrations",
  ]) {
    await expect(page.getByRole("heading", { name: heading, exact: true })).toHaveCount(
      0
    )
  }
  await expect(page.getByRole("article")).toHaveCount(0)
  await expect(
    page.locator("section").filter({ has: page.locator(".lg\\:grid-cols-3") })
  ).toHaveCount(0)
  await expect(
    page.getByText("A look at coordinated weddings", { exact: true })
  ).toBeVisible()
  for (const heading of [
    "Wedding Coordination",
    "Intentional Gatherings, Genuinely Made",
    "Ready to Start Planning?",
  ]) {
    await expect(
      page.getByRole("heading", { name: heading, exact: true })
    ).toBeVisible()
  }
})

for (const width of [1280, 768, 390]) {
  test(`coordination services adapt at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto("/service/wedding-coordination")
    const section = page.getByRole("region", { name: "Detailed Service Offerings" })
    await expect(section).toBeVisible()
    await expect(section.getByRole("heading", { level: 3 })).toHaveText([
      "Planning & Coordination",
      "Vendor Support",
      "Event Day Coordination",
      "Guest Experience",
    ])
    const lists = section.getByRole("list")
    await expect(lists).toHaveCount(4)
    for (const [index, count] of [12, 10, 7, 6].entries()) {
      await expect(lists.nth(index).getByRole("listitem")).toHaveCount(count)
    }
    await expect(section.getByText(/\$/)).toHaveCount(0)
    const columns = await section
      .locator(".grid")
      .evaluate((element) =>
        getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/)
      )
    expect(columns).toHaveLength(width >= 1280 ? 4 : width >= 640 ? 2 : 1)
    expect(
      await section.evaluate((element) =>
        element.previousElementSibling?.querySelector("h2")?.textContent?.trim()
      )
    ).toBe("Intentional Gatherings, Genuinely Made")
    const ctaHeading = page.getByRole("heading", {
      name: "Ready to Start Planning?",
      exact: true,
    })
    await expect(ctaHeading).toHaveCount(1)
    expect(
      await section.evaluate((element) =>
        element.parentElement?.nextElementSibling
          ?.querySelector("h2")
          ?.textContent?.trim()
      )
    ).toBe("Ready to Start Planning?")
    const cta = page.locator("section.scalloped-paper").filter({ has: ctaHeading })
    await expect(
      cta.getByRole("link", { name: "Inquire now", exact: true })
    ).toHaveAttribute("href", "/contact")
    expect(
      await cta.evaluate((element) =>
        Boolean(element.nextElementSibling?.querySelector(".snap-x"))
      )
    ).toBe(true)
    expect(await cta.evaluate((element) => element.clientWidth)).toBe(
      await page.getByRole("main").evaluate((element) => element.clientWidth)
    )
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
    await section.screenshot({ path: testInfo.outputPath("coordination-services.png") })
    if (width === 1280) {
      await page.emulateMedia({ colorScheme: "dark" })
      await expect(page.locator("html")).toHaveClass(/dark/)
      await section.screenshot({
        path: testInfo.outputPath("coordination-services-dark.png"),
      })
    }
  })
}

for (const width of [1280, 390]) {
  test(`coordinated wedding photos load and scroll at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto("/service/wedding-coordination")
    const hero = page.locator("header").filter({
      has: page.getByRole("heading", { name: "Wedding Coordination", exact: true }),
    })
    await expect(hero.getByRole("img")).toHaveCount(0)
    const contentSection = page.locator("section").filter({
      has: page.getByRole("heading", {
        name: "Intentional Gatherings, Genuinely Made",
        exact: true,
      }),
    })
    const contentImage = contentSection.getByRole("img", {
      name: "Two women seated together in director chairs in front of light curtains",
      exact: true,
    })
    await expect(contentImage).toHaveAttribute(
      "src",
      "/images/wedding-coordination-director-chairs.jpg"
    )
    await contentImage.scrollIntoViewIfNeeded()
    await expect
      .poll(() =>
        contentImage.evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth === 1069
        )
      )
      .toBe(true)
    await expect(hero.locator("p").last()).toHaveText(
      "We thoughtfully manage the timeline, transitions, and behind-the-scenes details so your event feels seamless and effortless. With a steady presence throughout the day, we give you the freedom to be present, enjoy every moment, and celebrate with the people who matter most."
    )
    await hero.screenshot({
      path: testInfo.outputPath("wedding-coordination-hero.png"),
    })
    const columns = await contentSection.evaluate((element) =>
      getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/)
    )
    expect(columns).toHaveLength(width >= 1024 ? 2 : 1)
    const heroWidth = await hero.evaluate((element) => element.clientWidth)
    const contentWidth = await contentSection.evaluate((element) => element.clientWidth)
    expect(heroWidth).toBe(contentWidth)
    const imageBounds = await contentImage.boundingBox()
    expect(imageBounds).not.toBeNull()
    if (!imageBounds) throw new Error("Missing coordination photo bounds")
    expect(imageBounds.width / imageBounds.height).toBeCloseTo(1.5, 2)
    if (width >= 1024) {
      expect(Number.parseFloat(columns[0] ?? "")).toBeCloseTo(
        Number.parseFloat(columns[1] ?? ""),
        0
      )
      const textBounds = await contentSection.locator(":scope > div").boundingBox()
      if (!textBounds) throw new Error("Missing coordination text bounds")
      expect(
        Math.abs(
          textBounds.y +
            textBounds.height / 2 -
            (imageBounds.y + imageBounds.height / 2)
        )
      ).toBeLessThan(2)
    }
    await contentSection.screenshot({
      path: testInfo.outputPath("wedding-coordination-content.png"),
    })
    const track = page.locator(".snap-x")
    const images = track.getByRole("img")
    await expect(images).toHaveCount(3)
    await expect(track.locator('img[src*="gallery-placeholder-"]')).toHaveCount(0)
    const sources = [
      "/images/wedding-reception-gold-place-setting.jpg",
      "/images/wedding-ceremony-white-floral-aisle.jpg",
      "/images/wedding-reception-florals-string-lights.jpg",
    ]
    for (const [index, src] of sources.entries()) {
      await expect(images.nth(index)).toHaveAttribute("src", src)
    }

    await track.scrollIntoViewIfNeeded()
    if (width >= 768) {
      await page.getByRole("button", { name: "Show next event photos" }).click()
    } else {
      await track.hover()
      await page.mouse.wheel(300, 0)
    }
    if (width < 768) {
      await expect
        .poll(() => track.evaluate((element) => element.scrollLeft))
        .toBeGreaterThan(0)
    }

    for (const src of sources) {
      const image = track.locator(`img[src="${src}"]`)
      await image.scrollIntoViewIfNeeded()
      await expect(image).toBeInViewport({ ratio: 0.9 })
      await expect(image).toHaveAttribute("alt", /\S+/)
      await expect
        .poll(() =>
          image.evaluate(
            (element: HTMLImageElement) => element.complete && element.naturalWidth > 0
          )
        )
        .toBe(true)
      await image.screenshot({
        path: testInfo.outputPath(src.replace("/images/", "")),
      })
    }
    await expect(page.locator('a[href^="/gallery"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
  })
}

for (const category of [
  {
    heading: "Bridal Events",
    price: "$300+",
    events: [
      "Bridal Showers",
      "Engagement Party",
      "Bachelorette Party Planning",
      "Welcome Dinners",
      "Rehearsal Dinners",
    ],
  },
  {
    heading: "Corporate & Private Events",
    price: "$450+",
    events: [
      "Executive Dinners",
      "Team-Building Experiences",
      "Retreat Coordination",
      "Elevated Private Gatherings",
      "Baby Showers",
    ],
  },
]) {
  test(`${category.heading} shows one category price without event prices`, async ({
    page,
  }) => {
    await page.goto("/services")
    const card = page.getByRole("article").filter({
      has: page.getByRole("heading", { name: category.heading, exact: true }),
    })

    await expect(card.getByText(category.price, { exact: true })).toHaveCount(1)
    await expect(card.getByText(category.price, { exact: true })).toBeVisible()
    await expect(card.getByRole("listitem")).toHaveText(category.events)
    expect((await card.innerText()).match(/\$[\d,]+\+?/g)).toEqual([category.price])
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
