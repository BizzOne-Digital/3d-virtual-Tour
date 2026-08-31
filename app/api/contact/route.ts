import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  service?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact endpoint. Validates the request server side, then hands off to a
 * delivery provider.
 *
 * DELIVERY IS NOT WIRED YET. Add one of the following and send from here:
 *   - Resend:    RESEND_API_KEY, then resend.emails.send({ to: james@3divt.com, ... })
 *   - SMTP:      nodemailer with SMTP_HOST / SMTP_USER / SMTP_PASS
 *   - CRM/Zapier webhook: fetch(process.env.LEAD_WEBHOOK_URL, { method: "POST", ... })
 * Until then the request validates and returns 200 without delivering a lead.
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const missing: string[] = [];
  if (!body.name?.trim()) missing.push("name");
  if (!emailPattern.test(body.email ?? "")) missing.push("email");
  if (!body.phone?.trim()) missing.push("phone");
  if (!body.address?.trim()) missing.push("address");

  if (missing.length > 0) {
    return NextResponse.json({ error: "Invalid submission.", fields: missing }, { status: 422 });
  }

  // TODO: replace with real delivery. Do not log lead details in production.
  return NextResponse.json({ ok: true }, { status: 200 });
}
