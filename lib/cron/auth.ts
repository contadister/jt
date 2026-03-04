// lib/cron/auth.ts
// Validates requests coming from:
//   1. Vercel (internal cron calls — no auth header, but Vercel sets VERCEL_CRON_SIGNATURE internally)
//   2. cron-job.org (sends Authorization: Bearer YOUR_CRON_SECRET header)
//
// Setup on cron-job.org:
//   - Request method: GET
//   - URL: https://josett.com/api/cron/check-domains
//   - Headers: Authorization: Bearer <your CRON_SECRET value>
//   - Schedule: Every 2 hours (or whatever you need)

export function validateCronRequest(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("CRON_SECRET env variable is not set");
    return false;
  }

  // Check Authorization: Bearer <secret> (used by cron-job.org)
  const authHeader = req.headers.get("authorization");
  if (authHeader === `Bearer ${secret}`) {
    return true;
  }

  // Check x-internal-secret header (legacy / internal calls)
  const internalHeader = req.headers.get("x-internal-secret");
  if (internalHeader === secret) {
    return true;
  }

  // Vercel sets this header on its own cron invocations
  // It's always "1" when called by Vercel's scheduler
  const vercelCron = req.headers.get("x-vercel-cron");
  if (vercelCron === "1") {
    return true;
  }

  return false;
}

export function unauthorizedResponse() {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
