'use client';

// import NextNProgress from 'nextjs-progressbar';
// import { PagesProgressBar } from 'next-nprogress-bar';
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const ProgressBar = () => {

    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        NProgress.done();
        return () => {
            NProgress.start();
        };
    }, [pathname, searchParams]);

    return (
        // <NextNProgress/>
        // <PagesProgressBar
        //     height="4px"
        //     color="#fffd00"
        //     options={{ showSpinner: false }}
        //     shallowRouting
        // />
    );
};

export default ProgressBar;
