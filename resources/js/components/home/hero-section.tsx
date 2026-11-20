import { register } from '@/routes';
import { IMG } from './glyph';
import { OutlineButton, PrimaryButton } from './buttons';
import { Eyebrow } from './section-heading';

export function HeroSection() {
    return (
        <section className="mx-auto mt-[24px] flex w-full max-w-[1216px] flex-col items-start gap-[29px] px-[18px] md:mt-[70px] md:h-[371px] md:flex-row md:items-center md:gap-[68px] md:px-0">
            <div className="relative order-first h-[250px] w-full md:order-last md:h-full md:min-w-px md:flex-1">
                <img
                    alt="Personas de la comunidad trabajando en equipo en un espacio de coworking"
                    src={`${IMG}/hero.png`}
                    className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                />
            </div>
            <div className="flex w-full flex-col items-start gap-[47px] md:min-w-px md:flex-1">
                <div className="flex w-full flex-col items-start gap-[28px]">
                    <Eyebrow>Ecosistema digital de vinculación</Eyebrow>
                    <div className="flex w-full flex-col items-start gap-[36px]">
                        <h1 className="w-full font-heading text-[40px] leading-[44px] font-extrabold tracking-[-1px] text-[#020618] text-trim md:text-[56px] md:leading-[60.48px] md:tracking-[-1.4px]">
                            Conecta.
                            <br />
                            Emprende.Crece.
                        </h1>
                        <p className="w-full font-arial text-[16px] leading-[24px] text-[#45556c] text-trim md:text-[18px] md:leading-[29.25px]">
                            Encuentra empresas, emprendedores y profesionistas
                            de nuestra comunidad. Compra local, colabora y
                            accede a capacitación, recursos y programas de
                            apoyo.
                        </p>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-[9px] sm:flex-row sm:items-center">
                    <PrimaryButton
                        href="/directorio"
                        className="flex w-full items-center justify-center px-[24px] py-[18.5px] sm:w-auto"
                    >
                        Explorar directorio
                    </PrimaryButton>
                    <OutlineButton
                        href={register()}
                        className="flex w-full items-center justify-center px-[24px] py-[18.5px] text-[14px] sm:w-auto"
                    >
                        Forma parte de la comunidad
                    </OutlineButton>
                </div>
            </div>
        </section>
    );
}
