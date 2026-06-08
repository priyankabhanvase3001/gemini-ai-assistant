import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Onyx AI",
  description: "A luxury AI assistant powered by Google Gemini",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-screen overflow-hidden bg-[#0D0D0D] text-[#F5F5F5]">
        {children}
      </body>
    </html>
  );
}