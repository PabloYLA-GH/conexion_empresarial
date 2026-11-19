import { Compass, UserPlus } from 'lucide-react';
import { register } from '@/routes';

export function ProximamenteCta() {
    return (
        <section className="mx-auto flex h-[276px] w-full max-w-[1216px] items-center justify-between rounded-[16px] bg-[#133260] pt-[61px] pr-[73px] pb-[61px] pl-[48px]">
            <div className="flex w-[560px] flex-col items-start gap-[16px]">
                <h2 className="w-full font-heading text-[30px] leading-[31px] font-extrabold tracking-[-0.75px] text-white text-trim">
                    Comienza hoy en los módulos activos de
                    <br />
                    la primera etapa
                </h2>
                <p className="w-full font-arial text-[16px] leading-[26px] text-[#e2e8f0]">
                    Mientras preparamos estas nuevas áreas, ya puedes explorar
                    el Directorio, publicar en Vinculaciones y registrar tu
                    perfil para revisión.
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-[10px]">
                <a
                    href="/directorio"
                    className="flex h-[56px] w-[166px] items-center justify-center gap-[10px] rounded-[8px] border border-solid border-[#4f5d72] bg-[#142743]"
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
                    className="flex h-[56px] w-[166px] items-center justify-center gap-[10px] rounded-[8px] border border-solid border-white bg-white"
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
    );
}
