import Image from "next/image";
import { introImage } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * Editorial opening statement. Asymmetric split, deliberately unbalanced:
 * text sits low against a tall portrait-format architectural frame.
 */
export function Intro() {
  return (
    <section className="shell py-24 md:py-32 lg:py-40">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6 lg:pt-16 xl:col-span-5">
          <Reveal>
            <h2 className="max-w-[20ch] text-display font-medium uppercase text-ivory">
              Your property deserves more than a listing.
            </h2>
          </Reveal>

          <Reveal index={1}>
            <p className="mt-10 max-w-[54ch] text-base leading-relaxed text-muted md:text-lg">
              {" "}
              3D Interactive Virtual Tours helps realtors and homeowners present
              properties through professional photography and immersive digital
              experiences designed to capture attention and make listings more
              memorable.
            </p>
          </Reveal>
        </div>

        <Reveal
          as="figure"
          index={1}
          /* Tablet gets a landscape crop: a full-width 4:5 frame there is a wall of image. */
          className="relative aspect-4/5 overflow-hidden rounded-image bg-surface md:aspect-3/2 lg:aspect-4/5 lg:col-span-6 lg:col-start-7 xl:col-span-6 xl:col-start-7"
        >
          <Image
            src={introImage.src}
            alt={introImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
