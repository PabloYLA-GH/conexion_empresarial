import { register } from '@/routes';
import { IMG } from './glyph';
import { OutlineButton, PrimaryButton } from './buttons';
import { Eyebrow } from './section-heading';

export function HeroSection() {
    return (
        <section className="mx-auto mt-[70px] flex h-[371px] w-full max-w-[1216px] items-center gap-[68px]">
            <div className="flex min-w-px flex-1 flex-col items-start gap-[47px]">
                <div className="flex w-full flex-col items-start gap-[28px]">
                    <Eyebrow>Ecosistema digital de vinculación</Eyebrow>
                    <div className="flex w-full flex-col items-start gap-[36px]">
                        <h1 className="text-trim w-full font-heading text-[56px] leading-[60.48px] font-extrabold tracking-[-1.4px] text-[#020618]">
                            Conecta.
                            <br />
                            Emprende.Crece.
                        </h1>
                        <p className="text-trim w-full font-arial text-[18px] leading-[29.25px] text-[#45556c]">
                            Encuentra empresas, emprendedores y profesionistas
                            de nuestra comunidad. Compra local, colabora y
                            accede a capacitación, recursos y programas de
                            apoyo.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-[9px]">
                    <PrimaryButton href="/directorio">
                        Explorar directorio
                    </PrimaryButton>
                    <OutlineButton href={register()}>
                        Forma parte de la comunidad
                    </OutlineButton>
                </div>
            </div>
            <div className="relative h-full min-w-px flex-1">
                <img
                    alt="Personas de la comunidad trabajando en equipo en un espacio de coworking"
                    src={`${IMG}/hero.png`}
                    className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                />
            </div>
        </section>
    );
}
