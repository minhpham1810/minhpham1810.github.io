import type { Metadata } from "next";
import Link from "next/link";
import MarkdownPreview from "@/components/MarkdownPreview";
import { projects } from "@/lib/projects";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  return { title: project?.title, description: project?.summary };
}

export default function CaseStudy({ params }: Props) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main-content">
      <div className="shell grid gap-x-8 gap-y-6 py-14 sm:py-20 md:grid-cols-[11rem_1fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <Link href="/#work" className="label transition-colors hover:text-accent">
            ← All work
          </Link>
          <p className="mt-6 hidden font-mono text-xs leading-6 text-muted md:block">
            {project.tags.join(" · ")}
          </p>
        </div>
        <div className="glass min-w-0 px-6 py-8 sm:px-12 sm:py-12">
          <MarkdownPreview content={project.content} />
        </div>
      </div>
      <div className="shell pb-10">
        <Link href={`/work/${next.slug}/`} className="glass group block p-7 sm:p-10">
          <span className="label">Next project</span>
          <span className="mt-3 block font-display text-3xl font-medium tracking-[-0.025em] transition-colors group-hover:text-accent sm:text-4xl">
            {next.title} →
          </span>
        </Link>
      </div>
    </main>
  );
}
