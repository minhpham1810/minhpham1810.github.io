"use client";

import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
} from "react-icons/vsc";

export default function TitleBar() {
  return (
    <div className="h-8 bg-vscode-activityBar flex items-center justify-between px-2 select-none border-b border-vscode-border">
      <div className="flex items-center space-x-4">
        {/* macOS-style traffic light buttons */}
        <div className="flex items-center space-x-1.5 group">
          <button className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center">
            <VscChromeClose className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
          </button>
          <button className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center">
            <VscChromeMinimize className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
          </button>
          <button className="w-3 h-3 rounded-full bg-[#28c940] flex items-center justify-center">
            <VscChromeMaximize className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">📁</span>
          <span className="text-sm">
            minhpham1810.github.io - Visual Studio Code Version
          </span>
        </div>
      </div>
    </div>
  );
}
