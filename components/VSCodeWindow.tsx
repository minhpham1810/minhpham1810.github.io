"use client";

import { MouseEvent as ReactMouseEvent, useState, useEffect, useRef } from "react";
import ActivityBar from "./ActivityBar";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import StatusBar from "./StatusBar";
import TitleBar from "./TitleBar";
import Terminal from "./Terminal";
import CommandPalette from "./CommandPalette";

export default function VSCodeWindow() {
  const [activeTab, setActiveTab] = useState("README.md");
  const [activeSidebarItem, setActiveSidebarItem] = useState("files");
  const [openTabs, setOpenTabs] = useState<string[]>(["README.md"]);
  const [previewTrigger, setPreviewTrigger] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteMode, setPaletteMode] = useState<"files" | "commands">("files");
  const [findOpen, setFindOpen] = useState(false);
  const [findQuery, setFindQuery] = useState("");
  const [findCase, setFindCase] = useState(false);
  const [findRegex, setFindRegex] = useState(false);
  const [findMatchCount, setFindMatchCount] = useState(0);
  const [findActiveMatch, setFindActiveMatch] = useState(0);
  const isResizing = useRef(false);

  const handleFileClick = (file: string) => {
    // If file is not already open, add it to openTabs
    if (!openTabs.includes(file)) {
      setOpenTabs([...openTabs, file]);
    }
    // Set as active tab
    setActiveTab(file);
  };

  const handleCloseTab = (file: string) => {
    const newTabs = openTabs.filter((tab) => tab !== file);
    setOpenTabs(newTabs);

    // If closing the active tab, switch to another tab
    if (file === activeTab) {
      if (newTabs.length > 0) {
        // Switch to the tab before the closed one, or the first tab
        const closedIndex = openTabs.indexOf(file);
        const newActiveIndex = closedIndex > 0 ? closedIndex - 1 : 0;
        setActiveTab(newTabs[newActiveIndex]);
      } else {
        setActiveTab("");
      }
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
        return;
      }

      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setPaletteMode("commands");
        setPaletteOpen(true);
        return;
      }

      if (e.ctrlKey && !e.shiftKey && e.key === "p") {
        e.preventDefault();
        setPaletteMode("files");
        setPaletteOpen(true);
        return;
      }

      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        setFindOpen(true);
        return;
      }
      if (e.key === "Escape") {
        if (paletteOpen) {
          setPaletteOpen(false);
          return;
        }
        if (findOpen) {
          setFindOpen(false);
          return;
        }
        if (terminalOpen) {
          setTerminalOpen(false);
          return;
        }
      }

      // Ctrl+W or Cmd+W to close current tab
      if ((e.ctrlKey || e.metaKey) && e.key === "w") {
        e.preventDefault();
        if (activeTab) {
          handleCloseTab(activeTab);
        }
      }

      // Ctrl+Shift+V to toggle preview (for markdown files)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "v") {
        e.preventDefault();
        if (activeTab && activeTab.endsWith(".md")) {
          setPreviewTrigger((prev) => prev + 1);
        }
      }

      // Ctrl+Tab or Ctrl+PageDown to switch to next tab
      if (
        (e.ctrlKey && e.key === "Tab") ||
        (e.ctrlKey && e.key === "PageDown")
      ) {
        e.preventDefault();
        const currentIndex = openTabs.indexOf(activeTab);
        const nextIndex = (currentIndex + 1) % openTabs.length;
        if (openTabs[nextIndex]) {
          setActiveTab(openTabs[nextIndex]);
        }
      }

      // Ctrl+Shift+Tab or Ctrl+PageUp to switch to previous tab
      if (
        (e.ctrlKey && e.shiftKey && e.key === "Tab") ||
        (e.ctrlKey && e.key === "PageUp")
      ) {
        e.preventDefault();
        const currentIndex = openTabs.indexOf(activeTab);
        const prevIndex =
          currentIndex - 1 < 0 ? openTabs.length - 1 : currentIndex - 1;
        if (openTabs[prevIndex]) {
          setActiveTab(openTabs[prevIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, openTabs, paletteOpen, findOpen, terminalOpen]);

  function startResize(e: ReactMouseEvent) {
    e.preventDefault();
    isResizing.current = true;
    const startY = e.clientY;
    const startH = terminalHeight;

    function onMove(ev: MouseEvent) {
      if (!isResizing.current) return;
      setTerminalHeight(Math.max(80, Math.min(600, startH + (startY - ev.clientY))));
    }
    function onUp() {
      isResizing.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  function handlePaletteCommand(action: string) {
    if (action === "openTerminal") {
      setTerminalOpen(true);
    }
    if (action === "closeTab" && activeTab) {
      handleCloseTab(activeTab);
    }
    if (action === "togglePreview" && activeTab?.endsWith(".md")) {
      setPreviewTrigger((prev) => prev + 1);
    }
    if (action === "toggleSplit" && activeTab?.endsWith(".md")) {
      setPreviewTrigger((prev) => prev + 1);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-vscode-bg text-vscode-text">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden min-h-0">
        <ActivityBar
          activeItem={activeSidebarItem}
          onItemClick={setActiveSidebarItem}
        />
        <Sidebar activeItem={activeSidebarItem} onFileClick={handleFileClick} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Editor
            activeTab={activeTab}
            onTabChange={setActiveTab}
            openTabs={openTabs}
            onCloseTab={handleCloseTab}
            previewTrigger={previewTrigger}
            onFileClick={handleFileClick}
            findOpen={findOpen}
            findQuery={findQuery}
            findCase={findCase}
            findRegex={findRegex}
            findActiveMatch={findActiveMatch}
            findMatchCount={findMatchCount}
            onFindMatchCountChange={(n) => {
              setFindMatchCount(n);
              setFindActiveMatch(0);
            }}
            onFindClose={() => setFindOpen(false)}
            onFindChange={(q) => {
              setFindQuery(q);
              setFindActiveMatch(0);
            }}
            onFindNext={() => setFindActiveMatch((i) => (findMatchCount > 0 ? (i + 1) % findMatchCount : 0))}
            onFindPrev={() => setFindActiveMatch((i) => (findMatchCount > 0 ? (i - 1 + findMatchCount) % findMatchCount : 0))}
            onFindToggleCase={() => setFindCase((p) => !p)}
            onFindToggleRegex={() => setFindRegex((p) => !p)}
          />
          {terminalOpen && (
            <div
              style={{ height: terminalHeight }}
              className="flex-shrink-0 flex flex-col border-t border-vscode-border"
            >
              <div
                className="h-1 cursor-row-resize hover:bg-vscode-statusBar transition-colors flex-shrink-0"
                onMouseDown={startResize}
              />
              <div className="flex-1 overflow-hidden">
                <Terminal
                  onOpenFile={handleFileClick}
                  onClose={() => setTerminalOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <StatusBar activeTab={activeTab} />
      {paletteOpen && (
        <CommandPalette
          recentFiles={openTabs}
          onOpenFile={handleFileClick}
          onCommand={handlePaletteCommand}
          onClose={() => setPaletteOpen(false)}
          initialMode={paletteMode}
        />
      )}
    </div>
  );
}
