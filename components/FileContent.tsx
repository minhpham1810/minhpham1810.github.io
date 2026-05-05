"use client";

import { useEffect, useRef } from "react";
import MarkdownPreview from "./MarkdownPreview";
import PDFPreview from "./PDFPreview";
import { contentMap } from "@/lib/contentMap";

interface FileContentProps {
  filename: string;
  previewMode?: "code" | "preview" | "split";
  onFileClick?: (file: string) => void;
  findQuery?: string;
  caseSensitive?: boolean;
  useRegex?: boolean;
  activeMatchIndex?: number;
  onMatchCountChange?: (count: number) => void;
}

export default function FileContent({
  filename,
  previewMode = "code",
  onFileClick,
  findQuery = "",
  caseSensitive = false,
  useRegex = false,
  activeMatchIndex = 0,
  onMatchCountChange,
}: FileContentProps) {
  const getContent = (file: string): string => {
    if (file === "resume.pdf") return "PDF_FILE";
    return contentMap[file] ?? "# File not found\n\nThe requested file does not exist.";
  };

  const content = getContent(filename);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.querySelectorAll("mark[data-find]").forEach((m) => {
      const parent = m.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(m.textContent ?? ""), m);
        parent.normalize();
      }
    });

    if (!findQuery) {
      onMatchCountChange?.(0);
      return;
    }

    let pattern: RegExp;
    try {
      const flags = caseSensitive ? "g" : "gi";
      pattern = useRegex
        ? new RegExp(findQuery, flags)
        : new RegExp(findQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);
    } catch {
      onMatchCountChange?.(0);
      return;
    }

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) textNodes.push(node as Text);

    let totalMatches = 0;
    textNodes.forEach((textNode) => {
      const text = textNode.textContent ?? "";
      pattern.lastIndex = 0;
      const matches = [...text.matchAll(new RegExp(pattern.source, pattern.flags))];
      if (!matches.length) return;

      const frag = document.createDocumentFragment();
      let lastIdx = 0;
      matches.forEach((m) => {
        if (m.index === undefined) return;
        frag.appendChild(document.createTextNode(text.slice(lastIdx, m.index)));
        const mark = document.createElement("mark");
        mark.setAttribute("data-find", "true");
        mark.setAttribute("data-match-index", String(totalMatches));
        mark.style.background = totalMatches === activeMatchIndex ? "#f57c00" : "#ffeb3b";
        mark.style.color = "#000";
        mark.style.borderRadius = "2px";
        mark.textContent = m[0];
        frag.appendChild(mark);
        totalMatches++;
        lastIdx = m.index + m[0].length;
      });
      frag.appendChild(document.createTextNode(text.slice(lastIdx)));
      textNode.parentNode?.replaceChild(frag, textNode);
    });
    onMatchCountChange?.(totalMatches);
  }, [findQuery, caseSensitive, useRegex, filename, activeMatchIndex, onMatchCountChange]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>("mark[data-find]").forEach((m) => {
      const idx = parseInt(m.getAttribute("data-match-index") ?? "-1");
      m.style.background = idx === activeMatchIndex ? "#f57c00" : "#ffeb3b";
      if (idx === activeMatchIndex) {
        m.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  }, [activeMatchIndex]);

  // Handle PDF files
  if (content === "PDF_FILE") {
    const googleDriveUrl =
      "https://drive.google.com/file/d/1rNd_H9fLWWmmH7zTViRTOYi-waebzB-o/view?usp=sharing";
    return (
      <div ref={containerRef} className="relative flex-1">
        <PDFPreview googleDriveUrl={googleDriveUrl} />
      </div>
    );
  }

  const lines = content.split("\n");

  // Render code view
  const renderCodeView = () => (
    <div className="p-4 font-mono text-sm">
      <div className="flex">
        {/* Line numbers */}
        <div className="pr-4 text-vscode-textMuted select-none">
          {lines.map((_, index) => (
            <div key={index} className="text-right">
              {index + 1}
            </div>
          ))}
        </div>
        {/* Content */}
        <div className="flex-1">
          <pre className="whitespace-pre-wrap break-words">
            {lines.map((line, index) => {
              // Simple markdown-like highlighting
              let processedLine = line;

              // Headers
              if (line.startsWith("# ")) {
                return (
                  <div
                    key={index}
                    className="text-blue-400 font-bold text-xl mb-2"
                  >
                    {line.slice(2)}
                  </div>
                );
              }
              if (line.startsWith("## ")) {
                return (
                  <div
                    key={index}
                    className="text-blue-300 font-bold text-lg mb-2"
                  >
                    {line.slice(3)}
                  </div>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <div key={index} className="text-blue-200 font-bold mb-1">
                    {line.slice(4)}
                  </div>
                );
              }

              // Lists
              if (line.startsWith("- ") || line.startsWith("* ")) {
                return (
                  <div key={index} className="text-green-400">
                    {line}
                  </div>
                );
              }

              // Links
              if (line.includes("[") && line.includes("]")) {
                return (
                  <div key={index} className="text-blue-400">
                    {line}
                  </div>
                );
              }

              // Code blocks
              if (line.startsWith("```")) {
                return (
                  <div key={index} className="text-yellow-400">
                    {line}
                  </div>
                );
              }

              // Quotes
              if (line.startsWith("> ")) {
                return (
                  <div
                    key={index}
                    className="text-gray-400 italic border-l-2 border-gray-600 pl-2"
                  >
                    {line.slice(2)}
                  </div>
                );
              }

              // Bold text
              if (line.includes("**")) {
                return (
                  <div key={index} className="text-yellow-300">
                    {line}
                  </div>
                );
              }

              // Default
              return (
                <div key={index} className={line === "" ? "h-5" : ""}>
                  {line || " "}
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </div>
  );

  // Render based on preview mode
  if (previewMode === "preview") {
    return (
      <div ref={containerRef} className="relative flex-1">
        <MarkdownPreview content={content} onFileClick={onFileClick} />
      </div>
    );
  } else if (previewMode === "split") {
    return (
      <div ref={containerRef} className="relative flex h-full">
        <div className="flex-1 border-r border-vscode-border overflow-auto">
          {renderCodeView()}
        </div>
        <div className="flex-1 overflow-auto bg-vscode-bg">
          <MarkdownPreview content={content} onFileClick={onFileClick} />
        </div>
      </div>
    );
  }

  // Default: code view
  return (
    <div ref={containerRef} className="relative flex-1">
      {renderCodeView()}
    </div>
  );
}
