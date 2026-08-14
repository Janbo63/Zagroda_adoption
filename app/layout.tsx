'use client';

import './globals.css';
import FacebookPixel from '@/components/FacebookPixel';
import Script from 'next/script';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}

// ─── Analytics IDs ────────────────────────────────────────────────────
const GA4_ID = 'G-V9R1JJYYSG';
const CLARITY_ID = 'vlllu29qxu';
const GOOGLE_ADS_ID = 'AW-1028380046';
const GOOGLE_ADS_CONVERSION = 'AW-1028380046/Mf3MCP-q__sbEI6rr-oD';
// ──────────────────────────────────────────────────────────────────────

// Helper: call from any WhatsApp / booking button click
export function trackGoogleAdsConversion() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_CONVERSION,
      value: 100.0,
      currency: 'PLN',
    });
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FacebookPixel />

        {/* ── 0. Zoho Marketing Automation (PageSense) ── */}
        <Script
          strategy="afterInteractive"
          src="https://cdn-eu.pagesense.io/js/20118320383/73dfb9b8e0844389945694883c358b1f.js"
        />

        {/* ── 1. Google Analytics (GA4) ── */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              
              // We use replace to ensure tracking matches www domain
              var currentUrl = window.location.href;
              var wwwUrl = currentUrl.replace('https://', 'https://www.');
              
              gtag('config', '${GA4_ID}', {
                page_path: window.location.pathname,
                page_location: wwwUrl,
                send_page_view: true
              });

              // Google Ads conversion tracking
              gtag('config', '${GOOGLE_ADS_ID}');

              // ── AI Referrer Detection ──
              // Detects visitors arriving from AI assistants and fires a custom event.
              // Catches traffic that GA4 would otherwise classify as direct/organic/referral.
              (function() {
                var defined = {
                  'chatgpt.com':       'ChatGPT',
                  'chat.openai.com':   'ChatGPT',
                  'perplexity.ai':     'Perplexity',
                  'claude.ai':         'Claude',
                  'gemini.google.com': 'Gemini',
                  'bard.google.com':   'Gemini',
                  'copilot.microsoft.com': 'Copilot',
                  'bing.com/chat':     'Copilot',
                  'meta.ai':           'MetaAI',
                  'you.com':           'YouAI',
                  'phind.com':         'Phind',
                  'poe.com':           'Poe',
                  'huggingface.co/chat': 'HuggingChat',
                  'deepseek.com':      'DeepSeek'
                };
                var ref = document.referrer || '';
                var aiSource = null;
                for (var domain in defined) {
                  if (ref.indexOf(domain) !== -1) {
                    aiSource = defined[domain];
                    break;
                  }
                }
                if (aiSource) {
                  gtag('event', 'ai_referral', {
                    ai_engine: aiSource,
                    referrer_url: ref,
                    landing_page: window.location.pathname
                  });
                  // Also set a user property so all subsequent events are tagged
                  gtag('set', 'user_properties', {
                    ai_referred: 'true',
                    ai_engine: aiSource
                  });
                }
              })();
            `,
          }}
        />

        {/* ── 2. Microsoft Clarity ── */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `,
          }}
        />

        {children}
      </body>
    </html>
  );
}