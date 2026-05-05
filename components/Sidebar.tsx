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

const getFileIcon = (fileName: string) => {
  if (fileName.endsWith(".md")) {
    return <VscMarkdown className="w-4 h-4 mr-2 text-blue-400 shrink-0" />;
  }
  if (fileName.endsWith(".pdf")) {
    return <VscFilePdf className="w-4 h-4 mr-2 text-red-400 shrink-0" />;
  }
  return <VscFile className="w-4 h-4 mr-2 shrink-0" />;
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
    "experience.md": "file",
    "resume.pdf": "file",
    my_work: {
      type: "folder",
      children: {
        "oira-chatbot.md": "file",
        "kalmus-web.md": "file",
        "SpotOn.md": "file",
        "FeelBit.md": "file",
        "ecommerce-ml.md": "file",
        "architecture-of-sleep.md": "file",
        "portfolio-website.md": "file",
      },
    },
    "skills.md": "file",
    "contact.md": "file",
  };

  const renderFileTree = (structure: any, path: string = "") => {
    return Object.entries(structure).map(([name, item]) => {
      const fullPath = path ? `${path}/${name}` : name;

      if (
        typeof item === "object" &&
        item !== null &&
        "type" in item &&
        item.type === "folder"
      ) {
        const isExpanded = expandedFolders.has(fullPath);
        return (
          <div key={fullPath}>
            <div
              className="flex items-center hover:bg-vscode-highlight cursor-pointer py-0.5 px-2 transition-colors duration-100"
              onClick={() => toggleFolder(fullPath)}
            >
              {isExpanded ? (
                <VscChevronDown className="w-4 h-4 mr-1 shrink-0" />
              ) : (
                <VscChevronRight className="w-4 h-4 mr-1 shrink-0" />
              )}
              {isExpanded ? (
                <VscFolderOpened className="w-4 h-4 mr-2 text-yellow-500 shrink-0" />
              ) : (
                <VscFolder className="w-4 h-4 mr-2 text-yellow-500 shrink-0" />
              )}
              <span className="text-sm">{name}</span>
            </div>
            {/* Animated folder children with indent guide */}
            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="ml-4 border-l border-vscode-border/20 pl-1">
                {renderFileTree((item as any).children, fullPath)}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div
          key={fullPath}
          className="flex items-center hover:bg-vscode-highlight cursor-pointer py-0.5 px-2 pl-6 transition-colors duration-100"
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
            className="flex items-center cursor-pointer py-0.5 px-2 hover:bg-vscode-highlight transition-colors duration-100"
            onClick={() => toggleFolder("root")}
          >
            {expandedFolders.has("root") ? (
              <VscChevronDown className="w-4 h-4 mr-1" />
            ) : (
              <VscChevronRight className="w-4 h-4 mr-1" />
            )}
            <span className="text-sm font-semibold">MINH&apos;S PORTFOLIO</span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              expandedFolders.has("root")
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="ml-2">
              {renderFileTree(fileStructure)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
