import { VoucherPurchaseFlow } from '@/components/VoucherPurchaseFlow';
import { unstable_setRequestLocale } from 'next-intl/server';

type VouchersPageProps = {
    params: { locale: string };
};

export function generateStaticParams() {
    return [{ locale: 'pl' }, { locale: 'en' }, { locale: 'de' }, { locale: 'cs' }];
}

export default function VouchersPage({ params: { locale } }: VouchersPageProps) {
    unstable_setRequestLocale(locale);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="mt-8">
                <VoucherPurchaseFlow locale={locale} />
            </div>
        </div>
    );
}
