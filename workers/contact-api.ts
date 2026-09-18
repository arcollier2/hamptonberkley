import { validateContactSubmission } from "./contact-validation"

const MAX_REQUEST_BYTES = 16_384

function json(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'",
    },
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname !== "/api/contact") {
      return url.pathname.startsWith("/api/")
        ? json({ error: "Not found." }, 404)
        : env.ASSETS.fetch(request)
    }

    if (request.method !== "POST") {
      return new Response(null, {
        status: 405,
        headers: { Allow: "POST", "Cache-Control": "no-store" },
      })
    }

    if (!request.headers.get("content-type")?.startsWith("application/json")) {
      return json({ error: "Content-Type must be application/json." }, 415)
    }

    const contentLength = Number(request.headers.get("content-length") ?? "0")
    if (contentLength > MAX_REQUEST_BYTES) {
      return json({ error: "Request body is too large." }, 413)
    }

    let input: unknown
    try {
      input = await request.json()
    } catch {
      return json({ error: "Request body must be valid JSON." }, 400)
    }

    const result = validateContactSubmission(input)
    if (!result.success) {
      return json(
        { error: "Please correct the highlighted fields.", fields: result.errors },
        422
      )
    }

    // The hidden website field catches basic form bots without storing their payload.
    if (result.data.website) {
      return json({ accepted: true }, 202)
    }

    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await env.CONTACT_DB.prepare(
      `INSERT INTO contact_submissions
        (id, name, email, phone, event_date, guest_count, message, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?)`
    )
      .bind(
        id,
        result.data.name,
        result.data.email,
        result.data.phone,
        result.data.eventDate,
        result.data.guestCount,
        result.data.message,
        now
      )
      .run()

    console.log(
      JSON.stringify({
        event: "contact_submission_created",
        submissionId: id,
        createdAt: now,
      })
    )

    return json({ accepted: true, submissionId: id }, 202)
  },
} satisfies ExportedHandler<Env>
