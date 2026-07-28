"use client";

import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscGithub,
} from "react-icons/vsc";

interface ActivityBarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export default function ActivityBar({
  activeItem,
  onItemClick,
}: ActivityBarProps) {
  const items = [
    { id: "files", icon: VscFiles, label: "Explorer" },
    { id: "search", icon: VscSearch, label: "Search" },
    { id: "git", icon: VscSourceControl, label: "Source Control" },
    { id: "debug", icon: VscDebugAlt, label: "Run and Debug" },
    { id: "extensions", icon: VscExtensions, label: "Extensions" },
  ];

  return (
    <nav
      aria-label="Workspace tools"
      className="flex w-10 shrink-0 flex-col items-center border-r border-vscode-border bg-vscode-activityBar py-2 sm:w-11"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemClick(item.id)}
            aria-label={item.label}
            aria-pressed={isActive}
            className={`group relative flex h-10 w-10 items-center justify-center transition-colors duration-200 hover:bg-vscode-highlight sm:h-11 sm:w-11 ${
              isActive ? "text-vscode-text" : "text-vscode-textMuted"
            }`}
            title={item.label}
          >
            {isActive && (
              <span className="absolute inset-y-2 left-0 w-0.5 bg-vscode-accent" />
            )}
            <Icon
              className={`h-5 w-5 transition-all duration-200 ${
                isActive
                  ? "opacity-100"
                  : "opacity-55 group-hover:opacity-90"
              }`}
            />
          </button>
        );
      })}
      <div className="flex-1" />
      <a
        href="https://github.com/minhpham1810"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Minh Pham's GitHub"
        title="GitHub"
        className="group flex h-10 w-10 items-center justify-center text-vscode-textMuted transition-colors duration-200 hover:bg-vscode-highlight hover:text-vscode-text sm:h-11 sm:w-11"
      >
        <VscGithub className="h-5 w-5 opacity-60 transition-opacity group-hover:opacity-100" />
      </a>
    </nav>
  );
}
