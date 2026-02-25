export const FB_PIXEL_ID = '1608105036460297';

declare global {
    interface Window {
        fbq: any;
    }
}

export const pageview = () => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
    }
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', name, options);
    }
};
