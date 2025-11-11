"use client";

import {
  VscChevronRight,
  VscChevronDown,
  VscFile,
  VscFolder,
  VscFolderOpened,
  VscMarkdown,
  VscFilePdf,
} from "react-icons/vsc";
import { useState } from "react";

interface SidebarProps {
  activeItem: string;
  onFileClick: (file: string) => void;
}

// Helper function to get file icon based on extension
const getFileIcon = (fileName: string) => {
  if (fileName.endsWith(".md")) {
    return <VscMarkdown className="w-4 h-4 mr-2 text-blue-400" />;
  }
  if (fileName.endsWith(".pdf")) {
    return <VscFilePdf className="w-4 h-4 mr-2 text-red-400" />;
  }
  return <VscFile className="w-4 h-4 mr-2" />;
};

export default function Sidebar({ activeItem, onFileClick }: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["root"])
  );

  const toggleFolder = (folder: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder);
    } else {
      newExpanded.add(folder);
    }
    setExpandedFolders(newExpanded);
  };

  if (activeItem !== "files") {
    return (
      <div className="w-64 bg-vscode-sidebar border-r border-vscode-border p-4">
        <div className="text-vscode-textMuted text-xs uppercase mb-2">
          {activeItem === "search" && "Search"}
          {activeItem === "git" && "Source Control"}
          {activeItem === "debug" && "Run and Debug"}
          {activeItem === "extensions" && "Extensions"}
        </div>
        <div className="text-vscode-textMuted text-sm">
          {activeItem === "search" && "Search features coming soon..."}
          {activeItem === "git" && "No source control providers registered."}
          {activeItem === "debug" && "No debug configurations available."}
          {activeItem === "extensions" && "No extensions installed."}
        </div>
      </div>
    );
  }

  const fileStructure = {
    "README.md": "file",
    "about.md": "file",
    "resume.pdf": "file",
    projects: {
      type: "folder",
      children: {
        "portfolio-website.md": "file",
        "SpotOn.md": "file",
        "FeelBit.md": "file",
      },
    },
    "skills.md": "file",
    "contact.md": "file",
  };

  const renderFileTree = (structure: any, path: string = "") => {
    return Object.entries(structure).map(([name, item]) => {
      const fullPath = path ? `${path}/${name}` : name;

      if (typeof item === "object" && item.type === "folder") {
        const isExpanded = expandedFolders.has(fullPath);
        return (
          <div key={fullPath}>
            <div
              className="flex items-center hover:bg-vscode-highlight cursor-pointer py-0.5 px-2"
              onClick={() => toggleFolder(fullPath)}
            >
              {isExpanded ? (
                <VscChevronDown className="w-4 h-4 mr-1" />
              ) : (
                <VscChevronRight className="w-4 h-4 mr-1" />
              )}
              {isExpanded ? (
                <VscFolderOpened className="w-4 h-4 mr-2 text-yellow-500" />
              ) : (
                <VscFolder className="w-4 h-4 mr-2 text-yellow-500" />
              )}
              <span className="text-sm">{name}</span>
            </div>
            {isExpanded && (
              <div className="ml-4">
                {renderFileTree(item.children, fullPath)}
              </div>
            )}
          </div>
        );
      }

      return (
        <div
          key={fullPath}
          className="flex items-center hover:bg-vscode-highlight cursor-pointer py-0.5 px-2 pl-6"
          onClick={() => onFileClick(name)}
        >
          {getFileIcon(name)}
          <span className="text-sm">{name}</span>
        </div>
      );
    });
  };

  return (
    <div className="w-64 bg-vscode-sidebar border-r border-vscode-border">
      <div className="p-2">
        <div className="text-xs uppercase text-vscode-textMuted mb-2 px-2">
          Explorer
        </div>
        <div className="mb-4">
          <div
            className="flex items-center cursor-pointer py-0.5 px-2"
            onClick={() => toggleFolder("root")}
          >
            {expandedFolders.has("root") ? (
              <VscChevronDown className="w-4 h-4 mr-1" />
            ) : (
              <VscChevronRight className="w-4 h-4 mr-1" />
            )}
            <span className="text-sm font-semibold">MINH'S PORTFOLIO</span>
          </div>
          {expandedFolders.has("root") && (
            <div className="ml-2">{renderFileTree(fileStructure)}</div>
          )}
        </div>
      </div>
    </div>
  );
}
