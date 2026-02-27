import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Heart, Ticket, BarChart3, Settings, LogOut, Megaphone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';

export default function AdminLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Restrict to PL and EN only
    if (locale !== 'pl' && locale !== 'en') {
        redirect('/en/admin');
    }

    const t = useTranslations('admin');

    return (
        <div className="flex min-h-screen bg-stone-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-stone-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-stone-100">
                    <h1 className="text-xl font-black text-primary-900 flex items-center gap-2">
                        <Settings className="w-6 h-6 text-orange-500" />
                        {t('appTitle')}
                    </h1>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    <Link
                        href={`/${locale}/admin`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-100 transition-colors font-bold text-stone-600 hover:text-primary-900"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        {t('dashboard')}
                    </Link>
                    <Link
                        href={`/${locale}/admin/campaigns`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-colors font-bold text-stone-600 hover:text-orange-700"
                    >
                        <Megaphone className="w-5 h-5 text-orange-500" />
                        Campaigns
                    </Link>
                    <Link
                        href={`/${locale}/admin/adoptions`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-100 transition-colors font-bold text-stone-600 hover:text-primary-900"
                    >
                        <Heart className="w-5 h-5 text-rose-500" />
                        {t('adoptions')}
                    </Link>
                    <Link
                        href={`/${locale}/admin/vouchers`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-100 transition-colors font-bold text-stone-600 hover:text-primary-900"
                    >
                        <Ticket className="w-5 h-5 text-orange-500" />
                        {t('vouchers')}
                    </Link>
                    <Link
                        href={`/${locale}/admin/reports`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-100 transition-colors font-bold text-stone-600 hover:text-primary-900"
                    >
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                        {t('reports')}
                    </Link>
                </nav>

                <div className="p-4 border-t border-stone-100">
                    <Link
                        href={`/${locale}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors font-bold text-stone-500 hover:text-red-600"
                    >
                        <LogOut className="w-5 h-5" />
                        {t('backToSite')}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow">
                <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-8 md:hidden">
                    <h1 className="text-xl font-black text-primary-900">Admin</h1>
                    {/* Mobile menu toggle could go here */}
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
