import Link from 'next/link';
import { client } from '@/libs/client';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 物理備忘録 または 日常備忘録 かどうか判定（飛ばずにその場でタイトル＋本文を表示）
  // ※この昔からある挙動は完全に維持します。
  const isDirectView = id === '5fhila85r2-1' || id === 'nya1qqbmm';

  // カテゴリ情報と記事一覧を取得
  const [category, blogsData] = await Promise.all([
    client.get({
      endpoint: 'categories',
      contentId: id,
    }),
    client.get({
      endpoint: 'blogs',
      queries: {
        filters: `category[equals]${id}`,
        orders: '-publishedAt',
      },
    }),
  ]);

  const blogs = blogsData.contents;

  return (
    // ※スマホでめいっぱい広く表示するpx-3.5設定などはlayout.tsxで完璧に維持されています。
    <div className="w-full space-y-8 font-serif text-black">
      {/* カテゴリヘッダー（元のデザイン維持） */}
      <div className="border-b-2 border-neutral-300 pb-4 space-y-2">
        <span className="inline-block bg-sky-100 text-[#0284c7] px-2.5 py-0.5 rounded text-xs font-semibold">
          Section
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-black tracking-wide">
          {category.name}
        </h1>
      </div>

      {/* カテゴリTOP本文（リッチエディタ：元の文字サイズ維持） */}
      {category.description && (
        <div
          className="text-black text-sm md:text-base leading-relaxed md:leading-loose font-medium
            [&>p]:mb-3 [&>p:last-child]:mb-0"
          dangerouslySetInnerHTML={{ __html: category.description }}
        />
      )}

      {/* 【ここを追加】 microCMSの別フィールド「一覧見出し（「力学」など）」を表示 */}
      {category.listHeading && (
        <div className="pt-2">
          {/* microCMSの見出しH2/H3と同じデザイン（青ライン・太字）を適用 */}
          <h2 className="text-xl md:text-2xl font-bold text-black border-l-4 border-[#0284c7] pl-3 mb-0">
            {category.listHeading}
          </h2>
        </div>
      )}

      {/* 記事一覧（元の挙動・リンクの出し分け・水色枠・文字サイズを完全に維持） */}
      <div className="space-y-4 w-full pt-1">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog: any) =>
            isDirectView ? (
              /* 【物理備忘録・日常備忘録】リンクなし：タイトルと本文を同時に表示（維持） */
              <div
                key={blog.id}
                className="w-full bg-[#bae6fd] rounded-xl p-5 md:p-6 shadow-sm space-y-3"
              >
                <p className="font-bold text-lg md:text-xl text-black leading-snug">
                  {blog.title}
                </p>
                <div
                  className="text-black text-xs md:text-base leading-relaxed md:leading-loose font-medium"
                  dangerouslySetInnerHTML={{
                    __html: blog.content || blog.body || '',
                  }}
                />
              </div>
            ) : (
              /* 【物理学とことこ・読書とことこ】リンクあり：タイトルのみ表示（維持） */
              <Link
                key={blog.id}
                href={`/blogs/${blog.id}`}
                className="block w-full bg-[#bae6fd] hover:bg-[#7dd3fc] transition-all rounded-xl p-5 md:p-6 shadow-sm"
              >
                <p className="font-bold text-lg md:text-xl text-black leading-snug">
                  {blog.title}
                </p>
              </Link>
            )
          )
        ) : (
          <p className="text-neutral-500 text-sm md:text-base py-4">まだ記事がありません。</p>
        )}
      </div>

      {/* トップへ戻る（維持） */}
      <div className="pt-6">
        <Link
          href="/"
          className="text-sm font-semibold text-[#0284c7] hover:underline"
        >
          ← トップページへ戻る
        </Link>
      </div>
    </div>
  );
}