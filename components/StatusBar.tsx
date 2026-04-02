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
    <div className="h-6 bg-vscode-statusBar flex items-center justify-between px-2 text-xs">
      <div className="flex items-center space-x-1">
        <div className="flex items-center space-x-1 px-2 hover:bg-white/10 cursor-pointer transition-colors rounded-sm">
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
      <div className="flex items-center space-x-3">
        <span className="flex items-center gap-1">
          Ln 1, Col 1<span className="cursor-blink" />
        </span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>{getLanguage(activeTab)}</span>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded cursor-pointer transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>Go Live</span>
        </div>
        <VscBell className="w-4 h-4" />
      </div>
    </div>
  );
}
