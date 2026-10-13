export default function MarkdownPreview({ content }: { content: string }) {
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
              className="relative my-9 overflow-x-auto border-l-2 border-accent bg-[color:var(--glass-bg)]"
            >
              {codeBlockLanguage && (
                <span className="absolute top-2 right-3 text-xs text-muted font-mono uppercase tracking-wider">
                  {codeBlockLanguage}
                </span>
              )}
              <pre className="p-5 text-sm leading-6 sm:p-6">
                <code className="text-ink">
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
            className="mb-8 mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.8rem,6vw,5.25rem)] font-medium leading-[0.94] tracking-[-0.055em] text-ink"
          >
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            className="mb-5 mt-14 border-t border-ink/10 pt-6 font-display text-3xl font-medium leading-tight tracking-[-0.035em] text-ink sm:text-4xl"
          >
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={i}
            className="mb-3 mt-9 text-lg font-semibold tracking-[-0.02em] text-ink"
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
            className="my-12 h-px bg-line"
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
                className="h-auto w-full rounded-2xl border border-ink/10 bg-black"
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
                className={`${widthStyle} h-auto rounded-2xl border border-ink/10`}
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
            className="my-7 border-l-2 border-accent py-1 pl-5 font-display text-xl italic leading-relaxed text-muted"
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
            <li key={i} className="mb-1.5 flex items-start gap-3 text-[15px] leading-7 text-ink/85">
              <span className="mt-3 h-1 w-1 shrink-0 bg-accent" />
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
            <li key={i} className="mb-2 pl-2 text-[15px] leading-7 text-ink/85">
              {parseInlineMarkdown(content)}
            </li>
          );
          i++;
        }
        elements.push(
          <ol key={`ol-${i}`} className="my-5 list-decimal pl-5 marker:font-mono marker:text-accent">
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
          <p key={i} className="mb-4 max-w-[65ch] text-pretty text-[15px] leading-7 text-ink/85">
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
          className="border border-ink/10 bg-[color:var(--glass-bg)] px-1.5 py-0.5 font-mono text-[13px] text-ink"
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
          className="font-semibold italic text-ink"
        >
          {content}
        </strong>
      );
      return `<<<BOLDITALIC_${parts.length - 1}>>>`;
    });

    // Bold with ** or __
    currentText = currentText.replace(/\*\*(.+?)\*\*/g, (_, content) => {
      parts.push(
        <strong key={`bold-${key++}`} className="font-semibold text-ink">
          {content}
        </strong>
      );
      return `<<<BOLD_${parts.length - 1}>>>`;
    });

    currentText = currentText.replace(/__((?!>).+?)__/g, (_, content) => {
      parts.push(
        <strong key={`bold2-${key++}`} className="font-semibold text-ink">
          {content}
        </strong>
      );
      return `<<<BOLD_${parts.length - 1}>>>`;
    });

    // Italic with * or _
    currentText = currentText.replace(/\*([^*]+?)\*/g, (_, content) => {
      parts.push(
        <em key={`italic-${key++}`} className="italic text-muted">
          {content}
        </em>
      );
      return `<<<ITALIC_${parts.length - 1}>>>`;
    });

    currentText = currentText.replace(/_([^_<]+?)_/g, (_, content) => {
      parts.push(
        <em key={`italic2-${key++}`} className="italic text-muted">
          {content}
        </em>
      );
      return `<<<ITALIC_${parts.length - 1}>>>`;
    });

    // Links
    currentText = currentText.replace(
      /\[(.+?)\]\((.+?)\)/g,
      (_, linkText, url) => {
        parts.push(
          <a
            key={`link-${key++}`}
            href={url}
            className="border-b border-accent/50 font-medium text-accent transition-colors hover:border-ink hover:text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        );
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
    <article className="w-full max-w-[52rem] text-ink">
      {renderMarkdown()}
    </article>
  );
}
