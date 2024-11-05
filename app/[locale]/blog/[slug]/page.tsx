import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: {
    locale: string;
    slug: string;
  }
};

export const dynamic = 'force-dynamic'

export default function BlogPostPage({ params: { locale, slug } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <div className="container mx-auto">
      {/* Add your BlogPostContent component here */}
      <h1>Blog Post: {slug}</h1>
    </div>
  );
}

export function generateStaticParams() {
  // Add your blog post slugs here
  const posts = [
    { slug: 'post-1' },
    { slug: 'post-2' }
  ];

  return posts.flatMap(post => [
    { locale: 'en', slug: post.slug },
    { locale: 'pl', slug: post.slug }
  ]);
}

export async function generateMetadata({ params: { locale, slug } }: Props) {
  return {
    title: `${slug} - ${locale.toUpperCase()}`,
    description: `Blog post about ${slug} - ${locale.toUpperCase()} version`
  };
} 