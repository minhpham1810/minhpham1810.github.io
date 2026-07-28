"use client";

import {
  VscSourceControl,
  VscBriefcase,
  VscFilePdf,
} from "react-icons/vsc";

interface StatusBarProps {
  activeTab?: string;
}

export default function StatusBar({ activeTab }: StatusBarProps) {
  const getLanguage = (tab?: string) => {
    if (!tab) return "Plain Text";
    if (tab.endsWith(".md")) return "Markdown";
    if (tab.endsWith(".pdf")) return "PDF";
    if (tab.endsWith(".ts") || tab.endsWith(".tsx")) return "TypeScript";
    return "Plain Text";
  };

  return (
    <footer className="h-6 shrink-0 bg-vscode-statusBar px-2 font-mono text-[10px] text-[#17120f] sm:text-[11px]">
      <div className="flex h-full items-center justify-between gap-2">
        <div className="flex min-w-0 items-center space-x-1 overflow-hidden">
          <div className="flex items-center space-x-1 px-1 sm:px-2">
            <VscSourceControl className="h-3.5 w-3.5" />
            <span>main</span>
          </div>
          <div className="hidden items-center gap-1 sm:flex">
            <VscBriefcase className="h-3.5 w-3.5" />
            <span>open to new-grad roles</span>
          </div>
        </div>
        <div className="flex min-w-0 items-center space-x-2 overflow-hidden sm:space-x-3">
          <span className="hidden md:inline">May 2027</span>
          <span>{getLanguage(activeTab)}</span>
          <span className="hidden items-center gap-1 sm:flex">
            <VscFilePdf className="h-3.5 w-3.5" />
            resume.pdf
          </span>
        </div>
      </div>
    </footer>
  );
}
