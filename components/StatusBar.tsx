"use client";

import {
  VscSourceControl,
  VscError,
  VscWarning,
  VscBell,
} from "react-icons/vsc";

export default function StatusBar() {
  return (
    <div className="h-6 bg-vscode-statusBar flex items-center justify-between px-2 text-xs">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
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
      <div className="flex items-center space-x-4">
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>Markdown</span>
        <VscBell className="w-4 h-4" />
      </div>
    </div>
  );
}
