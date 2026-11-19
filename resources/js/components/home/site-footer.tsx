import { FillIcon } from './glyph';

const heading =
    'text-trim w-full font-heading text-[12px] leading-[16px] font-semibold tracking-[0.6px] text-[#e2e8f0] uppercase';
const link =
    'text-trim w-full font-arial text-[14px] leading-[20px] text-[#90a1b9]';

export function SiteFooter() {
    return (
        <footer className="bg-[#151618] pt-[93px] pb-[98px]">
            <div className="mx-auto flex w-full max-w-[1216px] items-start gap-[58px] pl-[2px]">
                <div className="flex w-[307.96px] shrink-0 flex-col items-start gap-[78px]">
                    <div className="flex w-[268px] flex-col items-start gap-[25px]">
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
                    <p className="font-arial text-[12px] leading-[16px] whitespace-nowrap text-[#62748e] text-trim">
                        © 2026 Comunidad 360°. Todos los derechos reservados.
                    </p>
                </div>

                <nav className="flex w-[221px] shrink-0 flex-col items-start gap-[22px]">
                    <p className={heading}>Navegación</p>
                    <a href="/" className={link}>
                        Inicio
                    </a>
                    <a href="/directorio" className={link}>
                        Directorio empresarial y profesional
                    </a>
                    <a href="/#vinculaciones" className={link}>
                        Vinculaciones
                    </a>
                    <a href="/#proximamente" className={link}>
                        Próximamente
                    </a>
                </nav>

                <div className="flex w-[238px] shrink-0 flex-col items-start gap-[17px]">
                    <p className={heading}>Contacto y comunidad</p>
                    <a
                        href="mailto:contacto@comunidad360.mx"
                        className="flex items-center gap-[8px]"
                    >
                        <FillIcon src="icon-mail.svg" className="size-[16px]" />
                        <span className="font-arial text-[14px] leading-[20px] whitespace-nowrap text-[#90a1b9] text-trim">
                            contacto@comunidad360.mx
                        </span>
                    </a>
                </div>

                <div className="flex w-[187px] shrink-0 flex-col items-start gap-[21px]">
                    <p className={heading}>Enlaces institucionales</p>
                    <a href="/register" className={link}>
                        Registrar perfil en el directorio
                    </a>
                    <a href="/login" className={link}>
                        Acceso para integrantes
                    </a>
                    <a href="#privacidad" className={link}>
                        Aviso de privacidad
                    </a>
                </div>
            </div>
        </footer>
    );
}
