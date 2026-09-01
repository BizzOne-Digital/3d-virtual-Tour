import Image from "next/image";
import Link from "next/link";
import { films, portfolio, type Project } from "@/lib/content";
import { VideoEmbed } from "./VideoEmbed";
import { Reveal } from "./Reveal";

/**
 * Asymmetric editorial grid. Frames differ in span, proportion and vertical
 * offset, so no two projects read as the same tile.
 *
 * Three compositions rather than one shrinking layout: desktop is asymmetric
 * with vertical offsets, tablet rebalances into full-width features and paired
 * frames, mobile becomes a vertical sequence.
 */
type Frame = { span: string; aspect: string; offset?: string; sizes: string };

const FRAMES: Frame[] = [
  {
    span: "md:col-span-12 lg:col-span-8",
    aspect: "aspect-16/10",
    sizes: "(max-width:768px) 100vw, (max-width:1024px) 92vw, 62vw",
  },
  {
    span: "md:col-span-6 lg:col-span-4",
    aspect: "aspect-4/5",
    offset: "lg:mt-24",
    sizes: "(max-width:768px) 100vw, (max-width:1024px) 46vw, 30vw",
  },
  {
    span: "md:col-span-6 lg:col-span-5",
    aspect: "aspect-4/5",
    sizes: "(max-width:768px) 100vw, (max-width:1024px) 46vw, 38vw",
  },
  {
    span: "md:col-span-12 lg:col-span-7",
    aspect: "aspect-2/1",
    offset: "lg:mt-32",
    sizes: "(max-width:768px) 100vw, (max-width:1024px) 92vw, 54vw",
  },
  {
    span: "md:col-span-6 lg:col-span-6",
    aspect: "aspect-16/11",
    sizes: "(max-width:768px) 100vw, (max-width:1024px) 46vw, 46vw",
  },
  {
    span: "md:col-span-6 lg:col-span-5 lg:col-start-8",
    aspect: "aspect-16/11",
    offset: "lg:mt-20",
    sizes: "(max-width:768px) 100vw, (max-width:1024px) 46vw, 38vw",
  },
  {
    span: "md:col-span-12 lg:col-span-12",
    aspect: "aspect-21/9",
    sizes: "100vw",
  },
];

/**
 * The service leads, not the address. Someone reading this page is deciding
 * what to commission, so "Virtual Staging" is the useful headline and
 * "New construction, Central Florida" is the footnote.
 */
function Caption({ project, interactive }: { project: Project; interactive?: boolean }) {
  return (
    <div
      className={`mt-6 border-t border-line pt-5 transition-colors duration-500 ${
        interactive ? "group-hover:border-gold/60" : ""
      }`}
    >
      <h3
        className={`text-lg font-medium tracking-tight uppercase text-ivory transition-colors duration-300 md:text-xl ${
          interactive ? "group-hover:text-gold" : ""
        }`}
      >
        {project.service}
      </h3>
      <p className="mt-3 text-sm text-muted">
        {project.property}, {project.location}
      </p>
      <p className="label mt-4 text-muted-dim">{project.result}</p>
    </div>
  );
}

export function ProjectFrame({
  project,
  frame,
  index,
}: {
  project: Project;
  frame: Frame;
  index: number;
}) {
  const aspect = project.aspect ?? frame.aspect;

  /* Film entries play where they sit: sending someone to a listing page to
     watch a one-minute film loses them. Stills stay linked to the portfolio. */
  if (project.kind === "film" && project.film) {
    const film = films[project.film];
    return (
      <Reveal
        as="article"
        index={index % 2}
        className={`${frame.span} ${frame.offset ?? ""}`}
      >
        <VideoEmbed
          id={film.id}
          title={film.title}
          poster={film.poster}
          posterAlt={film.posterAlt}
          start={film.start}
          sizes={frame.sizes}
          className={aspect}
        />
        <Caption project={project} />
        <p className="label mt-2 text-muted-dim">Runtime {film.duration}</p>
      </Reveal>
    );
  }

  return (
    <Reveal
      as="article"
      index={index % 2}
      className={`${frame.span} ${frame.offset ?? ""}`}
    >
      <Link href="/portfolio" className="group block">
        <div className={`relative ${aspect} overflow-hidden rounded-image bg-surface`}>
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes={frame.sizes}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </div>
        <Caption project={project} interactive />
      </Link>
    </Reveal>
  );
}

export function PortfolioGrid({ projects = portfolio }: { projects?: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-14 lg:gap-y-8">
      {projects.map((project, i) => (
        <ProjectFrame
          key={project.slug}
          project={project}
          frame={FRAMES[i % FRAMES.length]}
          index={i}
        />
      ))}
    </div>
  );
}
