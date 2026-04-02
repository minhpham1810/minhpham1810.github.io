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
              className="my-6 bg-[#1a1a1a] border border-vscode-border rounded-md overflow-x-auto relative"
            >
              {codeBlockLanguage && (
                <span className="absolute top-2 right-3 text-xs text-vscode-textMuted font-mono uppercase tracking-wider">
                  {codeBlockLanguage}
                </span>
              )}
              <pre className="p-5 text-sm">
                <code className="text-green-400">
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
            className="text-3xl font-bold leading-tight tracking-tight border-b border-vscode-border pb-3 mb-6 mt-8 text-[#4ec9b0]"
          >
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            className="text-2xl font-semibold border-b border-vscode-border pb-2 mb-4 mt-7 text-[#dcdcaa]"
          >
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={i}
            className="text-xl font-semibold mb-3 mt-5 text-[#9cdcfe]"
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
            className="my-8 h-px bg-gradient-to-r from-transparent via-vscode-border to-transparent"
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
            <div key={i} className="my-4 flex justify-center">
              <video
                controls
                className="max-w-full h-auto rounded shadow-lg"
                src={videoSrc}
              >
                Your browser does not support the video tag.
              </video>
            </div>
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
            <div key={i} className="my-4 flex justify-center">
              <img
                src={imageSrc}
                alt={alt}
                className={`${widthStyle} h-auto rounded shadow-lg`}
                style={inlineStyle}
                // eslint-disable-next-line @next/next/no-img-element
              />
            </div>
          );
        }
      }
      // Blockquote
      else if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={i}
            className="border-l-4 border-[#007acc] pl-4 py-3 my-4 bg-[#1e3a5f]/20 rounded-r text-vscode-textMuted italic leading-relaxed"
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
            <li key={i} className="ml-4 pl-1 mb-1 flex items-start gap-2 text-[15px] leading-7">
              <span className="text-vscode-statusBar mt-2 text-[8px] shrink-0">▸</span>
              <span>{parseInlineMarkdown(lines[i].slice(2))}</span>
            </li>
          );
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="list-none my-4 space-y-0.5">
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
            <li key={i} className="ml-6 mb-1 text-base">
              {parseInlineMarkdown(content)}
            </li>
          );
          i++;
        }
        elements.push(
          <ol key={`ol-${i}`} className="list-decimal my-3">
            {listItems}
          </ol>
        );
        continue;
      }
      // Empty line
      else if (line.trim() === "") {
        elements.push(<div key={i} className="h-4" />);
      }
      // Regular paragraph
      else {
        elements.push(
          <p key={i} className="mb-4 leading-7 text-[15px] text-[#d4d4d4]">
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
          className="bg-[#1a1a1a] border border-vscode-border/50 px-1.5 py-0.5 rounded text-[13px] text-[#ce9178] font-mono"
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
          className="font-bold italic text-yellow-300"
        >
          {content}
        </strong>
      );
      return `<<<BOLDITALIC_${parts.length - 1}>>>`;
    });

    // Bold with ** or __
    currentText = currentText.replace(/\*\*(.+?)\*\*/g, (_, content) => {
      parts.push(
        <strong key={`bold-${key++}`} className="font-bold text-yellow-300">
          {content}
        </strong>
      );
      return `<<<BOLD_${parts.length - 1}>>>`;
    });

    currentText = currentText.replace(/__((?!>).+?)__/g, (_, content) => {
      parts.push(
        <strong key={`bold2-${key++}`} className="font-bold text-yellow-300">
          {content}
        </strong>
      );
      return `<<<BOLD_${parts.length - 1}>>>`;
    });

    // Italic with * or _
    currentText = currentText.replace(/\*([^*]+?)\*/g, (_, content) => {
      parts.push(
        <em key={`italic-${key++}`} className="italic text-blue-200">
          {content}
        </em>
      );
      return `<<<ITALIC_${parts.length - 1}>>>`;
    });

    currentText = currentText.replace(/_([^_<]+?)_/g, (_, content) => {
      parts.push(
        <em key={`italic2-${key++}`} className="italic text-blue-200">
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
        const isInternalLink =
          url.endsWith(".md") ||
          (!url.startsWith("http") && !url.startsWith("//"));

        if (isInternalLink && onFileClick) {
          parts.push(
            <a
              key={`link-${key++}`}
              href="#"
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                onFileClick(url);
              }}
            >
              {linkText}
            </a>
          );
        } else {
          parts.push(
            <a
              key={`link-${key++}`}
              href={url}
              className="text-blue-400 hover:underline"
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
    <div className="px-10 py-8 max-w-3xl mx-auto text-vscode-text">
      {renderMarkdown()}
    </div>
  );
}
