import { MetadataRoute } from 'next';
import { client } from '@/libs/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = 'https://turedure-physics.vercel.app';

  // microCMSから全記事と全カテゴリを取得
  const [blogsData, categoriesData] = await Promise.all([
    client.get({ endpoint: 'blogs', queries: { limit: 100 } }),
    client.get({ endpoint: 'categories', queries: { limit: 20 } }),
  ]);

  // 記事ページのURL一覧
  const blogUrls = blogsData.contents.map((blog: any) => ({
    url: `${baseURL}/blogs/${blog.id}`,
    lastModified: new Date(blog.updatedAt || blog.publishedAt),
  }));

  // カテゴリページのURL一覧
  const categoryUrls = categoriesData.contents.map((cat: any) => ({
    url: `${baseURL}/categories/${cat.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    ...categoryUrls,
    ...blogUrls,
  ];
}