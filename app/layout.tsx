import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "徒然物理学 - 徒然なるままに物理学を",
  description: "物理学の全体像、備忘録、読書記録など",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-white text-black min-h-screen font-serif antialiased">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-12">
          {children}
        </div>
      </body>
    </html>
  );
}