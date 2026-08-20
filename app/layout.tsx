import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "徒然物理学",
  description: "徒然なるままに物理学を綴るサイト",
  // Google Search Console の所有者確認キー
  verification: {
    google: "Q4k-ngpC_4G1tmPuISjxh27mXuW5l3mO3to9BMYJIaw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSerif.className} bg-neutral-50 text-neutral-900 antialiased min-h-screen flex flex-col`}>
        {/* 共通ヘッダー */}
        <Header />

        {/* メインコンテンツ枠 */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-3.5 sm:px-6 md:px-8 py-6 md:py-12">
          {children}
        </main>

        {/* フッター */}
        <footer className="w-full border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
          © 2026 徒然物理学
        </footer>
      </body>
    </html>
  );
}