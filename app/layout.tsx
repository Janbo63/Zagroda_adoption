import Script from 'next/script'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-V9R1JJYYSG`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V9R1JJYYSG', {
              debug_mode: true,
              page_location: window.location.href,
              page_path: window.location.pathname
            });
          `}
        </Script>
      </body>
    </html>
  )
}