import { DogsPageContent } from '@/components/DogsPageContent'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }]
}

export default function DogsPage({ params }: { params: { locale: string } }) {
  return <DogsPageContent locale={params.locale} />
}