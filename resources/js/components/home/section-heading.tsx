import type { ReactNode } from 'react';

type Props = {
    eyebrow: ReactNode;
    title: string;
    children: ReactNode;
    className?: string;
};

export function Eyebrow({ children }: { children: ReactNode }) {
    return (
        <p className="w-full font-arial text-[12px] leading-[16px] font-bold tracking-[0.6px] text-[#133260] uppercase text-trim">
            {children}
        </p>
    );
}

export function SectionHeading({ eyebrow, title, children, className }: Props) {
    return (
        <div
            className={`flex flex-col items-start gap-[26px] ${className ?? ''}`}
        >
            {typeof eyebrow === 'string' ? (
                <Eyebrow>{eyebrow}</Eyebrow>
            ) : (
                eyebrow
            )}
            <div className="flex w-full flex-col items-start gap-[31px]">
                <h2 className="w-full font-heading text-[30px] leading-[36px] font-extrabold tracking-[-0.75px] text-[#020618] text-trim">
                    {title}
                </h2>
                <p className="w-full font-arial text-[16px] leading-[26px] text-[#45556c] text-trim">
                    {children}
                </p>
            </div>
        </div>
    );
}
