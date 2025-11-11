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
        <div className="flex items-center space-x-2">
          <span className="text-sm">📁</span>
          <span className="text-sm">
            minhpham1810.github.io - Visual Studio Code Version
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="hover:bg-vscode-highlight p-1 rounded">
          <VscChromeMinimize className="w-4 h-4" />
        </button>
        <button className="hover:bg-vscode-highlight p-1 rounded">
          <VscChromeMaximize className="w-4 h-4" />
        </button>
        <button className="hover:bg-red-600 p-1 rounded">
          <VscChromeClose className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
