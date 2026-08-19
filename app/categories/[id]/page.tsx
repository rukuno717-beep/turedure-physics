import Link from 'next/link';
import { client } from '@/libs/client';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // microCMSからカテゴリー情報を取得
  const category = await client.get({
    endpoint: 'categories',
    contentId: id,
  });

  // 紐付く記事一覧を取得
  const data = await client.get({
    endpoint: 'blogs',
    queries: {
      filters: `category[equals]${id}`,
      orders: '-publishedAt',
    },
  });

  // 備忘録系カテゴリーID（物理備忘録・日常備忘録）
  const embedContentCategories = ['5fhila85r2-1', 'nya1qqbmm'];
  const isEmbedMode = embedContentCategories.includes(id);

  return (
    <div className="space-y-10 max-w-3xl font-serif text-black">
      {/* カテゴリーTOP 見出し */}
      <div className="border-b-2 border-neutral-300 pb-4">
        <span className="text-xs font-bold text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          Section
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-black mt-3 font-serif">
          {category.name}
        </h1>
      </div>

      {/* microCMSの「カテゴリーTOP本文」 */}
      {category.description && (
        <div
          className="leading-loose text-base md:text-lg text-black font-medium space-y-4
            [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-black [&>h1]:mt-6 [&>h1]:mb-3
            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-black [&>h2]:mt-5 [&>h2]:mb-2 [&>h2]:border-l-4 [&>h2]:border-[#0284c7] [&>h2]:pl-3
            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-black [&>h3]:mt-4 [&>h3]:mb-2
            [&>p]:mb-3 [&>p]:leading-loose"
          dangerouslySetInnerHTML={{ __html: category.description }}
        />
      )}

      {/* 記事エリア */}
      {data.contents.length > 0 ? (
        <div className="pt-2 space-y-4">
          {/* 通常リンクモードの場合のみ見出しを表示 */}
          {!isEmbedMode && (
            <h2 className="text-xl md:text-2xl font-bold text-black border-l-4 border-[#0284c7] pl-3">
              {category.list_title || '記事一覧'}
            </h2>
          )}

          {isEmbedMode ? (
            /* ========================================================
               【備忘録専用：少し濃いめの水色背景ボックス (#bae6fd)】
               ======================================================== */
            <div className="bg-[#bae6fd] p-6 md:p-8 rounded-lg space-y-8 text-black shadow-sm">
              {data.contents.map((blog: any, index: number) => (
                <article key={blog.id} className={`space-y-3 ${index > 0 ? 'pt-8 border-t border-sky-300' : ''}`}>
                  {/* タイトル */}
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-black tracking-wide">
                    {blog.title}
                  </h3>

                  {/* 本文エリア */}
                  <div
                    className="leading-loose text-base md:text-lg text-black font-medium space-y-4 font-serif
                      [&>p]:mb-4 [&>p]:leading-loose
                      [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-black [&>h1]:mt-6 [&>h1]:mb-3
                      [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-black [&>h2]:mt-5 [&>h2]:mb-2
                      [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
                    dangerouslySetInnerHTML={{ __html: blog.content || blog.body || '' }}
                  />
                </article>
              ))}
            </div>
          ) : (
            /* ========================================================
               【通常リンクモード：物理学とことこ・読書とことこ】
               ======================================================== */
            <div className="space-y-4 pt-2">
              {data.contents.map((blog: any) => (
                <article key={blog.id} className="border-b border-neutral-200 pb-4">
                  <Link href={`/blogs/${blog.id}`} className="group block space-y-1.5">
                    <time className="text-xs text-neutral-500 font-medium">
                      {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
                    </time>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 group-hover:text-blue-800 font-bold text-lg md:text-xl underline underline-offset-4 decoration-blue-400 group-hover:decoration-blue-700 transition-all font-serif">
                        {blog.title}
                      </span>
                      <span className="text-blue-500 text-sm group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-neutral-600 font-medium py-6 text-sm">まだ投稿がありません。</p>
      )}

      {/* トップへ戻るリンク */}
      <div className="pt-4">
        <Link href="/" className="text-sm font-bold text-[#0284c7] hover:underline">
          ← トップページへ戻る
        </Link>
      </div>
    </div>
  );
}