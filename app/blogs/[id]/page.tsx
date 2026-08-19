import Link from 'next/link';
import { client } from '@/libs/client';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // microCMSから記事データを取得
  const blog = await client.get({
    endpoint: 'blogs',
    contentId: id,
  });

  return (
    <article className="max-w-3xl space-y-8 font-serif text-black">
      {/* 記事上の戻りナビゲーション */}
      <div className="text-sm font-semibold space-y-1">
        {blog.category && (
          <div>
            <Link
              href={`/categories/${blog.category.id}`}
              className="text-[#0284c7] hover:underline"
            >
              ← {blog.category.name} に戻る
            </Link>
          </div>
        )}
      </div>

      {/* 記事ヘッダー */}
      <div className="border-b-2 border-neutral-300 pb-6 space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-neutral-600 font-medium">
          <time>
            公開日: {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
          </time>
          {blog.category && (
            <span className="bg-sky-50 text-[#0284c7] px-2.5 py-0.5 rounded text-xs border border-sky-200">
              {blog.category.name}
            </span>
          )}
        </div>
      </div>

      {/* 記事本文 */}
      <div
        className="leading-loose text-base md:text-lg text-black font-medium space-y-6
          [&>p]:mb-4 [&>p]:leading-loose
          [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-black [&>h1]:mt-8 [&>h1]:mb-3
          [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-black [&>h2]:border-l-4 [&>h2]:border-[#0284c7] [&>h2]:pl-3 [&>h2]:mt-6 [&>h2]:mb-3
          [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-black [&>h3]:mt-5 [&>h3]:mb-2
          [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4
          [&>blockquote]:border-l-4 [&>blockquote]:border-neutral-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4"
        dangerouslySetInnerHTML={{ __html: blog.content || blog.body || '' }}
      />

      {/* 記事下の戻りナビゲーション */}
      <div className="pt-10 border-t border-neutral-300 space-y-3 text-sm font-semibold">
        {blog.category && (
          <div>
            <Link
              href={`/categories/${blog.category.id}`}
              className="text-[#0284c7] hover:underline"
            >
              ← {blog.category.name} に戻る
            </Link>
          </div>
        )}
        <div>
          <Link
            href="/"
            className="text-[#0284c7] hover:underline"
          >
            ← トップページへ戻る
          </Link>
        </div>
      </div>
    </article>
  );
}