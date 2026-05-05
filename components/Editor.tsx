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
    <div className="flex-1 flex flex-col bg-vscode-editor">
      {/* Tabs */}
      <div className="flex bg-vscode-tabInactive border-b border-vscode-border overflow-x-auto">
        {openTabs.length > 0
          ? openTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <div
                  key={tab}
                  className={`flex items-center px-3 py-2 cursor-pointer border-r border-vscode-border min-w-fit group relative transition-colors duration-100 ${
                    isActive
                      ? "bg-vscode-tabActive border-t-2 border-t-vscode-statusBar"
                      : "bg-vscode-tabInactive hover:bg-vscode-highlight"
                  }`}
                  onClick={() => onTabChange(tab)}
                  onMouseDown={(e) => handleMiddleClick(e, tab)}
                >
                  <span className="text-sm mr-2">{tab}</span>
                  <button
                    className={`${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    } hover:bg-vscode-border rounded p-0.5 transition-all`}
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
        <div className="flex items-center justify-end px-4 py-1 bg-vscode-sidebar border-b border-vscode-border">
          <div className="flex items-center gap-2">
            <button
              onClick={() => togglePreviewMode(activeTab)}
              className="flex items-center gap-2 px-3 py-1 text-xs hover:bg-vscode-highlight rounded transition-colors"
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
      <div className="relative flex-1 overflow-hidden">
        {activeTab ? (
          <div key={activeTab} className="editor-fade-in h-full flex flex-1 overflow-hidden">
            <div ref={scrollRef} className="flex-1 overflow-y-auto relative">
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
          <div className="flex items-center justify-center h-full bg-vscode-editor select-none relative overflow-hidden">
            {/* Background watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[18rem] font-bold text-white/[0.025] tracking-widest font-mono leading-none">
                MP
              </span>
            </div>
            {/* Foreground content */}
            <div className="relative z-10 text-center max-w-md px-8">
              <div className="text-4xl font-bold text-white/20 mb-1 font-mono tracking-wider">
                Minh Pham
              </div>
              <div className="text-xs text-vscode-textMuted mb-10 tracking-widest uppercase">
                Software Developer
              </div>
              <div className="grid grid-cols-2 gap-6 text-left mb-8">
                <div>
                  <p className="text-xs uppercase text-vscode-textMuted tracking-widest mb-3 font-semibold">
                    Start
                  </p>
                  {quickOpenFiles
                    .filter((f) => f.col === "start")
                    .map((f) => (
                      <button
                        key={f.name}
                        onClick={() => onFileClick?.(f.name)}
                        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors mb-2 w-full text-left"
                      >
                        <VscFile className="w-3.5 h-3.5 shrink-0" />
                        <span>{f.name}</span>
                      </button>
                    ))}
                </div>
                <div>
                  <p className="text-xs uppercase text-vscode-textMuted tracking-widest mb-3 font-semibold">
                    Recent
                  </p>
                  {quickOpenFiles
                    .filter((f) => f.col === "recent")
                    .map((f) => (
                      <button
                        key={f.name}
                        onClick={() => onFileClick?.(f.name)}
                        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors mb-2 w-full text-left"
                      >
                        <VscFile className="w-3.5 h-3.5 shrink-0" />
                        <span>{f.name}</span>
                      </button>
                    ))}
                </div>
              </div>
              <div className="border-t border-vscode-border/50 pt-5 text-xs text-vscode-textMuted">
                <kbd className="bg-vscode-activityBar border border-vscode-border px-1.5 py-0.5 rounded font-mono">
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
