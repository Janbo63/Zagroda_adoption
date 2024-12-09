import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Button } from "@/components/ui/button"

// Put Polish first as it's the default language
const LOCALES = ['pl', 'en', 'de', 'cs'] as const

const languageNames = {
  pl: 'Polski',
  en: 'English',
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
    <div className="flex items-center justify-end gap-0.5 sm:gap-1">
      {LOCALES.map((locale) => (
        <Button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          variant={currentLocale === locale ? "default" : "secondary"}
          className={`text-[10px] leading-none sm:text-sm h-6 sm:h-8 w-[32px] sm:w-[64px] px-0.5 sm:px-2 ${
            currentLocale === locale 
              ? 'bg-orange-400 text-white hover:bg-orange-500'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          disabled={currentLocale === locale}
        >
          {locale.toUpperCase()}
        </Button>
      ))}
    </div>
  )
}