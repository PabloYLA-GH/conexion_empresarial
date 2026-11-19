import { Eyebrow } from '@/components/home/section-heading';

export function DirectoryHero() {
    return (
        <section className="mx-auto mt-[70px] flex h-[307px] w-full max-w-[1216px] items-center gap-[68px]">
            <div className="flex min-w-px flex-1 flex-col items-start">
                <div className="flex w-full flex-col items-start gap-[28px]">
                    <Eyebrow>EMPRESARIOS</Eyebrow>
                    <div className="flex w-full flex-col items-start gap-[36px]">
                        <h1 className="w-full font-heading text-[56px] leading-[60.48px] font-extrabold tracking-[-1.4px] text-[#020618] text-trim">
                            Descubre quiénes integran esta gran Comunidad
                        </h1>
                        <p className="w-full font-arial text-[18px] leading-[29.25px] text-[#45556c] text-trim">
                            Empresarios que trabajan todos los días para
                            sostener su actividad, generar empleo y ofrecer
                            productos y servicios a su entorno. Aquí puedes
                            conocer qué hacen y cómo contactarlos.
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative h-full min-w-px flex-1">
                <img
                    alt="Empresarios de la comunidad compartiendo productos locales"
                    src="/images/directory/hero.png"
                    className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                />
            </div>
        </section>
    );
}
