import { Calendar, MapPin, Send } from 'lucide-react';

export type Vinculacion = {
    badge: string;
    status: string;
    title: string;
    description: string;
    location: string;
    date: string;
    company: string;
};

export function VinculacionCard({ item }: { item: Vinculacion }) {
    return (
        <article className="flex h-[271px] w-[395px] flex-col rounded-[12px] border border-solid border-[#e2e8f0] bg-white pt-[27px] pr-[20px] pb-[27px] pl-[21px]">
            <div className="flex items-center justify-between">
                <span className="rounded-[4px] border border-solid border-[#cad5e2] bg-white px-[8px] py-[3px] font-arial text-[10px] leading-[14px] font-bold tracking-[0.3px] whitespace-nowrap text-[#133260] uppercase">
                    {item.badge}
                </span>
                <span className="rounded-[4px] bg-[#b9f8cf] px-[8px] py-[3px] font-arial text-[10px] leading-[14px] font-bold whitespace-nowrap text-[#0d542b]">
                    {item.status}
                </span>
            </div>

            <div className="mt-[14px] flex flex-col gap-[10px]">
                <h3 className="font-heading text-[16px] leading-[22px] font-bold text-[#0f172b] text-trim">
                    {item.title}
                </h3>
                <p className="font-arial text-[14px] leading-[23px] text-[#45556c]">
                    {item.description}
                </p>
                <p className="mt-[4px] flex items-center gap-[12px] font-arial text-[12px] leading-[16px] whitespace-nowrap text-[#62748e]">
                    <span className="flex items-center gap-[6px]">
                        <MapPin
                            aria-hidden
                            size={12}
                            strokeWidth={1.5}
                            className="shrink-0"
                        />
                        {item.location}
                    </span>
                    <span className="flex items-center gap-[6px]">
                        <Calendar
                            aria-hidden
                            size={12}
                            strokeWidth={1.5}
                            className="shrink-0"
                        />
                        {item.date}
                    </span>
                </p>
            </div>

            <div className="mt-auto flex flex-col gap-[14px] border-t border-solid border-[#f1f5f9] pt-[14px]">
                <div className="flex items-center justify-between">
                    <span className="font-arial text-[11px] leading-[16px] whitespace-nowrap text-[#62748e]">
                        {item.company}
                    </span>
                    <button
                        type="button"
                        className="flex h-[35px] w-[145px] shrink-0 cursor-pointer items-center justify-center gap-[8px] rounded-[12px] bg-[#133260]"
                    >
                        <Send
                            aria-hidden
                            size={12}
                            strokeWidth={1.75}
                            className="text-white"
                        />
                        <span className="font-arial text-[12px] leading-[16px] font-bold whitespace-nowrap text-white text-trim">
                            Solicitar contacto
                        </span>
                    </button>
                </div>
            </div>
        </article>
    );
}
