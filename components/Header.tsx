"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// アイコン定義
export const PhysicsIcon = () => (
  <svg className="w-5 h-5 inline-block text-[#0284c7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const BookIcon = () => (
  <svg className="w-5 h-5 inline-block text-[#0284c7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="6" y1="6" x2="16" y2="6" />
    <line x1="6" y1="10" x2="16" y2="10" />
  </svg>
);

export const NoteIcon = () => (
  <svg className="w-5 h-5 inline-block text-[#0284c7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export const CoffeeIcon = () => (
  <svg className="w-5 h-5 inline-block text-[#0284c7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" strokeLinecap="round" />
    <line x1="10" y1="1" x2="10" y2="4" strokeLinecap="round" />
    <line x1="14" y1="1" x2="14" y2="4" strokeLinecap="round" />
  </svg>
);

export default function Header() {
  const pathname = usePathname();

  // 2枚並べる設定（読書・日常）
  let isDual = false;
  let leftImage = "";
  let leftPos = "center";
  let rightImage = "";
  let rightPos = "center";

  // 1枚画像の設定（TOP・物理備忘録）
  let singleImage = "/unkai.jpg";
  let singlePos = "center";

  if (pathname.includes("/categories/5fhila85r2-1")) {
    // 物理備忘録（山）
    singleImage = "/yama.jpg";
    singlePos = "center 35%";
  } else if (pathname.includes("/categories/a0p7s73val7")) {
    // 読書とことこ（ハクセキレイ2枚並び）
    isDual = true;
    leftImage = "/hakusekirei2.jpg";
    leftPos = "center 25%";
    rightImage = "/hakusekirei.jpg";
    rightPos = "center 40%";
  } else if (pathname.includes("/categories/nya1qqbmm")) {
    // 日常備忘録（メジロ2枚並び）
    isDual = true;
    leftImage = "/mejiro2.jpg";
    leftPos = "center 30%";
    rightImage = "/mejiro.jpg";
    rightPos = "center 25%";
  } else {
    // TOPページ & 物理学とことこ（雲海：太陽と山並みをしっかり入れて引きの構図に）
    singleImage = "/unkai.jpg";
    singlePos = "center 15%";
  }

  return (
    <>
      <header className="relative w-full min-h-[260px] md:min-h-[520px] flex flex-col justify-end md:justify-between items-start overflow-hidden shadow-md py-5 md:py-12 px-4 md:px-12 bg-neutral-100">
        {/* 背景画像エリア */}
        {isDual ? (
          <div className="absolute inset-0 flex w-full h-full">
            <div
              className="w-1/2 h-full bg-cover bg-no-repeat border-r border-white/30"
              style={{
                backgroundImage: `url('${leftImage}')`,
                backgroundPosition: leftPos,
              }}
            />
            <div
              className="w-1/2 h-full bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url('${rightImage}')`,
                backgroundPosition: rightPos,
              }}
            />
          </div>
        ) : (
          /* 単一画像（雲海・山） */
          <div
            className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-500"
            style={{
              backgroundImage: `url('${singleImage}')`,
              backgroundPosition: singlePos,
            }}
          />
        )}

        {/* タイトル＆サブタイトル */}
        <div className="relative z-10 flex flex-col items-start text-left space-y-2 md:space-y-3">
          <div className="px-4 py-2 md:px-12 md:py-5 rounded-xl md:rounded-2xl bg-white/85 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/80 transition-all hover:bg-white/90">
            <Link
              href="/"
              className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest text-neutral-900 drop-shadow-sm font-serif block leading-none"
            >
              徒然<span className="text-[#0284c7]">物理学</span>
            </Link>
          </div>

          <div className="px-3.5 py-1.5 md:px-6 md:py-2 rounded-lg md:rounded-2xl bg-white/85 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/80">
            <p className="text-[11px] sm:text-xs md:text-sm text-neutral-900 font-bold tracking-[0.2em] md:tracking-[0.25em] font-serif">
              〜 徒然なるままに 物理学を 〜
            </p>
          </div>
        </div>

        {/* 【PC専用】下部ナビゲーションバー */}
        <div className="hidden md:flex relative z-10 w-full justify-center pb-1">
          <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-base font-bold text-neutral-900 bg-white/85 backdrop-blur-lg px-8 py-4 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-white/90">
            <Link href="/categories/o3fze0op6w" className="hover:text-sky-600 transition-colors underline underline-offset-4 decoration-2 flex items-center gap-2">
              <PhysicsIcon /> 物理学とことこ
            </Link>
            <Link href="/categories/5fhila85r2-1" className="hover:text-sky-600 transition-colors underline underline-offset-4 decoration-2 flex items-center gap-2">
              <NoteIcon /> 物理備忘録
            </Link>
            <Link href="/categories/a0p7s73val7" className="hover:text-sky-600 transition-colors underline underline-offset-4 decoration-2 flex items-center gap-2">
              <BookIcon /> 読書とことこ
            </Link>
            <Link href="/categories/nya1qqbmm" className="hover:text-sky-600 transition-colors underline underline-offset-4 decoration-2 flex items-center gap-2">
              <CoffeeIcon /> 日常備忘録
            </Link>
          </nav>
        </div>
      </header>

      {/* 【スマホ専用】ヘッダー直下リンクバー */}
      <div className="block md:hidden bg-sky-50/90 border-b border-sky-100 px-4 py-3">
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-bold text-neutral-900">
          <Link href="/categories/o3fze0op6w" className="flex items-center gap-1">
            <PhysicsIcon /> 物理学とことこ
          </Link>
          <Link href="/categories/5fhila85r2-1" className="flex items-center gap-1">
            <NoteIcon /> 物理備忘録
          </Link>
          <Link href="/categories/a0p7s73val7" className="flex items-center gap-1">
            <BookIcon /> 読書とことこ
          </Link>
          <Link href="/categories/nya1qqbmm" className="flex items-center gap-1">
            <CoffeeIcon /> 日常備忘録
          </Link>
        </nav>
      </div>
    </>
  );
}