import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getPost } from '@/lib/posts';

export default async function PostPage({
  params: { locale, id }
}: {
  params: { locale: string; id: string };
}) {
  unstable_setRequestLocale(locale);
  
  const post = await getPost(id);
  
  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-8">
        {new Date(post.date).toLocaleDateString(locale)}
      </p>
      <div className="prose max-w-none">
        {post.content}
      </div>
    </article>
  );
} 