"use client";

import { VscClose, VscOpenPreview, VscCode, VscFile } from "react-icons/vsc";
import { useState, useEffect, useRef } from "react";
import FileContent from "./FileContent";
import Breadcrumb from "./Breadcrumb";
import FindPanel from "./FindPanel";
import Minimap from "./Minimap";

interface EditorProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  openTabs: string[];
  onCloseTab: (tab: string) => void;
  previewTrigger?: number;
  onFileClick?: (file: string) => void;
  findOpen?: boolean;
  findQuery?: string;
  findCase?: boolean;
  findRegex?: boolean;
  findActiveMatch?: number;
  findMatchCount?: number;
  activeContent?: string;
  onFindMatchCountChange?: (n: number) => void;
  onFindClose?: () => void;
  onFindChange?: (q: string) => void;
  onFindNext?: () => void;
  onFindPrev?: () => void;
  onFindToggleCase?: () => void;
  onFindToggleRegex?: () => void;
}

export default function Editor({
  activeTab,
  onTabChange,
  openTabs,
  onCloseTab,
  previewTrigger,
  onFileClick,
  findOpen = false,
  findQuery = "",
  findCase = false,
  findRegex = false,
  findActiveMatch = 0,
  findMatchCount = 0,
  activeContent = "",
  onFindMatchCountChange,
  onFindClose,
  onFindChange,
  onFindNext,
  onFindPrev,
  onFindToggleCase,
  onFindToggleRegex,
}: EditorProps) {
  const [previewMode, setPreviewMode] = useState<
    Record<string, "code" | "preview" | "split">
  >({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const isMarkdownFile = (filename: string) => filename.endsWith(".md");

  const togglePreviewMode = (tab: string) => {
    const currentMode = getPreviewMode(tab);
    const nextMode =
      currentMode === "code"
        ? "preview"
        : currentMode === "preview"
        ? "split"
        : "code";
    setPreviewMode({ ...previewMode, [tab]: nextMode });
  };

  const getPreviewMode = (tab: string) => {
    if (tab in previewMode) {
      return previewMode[tab];
    }
    return isMarkdownFile(tab) ? "preview" : "code";
  };

  useEffect(() => {
    if (previewTrigger && activeTab && isMarkdownFile(activeTab)) {
      togglePreviewMode(activeTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewTrigger]);

  useEffect(() => {
    openTabs.forEach((tab) => {
      if (isMarkdownFile(tab) && !(tab in previewMode)) {
        setPreviewMode((prev) => ({ ...prev, [tab]: "preview" }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openTabs]);

  const handleCloseClick = (e: React.MouseEvent, tab: string) => {
    e.stopPropagation();
    onCloseTab(tab);
  };

  const handleMiddleClick = (e: React.MouseEvent, tab: string) => {
    if (e.button === 1) {
      e.preventDefault();
      onCloseTab(tab);
    }
  };

  const quickOpenFiles = [
    { name: "README.md", col: "start" },
    { name: "about.md", col: "start" },
    { name: "SpotOn.md", col: "recent" },
    { name: "skills.md", col: "recent" },
    { name: "contact.md", col: "recent" },
  ];

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-vscode-editor">
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Open files"
        className="flex min-h-9 overflow-x-auto border-b border-vscode-border bg-vscode-tabInactive"
      >
        {openTabs.length > 0
          ? openTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <div
                  key={tab}
                  className={`group relative flex min-w-fit items-center border-r border-vscode-border transition-colors duration-200 ${
                    isActive
                      ? "bg-vscode-tabActive text-vscode-text"
                      : "bg-vscode-tabInactive text-vscode-textMuted hover:bg-vscode-highlight/70 hover:text-vscode-text"
                  }`}
                  onMouseDown={(e) => handleMiddleClick(e, tab)}
                >
                  {isActive && (
                    <span className="absolute inset-x-0 top-0 h-px bg-vscode-accent" />
                  )}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onTabChange(tab)}
                    className="h-full py-2 pl-3 pr-2 text-xs"
                  >
                    {tab === "README.md" ? "start-here.md" : tab}
                  </button>
                  <button
                    type="button"
                    aria-label={`Close ${tab}`}
                    className={`${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    } mr-2 rounded-sm p-0.5 transition-all hover:bg-vscode-border`}
                    onClick={(e) => handleCloseClick(e, tab)}
                    title="Close (Ctrl+W)"
                  >
                    <VscClose className="w-3 h-3" />
                  </button>
                </div>
              );
            })
          : null}
      </div>

      {/* Toolbar for markdown files */}
      {activeTab && isMarkdownFile(activeTab) && (
        <div className="flex min-h-8 items-center justify-end border-b border-vscode-border bg-vscode-sidebar px-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => togglePreviewMode(activeTab)}
              className="flex items-center gap-2 rounded-sm px-2.5 py-1 text-[0.7rem] text-vscode-textMuted transition-colors hover:bg-vscode-highlight hover:text-vscode-text"
              title="Toggle Preview (Ctrl+Shift+V)"
            >
              {getPreviewMode(activeTab) === "code" && (
                <>
                  <VscOpenPreview className="w-4 h-4" />
                  <span>Preview</span>
                </>
              )}
              {getPreviewMode(activeTab) === "preview" && (
                <>
                  <VscCode className="w-4 h-4" />
                  <span>Split View</span>
                </>
              )}
              {getPreviewMode(activeTab) === "split" && (
                <>
                  <VscCode className="w-4 h-4" />
                  <span>Code Only</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      {activeTab && <Breadcrumb activeTab={activeTab} />}

      {/* Editor Content */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {activeTab ? (
          <div key={activeTab} className="editor-fade-in h-full min-h-0 flex flex-1 overflow-hidden">
            <div
              ref={scrollRef}
              className="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto"
            >
              {findOpen && (
                <FindPanel
                  query={findQuery}
                  onChange={onFindChange!}
                  matchCount={findMatchCount}
                  activeMatch={findActiveMatch}
                  onNext={onFindNext!}
                  onPrev={onFindPrev!}
                  onClose={onFindClose!}
                  caseSensitive={findCase}
                  onToggleCase={onFindToggleCase!}
                  useRegex={findRegex}
                  onToggleRegex={onFindToggleRegex!}
                />
              )}
              <FileContent
                filename={activeTab}
                previewMode={
                  isMarkdownFile(activeTab) ? getPreviewMode(activeTab) : "code"
                }
                onFileClick={onFileClick}
                findQuery={findOpen ? findQuery : ""}
                caseSensitive={findCase}
                useRegex={findRegex}
                activeMatchIndex={findActiveMatch}
                onMatchCountChange={onFindMatchCountChange}
              />
            </div>
            {getPreviewMode(activeTab) !== "split" && (
              <Minimap content={activeContent} scrollRef={scrollRef} />
            )}
          </div>
        ) : (
          <div className="relative flex h-full select-none items-center justify-center overflow-hidden bg-vscode-editor">
            {/* Background watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-display text-[18rem] font-medium leading-none tracking-[-0.08em] text-white/[0.018]">
                MP
              </span>
            </div>
            {/* Foreground content */}
            <div className="relative z-10 max-w-lg px-8 text-left">
              <div className="font-display text-5xl leading-none tracking-[-0.05em] text-white/35">
                The workspace is clear.
              </div>
              <div className="mb-10 mt-3 max-w-sm text-sm leading-6 text-vscode-textMuted">
                Open a document to review work, experience, and the systems
                behind each project.
              </div>
              <div className="grid grid-cols-2 gap-8 text-left">
                <div>
                  <p className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-vscode-textMuted">
                    Start
                  </p>
                  {quickOpenFiles
                    .filter((f) => f.col === "start")
                    .map((f) => (
                      <button
                        key={f.name}
                        onClick={() => onFileClick?.(f.name)}
                        className="mb-2 flex w-full items-center gap-2 text-left text-sm text-vscode-text transition-colors hover:text-vscode-accent"
                      >
                        <VscFile className="w-3.5 h-3.5 shrink-0" />
                        <span>{f.name}</span>
                      </button>
                    ))}
                </div>
                <div>
                  <p className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-vscode-textMuted">
                    Recent
                  </p>
                  {quickOpenFiles
                    .filter((f) => f.col === "recent")
                    .map((f) => (
                      <button
                        key={f.name}
                        onClick={() => onFileClick?.(f.name)}
                        className="mb-2 flex w-full items-center gap-2 text-left text-sm text-vscode-text transition-colors hover:text-vscode-accent"
                      >
                        <VscFile className="w-3.5 h-3.5 shrink-0" />
                        <span>{f.name}</span>
                      </button>
                    ))}
                </div>
              </div>
              <div className="mt-8 border-t border-vscode-border/50 pt-5 text-xs text-vscode-textMuted">
                <kbd className="border border-vscode-border bg-vscode-activityBar px-1.5 py-0.5 font-mono">
                  Ctrl+P
                </kbd>
                <span className="ml-2">to open any file</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
