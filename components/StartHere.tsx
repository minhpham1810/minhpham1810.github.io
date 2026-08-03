"use client";

import {
  VscArrowRight,
  VscFilePdf,
  VscGithub,
  VscMail,
} from "react-icons/vsc";

interface StartHereProps {
  onFileClick?: (file: string) => void;
}

const externalLinks = [
  {
    label: "GitHub",
    href: "https://github.com/minhpham1810",
    icon: VscGithub,
  },
  {
    label: "Email",
    href: "mailto:minhpham181004@gmail.com",
    icon: VscMail,
  },
];

export default function StartHere({ onFileClick }: StartHereProps) {
  return (
    <article className="mx-auto w-full min-w-0 max-w-[74rem] overflow-x-hidden px-5 pb-20 pt-10 sm:px-9 sm:pt-14 lg:px-14 lg:pb-28 lg:pt-20">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.55fr)] lg:gap-20">
        <div className="min-w-0">
          <p className="mb-7 max-w-[34ch] text-pretty font-mono text-[0.62rem] font-medium uppercase leading-5 tracking-[0.18em] text-vscode-accent sm:max-w-none sm:text-xs">
            Available for new-grad roles · May 2027
          </p>
          <h1 className="max-w-[12ch] text-balance font-display text-[2.65rem] font-medium leading-[0.94] tracking-[-0.055em] text-[#f0f0e8] sm:text-[clamp(3.8rem,7vw,7.4rem)] sm:leading-[0.88] sm:tracking-[-0.065em]">
            Backend-minded.
            <br />
            Product-aware.
          </h1>
          <p className="mt-8 max-w-[59ch] text-pretty text-base leading-7 text-vscode-textMuted sm:text-lg sm:leading-8">
            I&apos;m Khoa Minh Pham, a full-stack engineer focused on APIs, data
            flow, and software that keeps working beyond the demo.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <button
              type="button"
              onClick={() => onFileClick?.("SpotOn.md")}
              className="group inline-flex items-center gap-3 bg-vscode-accent px-5 py-3 text-sm font-semibold text-[#17120f] transition duration-200 hover:-translate-y-0.5 hover:bg-[#cd735b] active:translate-y-0"
            >
              Review selected work
              <VscArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => onFileClick?.("resume.pdf")}
              className="group inline-flex items-center gap-2 border-b border-vscode-textMuted/60 pb-1 text-sm font-semibold text-vscode-text transition-colors hover:border-vscode-accent hover:text-white"
            >
              <VscFilePdf className="h-4 w-4 text-vscode-accent" />
              Open résumé
            </button>
          </div>
        </div>

        <aside className="min-w-0 border-l border-vscode-border pl-6 lg:mt-10 lg:pl-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-vscode-textMuted">
            Current focus
          </p>
          <p className="mt-4 text-pretty text-base leading-7 text-vscode-text">
            I&apos;m currently sharpening my skills in system design, distributed systems, and evaluation patterns for agentic and retrieval-augmented applications.
          </p>
          <dl className="mt-9 space-y-6 border-t border-vscode-border pt-6">
            <div>
              <dt className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-vscode-textMuted">
                Studying
              </dt>
              <dd className="mt-1.5 leading-6 text-vscode-text">
                Computer Science + Data Science
                <span className="block text-vscode-textMuted">
                  Bucknell University
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-vscode-textMuted">
                Based in
              </dt>
              <dd className="mt-1.5 text-vscode-text">
                Lewisburg, Pennsylvania
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <section
        aria-labelledby="proof-heading"
        className="mt-20 border-t border-vscode-border pt-7 sm:mt-28"
      >
        <h2
          id="proof-heading"
          className="font-mono text-[0.67rem] uppercase tracking-[0.2em] text-vscode-textMuted"
        >
          Proof, not promises
        </h2>
        <div className="mt-7 grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden bg-vscode-border md:grid-cols-[1.2fr_0.8fr]">
          <button
            type="button"
            onClick={() => onFileClick?.("SpotOn.md")}
            className="group bg-vscode-bg p-6 text-left transition-colors duration-200 hover:bg-vscode-surface sm:p-8"
          >
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-vscode-accent">
              Selected build · 01
            </span>
            <span className="mt-5 block font-display text-3xl leading-none tracking-[-0.035em] text-[#eeeee7] sm:text-4xl">
              SpotOn music research platform
            </span>
            <span className="mt-4 block max-w-[52ch] text-sm leading-6 text-vscode-textMuted sm:text-[0.95rem]">
              An AI-powered music research product with Spotify OAuth,
              agentic web research, streamed progress, and sourced reports.
            </span>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-vscode-text">
              Read the case study
              <VscArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </button>

          <div className="bg-vscode-bg p-6 sm:p-8">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-vscode-textMuted">
              Working toolkit
            </span>
            <ul className="mt-5 space-y-3 text-sm text-vscode-text">
              <li className="border-b border-vscode-border pb-3">
                TypeScript · Python · SQL
              </li>
              <li className="border-b border-vscode-border pb-3">
                Next.js · React · FastAPI
              </li>
              <li className="border-b border-vscode-border pb-3">
                PostgreSQL · Docker · AWS
              </li>
              <li>RAG systems · WebSockets · API design</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-vscode-textMuted">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em]">
          Elsewhere
        </span>
        {externalLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 transition-colors hover:text-vscode-text"
          >
            <Icon className="h-4 w-4 text-vscode-accent" />
            {label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => onFileClick?.("contact.md")}
          className="transition-colors hover:text-vscode-text"
        >
          Contact details
        </button>
      </footer>
    </article>
  );
}
