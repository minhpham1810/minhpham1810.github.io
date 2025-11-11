"use client";

import { VscClose, VscOpenPreview, VscCode } from "react-icons/vsc";
import { useState, useEffect } from "react";
import FileContent from "./FileContent";

interface EditorProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  openTabs: string[];
  onCloseTab: (tab: string) => void;
  previewTrigger?: number;
  onFileClick?: (file: string) => void;
}

export default function Editor({
  activeTab,
  onTabChange,
  openTabs,
  onCloseTab,
  previewTrigger,
  onFileClick,
}: EditorProps) {
  const [previewMode, setPreviewMode] = useState<
    Record<string, "code" | "preview" | "split">
  >({});

  // Handle keyboard shortcut trigger
  useEffect(() => {
    if (previewTrigger && activeTab && isMarkdownFile(activeTab)) {
      togglePreviewMode(activeTab);
    }
  }, [previewTrigger]);

  // Initialize new markdown files to preview mode
  useEffect(() => {
    openTabs.forEach((tab) => {
      if (isMarkdownFile(tab) && !(tab in previewMode)) {
        setPreviewMode((prev) => ({ ...prev, [tab]: "preview" }));
      }
    });
  }, [openTabs]);

  const getPreviewMode = (tab: string) => {
    // Default to preview for markdown files, code for others
    if (tab in previewMode) {
      return previewMode[tab];
    }
    return isMarkdownFile(tab) ? "preview" : "code";
  };

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

  const handleCloseClick = (e: React.MouseEvent, tab: string) => {
    e.stopPropagation(); // Prevent tab from becoming active when closing
    onCloseTab(tab);
  };

  const handleMiddleClick = (e: React.MouseEvent, tab: string) => {
    // Middle mouse button (wheel click) to close tab, like in real VS Code
    if (e.button === 1) {
      e.preventDefault();
      onCloseTab(tab);
    }
  };

  const isMarkdownFile = (filename: string) => filename.endsWith(".md");

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
                  className={`flex items-center px-3 py-2 cursor-pointer border-r border-vscode-border min-w-fit group relative ${
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

      {/* Editor Content */}
      <div className="flex-1 overflow-auto">
        {activeTab ? (
          <FileContent
            filename={activeTab}
            previewMode={
              isMarkdownFile(activeTab) ? getPreviewMode(activeTab) : "code"
            }
            onFileClick={onFileClick}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-vscode-textMuted">
            <div className="text-center">
              <p className="text-2xl mb-2">No file open</p>
              <p className="text-sm">
                Select a file from the explorer to open it
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
