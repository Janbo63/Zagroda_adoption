'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import * as fpixel from '@/lib/fpixel';

const FacebookPixel = () => {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (!loaded) return;
        fpixel.pageview();
    }, [pathname, loaded]);

    return (
        <div>
            <Script
                id="fb-pixel"
                src="https://connect.facebook.net/en_US/fbevents.js"
                strategy="afterInteractive"
                onLoad={() => {
                    setLoaded(true);
                }}
            />
        </div>
    );
};

export default FacebookPixel;
