import { Eyebrow } from '../home/section-heading';

export function ProximamenteHero() {
    return (
        <section className="mx-auto flex w-full max-w-[1216px] flex-col items-start gap-[19px] px-[18px] pt-[40px] md:px-0 lg:h-[287px] lg:pt-[70px]">
            <Eyebrow>Hoja de ruta del ecosistema</Eyebrow>
            <div className="flex w-[801px] max-w-full flex-col items-start gap-[14px]">
                <h1 className="font-heading text-trim w-full text-[50px] leading-[60.48px] font-extrabold tracking-[-1.4px] text-[#020618] md:text-[56px] md:leading-[59px]">
                    Un ecosistema que sigue
                    <br className="hidden md:inline" />
                    creciendo.
                </h1>
                <p className="font-arial w-full text-[18px] leading-[29.25px] text-[#45556c] md:leading-[28px]">
                    Estamos construyendo nuevas herramientas para fortalecer los
                    negocios, compartir conocimientos y generar más
                    oportunidades dentro de nuestra comunidad.
                </p>
            </div>
        </section>
    );
}
