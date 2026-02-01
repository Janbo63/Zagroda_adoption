import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'pl', 'de', 'cs', 'nl'] as const;
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales }); 