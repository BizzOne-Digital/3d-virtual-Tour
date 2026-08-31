import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { business } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your property and we will help you choose the right real estate photography or virtual tour package.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | 3D Interactive Virtual Tours",
    description:
      "Tell us about your property and we will help you choose the right visual marketing solution.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="shell pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-52">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <h1 className="max-w-[16ch] text-display font-medium uppercase text-ivory">
                Let&rsquo;s present your property differently.
              </h1>
            </Reveal>
            <Reveal index={1}>
              <p className="mt-8 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg">
                Tell us about your property and we will help you choose the right
                visual marketing solution.
              </p>
            </Reveal>
            <Reveal index={2}>
              <address className="mt-12 flex flex-col gap-3 border-t border-line pt-8 not-italic">
                <span className="label text-gold">{business.contactName}</span>
                <a
                  href={`mailto:${business.email}`}
                  className="text-base text-ivory transition-colors duration-300 hover:text-gold"
                >
                  {business.email}
                </a>
                <a
                  href={business.phoneHref}
                  className="text-base text-ivory transition-colors duration-300 hover:text-gold"
                >
                  {business.phoneDisplay}
                </a>
                <span className="mt-2 text-sm text-muted-dim">{business.serviceArea}</span>
              </address>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
