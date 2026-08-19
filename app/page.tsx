import Link from 'next/link';
import { PhysicsIcon, NoteIcon, BookIcon, CoffeeIcon } from '@/components/Header';

export default function Home() {
  return (
    <div className="space-y-12 max-w-3xl">
      {/* 日々のまとめ セクション */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-black border-b-2 border-neutral-300 pb-3 mb-6 tracking-wide">
          日々のまとめ
        </h2>

        {/* 本文（スマホ時は text-sm、PC時は text-base） */}
        <p className="text-black text-sm sm:text-base font-medium leading-relaxed sm:leading-loose mb-8">
          日常で学んだことや思ったことを備忘録的にまとめているサイトです。<br />
          物理学とことこでは場の量子論に至る過程を分かりやすく説明する予定です。<br />
          物理備忘録では物理学とことこの草案や日々の考察や学んだことを書いていきます。<br />
          読書とことこでは、読んで面白い本があったら感想を書いていきます。<br />
          日常備忘録は日常の備忘録です。
        </p>

        {/* 4つのカテゴリーボタン */}
        <div className="space-y-3">
          <Link
            href="/categories/o3fze0op6w"
            className="flex items-center gap-3 bg-[#bae6fd] hover:bg-[#7dd3fc] transition-all px-4 py-3.5 rounded-lg text-black text-sm sm:text-base font-medium shadow-sm"
          >
            <span className="w-4 h-4 rounded-full bg-white flex-shrink-0 shadow-sm"></span>
            <span className="flex items-center gap-2 underline underline-offset-4 decoration-2 font-semibold">
              <PhysicsIcon /> 物理学とことこ
            </span>
          </Link>

          <Link
            href="/categories/5fhila85r2-1"
            className="flex items-center gap-3 bg-[#bae6fd] hover:bg-[#7dd3fc] transition-all px-4 py-3.5 rounded-lg text-black text-sm sm:text-base font-medium shadow-sm"
          >
            <span className="w-4 h-4 rounded-full bg-white flex-shrink-0 shadow-sm"></span>
            <span className="flex items-center gap-2 underline underline-offset-4 decoration-2 font-semibold">
              <NoteIcon /> 物理備忘録
            </span>
          </Link>

          <Link
            href="/categories/a0p7s73val7"
            className="flex items-center gap-3 bg-[#bae6fd] hover:bg-[#7dd3fc] transition-all px-4 py-3.5 rounded-lg text-black text-sm sm:text-base font-medium shadow-sm"
          >
            <span className="w-4 h-4 rounded-full bg-white flex-shrink-0 shadow-sm"></span>
            <span className="flex items-center gap-2 underline underline-offset-4 decoration-2 font-semibold">
              <BookIcon /> 読書とことこ
            </span>
          </Link>

          <Link
            href="/categories/nya1qqbmm"
            className="flex items-center gap-3 bg-[#bae6fd] hover:bg-[#7dd3fc] transition-all px-4 py-3.5 rounded-lg text-black text-sm sm:text-base font-medium shadow-sm"
          >
            <span className="w-4 h-4 rounded-full bg-white flex-shrink-0 shadow-sm"></span>
            <span className="flex items-center gap-2 underline underline-offset-4 decoration-2 font-semibold">
              <CoffeeIcon /> 日常備忘録
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}