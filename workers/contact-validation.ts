export type ContactSubmission = {
  name: string
  email: string
  phone: string | null
  eventDate: string | null
  guestCount: number | null
  message: string
  website: string
}

type ValidationResult =
  | { success: true; data: ContactSubmission }
  | { success: false; errors: Record<string, string> }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const PHONE_PATTERN = /^[+\d().\-\s]+$/

function field(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function numericField(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null
  }

  if (typeof value === "number") {
    return value
  }

  return typeof value === "string" && value.trim() ? Number(value.trim()) : Number.NaN
}

export function validateContactSubmission(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { success: false, errors: { form: "Submit the form as an object." } }
  }

  const values = input as Record<string, unknown>
  const name = field(values.name)
  const email = field(values.email).toLowerCase()
  const phone = field(values.phone)
  const eventDate = field(values.eventDate)
  const message = field(values.message)
  const website = field(values.website)
  const guestCount = numericField(values.guestCount)
  const errors: Record<string, string> = {}

  if (name.length < 2 || name.length > 100) {
    errors.name = "Enter a name between 2 and 100 characters."
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    errors.email = "Enter a valid email address."
  }
  const phoneDigitCount = phone.replace(/\D/g, "").length
  if (
    phone &&
    (phone.length > 30 ||
      !PHONE_PATTERN.test(phone) ||
      phoneDigitCount < 7 ||
      phoneDigitCount > 15)
  ) {
    errors.phone = "Enter a valid phone number."
  }
  if (eventDate && !DATE_PATTERN.test(eventDate)) {
    errors.eventDate = "Enter a date in YYYY-MM-DD format."
  }
  if (
    guestCount !== null &&
    (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10_000)
  ) {
    errors.guestCount = "Enter a guest count between 1 and 10,000."
  }
  if (message.length < 10 || message.length > 5_000) {
    errors.message = "Enter a message between 10 and 5,000 characters."
  }

  if (Object.keys(errors).length) {
    return { success: false, errors }
  }

  return {
    success: true,
    data: {
      name,
      email,
      phone: phone || null,
      eventDate: eventDate || null,
      guestCount,
      message,
      website,
    },
  }
}
