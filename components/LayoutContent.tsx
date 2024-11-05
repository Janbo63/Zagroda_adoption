'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Image from 'next/image'
import { Footer } from '@/components/footer'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function LayoutContent({ children, locale }: { children: React.ReactNode, locale: string }) {
  const pathname = usePathname()
  const t = useTranslations('common')

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-800 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-400 opacity-20"></div>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center relative z-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/zagrodalogo.png"
              alt="Zagroda Alpakoterapii Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-2xl font-bold text-white">Zagroda Alpakoterapii</span>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Button variant="ghost" asChild className="text-white hover:text-orange-100 hover:bg-green-900">
                  <Link href="/" className={pathname === "/" ? "text-orange-100" : ""}>
                    {t('home')}
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild className="text-white hover:text-orange-100 hover:bg-green-900">
                  <Link href="/animals" className={pathname === "/animals" ? "text-orange-100" : ""}>
                    {t('animals')}
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild className="text-white hover:text-orange-100 hover:bg-green-900">
                  <Link href="/stay" className={pathname === "/stay" ? "text-orange-100" : ""}>
                    {t('stay')}
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild className="text-white hover:text-orange-100 hover:bg-green-900">
                  <Link href="/activities" className={pathname === "/activities" ? "text-orange-100" : ""}>
                    {t('activities')}
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild className="text-white hover:text-orange-100 hover:bg-green-900">
                  <Link href="/blog" className={pathname === "/blog" ? "text-orange-100" : ""}>
                    {t('blog')}
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild className="text-white hover:text-orange-100 hover:bg-green-900">
                  <Link href="/contact" className={pathname === "/contact" ? "text-orange-100" : ""}>
                    {t('contact')}
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden text-white border-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4">
                  <Link 
                    href="/" 
                    className={`hover:text-green-600 ${pathname === "/" ? "text-green-600" : ""}`}
                  >
                    {t('home')}
                  </Link>
                  <Link 
                    href="/animals"
                    className={`hover:text-green-600 ${pathname === "/animals" ? "text-green-600" : ""}`}
                  >
                    {t('animals')}
                  </Link>
                  <Link 
                    href="/stay"
                    className={`hover:text-green-600 ${pathname === "/stay" ? "text-green-600" : ""}`}
                  >
                    {t('stay')}
                  </Link>
                  <Link 
                    href="/activities"
                    className={`hover:text-green-600 ${pathname === "/activities" ? "text-green-600" : ""}`}
                  >
                    {t('activities')}
                  </Link>
                  <Link 
                    href="/blog"
                    className={`hover:text-green-600 ${pathname === "/blog" ? "text-green-600" : ""}`}
                  >
                    {t('blog')}
                  </Link>
                  <Link 
                    href="/contact"
                    className={`hover:text-green-600 ${pathname === "/contact" ? "text-green-600" : ""}`}
                  >
                    {t('contact')}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <Footer locale={locale} />
    </div>
  )
}