import { AnimalsPageContent } from '@/components/AnimalsPageContent'

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'pl' }
  ]
}

export default function AnimalsPage({ params }: { params: { locale: string } }) {
  return <AnimalsPageContent locale={params.locale} />
}