import { Link } from '@inertiajs/react';
import { login, register } from '@/routes';
import { FillIcon, Glyph } from './glyph';

export function CtaSection() {
    return (
        <section className="mx-auto flex h-[276px] w-full max-w-[1217px] flex-col items-start rounded-[16px] bg-[#133260] pt-[67px] pr-[73px] pb-[87px] pl-[48px]">
            <div className="flex w-full items-center gap-[117px]">
                <div className="flex min-w-px flex-1 flex-col items-start gap-[27px]">
                    <h2 className="text-trim w-full font-heading text-[30px] leading-[36px] font-extrabold tracking-[-0.75px] text-white">
                        Forma parte de Comunidad 360° desde esta primera etapa
                    </h2>
                    <p className="text-trim w-full font-arial text-[16px] leading-[26px] text-[#e2e8f0]">
                        Crea tu cuenta, registra tu perfil empresarial o
                        profesional y comienza a conectar con aliados,
                        proveedores y oportunidades de la comunidad.
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-[9px]">
                    <Link
                        href={register()}
                        className="flex shrink-0 items-center justify-center gap-[10px] rounded-[8px] border border-solid border-white bg-white px-[25px] py-[20px]"
                    >
                        <Glyph
                            src="icon-register.svg"
                            className="h-[15.6px] w-[17.333px]"
                            inset="-5.56% -5% -5.55% -5%"
                        />
                        <span className="text-trim font-arial text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#133260]">
                            Registrarme ahora
                        </span>
                    </Link>
                    <Link
                        href={login()}
                        className="flex shrink-0 items-center justify-center gap-[10px] rounded-[8px] border border-solid border-[#4f5d72] bg-[#142743] px-[25px] py-[20px]"
                    >
                        <FillIcon src="icon-directory.svg" className="size-[16px]" />
                        <span className="text-trim font-arial text-[14px] leading-[20px] font-bold whitespace-nowrap text-white">
                            Explorar directorio
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
