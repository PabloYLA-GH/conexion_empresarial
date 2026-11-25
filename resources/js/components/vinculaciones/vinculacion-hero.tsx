import { Plus } from 'lucide-react';
import { login } from '@/routes';
import { Eyebrow } from '../home/section-heading';

export function VinculacionHero() {
    return (
        <section className="relative mx-auto flex w-full max-w-[1216px] flex-col items-start gap-[24px] px-[18px] pt-[40px] md:px-0 lg:h-[278px] lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:pt-[70px]">
            <div className="flex w-full flex-col items-start gap-[20px] lg:w-[738px]">
                <Eyebrow>Vinculaciones</Eyebrow>
                <h1 className="w-full font-heading text-[40px] leading-[44px] font-extrabold tracking-[-1px] text-[#020618] text-trim md:text-[56px] md:leading-[54px] md:tracking-[-1.4px]">
                    Encuentra aliados,
                    <br />
                    proveedores y
                    <br />
                    oportunidades
                </h1>
                <p className="w-full font-arial text-[18px] leading-[29px] text-[#45556c]">
                    Descubre integrantes dispuestos a colaborar, consulta su
                    perfil público y envía una solicitud de contacto directa con
                    seguimiento en tu cuenta.
                </p>
            </div>

            <a
                href={login().url}
                className="flex shrink-0 items-center gap-[8px] rounded-[8px] bg-[#133260] px-[24px] py-[13px]"
            >
                <Plus
                    aria-hidden
                    size={14}
                    strokeWidth={2}
                    className="text-white"
                />
                <span className="font-arial text-[14px] leading-[20px] font-bold whitespace-nowrap text-white text-trim">
                    Inicia sesión para publicar
                </span>
            </a>
        </section>
    );
}
