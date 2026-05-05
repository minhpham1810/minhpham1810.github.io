"use client";

import MarkdownPreview from "./MarkdownPreview";
import PDFPreview from "./PDFPreview";
import README from "@/content/README";
import about from "@/content/about";
import skills from "@/content/skills";
import contact from "@/content/contact";
import experience from "@/content/experience";
import portfolioWebsite from "@/content/projects/portfolio-website";
import SpotOn from "@/content/projects/SpotOn";
import FeelBit from "@/content/projects/FeelBit";
import ecommerceML from "@/content/projects/ecommerce-ml";
import kalmusWeb from "@/content/projects/kalmus-web";
import architectureOfSleep from "@/content/projects/architecture-of-sleep";

interface FileContentProps {
  filename: string;
  previewMode?: "code" | "preview" | "split";
  onFileClick?: (file: string) => void;
}

const contentMap: Record<string, string> = {
  "README.md": README,
  "about.md": about,
  "skills.md": skills,
  "contact.md": contact,
  "experience.md": experience,
  "portfolio-website.md": portfolioWebsite,
  "SpotOn.md": SpotOn,
  "FeelBit.md": FeelBit,
  "ecommerce-ml.md": ecommerceML,
  "kalmus-web.md": kalmusWeb,
  "architecture-of-sleep.md": architectureOfSleep,
};

export default function FileContent({
  filename,
  previewMode = "code",
  onFileClick,
}: FileContentProps) {
  const getContent = (file: string): string => {
    if (file === "resume.pdf") return "PDF_FILE";
    return contentMap[file] ?? "# File not found\n\nThe requested file does not exist.";
  };

  const content = getContent(filename);

  // Handle PDF files
  if (content === "PDF_FILE") {
    const googleDriveUrl =
      "https://drive.google.com/file/d/1rNd_H9fLWWmmH7zTViRTOYi-waebzB-o/view?usp=sharing";
    return <PDFPreview googleDriveUrl={googleDriveUrl} />;
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
    return <MarkdownPreview content={content} onFileClick={onFileClick} />;
  } else if (previewMode === "split") {
    return (
      <div className="flex h-full">
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
  return renderCodeView();
}
