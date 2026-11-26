import { Link } from '@inertiajs/react';
import { register } from '@/routes';
import { FillIcon, Glyph } from './glyph';

export function CtaSection() {
    return (
        <section className="mx-auto flex w-full max-w-[1217px] flex-col items-start rounded-[16px] bg-[#133260] p-[24px] lg:h-[276px] lg:pt-[67px] lg:pr-[73px] lg:pb-[87px] lg:pl-[48px]">
            <div className="flex w-full flex-col items-start gap-[32px] lg:flex-row lg:items-center lg:gap-[117px]">
                <div className="flex min-w-px flex-1 flex-col items-start gap-[27px]">
                    <h2 className="font-heading text-trim w-full text-[30px] leading-[36px] font-extrabold tracking-[-0.75px] text-white">
                        Forma parte de Comunidad 360° desde esta primera etapa
                    </h2>
                    <p className="font-arial text-trim w-full text-[16px] leading-[26px] text-[#e2e8f0]">
                        Crea tu cuenta, registra tu perfil empresarial o
                        profesional y comienza a conectar con aliados,
                        proveedores y oportunidades de la comunidad.
                    </p>
                </div>
                <div className="flex w-full shrink-0 flex-col items-stretch gap-[9px] sm:flex-row sm:items-center lg:w-auto">
                    <Link
                        href={register()}
                        className="flex shrink-0 items-center justify-center gap-[10px] rounded-[8px] border border-solid border-white bg-white px-[25px] py-[20px]"
                    >
                        <Glyph
                            src="icon-register.svg"
                            className="h-[15.6px] w-[17.333px]"
                            inset="-5.56% -5% -5.55% -5%"
                        />
                        <span className="font-arial text-trim text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#133260]">
                            Registrarme ahora
                        </span>
                    </Link>
                    <Link
                        href="/directory"
                        className="flex shrink-0 items-center justify-center gap-[10px] rounded-[8px] border border-solid border-[#4f5d72] bg-[#142743] px-[25px] py-[20px]"
                    >
                        <FillIcon
                            src="icon-directory.svg"
                            className="size-[16px]"
                        />
                        <span className="font-arial text-trim text-[14px] leading-[20px] font-bold whitespace-nowrap text-white">
                            Explorar directorio
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
