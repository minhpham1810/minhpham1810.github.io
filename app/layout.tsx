import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://minhpham1810.github.io"),
  title: {
    default: "Minh Pham — Full-Stack & Backend Engineer",
    template: "%s — Minh Pham",
  },
  description:
    "Minh Pham is a full-stack and backend-focused software engineer building reliable APIs, data systems, and useful web products.",
  keywords: [
    "Minh Pham",
    "full-stack engineer",
    "backend engineer",
    "software engineer",
    "Next.js",
    "FastAPI",
  ],
  authors: [{ name: "Minh Pham" }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Minh Pham — Portfolio",
    title: "Minh Pham — Full-Stack & Backend Engineer",
    description:
      "Selected full-stack and backend work, experience, and engineering case studies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
