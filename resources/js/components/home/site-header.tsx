import { Link, usePage } from '@inertiajs/react';
import { dashboard, login, logout, register } from '@/routes';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { HairLine } from './glyph';

const nav = [
    { label: 'Inicio', href: '/' },
    { label: 'Directorio', href: '/directorio' },
    { label: 'Vinculaciones', href: '/vinculaciones' },
    { label: 'Próximamente', href: '/proximamente' },
];

export function SiteHeader() {
    const { isCurrentUrl } = useCurrentUrl();
    const { auth } = usePage().props;

    return (
        <header className="relative h-[96px] bg-white">
            <div className="relative mx-auto h-full w-full max-w-[1216px]">
                <Link
                    href="/"
                    className="absolute top-[71.5px] left-0 -translate-y-1/2 font-heading text-[18px] leading-[28px] font-extrabold tracking-[-0.45px] whitespace-nowrap text-[#133260] text-trim"
                >
                    Comunidad 360°
                </Link>

                <nav aria-label="Navegación principal" className="absolute top-[66px] left-[394.05px] flex w-[358px] items-center justify-between">
                    {nav.map((item) => {
                        const active = isCurrentUrl(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                className={`relative font-arial text-[14px] leading-[20px] whitespace-nowrap text-trim ${
                                    active
                                        ? 'font-bold text-[#133260] after:absolute after:top-[29px] after:right-0 after:left-0 after:h-[2px] after:bg-[#133260] after:content-[" "]'
                                        : 'text-[#45556c]'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <Link
                    href={auth.user ? dashboard() : login()}
                    className="absolute top-[66px] left-[1010px] font-arial text-[14px] leading-[20px] whitespace-nowrap text-[#45556c] text-trim"
                >
                    {auth.user ? 'Ir al panel' : 'Iniciar sesión'}
                </Link>
                {auth.user ? (
                    <Link
                        href={logout()}
                        as="button"
                        className="absolute top-[55px] left-[1115px] flex items-center justify-center rounded-[8px] bg-[#133260] px-[15px] py-[12px] font-arial text-[12px] leading-[20px] font-bold whitespace-nowrap text-white"
                    >
                        Cerrar sesión
                    </Link>
                ) : (
                    <Link
                        href={register()}
                        className="absolute top-[55px] left-[1115px] flex items-center justify-center rounded-[8px] bg-[#133260] px-[15px] py-[12px]"
                    >
                        <span className="font-arial text-[12px] leading-[20px] font-bold whitespace-nowrap text-white text-trim">
                            Registrarme
                        </span>
                    </Link>
                )}
            </div>

            <div className="absolute inset-x-0 bottom-0">
                <HairLine src="header-divider.svg" />
            </div>
        </header>
    );
}
