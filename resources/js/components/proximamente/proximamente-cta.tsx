import { Compass, UserPlus } from 'lucide-react';
import { register } from '@/routes';

export function ProximamenteCta() {
    return (
        <>
            <section className="mx-auto flex w-full max-w-[1216px] flex-col items-start gap-[80px] rounded-[16px] bg-[#133260] px-[35px] py-[67px] md:hidden">
                <div className="flex w-full flex-col items-start gap-[27px]">
                    <h2 className="w-full font-heading text-[26px] leading-[36px] font-extrabold tracking-[-0.75px] text-white text-trim">
                        Forma parte de Comunidad 360° desde esta primera etapa
                    </h2>
                    <p className="w-full font-arial text-[14px] leading-[26px] text-[#e2e8f0]">
                        Crea tu cuenta, registra tu perfil empresarial o
                        profesional y comienza a conectar con aliados,
                        proveedores y oportunidades de la comunidad.
                    </p>
                </div>
                <div className="flex w-full flex-col gap-[9px]">
                    <a
                        href="/directory"
                        className="flex w-full items-center justify-center gap-[10px] rounded-[8px] border border-solid border-[#4f5d72] bg-[#142743] px-[25px] py-[20px]"
                    >
                        <Compass
                            aria-hidden
                            size={16}
                            strokeWidth={1.75}
                            className="text-white"
                        />
                        <span className="font-arial text-[14px] leading-[20px] font-bold whitespace-nowrap text-white text-trim">
                            Explorar directorio
                        </span>
                    </a>
                    <a
                        href={register().url}
                        className="flex w-full items-center justify-center gap-[10px] rounded-[8px] border border-solid border-white bg-white px-[25px] py-[20px]"
                    >
                        <UserPlus
                            aria-hidden
                            size={16}
                            strokeWidth={1.75}
                            className="text-[#133260]"
                        />
                        <span className="font-arial text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#133260] text-trim">
                            Registrarme ahora
                        </span>
                    </a>
                </div>
            </section>
            <section className="mx-auto hidden w-full max-w-[1216px] flex-col items-start gap-[24px] rounded-[16px] bg-[#133260] p-[24px] md:flex lg:h-[276px] lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:pt-[61px] lg:pr-[73px] lg:pb-[61px] lg:pl-[48px]">
                <div className="flex w-full flex-col items-start gap-[16px] lg:w-[560px]">
                    <h2 className="w-full font-heading text-[30px] leading-[31px] font-extrabold tracking-[-0.75px] text-white text-trim">
                        Comienza hoy en los módulos activos de
                        <br />
                        la primera etapa
                    </h2>
                    <p className="w-full font-arial text-[16px] leading-[26px] text-[#e2e8f0]">
                        Mientras preparamos estas nuevas áreas, ya puedes
                        explorar el Directorio, publicar en Vinculaciones y
                        registrar tu perfil para revisión.
                    </p>
                </div>

                <div className="flex w-full shrink-0 flex-col gap-[10px] sm:w-auto sm:flex-row sm:items-center">
                    <a
                        href="/directory"
                        className="flex h-[56px] w-full items-center justify-center gap-[10px] rounded-[8px] border border-solid border-[#4f5d72] bg-[#142743] sm:w-[166px]"
                    >
                        <Compass
                            aria-hidden
                            size={16}
                            strokeWidth={1.75}
                            className="text-white"
                        />
                        <span className="font-arial text-[14px] leading-[20px] font-bold whitespace-nowrap text-white text-trim">
                            Explorar directorio
                        </span>
                    </a>
                    <a
                        href={register().url}
                        className="flex h-[56px] w-full items-center justify-center gap-[10px] rounded-[8px] border border-solid border-white bg-white sm:w-[166px]"
                    >
                        <UserPlus
                            aria-hidden
                            size={16}
                            strokeWidth={1.75}
                            className="text-[#133260]"
                        />
                        <span className="font-arial text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#133260] text-trim">
                            Registrarme ahora
                        </span>
                    </a>
                </div>
            </section>
        </>
    );
}
