import { Link } from '@inertiajs/react';
import { FillIcon } from './glyph';

const heading =
    'text-trim w-full font-heading text-[12px] leading-[16px] font-semibold tracking-[0.6px] text-[#e2e8f0] uppercase';
const link =
    'text-trim w-full font-arial text-[14px] leading-[20px] text-[#90a1b9]';

export function SiteFooter() {
    return (
        <footer className="bg-[#151618] pt-[93px] pb-[98px]">
            <div className="mx-auto flex w-full max-w-[1216px] flex-col items-start gap-12 px-4 sm:grid sm:grid-cols-2 xl:flex xl:flex-row xl:gap-[58px] xl:pr-0 xl:pl-[2px]">
                <div className="flex w-full min-w-0 flex-col items-start gap-[78px] xl:w-[307.96px] xl:shrink-0">
                    <div className="flex w-full flex-col items-start gap-[25px] xl:w-[268px]">
                        <p className="w-full font-heading text-[18px] leading-[28px] font-extrabold tracking-[-0.45px] text-white text-trim">
                            Comunidad 360°
                        </p>
                        <p className="font-arial text-[14px] leading-[22.75px] text-[#90a1b9] text-trim">
                            Conectamos personas, negocios y
                            <br />
                            oportunidades para impulsar el crecimiento
                            <br />
                            de nuestra comunidad.
                        </p>
                        <p className="font-arial text-[12px] leading-[16px] text-[#62748e] text-trim">
                            Plataforma digital de vinculación empresarial,
                            <br />
                            profesional y comunitaria.
                        </p>
                    </div>
                    <p className="font-arial text-[12px] leading-[16px] text-[#62748e] text-trim xl:whitespace-nowrap">
                        © 2026 Comunidad 360°. Todos los derechos reservados.
                    </p>
                </div>

                <nav
                    aria-label="Navegación del pie de página"
                    className="flex w-full min-w-0 flex-col items-start gap-[22px] xl:w-[221px] xl:shrink-0"
                >
                    <p className={heading}>Navegación</p>
                    <Link href="/" className={link}>
                        Inicio
                    </Link>
                    <Link href="/directorio" className={link}>
                        Directorio empresarial y profesional
                    </Link>
                    <Link href="/vinculaciones" className={link}>
                        Vinculaciones
                    </Link>
                    <Link href="/proximamente" className={link}>
                        Próximamente
                    </Link>
                </nav>

                <div className="flex w-full min-w-0 flex-col items-start gap-[17px] xl:w-[238px] xl:shrink-0">
                    <p className={heading}>Contacto y comunidad</p>
                    <a
                        href="mailto:contacto@comunidad360.mx"
                        className="flex items-center gap-[8px]"
                    >
                        <FillIcon src="icon-mail.svg" className="size-[16px]" />
                        <span className="font-arial text-[14px] leading-[20px] break-all text-[#90a1b9] text-trim xl:whitespace-nowrap">
                            contacto@comunidad360.mx
                        </span>
                    </a>
                </div>

                <div className="flex w-full min-w-0 flex-col items-start gap-[21px] xl:w-[187px] xl:shrink-0">
                    <p className={heading}>Enlaces institucionales</p>
                    <Link href="/register" className={link}>
                        Registrar perfil en el directorio
                    </Link>
                    <Link href="/login" className={link}>
                        Acceso para integrantes
                    </Link>
                    <span className={link}>Aviso de privacidad</span>
                </div>
            </div>
        </footer>
    );
}
