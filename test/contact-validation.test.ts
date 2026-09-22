import { describe, expect, it } from "vitest"
import { validateContactSubmission } from "../workers/contact-validation"

describe("validateContactSubmission", () => {
  it("normalizes a valid submission", () => {
    const result = validateContactSubmission({
      name: "  Avery Morgan ",
      email: " AVERY@EXAMPLE.COM ",
      phone: "(317) 999-5589",
      message: "We would love help planning our wedding.",
      guestCount: 120,
    })

    expect(result).toEqual({
      success: true,
      data: {
        name: "Avery Morgan",
        email: "avery@example.com",
        phone: "(317) 999-5589",
        eventDate: null,
        guestCount: 120,
        message: "We would love help planning our wedding.",
        website: "",
      },
    })
  })

  it("returns field errors for invalid input", () => {
    const result = validateContactSubmission({
      name: "A",
      email: "not-an-email",
      phone: "josh",
      message: "short",
      guestCount: "0",
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors).toMatchObject({
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        guestCount: expect.any(String),
        message: expect.any(String),
      })
    }
  })

  it("accepts guest counts submitted as strings", () => {
    const result = validateContactSubmission({
      name: "Avery Morgan",
      email: "avery@example.com",
      message: "We would love help planning our wedding.",
      guestCount: "85",
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.guestCount).toBe(85)
    }
  })
})
