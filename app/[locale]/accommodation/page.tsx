import { unstable_setRequestLocale } from 'next-intl/server'

interface AccommodationPageProps {
  params: { locale: string }
}

export default function AccommodationPage({ params: { locale } }: AccommodationPageProps) {
  unstable_setRequestLocale(locale)
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 mt-16">
        <iframe 
          data-src="https://beds24.com/booking2.php?propid=YOUR_PROPERTY_ID&referer=iFrame" 
          width="100%" 
          height="800" 
          style={{ border: 'none', maxWidth: '100%', overflow: 'auto' }}
        />
        <script dangerouslySetInnerHTML={{ __html: `
          var addUrlParamsToIframeSrcs = function() {
            const validParameters = ["checkin", "checkout", "numnight", "numadult", "numchild", "ownerid", "propid", "roomid", "referer", "lang", "group", "nogroup", "category1", "category2", "category3", "category4", "customParameter"];
            const currentUrl = new URL(window.location.href);
            let parametersString = "";
            validParameters.forEach(parameter => {
              const parameterValue = currentUrl.searchParams.get(parameter);
              if (parameterValue !== null) {
                parametersString += "&" + parameter + "=" + parameterValue;
              }
            });
            const iframes = document.getElementsByTagName("iframe");
            for (let iframe of iframes) {
              let iframeSrc = iframe.getAttribute("data-src");
              if (iframeSrc === null) continue;
              if (!iframeSrc.includes("?")) iframeSrc += "?";
              iframeSrc += parametersString;
              iframe.setAttribute("src", iframeSrc)
            }
          };
          addUrlParamsToIframeSrcs();
        `}} />
      </div>
    </div>
  )
}

export function generateMetadata({ params: { locale } }: AccommodationPageProps) {
  return {
    title: `Accommodation - ${locale.toUpperCase()}`,
    description: `Book your stay - ${locale.toUpperCase()} version`,
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }]
}
