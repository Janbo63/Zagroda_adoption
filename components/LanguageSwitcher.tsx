import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Button } from "@/components/ui/button"

const LOCALES = ['en', 'pl', 'de', 'cs'] as const

const languageNames = {
  en: 'English',
  pl: 'Polski',
  de: 'Deutsch',
  cs: 'Čeština'
}

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const handleLocaleChange = (newLocale: string) => {
    if (pathname === null) {
      console.error('Pathname is null')
      return
    }

    // Remove the current locale from the pathname
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPathname = segments.join('/')

    router.push(newPathname)
  }

  return (
    <div className="flex space-x-2">
      {LOCALES.map((locale) => (
        <Button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          variant={currentLocale === locale ? "default" : "outline"}
          className="text-sm"
          disabled={currentLocale === locale}
        >
          {languageNames[locale]}
        </Button>
      ))}
    </div>
  )
}