import { Search } from 'lucide-react';

const categories = [
    'Todas',
    'Alianza estratégica',
    'Proveedor',
    'Colaborador',
    'Oportunidad comercial',
];

const states = ['Todos', 'Activo', 'En proceso', 'Resuelto', 'Cerrado'];

function Chip({ active, children }: { active?: boolean; children: string }) {
    return (
        <button
            type="button"
            aria-pressed={active}
            className={`flex h-[32px] shrink-0 cursor-pointer items-center rounded-[8px] px-[14px] font-arial text-[13px] leading-[20px] whitespace-nowrap ${
                active
                    ? 'bg-[#133260] font-bold text-white'
                    : 'border border-solid border-[#cad5e2] text-[#314158]'
            }`}
        >
            {children}
        </button>
    );
}

export function VinculacionFilters() {
    return (
        <div className="flex w-full flex-col gap-[23px] rounded-[16px] border border-solid border-[#e2e8f0] bg-white px-[16px] py-[20px] lg:px-[23px] lg:py-[23px]">
            <div className="flex flex-wrap items-center gap-[8px]">
                {categories.map((label, index) => (
                    <Chip key={label} active={index === 0}>
                        {label}
                    </Chip>
                ))}

                <label className="flex h-[32px] w-full items-center gap-[8px] rounded-[8px] border border-solid border-[#cad5e2] px-[12px] lg:ml-auto lg:w-[287px]">
                    <Search
                        aria-hidden
                        size={13}
                        strokeWidth={1.75}
                        className="shrink-0 text-[#90a1b9]"
                    />
                    <input
                        type="search"
                        placeholder="Buscar aliado, giro o ciudad..."
                        className="w-full min-w-0 bg-transparent font-arial text-[13px] text-[#0f172b] outline-none placeholder:text-[#90a1b9]"
                    />
                </label>
            </div>

            <div className="flex flex-wrap items-center gap-[10px]">
                <span className="font-arial text-[11px] leading-[16px] font-bold tracking-[0.5px] text-[#62748e] uppercase">
                    Estado
                </span>
                {states.map((label, index) => (
                    <button
                        key={label}
                        type="button"
                        aria-pressed={index === 0}
                        className={`flex h-[24px] cursor-pointer items-center rounded-[8px] px-[10px] font-arial text-[12px] leading-[16px] whitespace-nowrap ${
                            index === 0
                                ? 'bg-[#e6ecf5] font-bold text-[#133260]'
                                : 'text-[#62748e]'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
