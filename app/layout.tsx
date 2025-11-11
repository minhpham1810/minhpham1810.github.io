import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minh Pham - Portfolio",
  description: "Personal portfolio website with VS Code theme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
