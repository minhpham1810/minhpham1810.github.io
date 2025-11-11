"use client";

import { useState, useEffect } from "react";
import ActivityBar from "./ActivityBar";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import StatusBar from "./StatusBar";
import TitleBar from "./TitleBar";

export default function VSCodeWindow() {
  const [activeTab, setActiveTab] = useState("README.md");
  const [activeSidebarItem, setActiveSidebarItem] = useState("files");
  const [openTabs, setOpenTabs] = useState<string[]>(["README.md"]);
  const [previewTrigger, setPreviewTrigger] = useState(0);

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
  }, [activeTab, openTabs]);

  return (
    <div className="flex flex-col h-screen bg-vscode-bg text-vscode-text">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar
          activeItem={activeSidebarItem}
          onItemClick={setActiveSidebarItem}
        />
        <Sidebar activeItem={activeSidebarItem} onFileClick={handleFileClick} />
        <Editor
          activeTab={activeTab}
          onTabChange={setActiveTab}
          openTabs={openTabs}
          onCloseTab={handleCloseTab}
          previewTrigger={previewTrigger}
          onFileClick={handleFileClick}
        />
      </div>
      <StatusBar />
    </div>
  );
}
