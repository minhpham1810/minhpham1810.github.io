"use client";

import { useState } from "react";
import {
  VscChevronDown,
  VscChevronRight,
  VscFile,
  VscFilePdf,
  VscFolder,
  VscFolderOpened,
  VscMarkdown,
} from "react-icons/vsc";

interface SidebarProps {
  activeItem: string;
  activeFile: string;
  onFileClick: (file: string) => void;
  isOpen: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

type FileEntry = {
  type: "file";
  name: string;
  label?: string;
};

type FolderEntry = {
  type: "folder";
  name: string;
  label: string;
  children: FileEntry[];
};

type TreeEntry = FileEntry | FolderEntry;

const portfolioFiles: TreeEntry[] = [
  { type: "file", name: "README.md", label: "start-here.md" },
  { type: "file", name: "experience.md" },
  {
    type: "folder",
    name: "selected-work",
    label: "selected-work",
    children: [
      { type: "file", name: "SpotOn.md" },
      { type: "file", name: "FeelBit.md" },
      { type: "file", name: "kalmus-web.md" },
      { type: "file", name: "oira-chatbot.md" },
      { type: "file", name: "secure-auth.md" },
      { type: "file", name: "ecommerce-ml.md" },
      { type: "file", name: "architecture-of-sleep.md" },
      { type: "file", name: "portfolio-website.md" },
    ],
  },
  { type: "file", name: "skills.md" },
  { type: "file", name: "resume.pdf" },
  { type: "file", name: "about.md" },
  { type: "file", name: "contact.md" },
];

function FileIcon({ name }: { name: string }) {
  if (name.endsWith(".md")) {
    return <VscMarkdown className="h-4 w-4 shrink-0 text-vscode-accent/80" />;
  }
  if (name.endsWith(".pdf")) {
    return <VscFilePdf className="h-4 w-4 shrink-0 text-[#c98d79]" />;
  }
  return <VscFile className="h-4 w-4 shrink-0 text-vscode-textMuted" />;
}

const panelCopy: Record<string, { title: string; body: string; hint: string }> = {
  search: {
    title: "Search",
    body: "Search the open document or jump straight to a portfolio file.",
    hint: "Ctrl+F · document  /  Ctrl+P · files",
  },
  git: {
    title: "Source control",
    body: "This portfolio is built in public. The source and build history are available on GitHub.",
    hint: "github.com/minhpham1810",
  },
  debug: {
    title: "Run and debug",
    body: "There is nothing staged to run here. Open a case study to inspect the system behind each build.",
    hint: "selected-work/",
  },
  extensions: {
    title: "Workspace stack",
    body: "Next.js 14, TypeScript, Tailwind CSS, React, and a small custom Markdown renderer.",
    hint: "No template UI kit installed",
  },
};

export default function Sidebar({
  activeItem,
  activeFile,
  onFileClick,
  isOpen,
  isMobile = false,
  onClose,
}: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState(
    new Set(["root", "selected-work"])
  );

  if (!isOpen) return null;

  const toggleFolder = (folder: string) => {
    setExpandedFolders((current) => {
      const next = new Set(current);
      next.has(folder) ? next.delete(folder) : next.add(folder);
      return next;
    });
  };

  const sidebarClassName = `bg-vscode-sidebar border-r border-vscode-border ${
    isMobile
      ? "absolute inset-y-0 left-0 z-30 w-[min(18rem,calc(100vw-2.5rem))] shadow-[20px_0_50px_rgba(5,7,5,0.45)]"
      : "w-[15.5rem] shrink-0"
  }`;

  if (activeItem !== "files") {
    const panel = panelCopy[activeItem] ?? panelCopy.search;
    return (
      <aside className={`${sidebarClassName} overflow-y-auto p-5`}>
        <div className="mb-10 flex items-center justify-between">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-vscode-textMuted">
            {panel.title}
          </p>
          {isMobile && (
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-vscode-textMuted transition-colors hover:text-vscode-text"
            >
              Close
            </button>
          )}
        </div>
        <p className="text-pretty text-sm leading-6 text-vscode-text">
          {panel.body}
        </p>
        <p className="mt-5 border-t border-vscode-border pt-4 font-mono text-[0.66rem] leading-5 text-vscode-textMuted">
          {panel.hint}
        </p>
      </aside>
    );
  }

  const renderFile = (entry: FileEntry, nested = false) => {
    const isActive = activeFile === entry.name;
    return (
      <button
        key={entry.name}
        type="button"
        aria-current={isActive ? "page" : undefined}
        onClick={() => onFileClick(entry.name)}
        className={`group flex w-full items-center gap-2 py-1.5 pr-2 text-left text-[0.78rem] transition-colors ${
          nested ? "pl-9" : "pl-6"
        } ${
          isActive
            ? "bg-vscode-highlight text-[#f0f0e8]"
            : "text-vscode-textMuted hover:bg-vscode-highlight/70 hover:text-vscode-text"
        }`}
      >
        <FileIcon name={entry.name} />
        <span className="truncate">{entry.label ?? entry.name}</span>
        {isActive && (
          <span className="ml-auto h-1 w-1 shrink-0 bg-vscode-accent" />
        )}
      </button>
    );
  };

  return (
    <aside className={`${sidebarClassName} overflow-y-auto`}>
      <div className="flex min-h-11 items-center justify-between px-4">
        <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-vscode-textMuted">
          Portfolio
        </p>
        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-vscode-textMuted transition-colors hover:text-vscode-text"
          >
            Close
          </button>
        )}
      </div>

      <button
        type="button"
        aria-expanded={expandedFolders.has("root")}
        onClick={() => toggleFolder("root")}
        className="flex w-full items-center gap-1 border-y border-vscode-border px-3 py-2 text-left font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-vscode-text transition-colors hover:bg-vscode-highlight/70"
      >
        {expandedFolders.has("root") ? (
          <VscChevronDown className="h-4 w-4" />
        ) : (
          <VscChevronRight className="h-4 w-4" />
        )}
        minhpham.dev
      </button>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-200 ${
          expandedFolders.has("root")
            ? "max-h-[60rem] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {portfolioFiles.map((entry) => {
          if (entry.type === "file") return renderFile(entry);

          const isExpanded = expandedFolders.has(entry.name);
          return (
            <div key={entry.name}>
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => toggleFolder(entry.name)}
                className="flex w-full items-center gap-1 py-1.5 pl-4 pr-2 text-left text-[0.78rem] text-vscode-textMuted transition-colors hover:bg-vscode-highlight/70 hover:text-vscode-text"
              >
                {isExpanded ? (
                  <VscChevronDown className="h-4 w-4 shrink-0" />
                ) : (
                  <VscChevronRight className="h-4 w-4 shrink-0" />
                )}
                {isExpanded ? (
                  <VscFolderOpened className="h-4 w-4 shrink-0 text-[#b7a875]" />
                ) : (
                  <VscFolder className="h-4 w-4 shrink-0 text-[#b7a875]" />
                )}
                <span>{entry.label}</span>
                <span className="ml-auto font-mono text-[0.6rem] text-vscode-textMuted/60">
                  {entry.children.length}
                </span>
              </button>
              <div
                className={`overflow-hidden border-l border-vscode-border/60 transition-[max-height,opacity] duration-200 ${
                  isExpanded
                    ? "ml-5 max-h-[40rem] opacity-100"
                    : "ml-5 max-h-0 opacity-0"
                }`}
              >
                {entry.children.map((child) => renderFile(child, true))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
