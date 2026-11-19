import { Link } from '@inertiajs/react';
import { login, register } from '@/routes';
import { HairLine } from './glyph';

type NavKey = 'inicio' | 'directorio' | 'vinculaciones' | 'proximamente';

const nav: { key: NavKey; label: string; href: string }[] = [
    { key: 'inicio', label: 'Inicio', href: '/' },
    { key: 'directorio', label: 'Directorio', href: '/directorio' },
    { key: 'vinculaciones', label: 'Vinculaciones', href: '/#vinculaciones' },
    { key: 'proximamente', label: 'Próximamente', href: '/#proximamente' },
];

// Posición (desde el borde izquierdo del contenedor) y ancho de la línea
// que marca la sección activa, según el diseño de Figma.
const underline: Partial<Record<NavKey, { left: number; width: number }>> = {
    inicio: { left: 394, width: 36.56 },
    directorio: { left: 460, width: 66 },
};

export function SiteHeader({ current = 'inicio' }: { current?: NavKey }) {
    const line = underline[current];

    return (
        <header className="relative h-[96px] bg-white">
            <div className="relative mx-auto h-full w-full max-w-[1216px]">
                <Link
                    href="/"
                    className="absolute top-[71.5px] left-0 -translate-y-1/2 font-heading text-[18px] leading-[28px] font-extrabold tracking-[-0.45px] whitespace-nowrap text-[#133260] text-trim"
                >
                    Comunidad 360°
                </Link>

                <nav className="absolute top-[66px] left-[394.05px] flex w-[358px] items-center justify-between">
                    {nav.map((item) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`font-arial text-[14px] leading-[20px] whitespace-nowrap text-trim ${
                                item.key === current
                                    ? 'font-bold text-[#133260]'
                                    : 'text-[#45556c]'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <Link
                    href={login()}
                    className="absolute top-[66px] left-[1010px] font-arial text-[14px] leading-[20px] whitespace-nowrap text-[#45556c] text-trim"
                >
                    Iniciar sesión
                </Link>
                <Link
                    href={register()}
                    className="absolute top-[55px] left-[1115px] flex items-center justify-center rounded-[8px] bg-[#133260] px-[15px] py-[12px]"
                >
                    <span className="font-arial text-[12px] leading-[20px] font-bold whitespace-nowrap text-white text-trim">
                        Registrarme
                    </span>
                </Link>
                {line && (
                    <span
                        className="absolute -bottom-px z-10 h-[2px] bg-[#133260]"
                        style={{ left: line.left, width: line.width }}
                    />
                )}
            </div>

            <div className="absolute inset-x-0 bottom-0">
                <HairLine src="header-divider.svg" />
            </div>
        </header>
    );
}
