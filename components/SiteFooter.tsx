import { links } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer id="contact" className="shell pb-6 pt-8">
      <div className="rounded-[2rem] border border-white/15 bg-ink/85 px-6 py-16 text-paper shadow-[0_18px_50px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:px-12 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-paper/60">
          Contact
        </p>
        <h2 className="mt-6 max-w-[16ch] text-balance font-display text-[clamp(2.4rem,6vw,4.75rem)] font-medium leading-[1] tracking-[-0.035em]">
          Hiring for 2027? Let&apos;s talk.
        </h2>
        <p className="mt-6 max-w-[52ch] text-pretty text-lg leading-8 text-paper/75">
          I&apos;m looking for new-grad software engineering roles, especially
          backend, data, and AI engineering, starting after my May 2027
          graduation.
        </p>
        <a
          href={`mailto:${links.email}`}
          className="mt-10 inline-block break-all border-b-2 border-accent pb-1 font-display text-2xl transition-colors hover:border-paper sm:text-4xl"
        >
          {links.email}
        </a>
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-paper/15 pt-6 text-sm text-paper/75">
          <a href={links.linkedin} className="py-2 transition-colors hover:text-paper">
            LinkedIn ↗
          </a>
          <a href={links.github} className="py-2 transition-colors hover:text-paper">
            GitHub ↗
          </a>
          <a href={links.resume} className="py-2 transition-colors hover:text-paper">
            Résumé (PDF) ↗
          </a>
          <span className="sm:ml-auto">Lewisburg, Pennsylvania</span>
        </div>
      </div>
    </footer>
  );
}
