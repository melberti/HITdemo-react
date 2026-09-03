import { useEffect } from 'react';

export function useLockBodyScroll(isOpen) {
    useEffect(() => {
        if (!isOpen) return;

        const scrollY = window.scrollY;
        const originalBodyStyles = {
            position: document.body.style.position,
            top: document.body.style.top,
            width: document.body.style.width,
        };
        const originalHtmlOverflowY = document.documentElement.style.overflowY;

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.documentElement.style.overflowY = 'scroll';

        return () => {
            document.body.style.position = originalBodyStyles.position;
            document.body.style.top = originalBodyStyles.top;
            document.body.style.width = originalBodyStyles.width;
            document.documentElement.style.overflowY = originalHtmlOverflowY;
            window.scrollTo(0, scrollY);
        };
    }, [isOpen]);
}