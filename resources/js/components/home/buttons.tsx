import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Glyph } from './glyph';

type LinkProps = {
    href: string | { url: string };
    children: ReactNode;
    className?: string;
};

function Anchor({ href, children, className }: LinkProps) {
    const to = typeof href === 'string' ? href : href.url;

    return to.startsWith('#') ? (
        <a href={to} className={className}>
            {children}
        </a>
    ) : (
        <Link href={to} className={className}>
            {children}
        </Link>
    );
}

/** Botón principal: azul con flecha. */
export function PrimaryButton({
    href,
    children,
    className = 'px-[24px] py-[18.5px]',
}: LinkProps) {
    return (
        <Anchor
            href={href}
            className={`flex shrink-0 items-center justify-center gap-[10px] rounded-[8px] border border-solid border-[#133260] bg-[#133260] ${className}`}
        >
            <span className="font-arial text-[14px] leading-[20px] font-bold whitespace-nowrap text-white text-trim">
                {children}
            </span>
            <Glyph src="arrow-hero.svg" className="size-[9.333px]" />
        </Anchor>
    );
}

/** Botón secundario con borde. */
export function OutlineButton({
    href,
    children,
    className = 'px-[24px] py-[18.5px] text-[14px]',
}: LinkProps) {
    return (
        <Anchor
            href={href}
            className={`flex shrink-0 items-center justify-center rounded-[8px] border border-solid border-[#cad5e2] ${className}`}
        >
            <span className="font-arial leading-[20px] font-bold whitespace-nowrap text-[#0f172b] text-trim">
                {children}
            </span>
        </Anchor>
    );
}

/** Enlace de texto azul con flecha ("Ver directorio completo", etc.). */
export function TextLink({
    href,
    children,
    arrow,
    arrowClassName = 'size-[7.333px]',
    arrowInset,
    className = 'gap-[9px]',
    textClassName = 'text-[12px]',
}: {
    href: string;
    children: ReactNode;
    arrow: string;
    arrowClassName?: string;
    arrowInset?: string;
    className?: string;
    textClassName?: string;
}) {
    return (
        <a href={href} className={`flex shrink-0 items-center ${className}`}>
            <span
                className={`font-arial leading-[20px] font-bold whitespace-nowrap text-[#133260] text-trim ${textClassName}`}
            >
                {children}
            </span>
            <Glyph src={arrow} className={arrowClassName} inset={arrowInset} />
        </a>
    );
}
