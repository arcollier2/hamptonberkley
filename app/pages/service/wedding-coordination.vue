<script setup lang="ts">
const pricing = [
  {
    title: "Intimate Celebrations",
    eyebrow: "0–150 guests",
    price: "$1,000+",
    features: [
      "Final planning call 3–4 weeks before the event",
      "Vendor communication confirmation",
      "Wedding timeline management",
    ],
    tone: "green" as const,
  },
  {
    title: "Classic Celebrations",
    eyebrow: "150–300 guests",
    price: "$1,500+",
    features: [
      "Day-before planning and execution",
      "Day-of execution and troubleshooting",
      "Ceremony and reception coordination",
    ],
    tone: "blue" as const,
  },
  {
    title: "Grand Celebrations",
    eyebrow: "300–450+ guests",
    price: "$2,000+",
    features: [
      "Expanded vendor coordination",
      "Detailed guest-flow planning",
      "Additional logistics support for a larger celebration",
    ],
    tone: "pink" as const,
  },
]

const addOns = [
  { label: "Rehearsal coordination", icon: "i-lucide-calendar-check" },
  { label: "Additional planning meetings", icon: "i-lucide-messages-square" },
  { label: "Travel support", icon: "i-lucide-car" },
  { label: "Additional coordinator", icon: "i-lucide-users" },
]

const gallery = [
  {
    src: "/images/gallery-placeholder-garden.svg",
    alt: "Placeholder for an outdoor wedding coordination gallery photo",
  },
  {
    src: "/images/gallery-placeholder-dinner.svg",
    alt: "Placeholder for a reception coordination gallery photo",
  },
  {
    src: "/images/gallery-placeholder-garden.svg",
    alt: "Placeholder for a wedding ceremony coordination gallery photo",
  },
  {
    src: "/images/gallery-placeholder-dinner.svg",
    alt: "Placeholder for a wedding tablescape coordination gallery photo",
  },
  {
    src: "/images/gallery-placeholder-garden.svg",
    alt: "Placeholder for a wedding party coordination gallery photo",
  },
  {
    src: "/images/gallery-placeholder-dinner.svg",
    alt: "Placeholder for an evening wedding reception gallery photo",
  },
]

const canonicalUrl = new URL("/service/wedding-coordination", useSiteUrl()).toString()

useSeoMeta({
  title: "Wedding Coordination | Hampton Berkley",
  description:
    "Day-of wedding coordination that keeps every detail organized so you can stay present for your celebration.",
  ogTitle: "Wedding Coordination | Hampton Berkley",
  ogDescription:
    "Calm, thoughtful wedding coordination for celebrations across Northern Indiana and Greater Indianapolis.",
  ogUrl: canonicalUrl,
})

useHead({ link: [{ rel: "canonical", href: canonicalUrl }] })
</script>

<template>
  <ServiceDetailLayout
    category="Wedding services"
    title="Wedding Coordination"
    summary="You planned the celebration. We’ll make sure every thoughtful detail comes together so you can be fully present for it."
    content-heading="Calm coordination for a day centered on you."
    :content="[
      'In the final weeks before your wedding, we step in to organize the moving pieces, confirm the details, and become the central point of contact for your vendor team.',
      'From the rehearsal through the final reception moment, we manage the timeline, transitions, and unexpected details with a steady presence—giving you and your people space to celebrate.',
    ]"
    :content-image="{
      src: '/images/gallery-placeholder-garden.svg',
      alt: 'Placeholder for wedding coordination photography',
    }"
    :pricing="pricing"
    :add-ons="addOns"
    :gallery="gallery"
    gallery-label="A look at coordinated weddings"
    gallery-link-label="Present moments. Thoughtful details."
    cta-eyebrow="Let’s create something meaningful"
    cta-heading="Ready to Be Present for Your Day?"
    cta-content="We’d love to learn more about your wedding and how calm, thoughtful coordination can support your celebration."
    cta-button-text="Inquire now"
  />
</template>
