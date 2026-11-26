import type { LucideIcon } from 'lucide-react';

export type Proximamente = {
    number: string;
    icon: LucideIcon;
    title: string;
    text: string;
};

export function ProximamenteCard({ item }: { item: Proximamente }) {
    const Icon = item.icon;

    return (
        <article className="flex min-h-[227px] w-full flex-col rounded-[12px] border border-solid border-[#e2e8f0] bg-white pt-[28px] pr-[23px] pl-[23px] lg:h-[227px]">
            <div className="flex items-center justify-between">
                <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[8px] bg-[#f8fafc] text-[#133260]">
                    <Icon aria-hidden size={18} strokeWidth={1.75} />
                </span>
                <span className="flex items-center justify-center rounded-[4px] border border-solid border-[#cad5e2] bg-white px-[10px] py-[5px]">
                    <span className="font-arial text-trim text-[10px] leading-[14px] font-bold tracking-[0.5px] whitespace-nowrap text-[#133260] uppercase">
                        Próximamente
                    </span>
                </span>
            </div>

            <div className="mt-[13px] flex flex-col gap-[8px]">
                <span className="font-menlo text-[11px] leading-[16px] text-[#90a1b9]">
                    {item.number}
                </span>
                <h3 className="font-heading text-trim text-[20px] leading-[26px] font-bold text-[#0f172b]">
                    {item.title}
                </h3>
                <p className="font-arial text-[14px] leading-[23px] text-[#45556c]">
                    {item.text}
                </p>
            </div>
        </article>
    );
}
