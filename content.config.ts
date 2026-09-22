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
    vendorCategories: defineCollection({
      type: "data",
      source: "vendors/aaa-categories.yml",
      schema: z.object({
        categories: z.array(
          z.object({
            id: z.string().regex(/^[a-z0-9-]+$/),
            label: z.string().min(1),
          })
        ),
      }),
    }),
    vendors: defineCollection({
      type: "data",
      source: {
        include: "vendors/*.yml",
        exclude: ["vendors/aaa-categories.yml"],
      },
      schema: z.object({
        name: z.string().min(1),
        categories: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1),
        tagline: z.string().optional(),
        instagram: z
          .string()
          .regex(/^[A-Za-z0-9._]+$/)
          .optional(),
        website: z.string().url().optional(),
        email: z.string().email().optional(),
        featured: z.boolean().default(false),
      }),
      indexes: [{ columns: ["featured", "name"] }],
    }),
  },
})
