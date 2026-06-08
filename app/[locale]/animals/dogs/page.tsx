import { DogsPageContent } from '@/components/DogsPageContent'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }, { locale: 'de' }, { locale: 'cs' }, { locale: 'nl' }]
}

export default function DogsPage({ params }: { params: { locale: string } }) {
  return <DogsPageContent locale={params.locale} />
}