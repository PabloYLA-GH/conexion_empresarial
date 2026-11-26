import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/home/site-footer';
import { SiteHeader } from '@/components/home/site-header';

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="font-arial min-h-screen bg-white text-[#0f172b]">
            <SiteHeader />
            {children}
            <SiteFooter />
        </div>
    );
}
