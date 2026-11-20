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
        <header className="relative bg-white xl:h-[96px]">
            <div className="relative mx-auto flex w-full max-w-[1216px] flex-col items-center gap-6 px-4 py-5 xl:block xl:h-full xl:p-0">
                <Link
                    href="/"
                    className="font-heading text-[18px] leading-[28px] font-extrabold tracking-[-0.45px] whitespace-nowrap text-[#133260] text-trim xl:absolute xl:top-[71.5px] xl:left-0 xl:-translate-y-1/2"
                >
                    Comunidad 360°
                </Link>

                <nav
                    aria-label="Navegación principal"
                    className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-3 xl:absolute xl:top-[66px] xl:left-[394.05px] xl:w-[358px] xl:justify-between xl:gap-0"
                >
                    {nav.map((item) => {
                        const active = isCurrentUrl(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                className={`relative font-arial text-[14px] leading-[20px] whitespace-nowrap text-trim ${
                                    active
                                        ? 'after:content-[" "] font-bold text-[#133260] after:absolute after:top-[calc(100%+4px)] after:right-0 after:left-0 after:h-[2px] after:bg-[#133260] xl:after:top-[29px]'
                                        : 'text-[#45556c]'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center justify-center gap-5 xl:contents">
                    <Link
                        href={auth.user ? dashboard() : login()}
                        className="font-arial text-[14px] leading-[20px] whitespace-nowrap text-[#45556c] text-trim xl:absolute xl:top-[66px] xl:left-[1010px]"
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
                            className="flex items-center justify-center rounded-[8px] bg-[#133260] px-[15px] py-[12px] xl:absolute xl:top-[55px] xl:left-[1115px]"
                        >
                            <span className="font-arial text-[12px] leading-[20px] font-bold whitespace-nowrap text-white text-trim">
                                Registrarme
                            </span>
                        </Link>
                    )}
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0">
                <HairLine src="header-divider.svg" />
            </div>
        </header>
    );
}
