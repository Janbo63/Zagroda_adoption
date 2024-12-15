import Script from 'next/script'
import './globals.css'

const GA_MEASUREMENT_ID = 'G-V9R1JJYYSG'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}', {
              debug_mode: true,
              send_page_view: true,
              page_location: window.location.href,
              page_path: window.location.pathname,
              page_title: document.title
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}