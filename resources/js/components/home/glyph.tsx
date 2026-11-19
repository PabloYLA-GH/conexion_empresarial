import type { CSSProperties } from 'react';

export const IMG = '/images/home';

type Props = {
    /** Nombre del archivo dentro de public/images/home. */
    src: string;
    /** Clases de tamaño del contenedor (el del diseño en Figma). */
    className: string;
    /** Margen negativo con el que el SVG exportado sobresale del contenedor. */
    inset?: CSSProperties['inset'];
};

/**
 * Ícono SVG exportado de Figma. El archivo incluye el trazo, por lo que
 * sobresale del contenedor con un inset negativo, igual que en el diseño.
 */
export function Glyph({ src, className, inset = '-7.14%' }: Props) {
    return (
        <span className={`relative block shrink-0 ${className}`} aria-hidden>
            <span className="absolute block" style={{ inset }}>
                <img
                    alt=""
                    src={`${IMG}/${src}`}
                    className="block size-full max-w-none"
                />
            </span>
        </span>
    );
}

/** Línea divisoria de 0px de alto exportada de Figma. */
export function HairLine({ src, className = '' }: { src: string; className?: string }) {
    return (
        <span className={`relative block h-0 w-full shrink-0 ${className}`} aria-hidden>
            <span className="absolute block" style={{ inset: '-0.5px 0' }}>
                <img
                    alt=""
                    src={`${IMG}/${src}`}
                    className="block size-full max-w-none"
                />
            </span>
        </span>
    );
}

/** Ícono que llena su contenedor (inset-0). */
export function FillIcon({ src, className }: { src: string; className: string }) {
    return (
        <span className={`relative block shrink-0 ${className}`} aria-hidden>
            <img
                alt=""
                src={`${IMG}/${src}`}
                className="absolute inset-0 block size-full max-w-none"
            />
        </span>
    );
}
