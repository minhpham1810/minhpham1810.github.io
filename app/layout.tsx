import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PointerEffects from "@/components/PointerEffects";

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
    default: "Khoa Minh Pham — Software Engineer",
    template: "%s — Khoa Minh Pham",
  },
  description:
    "Khoa Minh Pham builds full-stack applications, AI tools, and software for research, and contributes to open-source projects. Available for 2027 new-grad software engineering roles.",
  keywords: [
    "Khoa Minh Pham",
    "Minh Pham",
    "open source",
    "backend engineer",
    "software engineer",
    "Next.js",
    "FastAPI",
  ],
  authors: [{ name: "Khoa Minh Pham" }],
  twitter: { card: "summary_large_image" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Khoa Minh Pham — Portfolio",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    title: "Khoa Minh Pham — Software Engineer",
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
        <SiteHeader />
        {children}
        <SiteFooter />
        <PointerEffects />
      </body>
    </html>
  );
}
