import { GoatsPageContent } from '@/components/GoatsPageContent'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }]
}

export default function GoatsPage({ params }: { params: { locale: string } }) {
  return <GoatsPageContent locale={params.locale} />
}