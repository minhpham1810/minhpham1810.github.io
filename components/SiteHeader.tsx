import Link from "next/link";
import { links } from "@/lib/site";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#open-source", label: "Open source" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-3 z-40 px-3 sm:px-6">
      <div className="glass mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 rounded-full pl-6 pr-2">
        <Link href="/" className="font-display text-xl font-medium tracking-[-0.02em]">
          Khoa Minh Pham
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hidden py-2 text-muted transition-colors hover:text-ink md:inline"
            >
              {label}
            </Link>
          ))}
          <a
            href={links.resume}
            className="rounded-full bg-ink px-5 py-2.5 font-medium text-paper transition-colors hover:bg-accent"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
