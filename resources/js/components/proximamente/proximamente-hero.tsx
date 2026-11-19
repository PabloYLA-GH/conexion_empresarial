import { Eyebrow } from '../home/section-heading';

export function ProximamenteHero() {
    return (
        <section className="mx-auto flex h-[287px] w-full max-w-[1216px] flex-col items-start gap-[19px] pt-[70px]">
            <Eyebrow>Hoja de ruta del ecosistema</Eyebrow>
            <div className="flex w-[801px] max-w-full flex-col items-start gap-[14px]">
                <h1 className="w-full font-heading text-[56px] leading-[59px] font-extrabold tracking-[-1.4px] text-[#020618] text-trim">
                    Un ecosistema que sigue
                    <br />
                    creciendo.
                </h1>
                <p className="w-full font-arial text-[18px] leading-[28px] text-[#45556c]">
                    Estamos construyendo nuevas herramientas para fortalecer los
                    negocios, compartir conocimientos y generar más
                    oportunidades dentro de nuestra comunidad.
                </p>
            </div>
        </section>
    );
}
