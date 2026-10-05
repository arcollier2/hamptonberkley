<script setup lang="ts">
const services = [
  {
    title: "Planning & Coordination",
    description:
      "Thoughtful guidance and organization to keep your planning intentional, clear, and moving forward.",
    accent: "text-hgreen-400 dark:text-hgreen-300",
    markers: "marker:text-hgreen-400",
    items: [
      "Initial Planning Consultation",
      "Event Timeline Creation",
      "Budget Planning Assistance",
      "Design & Styling Guidance",
      "Rehearsal Coordination",
      "Day-Of Coordination",
      "Event Setup Oversight",
      "Event Breakdown Oversight",
      "Logistics Management",
      "RSVP & Guest Tracking Assistance",
      "Seating Chart Assistance",
      "Design Thinking Workshop",
    ],
  },
  {
    title: "Vendor Support",
    description:
      "Trusted recommendations and communication support to help you build the right team.",
    accent: "text-hblue-500 dark:text-hblue-300",
    markers: "marker:text-hblue-400",
    items: [
      "Venue Selection Assistance",
      "Catering Recommendations",
      "Photographer Recommendations",
      "Videographer Recommendations",
      "Florist Recommendations",
      "DJ/Band Recommendations",
      "Rental Company Recommendations",
      "Transportation Recommendations",
      "Hotel Block Assistance",
      "Other Vendor Assistance",
    ],
  },
  {
    title: "Event Day Coordination",
    description:
      "A calm, steady presence to manage the timeline, transitions, and all the details so you can be fully present and enjoy the moment.",
    accent: "text-hblue-300 dark:text-hblue-200",
    markers: "marker:text-hblue-300",
    items: [
      "Timeline Management",
      "Vendor Communication Support",
      "Rehearsal Coordination",
      "Day-Of Coordination",
      "Event Setup Oversight",
      "Event Breakdown Oversight",
      "Logistics Management",
    ],
  },
  {
    title: "Guest Experience",
    description:
      "Considered details that make your guests feel welcomed, cared for, and part of the celebration.",
    accent: "text-hpink-400 dark:text-hpink-300",
    markers: "marker:text-hpink-400",
    items: [
      "Guest Experience Planning",
      "RSVP & Guest Tracking Assistance",
      "Seating Chart Assistance",
      "Event Signage & Stationery Support",
      "Welcome Gifts & Touchpoints",
      "Logistics Support",
    ],
  },
]
</script>

<template>
  <section class="mt-16 sm:mt-20" aria-labelledby="coordination-services-heading">
    <SectionDivider label="Our services" link-label="" class="mb-5" />
    <h2
      id="coordination-services-heading"
      class="font-serif text-4xl leading-tight font-semibold sm:text-5xl"
    >
      Detailed Service Offerings
    </h2>
    <p class="mt-3 max-w-4xl text-base leading-7 text-muted sm:text-lg">
      Thoughtful support for every detail, whether you’re planning a wedding or a
      meaningful celebration. Explore how we can help bring your vision to life.
    </p>

    <div
      class="mt-10 grid gap-y-10 divide-y divide-default sm:grid-cols-2 sm:gap-x-8 sm:divide-y-0 xl:grid-cols-4 xl:gap-x-6"
    >
      <div
        v-for="(service, index) in services"
        :key="service.title"
        class="border-default pt-8 first:pt-0 sm:pt-0 xl:border-l xl:pl-6 xl:first:border-l-0 xl:first:pl-0"
      >
        <div aria-hidden="true" :class="service.accent">
          <span class="font-serif text-5xl leading-none">
            {{ String(index + 1).padStart(2, "0") }}
          </span>
          <span class="mt-4 block h-px w-10 bg-current" />
        </div>
        <h3 class="mt-4 max-w-[13ch] font-serif text-3xl leading-tight font-semibold">
          {{ service.title }}
        </h3>
        <p class="mt-4 text-sm leading-6 text-muted">{{ service.description }}</p>
        <ul
          class="mt-5 list-disc space-y-1 pl-5 text-sm leading-6 text-muted"
          :class="service.markers"
        >
          <li v-for="item in service.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
