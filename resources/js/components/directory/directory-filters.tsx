import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { FillIcon, Glyph, HairLine } from '@/components/home/glyph';

const labelClass =
    'text-trim w-full font-arial text-[12px] leading-[16px] font-bold text-[#314158]';
const controlClass =
    'flex w-full items-center gap-[8px] rounded-[8px] border border-solid bg-[#f8fafc] px-[20px]';

type DropdownProps = {
    id: string;
    label: string;
    /** Texto que se muestra mientras no se elige ninguna opción. */
    placeholder: string;
    options: string[];
    /** Alto del panel según Figma (px). Si se omite, se ajusta al contenido. */
    panelHeight?: number;
};

/**
 * Lista desplegable con el diseño de Figma (panel blanco de 280 px de ancho,
 * fila seleccionada con fondo claro y el resto en gris).
 */
function DropdownField({
    id,
    label,
    placeholder,
    options,
    panelHeight,
}: DropdownProps) {
    const [value, setValue] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const root = useRef<HTMLDivElement>(null);

    // Cierra al hacer clic fuera y vuelve al valor inicial con "Limpiar".
    useEffect(() => {
        const onPointerDown = (event: MouseEvent) => {
            if (!root.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const onReset = () => {
            setValue(null);
            setOpen(false);
        };
        const form = root.current?.closest('form');

        document.addEventListener('mousedown', onPointerDown);
        form?.addEventListener('reset', onReset);

        return () => {
            document.removeEventListener('mousedown', onPointerDown);
            form?.removeEventListener('reset', onReset);
        };
    }, []);

    const choose = (index: number) => {
        setValue(options[index]);
        setActive(index);
        setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setOpen(false);
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);
            setActive((current) =>
                event.key === 'ArrowDown'
                    ? Math.min(current + 1, options.length - 1)
                    : Math.max(current - 1, 0),
            );
        } else if (event.key === 'Enter' && open) {
            event.preventDefault();
            choose(active);
        }
    };

    return (
        <div className="flex w-full flex-col items-start gap-[10px]">
            <label htmlFor={id} className={labelClass}>
                {label}
            </label>
            <div
                ref={root}
                onKeyDown={onKeyDown}
                className="relative h-[40px] w-full"
            >
                <input type="hidden" name={id} value={value ?? ''} />
                <button
                    id={id}
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    onClick={() => setOpen((current) => !current)}
                    className={`h-full cursor-pointer justify-between text-left ${controlClass} ${
                        open ? 'border-[#0f172b]' : 'border-[#cad5e2]'
                    }`}
                >
                    <span className="font-arial text-[14px] text-[#314158]">
                        {value ?? placeholder}
                    </span>
                    <Glyph
                        src="chevron-down.svg"
                        className="h-[6.5px] w-[13px]"
                        inset="-5.44% -2.72% -10.88% -2.72%"
                    />
                </button>

                {open && (
                    <ul
                        role="listbox"
                        aria-labelledby={id}
                        style={{ height: panelHeight }}
                        className="absolute top-[calc(100%+6px)] left-[-21px] z-20 flex w-[280px] flex-col gap-[5px] rounded-[12px] border border-solid border-[#e2e8f0] bg-white px-[14px] pt-[18.5px] pb-[18px]"
                    >
                        {options.map((option, index) => {
                            const selected = index === active;

                            return (
                                <li
                                    key={`${option}-${index}`}
                                    role="option"
                                    aria-selected={value === option}
                                    onMouseEnter={() => setActive(index)}
                                    onClick={() => choose(index)}
                                    className={`flex h-[24px] shrink-0 cursor-pointer items-center rounded-[6px] px-[11px] font-arial text-[14px] ${
                                        selected
                                            ? 'bg-[#f8fafc] text-[#0f172b]'
                                            : 'text-[#0f172b]/50'
                                    }`}
                                >
                                    {option}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

export function DirectoryFilters() {
    return (
        <form
            role="search"
            aria-label="Filtros y búsqueda"
            className="flex w-full shrink-0 items-start self-start rounded-[12px] border border-solid border-[#e2e8f0] bg-white px-[20px] pt-[24px] pb-[35px] lg:w-[280px]"
        >
            <div className="flex min-w-px flex-1 flex-col items-start gap-[24px]">
                <div className="flex w-full flex-col items-center gap-[14px]">
                    <div className="flex w-full items-center gap-[35px]">
                        <div className="flex min-w-px flex-1 items-center gap-[8px]">
                            <FillIcon
                                src="icon-filters.svg"
                                className="size-[16px]"
                            />
                            <h2 className="font-heading text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#0f172b] text-trim">
                                Filtros y búsqueda
                            </h2>
                        </div>
                        <button
                            type="reset"
                            className="flex shrink-0 cursor-pointer items-center gap-[4px]"
                        >
                            <Glyph
                                src="icon-reset.svg"
                                className="size-[9px]"
                                inset="-5.56%"
                            />
                            <span className="font-arial text-[12px] leading-[16px] whitespace-nowrap text-[#62748e] text-trim">
                                Limpiar
                            </span>
                        </button>
                    </div>
                    <HairLine src="divider-filters.svg" />
                </div>

                <div className="flex w-full flex-col items-start gap-[15px]">
                    <div className="flex w-full flex-col items-start gap-[10px]">
                        <label htmlFor="q" className={labelClass}>
                            Buscador general
                        </label>
                        <div
                            className={`h-[42px] border-[#cad5e2] ${controlClass}`}
                        >
                            <Glyph
                                src="icon-search.svg"
                                className="size-[12px]"
                                inset="-5.56%"
                            />
                            <input
                                id="q"
                                name="q"
                                type="search"
                                placeholder="Nombre, negocio, servicio..."
                                className="min-w-px flex-1 bg-transparent font-arial text-[14px] text-[#0f172b] outline-none placeholder:text-[#0f172b]/50 [&::-webkit-search-cancel-button]:hidden"
                            />
                        </div>
                    </div>
                    <DropdownField
                        id="categoria"
                        label="Categoría"
                        placeholder="Todas las categorías"
                        panelHeight={236}
                        options={[
                            'Empresarios',
                            'Profesionistas',
                            'Emprendedores',
                            'Profesionistas',
                            'Servicios',
                            'Productores',
                            'Organizaciones',
                        ]}
                    />
                    <DropdownField
                        id="ubicacion"
                        label="Ubicación"
                        placeholder="Todas las ubicaciones"
                        panelHeight={213}
                        options={[
                            'Ciudad de méxico, CDMX',
                            'Guadalajara, Jalisco',
                            'Mérida, Yucatán',
                            'Monterrey, Nuevo León',
                            'Puebla, Puebla',
                            'Querétaro, Querétaro',
                        ]}
                    />
                    <DropdownField
                        id="orden"
                        label="Ordenar por"
                        placeholder="Destacados y recientes"
                        options={['Destacados y recientes']}
                    />
                </div>
            </div>
        </form>
    );
}
