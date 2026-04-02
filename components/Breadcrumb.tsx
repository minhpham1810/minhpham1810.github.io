"use client";

import { VscChevronRight } from "react-icons/vsc";

const filePaths: Record<string, string[]> = {
  "README.md": ["MINH'S PORTFOLIO", "README.md"],
  "about.md": ["MINH'S PORTFOLIO", "about.md"],
  "experience.md": ["MINH'S PORTFOLIO", "experience.md"],
  "skills.md": ["MINH'S PORTFOLIO", "skills.md"],
  "contact.md": ["MINH'S PORTFOLIO", "contact.md"],
  "resume.pdf": ["MINH'S PORTFOLIO", "resume.pdf"],
  "portfolio-website.md": ["MINH'S PORTFOLIO", "projects", "portfolio-website.md"],
  "SpotOn.md": ["MINH'S PORTFOLIO", "projects", "SpotOn.md"],
  "FeelBit.md": ["MINH'S PORTFOLIO", "projects", "FeelBit.md"],
  "ecommerce-ml.md": ["MINH'S PORTFOLIO", "projects", "ecommerce-ml.md"],
};

export default function Breadcrumb({ activeTab }: { activeTab: string }) {
  const segments = filePaths[activeTab] ?? [activeTab];
  return (
    <div className="h-7 bg-vscode-editor border-b border-vscode-border flex items-center px-4 text-xs text-vscode-textMuted overflow-hidden">
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
    </div>
  );
}
