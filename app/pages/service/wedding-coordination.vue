<script setup lang="ts">
const gallery = [
  {
    src: "/images/wedding-reception-gold-place-setting.jpg",
    alt: "Wedding reception place setting with a gold charger, green stationery, and white flowers",
  },
  {
    src: "/images/wedding-ceremony-white-floral-aisle.jpg",
    alt: "Guests standing beside a white-flower-lined aisle during an indoor wedding ceremony",
  },
  {
    src: "/images/wedding-reception-florals-string-lights.jpg",
    alt: "Wedding reception room with round tables, white floral centerpieces, and string lights",
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
    summary="We thoughtfully manage the timeline, transitions, and behind-the-scenes details so your event feels seamless and effortless. With a steady presence throughout the day, we give you the freedom to be present, enjoy every moment, and celebrate with the people who matter most."
    :content-image="{
      src: '/images/wedding-coordination-director-chairs.jpg',
      alt: 'Two women seated together in director chairs in front of light curtains',
      width: 1069,
      height: 1600,
    }"
    content-heading="Intentional Gatherings, Genuinely Made"
    :content="[
      'In the weeks leading up to your wedding, we step in to bring all the details together. We’ll confirm the plans, connect with your vendors, and make sure everyone knows what to expect. On your wedding day, we’re there to keep everything moving smoothly, handle the little things that come up, and give you the freedom to be fully present with the people you love.',
    ]"
    :gallery="gallery"
    gallery-label="A look at coordinated weddings"
    gallery-link-label="Present moments. Thoughtful details."
  >
    <template #after-content>
      <CoordinationServices />
    </template>
  </ServiceDetailLayout>
</template>
