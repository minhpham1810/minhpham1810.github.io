import Link from "next/link";
import { projects } from "@/lib/projects";
import { experience, links, openSource, toolkit } from "@/lib/site";

const pill =
  "glass rounded-full px-5 py-3 transition duration-200 hover:-translate-y-0.5 hover:text-accent";

function Thumbnail({ slug, title, tile }: { slug: string; title: string; tile?: string }) {
  // The wrapper clips the zoom that plays when the surrounding card is hovered.
  const zoom = "h-full w-full transition-transform duration-500 ease-out group-hover:scale-105";
  return (
    <span className="block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[color:var(--glass-border)]">
      {tile ? (
        <span
          aria-hidden="true"
          className={`${zoom} flex items-center justify-center bg-[#0b0d16] px-4 text-center font-mono text-sm text-white sm:text-base`}
        >
          {tile}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/assets/thumbs/${slug}.jpg`}
          alt={`${title} screenshot`}
          width={960}
          height={600}
          loading="lazy"
          className={`${zoom} object-cover`}
        />
      )}
    </span>
  );
}

function SectionHeading({ id, label, title }: { id: string; label: string; title: string }) {
  return (
    <div className="pb-10">
      <p className="label">{label}</p>
      <h2
        id={id}
        className="mt-3 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl"
      >
        {title}
      </h2>
    </div>
  );
}

export default function Home() {
  const selected = projects.filter((p) => !p.coursework);
  const coursework = projects.filter((p) => p.coursework);
  const merged = openSource.filter((c) => c.status === "merged").length;

  const proof = [
    {
      href: "/#open-source",
      figure: `${merged} merged`,
      label: "Open-source pull requests",
      detail: "Apache Sedona, the GA4GH Tool Registry Service, and Harbor Satellite, with four more under review.",
    },
    {
      href: "/work/kalmus-web/",
      figure: "50+ films",
      label: "Analyzed with KALMUS Web",
      detail: "Research software used by 10+ students and researchers on Bucknell's HPC cluster.",
    },
    {
      href: "/work/freshness-tracker/",
      figure: "Best First Hack",
      label: "SASEhack 2026",
      detail: "Freshness Tracker, a hardware-to-mobile food-waste prototype built by a team of four.",
    },
  ];

  return (
    <main id="main-content">
      <section className="shell pb-10 pt-16 sm:pt-24">
        <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="glass inline-flex items-center gap-3 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-accent">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              Available for 2027 new-grad roles
            </p>
            <p className="mt-8 font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
              Hi, I&apos;m Minh<span className="text-accent">.</span>
            </p>
            <h1 className="mt-3 max-w-[15ch] text-balance font-display text-[clamp(2.6rem,5.6vw,4.75rem)] font-medium leading-[1] tracking-[-0.04em]">
              Software engineer for backend, data, and AI systems.
            </h1>
            <p className="mt-7 max-w-[56ch] text-pretty text-lg leading-8 text-ink/75">
              I study Computer Science and Data Science at Bucknell University
              and graduate in May 2027. I have merged fixes into Apache Sedona,
              built research software that runs on a university HPC cluster, and
              won Best First Hack at SASEhack 2026.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3 text-sm font-medium">
              <a
                href={`mailto:${links.email}`}
                className="rounded-full bg-ink px-7 py-3.5 text-paper shadow-[0_10px_30px_rgba(15,23,42,0.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-accent"
              >
                Email Minh
              </a>
              <a href={links.resume} className={pill}>
                Résumé (PDF)
              </a>
              <a href={links.github} className={pill}>
                GitHub ↗
              </a>
              <a href={links.linkedin} className={pill}>
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="relative mx-auto mt-6 w-full max-w-sm lg:max-w-none">
            <p className="pointer-events-none absolute -top-14 left-3 z-10 flex -rotate-6 items-start gap-1 font-[family-name:var(--font-hand)] text-[1.7rem] leading-none text-ink/85">
              me in shanghai, 2025
              <svg
                aria-hidden="true"
                viewBox="0 0 60 56"
                className="mt-3 h-14 w-14 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 9c18-7 40-2 44 16 2 8 0 16-3 24" />
                <path d="M35 39c4 3 7 7 10 11 2-6 5-11 10-15" />
              </svg>
            </p>
            <figure data-tilt className="glass p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/portrait.jpg"
              alt="Khoa Minh Pham smiling by a river at night, with a lit city skyline behind"
              width={579}
              height={724}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <figcaption className="px-3 pb-1 pt-4 text-sm font-medium">
              call me minh!
            </figcaption>
            </figure>
          </div>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {proof.map(({ href, figure, label, detail }) => (
            <li key={href} className="flex">
              <Link href={href} className="glass group flex w-full flex-col p-6 sm:p-7">
                <span className="font-display text-4xl font-medium leading-none tracking-[-0.03em] sm:text-5xl">
                  {figure}
                </span>
                <span className="mt-4 font-medium transition-colors group-hover:text-accent">
                  {label} <span aria-hidden="true">→</span>
                </span>
                <span className="mt-1.5 text-pretty text-sm leading-6 text-ink/75">
                  {detail}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="work" className="shell py-16 sm:py-24">
        <SectionHeading id="work" label="Selected work" title="Things I've built" />
        <ol className="grid gap-5 md:grid-cols-2">
          {selected.map((project, index) => (
            <li key={project.slug} className="flex">
              <Link
                href={`/work/${project.slug}/`}
                className="glass group flex w-full flex-col p-4 sm:p-5"
              >
                <Thumbnail {...project} />
                <span className="label mt-6 px-3">
                  {String(index + 1).padStart(2, "0")} / {project.tags.join(" · ")}
                </span>
                <span className="mt-4 block px-3 font-display text-3xl font-medium leading-tight tracking-[-0.025em] transition-colors group-hover:text-accent">
                  {project.title}
                </span>
                <span className="mt-3 block max-w-[52ch] px-3 text-pretty leading-7 text-ink/75">
                  {project.summary}
                </span>
                <span className="mt-auto flex items-center justify-between gap-4 px-3 pb-3 pt-7">
                  {project.note ? (
                    <span className="rounded-full bg-accent px-3 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-paper">
                      {project.note}
                    </span>
                  ) : (
                    <span className="text-sm font-medium">Read the case study</span>
                  )}
                  <span
                    aria-hidden="true"
                    className="text-2xl transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <p className="label mt-12">Coursework</p>
        <ul className="mt-4 grid gap-5 sm:grid-cols-3">
          {coursework.map((project) => (
            <li key={project.slug} className="flex">
              <Link href={`/work/${project.slug}/`} className="glass group block w-full p-4">
                <Thumbnail {...project} />
                <span className="mt-4 block px-2 font-medium transition-colors group-hover:text-accent">
                  {project.title}
                </span>
                <span className="mt-2 block px-2 pb-2 text-sm leading-6 text-ink/75">
                  {project.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="open-source" className="shell py-16 sm:py-24">
        <SectionHeading
          id="open-source"
          label={`Open source · ${merged} merged`}
          title="Pull requests, upstream"
        />
        <ul className="glass px-5 sm:px-8">
          {openSource.map((c) => (
            <li
              key={c.url}
              className="grid gap-x-8 gap-y-2 border-b border-ink/10 py-5 last:border-b-0 md:grid-cols-[6.5rem_13rem_1fr_auto] md:items-baseline"
            >
              <span
                className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] ${
                  c.status === "merged" ? "text-accent" : "text-muted"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full border border-current ${
                    c.status === "merged" ? "bg-current" : ""
                  }`}
                />
                {c.status}
              </span>
              <span className="font-medium">{c.project}</span>
              <span className="text-pretty text-sm leading-6 text-ink/75">{c.summary}</span>
              <a
                href={c.url}
                aria-label={`${c.project} pull request ${c.pr}`}
                className="py-1 font-mono text-sm underline decoration-ink/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {c.pr} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-ink/75">
          Statuses checked October 12, 2026.{" "}
          <a
            href={links.allPrs}
            className="text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:text-accent"
          >
            All authored pull requests ↗
          </a>
        </p>
      </section>

      <section aria-labelledby="experience" className="shell py-16 sm:py-24">
        <SectionHeading id="experience" label="Experience" title="Where I've worked" />
        <ol className="space-y-5">
          {experience.map((job) => (
            <li
              key={job.role}
              className="glass grid gap-x-8 gap-y-3 p-7 sm:p-8 md:grid-cols-[11rem_1fr]"
            >
              <p className="label leading-6">
                {job.dates}
                <span className="block normal-case tracking-normal">{job.place}</span>
              </p>
              <div>
                <h3 className="text-lg font-semibold leading-snug">{job.role}</h3>
                <p className="mt-1 text-ink/75">{job.org}</p>
                <ul className="mt-4 max-w-[72ch] space-y-2.5">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-pretty text-[0.95rem] leading-7">
                      <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="about" className="shell py-16 sm:py-24">
        <SectionHeading id="about" label="About" title="Background and toolkit" />
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass space-y-5 text-pretty p-7 leading-7 sm:p-8">
              <p>
                I grew up in Hai Phong, Vietnam, and now study in Lewisburg,
                Pennsylvania. Moving between languages, contexts, and technical
                disciplines made me attentive to how systems communicate, both
                with each other and with the people using them.
              </p>
              <p>
                I like work that crosses boundaries: backend services that need
                a clear interface, interactive products that need reliable
                infrastructure, and data pipelines that eventually have to make
                sense to a person.
              </p>
              <p className="text-ink/75">
                B.S. in Computer Science with a Data Science co-major, Bucknell
                University, 2023–2027. Dean&apos;s Scholarship and Dean&apos;s
                List. I speak Vietnamese, English, and Mandarin.
              </p>
          </div>
          <dl className="glass px-7 py-3 sm:px-8">
            {toolkit.map(({ label, items }) => (
              <div key={label} className="border-b border-ink/10 py-5 last:border-b-0">
                <dt className="label">{label}</dt>
                <dd className="mt-2 text-sm leading-6">{items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
