"use client";

import { useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { cta, serviceOptions } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<string, string>>;

const field =
  // Placeholder uses the full muted-dim value: at 70% opacity it drops under WCAG AA.
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base text-ivory placeholder:text-muted-dim transition-colors duration-300 focus:border-gold focus:outline-none";

const labelClass = "label block text-muted";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const nextErrors: Errors = {};
    if (!data.name?.trim()) nextErrors.name = "Please tell us your name.";
    if (!emailPattern.test(data.email ?? "")) nextErrors.email = "Enter a valid email address.";
    if (!data.phone?.trim()) nextErrors.phone = "A phone number helps us reply faster.";
    if (!data.address?.trim()) nextErrors.address = "Enter the property address or city.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = form.querySelector<HTMLElement>(
        `[name="${Object.keys(nextErrors)[0]}"]`,
      );
      firstInvalid?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border-t border-gold/50 pt-10">
        <CheckCircle size={28} className="text-gold" aria-hidden />
        <h3 className="mt-6 text-display-sm font-medium uppercase text-ivory">
          Request received.
        </h3>
        <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted">
          Thank you. We will be in touch shortly to confirm the details and
          schedule a visit to the property.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="label mt-10 text-gold transition-colors duration-300 hover:text-gold-light"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border-t border-line pt-10">
      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          error={errors.email}
          autoComplete="email"
        />
        <Field label="Phone" name="phone" type="tel" error={errors.phone} autoComplete="tel" />
        <Field
          label="Property address"
          name="address"
          error={errors.address}
          autoComplete="street-address"
        />

        <div className="sm:col-span-2">
          <label htmlFor="service" className={labelClass}>
            Service needed
          </label>
          <select id="service" name="service" defaultValue={serviceOptions[0]} className={field}>
            {serviceOptions.map((option) => (
              <option key={option} value={option} className="bg-surface text-ivory">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Square footage, timeline, anything we should know."
            className={`${field} resize-none`}
          />
        </div>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="mt-10 flex items-start gap-3 border-l border-gold pl-4 text-sm text-ivory"
        >
          <WarningCircle size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden />
          That request did not go through. Please email {""}
          <a href="mailto:james@3divt.com" className="text-gold underline">
            james@3divt.com
          </a>
          {""} and we will pick it up straight away.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="label mt-12 inline-flex w-full items-center justify-center rounded-full bg-gold px-8 py-4 text-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-gold-light active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Sending" : cta.primary.label}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${field} ${error ? "border-gold-light" : ""}`}
      />
      {error ? (
        <p id={`${name}-error`} className="mt-3 text-sm text-gold-light">
          {error}
        </p>
      ) : null}
    </div>
  );
}
