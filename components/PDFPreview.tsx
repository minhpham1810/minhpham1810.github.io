"use client";

interface PDFPreviewProps {
  googleDriveUrl: string;
}

export default function PDFPreview({ googleDriveUrl }: PDFPreviewProps) {
  // Convert Google Drive link to embeddable format
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

  const embedUrl = getEmbedUrl(googleDriveUrl);

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
