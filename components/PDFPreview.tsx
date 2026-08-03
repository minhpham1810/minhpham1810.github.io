"use client";

interface PDFPreviewProps {
  pdfUrl: string;
}

export default function PDFPreview({ pdfUrl }: PDFPreviewProps) {
  const getEmbedUrl = (url: string) => {
    // Extract file ID from various Google Drive URL formats
    const patterns = [/\/file\/d\/([^\/]+)/, /id=([^&]+)/, /\/d\/([^\/]+)/];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }

    // If already an embed URL, return as is
    if (url.includes("/preview")) {
      return url;
    }

    return url;
  };

  const embedUrl = getEmbedUrl(pdfUrl);

  return (
    <div className="w-full h-full bg-vscode-bg">
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        allow="autoplay"
        title="PDF Preview"
      />
    </div>
  );
}
