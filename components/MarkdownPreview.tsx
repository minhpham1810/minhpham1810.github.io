"use client";

interface MarkdownPreviewProps {
  content: string;
  onFileClick?: (file: string) => void;
}

export default function MarkdownPreview({
  content,
  onFileClick,
}: MarkdownPreviewProps) {
  const lines = content.split("\n");

  const renderMarkdown = () => {
    const elements: JSX.Element[] = [];
    let i = 0;
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = "";

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLanguage = line.slice(3).trim();
          codeBlockContent = [];
        } else {
          elements.push(
            <div
              key={i}
              className="relative my-9 overflow-x-auto border-l-2 border-vscode-accent bg-vscode-surface"
            >
              {codeBlockLanguage && (
                <span className="absolute top-2 right-3 text-xs text-vscode-textMuted font-mono uppercase tracking-wider">
                  {codeBlockLanguage}
                </span>
              )}
              <pre className="p-5 text-sm leading-6 sm:p-6">
                <code className="text-[#a8bca4]">
                  {codeBlockContent.join("\n")}
                </code>
              </pre>
            </div>
          );
          inCodeBlock = false;
          codeBlockContent = [];
          codeBlockLanguage = "";
        }
        i++;
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        i++;
        continue;
      }

      // Headers
      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={i}
            className="mb-8 mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.8rem,6vw,5.25rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f0f0e8]"
          >
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            className="mb-5 mt-14 border-t border-vscode-border pt-6 font-display text-3xl font-medium leading-tight tracking-[-0.035em] text-[#ecece5] sm:text-4xl"
          >
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={i}
            className="mb-3 mt-9 text-lg font-semibold tracking-[-0.02em] text-vscode-text"
          >
            {line.slice(4)}
          </h3>
        );
      }
      // Horizontal rule
      else if (line === "---" || line === "***") {
        elements.push(
          <div
            key={i}
            className="my-12 h-px bg-vscode-border"
          />
        );
      }
      // Video (standalone on its own line) - format: ![video](filename.mp4)
      // MUST come before image parsing to avoid being caught by the image regex
      else if (line.match(/^!\[video\]\((.+?)\)/)) {
        const match = line.match(/^!\[video\]\((.+?)\)/);
        if (match) {
          const [, src] = match;
          // Support both absolute paths and paths from assets folder
          const videoSrc = src.startsWith("/") ? src : `/assets/${src}`;
          elements.push(
            <figure key={i} className="my-10">
              <video
                controls
                className="h-auto w-full border border-vscode-border bg-[#090a09] shadow-[0_22px_55px_rgba(4,6,4,0.34)]"
                src={videoSrc}
              >
                Your browser does not support the video tag.
              </video>
            </figure>
          );
        }
      }
      // Image (standalone on its own line)
      // Supports: ![alt](image.png) or ![alt](image.png|300) or ![alt](image.png|50%)
      else if (line.match(/^!\[(.+?)\]\((.+?)\)/)) {
        const match = line.match(/^!\[(.+?)\]\((.+?)\)/);
        if (match) {
          const [, alt, srcWithSize] = match;

          // Parse size parameter (e.g., "image.png|300" or "image.png|50%")
          const [src, sizeParam] = srcWithSize.split("|");

          // Support both absolute paths and paths from assets folder
          const imageSrc = src.trim().startsWith("/")
            ? src.trim()
            : `/assets/${src.trim()}`;

          // Determine width/max-width based on size parameter
          let widthStyle = "max-w-full"; // default
          let inlineStyle: React.CSSProperties = {};

          if (sizeParam) {
            const trimmedSize = sizeParam.trim();
            if (trimmedSize.endsWith("%")) {
              // Percentage width
              inlineStyle.width = trimmedSize;
              widthStyle = "";
            } else if (!isNaN(Number(trimmedSize))) {
              // Pixel width
              inlineStyle.maxWidth = `${trimmedSize}px`;
              widthStyle = "";
            }
          }

          elements.push(
            <figure key={i} className="my-10 flex justify-center">
              {/* Content authors control these local portfolio assets and sizes. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={alt}
                className={`${widthStyle} h-auto border border-vscode-border shadow-[0_22px_55px_rgba(4,6,4,0.34)]`}
                style={inlineStyle}
              />
            </figure>
          );
        }
      }
      // Blockquote
      else if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={i}
            className="my-7 border-l-2 border-vscode-accent py-1 pl-5 font-display text-xl italic leading-relaxed text-[#b9bbb2]"
          >
            {parseInlineMarkdown(line.slice(2))}
          </blockquote>
        );
      }
      // Unordered list
      else if (line.match(/^[\-\*]\s/)) {
        const listItems: JSX.Element[] = [];
        while (i < lines.length && lines[i].match(/^[\-\*]\s/)) {
          listItems.push(
            <li key={i} className="mb-1.5 flex items-start gap-3 text-[15px] leading-7 text-[#c9cbc3]">
              <span className="mt-3 h-1 w-1 shrink-0 bg-vscode-accent" />
              <span>{parseInlineMarkdown(lines[i].slice(2))}</span>
            </li>
          );
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="my-5 list-none space-y-0.5">
            {listItems}
          </ul>
        );
        continue;
      }
      // Ordered list
      else if (line.match(/^\d+\.\s/)) {
        const listItems: JSX.Element[] = [];
        while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
          const content = lines[i].replace(/^\d+\.\s/, "");
          listItems.push(
            <li key={i} className="mb-2 pl-2 text-[15px] leading-7 text-[#c9cbc3]">
              {parseInlineMarkdown(content)}
            </li>
          );
          i++;
        }
        elements.push(
          <ol key={`ol-${i}`} className="my-5 list-decimal pl-5 marker:font-mono marker:text-vscode-accent">
            {listItems}
          </ol>
        );
        continue;
      }
      // Empty line
      else if (line.trim() === "") {
        elements.push(<div key={i} className="h-3" />);
      }
      // Regular paragraph
      else {
        elements.push(
          <p key={i} className="mb-4 max-w-[65ch] text-pretty text-[15px] leading-7 text-[#c9cbc3]">
            {parseInlineMarkdown(line)}
          </p>
        );
      }

      i++;
    }

    return elements;
  };

  const parseInlineMarkdown = (text: string): (string | JSX.Element)[] => {
    const parts: (string | JSX.Element)[] = [];
    let currentText = text;
    let key = 0;

    // Inline code first (to protect code content from other replacements)
    currentText = currentText.replace(/`(.+?)`/g, (_, content) => {
      parts.push(
        <code
          key={`code-${key++}`}
          className="border border-vscode-border bg-vscode-surface px-1.5 py-0.5 font-mono text-[13px] text-[#cf8e79]"
        >
          {content}
        </code>
      );
      return `<<<CODE_${parts.length - 1}>>>`;
    });

    // Bold and Italic (***text***)
    currentText = currentText.replace(/\*\*\*(.+?)\*\*\*/g, (_, content) => {
      parts.push(
        <strong
          key={`bold-italic-${key++}`}
          className="font-semibold italic text-[#ecece5]"
        >
          {content}
        </strong>
      );
      return `<<<BOLDITALIC_${parts.length - 1}>>>`;
    });

    // Bold with ** or __
    currentText = currentText.replace(/\*\*(.+?)\*\*/g, (_, content) => {
      parts.push(
        <strong key={`bold-${key++}`} className="font-semibold text-[#ecece5]">
          {content}
        </strong>
      );
      return `<<<BOLD_${parts.length - 1}>>>`;
    });

    currentText = currentText.replace(/__((?!>).+?)__/g, (_, content) => {
      parts.push(
        <strong key={`bold2-${key++}`} className="font-semibold text-[#ecece5]">
          {content}
        </strong>
      );
      return `<<<BOLD_${parts.length - 1}>>>`;
    });

    // Italic with * or _
    currentText = currentText.replace(/\*([^*]+?)\*/g, (_, content) => {
      parts.push(
        <em key={`italic-${key++}`} className="italic text-[#b6b9af]">
          {content}
        </em>
      );
      return `<<<ITALIC_${parts.length - 1}>>>`;
    });

    currentText = currentText.replace(/_([^_<]+?)_/g, (_, content) => {
      parts.push(
        <em key={`italic2-${key++}`} className="italic text-[#b6b9af]">
          {content}
        </em>
      );
      return `<<<ITALIC_${parts.length - 1}>>>`;
    });

    // Links
    currentText = currentText.replace(
      /\[(.+?)\]\((.+?)\)/g,
      (_, linkText, url) => {
        // Check if it's an internal file link (ends with .md or is just a filename)
        const hasProtocol = /^[a-z][a-z0-9+.-]*:/i.test(url);
        const isInternalLink =
          url.endsWith(".md") ||
          url.endsWith(".pdf") ||
          (!hasProtocol && !url.startsWith("//"));

        if (isInternalLink && onFileClick) {
          parts.push(
            <button
              key={`link-${key++}`}
              type="button"
              className="inline cursor-pointer border-b border-vscode-accent/60 text-left font-medium text-[#dda08c] transition-colors hover:border-vscode-accent hover:text-[#efb6a3]"
              onClick={() => onFileClick(url)}
            >
              {linkText}
            </button>
          );
        } else {
          parts.push(
            <a
              key={`link-${key++}`}
              href={url}
              className="border-b border-vscode-accent/60 font-medium text-[#dda08c] transition-colors hover:border-vscode-accent hover:text-[#efb6a3]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkText}
            </a>
          );
        }
        return `<<<LINK_${parts.length - 1}>>>`;
      }
    );

    // Split and reassemble
    const segments = currentText.split(/(<<<[A-Z]+_\d+>>>)/);
    return segments.map((segment, idx) => {
      const match = segment.match(/<<<([A-Z]+)_(\d+)>>>/);
      if (match) {
        return parts[parseInt(match[2])];
      }
      return segment;
    });
  };

  return (
    <article className="mx-auto w-full max-w-[58rem] px-5 pb-24 pt-9 text-vscode-text sm:px-9 sm:pt-14 lg:px-12 lg:pb-32">
      {renderMarkdown()}
    </article>
  );
}
