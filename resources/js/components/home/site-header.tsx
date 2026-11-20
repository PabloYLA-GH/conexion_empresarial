import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
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
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="relative bg-white xl:h-[96px]">
            <div className="relative mx-auto w-full max-w-[1216px] px-[18px] xl:h-full xl:p-0">
                <div className="flex h-[56px] items-center justify-between xl:hidden">
                    <Link
                        href="/"
                        className="font-heading text-[18px] leading-[28px] font-extrabold tracking-[-0.45px] whitespace-nowrap text-[#133260] text-trim"
                    >
                        Comunidad 360°
                    </Link>
                    <button
                        type="button"
                        aria-controls="menu-principal"
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex size-[24px] items-center justify-center text-[#133260]"
                    >
                        {menuOpen ? (
                            <X aria-hidden size={24} strokeWidth={1.75} />
                        ) : (
                            <Menu aria-hidden size={24} strokeWidth={1.75} />
                        )}
                    </button>
                </div>

                <div
                    id="menu-principal"
                    className={`${menuOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full z-40 h-[calc(100vh-56px)] flex-col items-stretch overflow-y-auto border-t border-solid border-[#e2e8f0] bg-[#f8fafc] px-[18px] pt-[40px] pb-[32px] xl:relative xl:inset-auto xl:z-auto xl:block xl:h-full xl:overflow-visible xl:border-0 xl:bg-transparent xl:p-0`}
                >
                    <Link
                        href="/"
                        className="hidden font-heading text-[18px] leading-[28px] font-extrabold tracking-[-0.45px] whitespace-nowrap text-[#133260] text-trim xl:absolute xl:top-[71.5px] xl:left-0 xl:block xl:-translate-y-1/2"
                    >
                        Comunidad 360°
                    </Link>

                    <nav
                        aria-label="Navegación principal"
                        className="flex w-full flex-col items-start xl:absolute xl:top-[66px] xl:left-[394.05px] xl:w-[358px] xl:flex-row xl:items-center xl:justify-between xl:gap-0"
                    >
                        {nav.map((item) => {
                            const active = isCurrentUrl(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`relative py-[9px] font-arial text-[16px] leading-[20px] whitespace-nowrap text-trim xl:py-0 xl:text-[14px] ${
                                        active
                                            ? 'xl:after:content-[" "] font-bold text-[#133260] xl:after:absolute xl:after:top-[29px] xl:after:right-0 xl:after:left-0 xl:after:h-[2px] xl:after:bg-[#133260]'
                                            : 'text-[#45556c]'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-[40px] flex w-full flex-col gap-[12px] xl:mt-0 xl:contents">
                        <Link
                            href={auth.user ? dashboard() : login()}
                            className="flex h-[46px] w-full items-center justify-center rounded-[8px] border border-solid border-[#cad5e2] bg-white font-arial text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#0f172b] text-trim xl:absolute xl:top-[66px] xl:left-[1010px] xl:h-auto xl:w-auto xl:border-0 xl:bg-transparent xl:font-normal xl:text-[#45556c]"
                        >
                            {auth.user ? 'Ir al panel' : 'Iniciar sesión'}
                        </Link>
                        {auth.user ? (
                            <Link
                                href={logout()}
                                as="button"
                                className="flex items-center justify-center rounded-[8px] bg-[#133260] px-[15px] py-[12px] xl:absolute xl:top-[55px] xl:right-0"
                            >
                                <span className="font-arial text-[12px] leading-[20px] font-bold whitespace-nowrap text-white text-trim">
                                    Cerrar sesión
                                </span>
                            </Link>
                        ) : (
                            <Link
                                href={register()}
                                className="flex h-[46px] w-full items-center justify-center rounded-[8px] bg-[#133260] px-[15px] py-[12px] xl:absolute xl:top-[55px] xl:left-[1115px] xl:h-auto xl:w-auto"
                            >
                                <span className="font-arial text-[12px] leading-[20px] font-bold whitespace-nowrap text-white text-trim">
                                    Registrarme
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0">
                <HairLine src="header-divider.svg" />
            </div>
        </header>
    );
}
