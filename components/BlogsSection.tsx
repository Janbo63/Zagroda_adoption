'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { BlogPost, getAllPosts } from '@/lib/posts';

interface BlogsSectionProps {
  locale: string;
}

export function BlogsSection({ locale }: BlogsSectionProps) {
  const t = useTranslations();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{t('Blog.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{new Date(post.date).toLocaleDateString(locale)}</p>
              <p className="line-clamp-3">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}