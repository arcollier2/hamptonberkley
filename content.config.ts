import { defineCollection, defineContentConfig, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: "page",
      source: {
        include: "pages/*.md",
        prefix: "",
      },
    }),
    gallery: defineCollection({
      type: "data",
      source: "gallery/*.yml",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        imageAlt: z.string(),
        location: z.string().optional(),
        services: z.array(z.string()).default([]),
        order: z.number().default(0),
      }),
      indexes: [{ columns: ["order"] }],
    }),
  },
})
