import { Eyebrow } from '@/components/home/section-heading';

export function DirectoryHero() {
    return (
        <section className="mx-auto mt-[24px] flex w-full max-w-[1216px] flex-col items-start gap-[29px] px-[18px] md:mt-[70px] md:h-[307px] md:flex-row md:items-center md:gap-[68px] md:px-0">
            <div className="relative order-first h-[310px] w-full md:order-last md:h-full md:min-w-px md:flex-1">
                <img
                    alt="Empresarios de la comunidad compartiendo productos locales"
                    src="/images/directory/hero.png"
                    className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                />
            </div>
            <div className="flex w-full min-w-px flex-1 flex-col items-start">
                <div className="flex w-full flex-col items-start gap-[28px]">
                    <Eyebrow>EMPRESARIOS</Eyebrow>
                    <div className="flex w-full flex-col items-start gap-[36px]">
                        <h1 className="font-heading text-trim w-full text-[50px] leading-[60.48px] font-extrabold tracking-[-1.4px] text-[#020618] md:text-[56px] md:leading-[60.48px] md:tracking-[-1.4px]">
                            Descubre quiénes integran esta gran Comunidad
                        </h1>
                        <p className="font-arial text-trim w-full text-[16px] leading-[24px] text-[#45556c] md:text-[18px] md:leading-[29.25px]">
                            Empresarios que trabajan todos los días para
                            sostener su actividad, generar empleo y ofrecer
                            productos y servicios a su entorno. Aquí puedes
                            conocer qué hacen y cómo contactarlos.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
