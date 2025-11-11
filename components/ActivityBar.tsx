"use client";

import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscAccount,
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
    <div className="w-12 bg-vscode-activityBar flex flex-col items-center py-2 border-r border-vscode-border">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`w-12 h-12 flex items-center justify-center hover:bg-vscode-highlight transition-colors ${
              activeItem === item.id ? "border-l-2 border-vscode-statusBar" : ""
            }`}
            title={item.label}
          >
            <Icon className="w-6 h-6" />
          </button>
        );
      })}
      <div className="flex-1" />
      <button className="w-12 h-12 flex items-center justify-center hover:bg-vscode-highlight transition-colors">
        <VscAccount className="w-6 h-6" />
      </button>
    </div>
  );
}
