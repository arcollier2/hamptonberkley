import tailwindcss from "@tailwindcss/vite"

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL ?? "https://hamptonberkley.com"

export default defineNuxtConfig({
  compatibilityDate: "2026-09-18",
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxt/eslint",
  ],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      siteUrl,
    },
  },
  image: {
    provider: "none",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  googleFonts: {
    families: {
      "DM Sans": [400, 500, 600, 700],
      "Cormorant Garamond": [500, 600, 700],
    },
    display: "swap",
    download: true,
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "shortcut icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
      meta: [
        {
          name: "theme-color",
          media: "(prefers-color-scheme: light)",
          content: "#fcfaf3",
        },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: dark)",
          content: "#21282e",
        },
        { property: "og:site_name", content: "Hampton Berkley" },
        { property: "og:locale", content: "en_US" },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Hampton Berkley",
            url: siteUrl,
            description: "Wedding planning and event organization.",
          }),
        },
      ],
    },
  },
  nitro: {
    preset: "static",
    prerender: {
      failOnError: true,
    },
  },
})
