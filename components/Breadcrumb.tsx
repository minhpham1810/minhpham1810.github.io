"use client";

import { VscChevronRight } from "react-icons/vsc";

const filePaths: Record<string, string[]> = {
  "README.md": ["minhpham.dev", "start-here.md"],
  "about.md": ["minhpham.dev", "about.md"],
  "experience.md": ["minhpham.dev", "experience.md"],
  "skills.md": ["minhpham.dev", "skills.md"],
  "contact.md": ["minhpham.dev", "contact.md"],
  "resume.pdf": ["minhpham.dev", "resume.pdf"],
};

const projectFiles = new Set([
  "oira-chatbot.md",
  "kalmus-web.md",
  "SpotOn.md",
  "secure-auth.md",
  "ecommerce-ml.md",
  "architecture-of-sleep.md",
  "FeelBit.md",
  "portfolio-website.md",
]);

export default function Breadcrumb({ activeTab }: { activeTab: string }) {
  const segments =
    filePaths[activeTab] ??
    (projectFiles.has(activeTab)
      ? ["minhpham.dev", "selected-work", activeTab]
      : ["minhpham.dev", activeTab]);
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex h-7 items-center overflow-hidden border-b border-vscode-border bg-vscode-editor px-4 font-mono text-[0.63rem] text-vscode-textMuted"
    >
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center shrink-0">
          {i > 0 && (
            <VscChevronRight className="w-3 h-3 mx-1 opacity-40 shrink-0" />
          )}
          <span className={i === segments.length - 1 ? "text-vscode-text" : ""}>
            {seg}
          </span>
        </span>
      ))}
    </nav>
  );
}
