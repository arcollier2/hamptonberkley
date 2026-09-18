<script setup lang="ts">
type ContactForm = {
  name: string
  email: string
  phone: string
  eventDate: string
  guestCount: string
  message: string
  website: string
}

const form = reactive<ContactForm>({
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  guestCount: "",
  message: "",
  website: "",
})
const submitting = ref(false)
const submitted = ref(false)
const errorMessage = ref("")
const fieldErrors = ref<Record<string, string>>({})

async function submit() {
  submitting.value = true
  errorMessage.value = ""
  fieldErrors.value = {}

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        guestCount: form.guestCount ? Number(form.guestCount) : null,
      }),
    })
    const body = (await response.json()) as {
      accepted?: boolean
      error?: string
      fields?: Record<string, string>
    }

    if (!response.ok || !body.accepted) {
      fieldErrors.value = body.fields ?? {}
      throw new Error(body.error ?? "We could not send your inquiry.")
    }

    submitted.value = true
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "We could not send your inquiry."
  } finally {
    submitting.value = false
  }
}

const canonicalUrl = new URL("/contact", useSiteUrl()).toString()
useSeoMeta({
  title: "Contact | Hampton Berkley",
  description: "Start planning your wedding with Hampton Berkley.",
  ogUrl: canonicalUrl,
})
useHead({ link: [{ rel: "canonical", href: canonicalUrl }] })
</script>

<template>
  <UContainer class="grid gap-14 py-16 sm:py-24 lg:grid-cols-[0.75fr_1.25fr]">
    <SectionHeading
      eyebrow="Contact"
      title="Let’s begin with your story."
      description="Tell us what you know so far. Dates, ideas, guest counts, and half-formed dreams are all welcome."
    />

    <UCard>
      <div v-if="submitted" class="py-12 text-center" role="status">
        <UIcon name="i-lucide-circle-check" class="mx-auto size-12 text-primary" />
        <h2 class="mt-5 font-serif text-3xl font-semibold">Thank you.</h2>
        <p class="mt-3 text-muted">Your inquiry has been received.</p>
      </div>

      <form v-else class="grid gap-5 sm:grid-cols-2" @submit.prevent="submit">
        <div>
          <label for="name" class="mb-2 block text-sm font-medium">Name</label>
          <UInput
            id="name"
            v-model="form.name"
            required
            class="w-full"
            autocomplete="name"
          />
          <p v-if="fieldErrors.name" class="mt-1 text-sm text-error">
            {{ fieldErrors.name }}
          </p>
        </div>
        <div>
          <label for="email" class="mb-2 block text-sm font-medium">Email</label>
          <UInput
            id="email"
            v-model="form.email"
            required
            type="email"
            class="w-full"
            autocomplete="email"
          />
          <p v-if="fieldErrors.email" class="mt-1 text-sm text-error">
            {{ fieldErrors.email }}
          </p>
        </div>
        <div>
          <label for="phone" class="mb-2 block text-sm font-medium">Phone</label>
          <UInput
            id="phone"
            v-model="form.phone"
            type="tel"
            class="w-full"
            autocomplete="tel"
          />
          <p v-if="fieldErrors.phone" class="mt-1 text-sm text-error">
            {{ fieldErrors.phone }}
          </p>
        </div>
        <div>
          <label for="eventDate" class="mb-2 block text-sm font-medium"
            >Event date</label
          >
          <UInput id="eventDate" v-model="form.eventDate" type="date" class="w-full" />
          <p v-if="fieldErrors.eventDate" class="mt-1 text-sm text-error">
            {{ fieldErrors.eventDate }}
          </p>
        </div>
        <div class="sm:col-span-2">
          <label for="guestCount" class="mb-2 block text-sm font-medium"
            >Estimated guests</label
          >
          <UInput
            id="guestCount"
            v-model="form.guestCount"
            type="number"
            min="1"
            max="10000"
            class="w-full"
          />
          <p v-if="fieldErrors.guestCount" class="mt-1 text-sm text-error">
            {{ fieldErrors.guestCount }}
          </p>
        </div>
        <div class="sm:col-span-2">
          <label for="message" class="mb-2 block text-sm font-medium"
            >Tell us about your plans</label
          >
          <UTextarea
            id="message"
            v-model="form.message"
            required
            :rows="7"
            class="w-full"
          />
          <p v-if="fieldErrors.message" class="mt-1 text-sm text-error">
            {{ fieldErrors.message }}
          </p>
        </div>
        <div class="absolute -left-[10000px]" aria-hidden="true">
          <label for="website">Website</label>
          <input
            id="website"
            v-model="form.website"
            type="text"
            tabindex="-1"
            autocomplete="off"
          />
        </div>
        <div class="sm:col-span-2">
          <UAlert
            v-if="errorMessage"
            color="error"
            variant="soft"
            :description="errorMessage"
            class="mb-4"
          />
          <UButton type="submit" size="lg" :loading="submitting">Send inquiry</UButton>
        </div>
      </form>
    </UCard>
  </UContainer>
</template>
