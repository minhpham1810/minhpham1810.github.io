"use client";

import {
  VscSourceControl,
  VscError,
  VscWarning,
  VscBell,
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
    <div className="h-6 shrink-0 bg-vscode-statusBar px-2 text-[11px] sm:text-xs">
      <div className="flex h-full items-center justify-between gap-2">
        <div className="flex min-w-0 items-center space-x-1 overflow-hidden">
          <div className="flex cursor-pointer items-center space-x-1 rounded-sm px-2 transition-colors hover:bg-white/10">
            <VscSourceControl className="w-4 h-4" />
            <span>main</span>
          </div>
          <div className="flex items-center space-x-1">
            <VscError className="w-4 h-4" />
            <span>0</span>
          </div>
          <div className="flex items-center space-x-1">
            <VscWarning className="w-4 h-4" />
            <span>0</span>
          </div>
        </div>
        <div className="flex min-w-0 items-center space-x-2 overflow-hidden sm:space-x-3">
          <span className="hidden items-center gap-1 sm:flex">
            Ln 1, Col 1<span className="cursor-blink" />
          </span>
          <span className="hidden md:inline">Spaces: 2</span>
          <span className="hidden md:inline">UTF-8</span>
          <span>{getLanguage(activeTab)}</span>
          <div className="hidden cursor-pointer items-center gap-1 rounded bg-white/10 px-2 py-0.5 transition-colors hover:bg-white/20 sm:flex">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>Go Live</span>
          </div>
          <VscBell className="hidden w-4 h-4 sm:block" />
        </div>
      </div>
    </div>
  );
}
