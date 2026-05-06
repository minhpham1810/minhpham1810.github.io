"use client";

import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
} from "react-icons/vsc";

export default function TitleBar() {
  return (
    <div className="h-8 shrink-0 border-b border-vscode-border bg-vscode-activityBar px-2 select-none">
      <div className="flex h-full min-w-0 items-center space-x-3 sm:space-x-4">
        <div className="flex items-center space-x-1.5 group">
          <button className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57]">
            <VscChromeClose className="h-2 w-2 text-black/60 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          </button>
          <button className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ffbd2e]">
            <VscChromeMinimize className="h-2 w-2 text-black/60 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          </button>
          <button className="flex h-3 w-3 items-center justify-center rounded-full bg-[#28c940]">
            <VscChromeMaximize className="h-2 w-2 text-black/60 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          </button>
        </div>
        <div className="flex min-w-0 items-center space-x-2">
          <span className="hidden text-sm sm:inline">VS</span>
          <span className="truncate text-xs sm:text-sm">
            minhpham1810.github.io - Visual Studio Code Version
          </span>
        </div>
      </div>
    </div>
  );
}
