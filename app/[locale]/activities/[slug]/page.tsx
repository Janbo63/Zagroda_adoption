import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: {
    locale: string;
    slug: string;
  }
};

export const revalidate = 60

export default function ActivityDetailPage({ params: { locale, slug } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <div className="container mx-auto">
      {/* Add your ActivityDetailContent component here */}
      <h1>Activity: {slug}</h1>
    </div>
  );
}

export function generateStaticParams() {
  // Add your activity slugs here
  const activities = [
    { slug: 'activity-1' },
    { slug: 'activity-2' }
  ];

  return activities.flatMap(activity => [
    { locale: 'en', slug: activity.slug },
    { locale: 'pl', slug: activity.slug }
  ]);
}

export async function generateMetadata({ params: { locale, slug } }: Props) {
  return {
    title: `${slug} - ${locale.toUpperCase()}`,
    description: `Activity details for ${slug} - ${locale.toUpperCase()} version`
  };
} 