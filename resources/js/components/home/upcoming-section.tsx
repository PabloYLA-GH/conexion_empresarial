import { Glyph } from './glyph';
import { TextLink } from './buttons';

const upcoming = [
    {
        title: 'Productos y servicios',
        text: 'Espacio para descubrir, promocionar y conectar con productos y servicios de integrantes de la comunidad.',
    },
    {
        title: 'Capacitación',
        text: 'Cursos, talleres y contenidos educativos para el crecimiento personal, profesional y empresarial.',
    },
    {
        title: 'Recursos para Pymes',
        text: 'Biblioteca de guías, tutoriales y herramientas prácticas para fortalecer pequeños negocios.',
    },
    {
        title: 'Programas y apoyos',
        text: 'Información sobre convocatorias, programas gubernamentales y apoyos para empresas y emprendedores.',
    },
];

export function UpcomingSection() {
    return (
        <section
            id="proximamente"
            className="mx-auto flex min-h-[334px] w-full max-w-[1217px] flex-col items-start gap-[35px]"
        >
            <div className="flex w-full items-end gap-[167px]">
                <div className="flex min-w-px flex-1 flex-col items-start gap-[26px]">
                    <div className="flex items-center gap-[9px]">
                        <Glyph
                            src="icon-link-label.svg"
                            className="h-[12.081px] w-[13.333px]"
                            inset="-5.52% -5%"
                        />
                        <span className="font-arial text-[12px] leading-[16px] font-bold tracking-[0.6px] whitespace-nowrap text-[#133260] uppercase text-trim">
                            Vinculaciones
                        </span>
                    </div>
                    <div className="flex w-full flex-col items-start gap-[31px]">
                        <h2 className="w-full font-heading text-[30px] leading-[36px] font-extrabold tracking-[-0.75px] text-[#020618] text-trim">
                            Un ecosistema que sigue creciendo
                        </h2>
                        <p className="w-full font-arial text-[16px] leading-[26px] text-[#45556c] text-trim">
                            Esta primera versión prioriza conexiones directas.
                            Las siguientes herramientas se irán habilitando por
                            <br />
                            etapas.
                        </p>
                    </div>
                </div>
                <TextLink
                    href="#proximamente"
                    arrow="arrow-proximas.svg"
                    arrowClassName="size-[7.333px]"
                >
                    Ver todas las próximas secciones
                </TextLink>
            </div>

            <div className="grid w-full grid-cols-4 gap-[16px]">
                {upcoming.map((item) => (
                    <article
                        key={item.title}
                        className="flex min-w-px flex-col items-start rounded-[12px] border border-solid border-[#e2e8f0] bg-white pt-[23px] pr-[55px] pb-[27px] pl-[30px]"
                    >
                        <div className="flex w-full flex-col items-start gap-[17px]">
                            <span className="flex items-center justify-center rounded-[4px] border border-solid border-[#e2e8f0] bg-[#f8fafc] px-[10px] py-[6px]">
                                <span className="font-arial text-[12px] leading-[16.5px] font-bold tracking-[0.55px] whitespace-nowrap text-[#133260] uppercase text-trim">
                                    Próximamente
                                </span>
                            </span>
                            <div className="flex w-full flex-col items-start gap-[19px]">
                                <h3 className="w-full font-heading text-[16px] leading-[24px] font-bold text-[#0f172b] text-trim">
                                    {item.title}
                                </h3>
                                <p className="w-full font-arial text-[12px] leading-[19.5px] text-[#45556c] text-trim">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
