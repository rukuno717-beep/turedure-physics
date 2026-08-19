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
        <h1 className="text-3xl md:text-4xl font-bold text-black tracking-wide">
          {category.name}
        </h1>
      </div>

      {/* カテゴリ説明文（HTMLタグを正しく反映・PC文字サイズ維持） */}
      {category.description && (
        <div
          className="text-black text-sm md:text-base leading-relaxed md:leading-loose font-medium
            [&>p]:mb-3 [&>p:last-child]:mb-0"
          dangerouslySetInnerHTML={{ __html: category.description }}
        />
      )}

      {/* 記事・日記一覧（元の水色カード・余計な日付を削除） */}
      <div className="space-y-4 w-full pt-2">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog: any) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="block w-full bg-[#bae6fd] hover:bg-[#7dd3fc] transition-all rounded-xl p-5 md:p-6 shadow-sm"
            >
              <div className="space-y-2 w-full">
                <p className="font-bold text-lg md:text-xl text-black leading-snug">
                  {blog.title}
                </p>

                {/* 記事の本文プレビュー */}
                <div
                  className="text-black text-xs md:text-base leading-relaxed md:leading-loose font-medium line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: blog.content || blog.body || '',
                  }}
                />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-neutral-500 text-sm md:text-base py-4">まだ記事がありません。</p>
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