import Link from 'next/link';
import { client } from '@/libs/client';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
    <div className="w-full space-y-8 font-serif text-black">
      {/* カテゴリヘッダー */}
      <div className="border-b-2 border-neutral-300 pb-4 space-y-2">
        <span className="inline-block bg-sky-100 text-[#0284c7] px-2.5 py-0.5 rounded text-xs font-semibold">
          Section
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-wide">
          {category.name}
        </h1>
      </div>

      {/* カテゴリ説明文（スマホは text-sm、PCは text-base） */}
      {category.description && (
        <div className="text-neutral-900 text-sm sm:text-base leading-relaxed md:leading-loose whitespace-pre-line font-medium">
          {category.description}
        </div>
      )}

      {/* 記事・日記一覧（水色のカードを横幅いっぱいに展開） */}
      <div className="space-y-4 w-full pt-2">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog: any) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="block w-full bg-[#bae6fd]/50 hover:bg-[#7dd3fc]/60 transition-all rounded-xl p-4 sm:p-6 border border-sky-200 shadow-sm"
            >
              <div className="space-y-2.5 w-full">
                <p className="font-bold text-base sm:text-lg md:text-xl text-black leading-snug">
                  {blog.title}
                </p>

                {/* 記事の冒頭または本文プレビュー */}
                <div
                  className="text-neutral-800 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3 font-medium"
                  dangerouslySetInnerHTML={{
                    __html: blog.content || blog.body || '',
                  }}
                />

                <div className="pt-2 text-[11px] sm:text-xs text-neutral-600 font-medium">
                  {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-neutral-500 text-sm py-4">まだ記事がありません。</p>
        )}
      </div>

      {/* トップへ戻る */}
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