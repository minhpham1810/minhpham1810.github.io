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
              className="my-4 bg-vscode-activityBar rounded p-4 overflow-x-auto"
            >
              <pre className="text-base">
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
          <h1 key={i} className="text-4xl font-bold mb-4 mt-6 text-white">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            className="text-3xl font-bold mb-3 mt-5 text-white border-b border-vscode-border pb-2"
          >
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-2xl font-bold mb-2 mt-4 text-white">
            {line.slice(4)}
          </h3>
        );
      }
      // Horizontal rule
      else if (line === "---" || line === "***") {
        elements.push(<hr key={i} className="my-6 border-vscode-border" />);
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
            className="border-l-4 border-blue-500 pl-4 py-2 my-3 italic text-gray-300 text-base"
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
            <li key={i} className="ml-6 mb-1 text-base">
              {parseInlineMarkdown(lines[i].slice(2))}
            </li>
          );
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="list-disc my-3">
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
          <p key={i} className="mb-3 leading-relaxed text-base">
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
          className="bg-vscode-activityBar px-1.5 py-0.5 rounded text-sm text-orange-300"
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
    <div className="p-8 max-w-4xl mx-auto prose prose-invert text-lg">
      {renderMarkdown()}
    </div>
  );
}
