import { SectionHeading } from './section-heading';

const dimensions = [
    {
        number: '01.',
        title: 'Personas',
        text: 'Talento, experiencia, conocimientos y capacidades al servicio de proyectos reales.',
    },
    {
        number: '02.',
        title: 'Negocios',
        text: 'Empresas, emprendimientos, productos y servicios con identidad clara y trato directo.',
    },
    {
        number: '03.',
        title: 'Conexiones',
        text: 'Alianzas, redes de colaboración y oportunidades comerciales entre integrantes.',
    },
    {
        number: '04.',
        title: 'Innovación',
        text: 'Ideas, iniciativas y proyectos conjuntos que fortalecen la competitividad local.',
    },
    {
        number: '05.',
        title: 'Comunidad',
        text: 'Cooperación, confianza mutua, crecimiento y beneficios compartidos.',
    },
];

export function ConceptSection() {
    return (
        <div className="mx-auto flex w-full max-w-[1216px] items-center justify-between">
            <SectionHeading
                eyebrow="Concepto y filosofía"
                title="¿Qué es Comunidad 360°?"
                className="w-[454px]"
            >
                Comunidad 360° no es solamente un directorio empresarial. Es un
                ecosistema pensado para articular capacidades, conocimientos,
                negocios, experiencias y oportunidades reales de crecimiento
                colectivo en cinco dimensiones complementarias.
            </SectionHeading>

            <ol className="flex min-h-[599px] w-[578px] flex-col items-start bg-white p-[20px]">
                {dimensions.map((item) => (
                    <li
                        key={item.number}
                        className="flex w-full items-start gap-[24px] border-b border-solid border-[#e2e8f0] bg-white py-[30px]"
                    >
                        <span className="flex h-[14px] w-[21.81px] shrink-0 flex-col justify-center font-menlo text-[12px] leading-[16px] font-bold text-[#133260]">
                            {item.number}
                        </span>
                        <div className="flex min-w-px flex-1 flex-col items-start gap-[15px]">
                            <h3 className="min-h-[12px] w-full font-heading text-[16px] leading-[24px] font-bold text-[#0f172b] text-trim">
                                {item.title}
                            </h3>
                            <p className="w-full font-arial text-[14px] leading-[22.75px] text-[#45556c] text-trim">
                                {item.text}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
