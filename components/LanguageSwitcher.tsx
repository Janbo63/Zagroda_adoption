import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { locales } from '@/config/i18n'
import { Button } from "@/components/ui/button"

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
      {locales.map((locale) => (
        <Button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          variant={currentLocale === locale ? "default" : "outline"}
          className="text-sm"
          disabled={currentLocale === locale}
        >
          {locale === 'en' ? 'English' : 'Polski'}
        </Button>
      ))}
    </div>
  )
}